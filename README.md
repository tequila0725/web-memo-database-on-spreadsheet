# Web Memo Database On GoogleSpreadsheet

現在閲覧中のWebページの情報をGoogleスプレッドシートに簡単に保存できるChrome拡張機能です。

## 機能

- 現在開いているWebページのタイトルとURLを自動取得
- タグ付け機能でページの分類が可能
- 備考欄でメモを追加可能
- Googleスプレッドシートにワンクリックでデータを保存

## セットアップ手順

### 1. スプレッドシートの準備

1. Googleドライブで新しいスプレッドシートを作成
2. 1行目に以下のヘッダーを入力:
   - A1: タイトル
   - B1: URL
   - C1: タグ
   - D1: 備考

### 2. 拡張機能のインストール

1. このリポジトリをクローンまたはダウンロード:

   ```
   https://github.com/tequila0725/web-memo-database-on-spreadsheet
   ```

2. Chrome拡張機能の設定ページ（`chrome://extensions/`）を開く
3. 「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、クローンしたディレクトリを選択

### 3. Google Cloud Platform (GCP) の設定

1. [Google Cloud Console](https://cloud.google.com/?hl=ja)で新しいプロジェクトを作成:
   - ヘッダーメニューの「コンソール」をクリック
   - 「プロジェクトを選択」→「新しいプロジェクト」
   - プロジェクト名は任意、組織は「組織なし」を選択

2. 必要なAPIと認証情報の設定:
   - APIとサービスから「Google Sheets API」を有効化
   - 認証情報でAPIキーとOAuthクライアントIDを作成

3. OAuth同意画面の設定:
   - User Type: 外部
   - アプリ名: 任意
   - ユーザーサポートメール: 任意
   - デベロッパーの連絡先情報: 任意
   - テストユーザー: 拡張機能を使用するGoogleアカウント

4. OAuthクライアントIDの作成:
   - アプリケーションの種類: Chrome拡張機能
   - 名前: 任意
   - アイテムID: Chrome拡張機能のID

### 4. 拡張機能の設定

1. `.env.sample`をコピーして`.env`を作成し、以下の情報を設定:

```
API_KEY=your_api_key
SPREADSHEET_ID=your_spreadsheet_id
SPREADSHEET_TAB_NAME=your_sheet_name
CLIENT_ID=your_client_id
```

2. `manifest.json`の`client_id`フィールドにOAuthクライアントIDを入力

## 使用方法

1. Chrome拡張機能をインストールすると、ツールバーにアイコンが追加されます
2. 保存したいWebページを開いた状態でアイコンをクリック
3. ポップアップウィンドウで情報を編集:
   - タイトル（自動取得）
   - URL（自動取得）
   - タグ（カンマ区切りで複数入力可能）
   - 備考
4. 「スプレッドシートに保存」ボタンをクリックして保存

## 技術仕様

- Chrome Extension Manifest V3
- JavaScript
- Google Sheets API v4

## 注意事項

- 初回使用時にGoogleアカウントへのアクセス許可が必要です
- スプレッドシートの権限設定が適切に行われていることを確認してください
- Braveブラウザでは動作しません｡必ずChromeで使用してください
- SPREADSHEET_TAB_NAMEはスプレッドシートのシート名です。英字で入力してください。

## 必要な権限

- `identity`: Googleアカウントの認証に使用
- `activeTab`: 現在開いているタブの情報取得に使用
