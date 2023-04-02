# splathon-streamkit

## 開発の流れ

main ブランチに push すると自動的に本番環境にリリースされるので気をつけてください

- 適宜ブランチを作成
- プルリクを作成
- stg 環境でチェック
- マージする

## 開発環境


### エンドポイント

|||
|-|-|
|streamkit|http://localhost:5173/|
|Firebase のエミュレータ|http://localhost:4000/|

### 必要なもの

- Node.js
  - https://asdf-vm.com/ での導入をおすすめしてます
- Java

### セットアップ

#### Node.js のインストール (asdf の場合)

```bash
$ asdf install
```

#### Java のインストール

https://www.java.com/ja/download/help/download_options_ja.html

macOS なら brew で入ると思う

#### パッケージのインストール

```bash
$ npm install
```

#### 開発環境の起動

```bash
$ npm run dev
```

#### seeder の書き出し

```bash
$ npm run seed:save
```
