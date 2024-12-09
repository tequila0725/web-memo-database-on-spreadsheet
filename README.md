# Web Memo Database On GoogleSpreadsheet

現在閲覧中のWebページの情報をGoogleスプレッドシートに簡単に保存できるChrome拡張機能です。

## 機能

- 現在開いているWebページのタイトルとURLを自動取得
- タグ付け機能でページの分類が可能
- 備考欄でメモを追加可能
- Googleスプレッドシートにワンクリックでデータを保存

## インストール方法

1. このリポジトリをクローンまたはダウンロードします
2. Chrome拡張機能の設定ページ（`chrome://extensions/`）を開きます
3. 「デベロッパーモード」を有効にします
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、ダウンロードしたフォルダを選択します

## 環境設定

1. Google Cloud Platformで新しいプロジェクトを作成し、以下のAPIを有効化します：
   - Google Sheets API

2. OAuth 2.0クライアントIDを作成し、以下の設定を行います：
   - アプリケーションの種類：Chrome App
   - 必要なスコープ：`https://www.googleapis.com/auth/spreadsheets`

3. プロジェクトのルートディレクトリに`.env`ファイルを作成し、以下の情報を設定します：

```
API_KEY=your_api_key
SPREADSHEET_ID=your_spreadsheet_id
SPREADSHEET_TAB_NAME=your_sheet_name
CLIENT_ID=your_client_id
```

## 使用方法

1. Chrome拡張機能をインストールすると、ツールバーにアイコンが追加されます
2. 保存したいWebページを開いた状態でアイコンをクリックします
3. ポップアップウィンドウが開き、以下の情報を編集できます：
   - タイトル（自動取得）
   - URL（自動取得）
   - タグ（カンマ区切りで複数入力可能）
   - 備考
4. 「スプレッドシートに保存」ボタンをクリックすると、設定したGoogleスプレッドシートに情報が保存されます

## 必要な権限

- `identity`: Googleアカウントの認証に使用
- `activeTab`: 現在開いているタブの情報取得に使用

## 開発環境

- Chrome Extension Manifest V3
- JavaScript
- Google Sheets API v4

## 注意事項

- 初回使用時にGoogleアカウントへのアクセス許可が必要です
- スプレッドシートの権限設定が適切に行われていることを確認してください
- Braveブラウザでは動作しません｡必ずChromeで使用してください
