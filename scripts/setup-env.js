#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 YouTube SaaS 環境セットアップを開始します...\n');

// .env.exampleから.env.localを作成
const envExamplePath = path.join(__dirname, '..', '.env.example');
const envLocalPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(envLocalPath)) {
  console.log('📝 .env.local を作成しています...');
  
  let envContent = fs.readFileSync(envExamplePath, 'utf8');
  
  // JWT_SECRETを自動生成
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  envContent = envContent.replace('your-super-secret-jwt-key', jwtSecret);
  
  fs.writeFileSync(envLocalPath, envContent);
  console.log('✅ .env.local を作成しました');
} else {
  console.log('ℹ️  .env.local は既に存在します');
}

// 各アプリケーションの.env.localも作成
const apps = [
  { path: 'frontend/web', name: 'Web' },
  { path: 'frontend/mobile', name: 'Mobile' },
  { path: 'backend/api', name: 'API' },
];

apps.forEach(app => {
  const appEnvPath = path.join(__dirname, '..', app.path, '.env.local');
  if (!fs.existsSync(appEnvPath)) {
    console.log(`📝 ${app.name}用の .env.local を作成しています...`);
    fs.writeFileSync(appEnvPath, '# ' + app.name + ' Environment Variables\n');
    console.log(`✅ ${app.name}用の .env.local を作成しました`);
  }
});

// 必要なディレクトリを作成
const directories = [
  'frontend/web/public/ffmpeg',
  'frontend/mobile/assets',
  'logs',
  'temp',
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 ${dir} ディレクトリを作成しました`);
  }
});

console.log('\n✨ セットアップが完了しました！');
console.log('\n次のステップ:');
console.log('1. .env.local ファイルを編集して、必要なAPIキーを設定してください');
console.log('2. pnpm dev で開発サーバーを起動できます');
console.log('\n詳細は README.md を参照してください。');