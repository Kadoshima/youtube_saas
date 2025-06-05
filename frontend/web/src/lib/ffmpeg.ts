import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

class FFmpegService {
  private ffmpeg: FFmpeg | null = null;
  private loaded = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.ffmpeg = new FFmpeg();
    }
  }

  async load(): Promise<void> {
    if (!this.ffmpeg || this.loaded) return;

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    
    try {
      await this.ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      
      this.loaded = true;
      console.log('FFmpeg loaded successfully');
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
      throw new Error('FFmpeg の初期化に失敗しました');
    }
  }

  async processVideo(
    inputFile: File,
    options: {
      startTime?: number;
      endTime?: number;
      resolution?: '720p' | '1080p';
      fps?: 30 | 60;
    } = {}
  ): Promise<Blob> {
    if (!this.ffmpeg || !this.loaded) {
      await this.load();
    }

    const { startTime = 0, endTime, resolution = '1080p', fps = 30 } = options;
    
    // 解像度の設定
    const resolutionMap = {
      '720p': '720:1280',
      '1080p': '1080:1920'
    };

    try {
      // 入力ファイルを書き込み
      await this.ffmpeg!.writeFile('input.mp4', await fetchFile(inputFile));

      // FFmpegコマンドの構築
      const args = [
        '-i', 'input.mp4',
        '-ss', startTime.toString(),
      ];

      if (endTime) {
        args.push('-t', (endTime - startTime).toString());
      }

      args.push(
        '-vf', `scale=${resolutionMap[resolution]}:force_original_aspect_ratio=decrease,pad=${resolutionMap[resolution]}:(ow-iw)/2:(oh-ih)/2,setsar=1`,
        '-r', fps.toString(),
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        '-c:a', 'aac',
        '-ar', '44100',
        '-ac', '2',
        '-b:a', '128k',
        '-movflags', '+faststart',
        'output.mp4'
      );

      // 処理実行
      await this.ffmpeg!.exec(args);

      // 結果を読み込み
      const data = await this.ffmpeg!.readFile('output.mp4');
      
      // クリーンアップ
      await this.ffmpeg!.deleteFile('input.mp4');
      await this.ffmpeg!.deleteFile('output.mp4');

      return new Blob([data], { type: 'video/mp4' });
    } catch (error) {
      console.error('Video processing failed:', error);
      throw new Error('動画の処理に失敗しました');
    }
  }

  async extractThumbnail(inputFile: File, time: number = 0): Promise<Blob> {
    if (!this.ffmpeg || !this.loaded) {
      await this.load();
    }

    try {
      await this.ffmpeg!.writeFile('input.mp4', await fetchFile(inputFile));

      await this.ffmpeg!.exec([
        '-i', 'input.mp4',
        '-ss', time.toString(),
        '-vframes', '1',
        '-vf', 'scale=270:480',
        '-f', 'image2',
        'thumbnail.jpg'
      ]);

      const data = await this.ffmpeg!.readFile('thumbnail.jpg');
      
      await this.ffmpeg!.deleteFile('input.mp4');
      await this.ffmpeg!.deleteFile('thumbnail.jpg');

      return new Blob([data], { type: 'image/jpeg' });
    } catch (error) {
      console.error('Thumbnail extraction failed:', error);
      throw new Error('サムネイルの生成に失敗しました');
    }
  }

  setProgress(callback: (progress: number) => void): void {
    if (!this.ffmpeg) return;

    this.ffmpeg.on('progress', ({ progress }) => {
      callback(Math.round(progress * 100));
    });
  }

  async terminate(): Promise<void> {
    if (this.ffmpeg && this.loaded) {
      this.ffmpeg.terminate();
      this.loaded = false;
    }
  }
}

// シングルトンインスタンス
const ffmpegService = new FFmpegService();
export default ffmpegService;