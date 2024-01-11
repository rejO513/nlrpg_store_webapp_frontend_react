# Neverland RPG コンテンツ販売 Webアプリケーション(フロントエンド)

## Webアプリケーションの概要

開発期間: 2023年9月～ (継続中)

開発環境:
フロントエンド: JavaScript、React(Semantic UI、React Router DOM)、Nginx
バックエンド: Python、Django(Django REST Framework)、Nginx
インフラ: Linux、AWS、GCP、Docker

開発背景:
開発目的としては、時間コストを削減するためだ。従来、コンテンツ購入の決済処理をGoogleフォームで受け取り、それを人の目で確認して、手動で決済処理とコンテンツの適用を行っていた。中には、サブスクリプション型のコンテンツも存在するため、更新や解約処理に非常に時間を要していた。また、手動ではミスが発生する恐れもあるため、決済処理を自動化することで迅速かつ正確に手続きを行えると考えた。

現時点で実装済みの機能:
・Googleアカウントを用いたユーザー登録・ログイン
・ユーザー情報の閲覧機能
・ユーザー情報(表示名、外部アカウントIDなど)を変更する機能

## フロントエンドサーバーについて

フレームワーク: React

ライブラリ: 
- Semantic UI
- React Router DOM
- axios

## /src
### /
- App.js - ページ全体の管理
- Error.js - エラーメッセージの定数宣言
- LocalConstant.js - 定数宣言

### /routes/store
- Store.js - ストアページ
- StoreSections.js - ストアページの本文
- tabs/MyStatusTab.js - ストアページのステータスタブ

### /components
- GoogleButton.js - 「Googleでログイン/登録」ボタン
- LoginHandler.js - ログイン画面の表示および制御
- LogoutButton.js - ログアウトボタン
- NavMenu.js - ナビゲーションメニュー
- SaveButton.js - 保存ボタン
- UserIconInNavMenu.js - ナビゲーションメニュー内のユーザーアイコン
- UserStatus.js - ユーザーステータス表示部の部品
