# 📷 AI 拍立得 v3 - Google 相簿整合版

<p align="center">
  <img src="icons/icon-192.png" alt="AI Polaroid" width="100">
</p>

<p align="center">
  <strong>支援 Google 相簿上傳 + LINE 通知</strong><br>
  IndexedDB 儲存，可存放 100+ 張照片
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-3.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Storage-IndexedDB-green" alt="Storage">
  <img src="https://img.shields.io/badge/Cloud-Google%20Photos-orange" alt="Cloud">
  <img src="https://img.shields.io/badge/Notify-LINE%20BOT-brightgreen" alt="LINE">
</p>

---

## ✨ v3 新功能

| 功能 | 說明 |
|------|------|
| 📦 **IndexedDB 儲存** | 照片不佔記憶體，支援 100+ 張 |
| ☁️ **Google 相簿** | 一鍵上傳到 Google 相簿 |
| 💬 **LINE 通知** | 上傳成功自動推播通知 |
| 🎨 **iPhone 17 主題** | 8 種配色主題 |
| 🔄 **批次上傳** | 一次上傳所有待傳照片 |

---

## 🚀 快速部署

### GitHub Pages

```bash
git clone https://github.com/你的帳號/AI-Polaroid-v3.git
cd AI-Polaroid-v3
# 已經包含所有檔案，直接推送即可
```

部署後網址：`https://你的帳號.github.io/AI-Polaroid-v3/`

---

## ⚙️ 設定說明

### 1. Google 相簿設定

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立專案 → 啟用 **Photos Library API**
3. 建立 OAuth 2.0 憑證
4. 將 Client ID 貼到 APP 設定

### 2. LINE 通知設定

1. 部署 `GAS_LINE_Notification.gs` 到 Google Apps Script
2. 在 [LINE Developers](https://developers.line.biz/) 建立 Messaging API
3. 取得 Channel Access Token
4. 設定 Webhook URL 為 GAS 網址
5. 取得 User ID（對 BOT 說「我的ID」）

詳細教學請參考 `LINE_設定教學.md`

---

## 📁 檔案結構

```
AI-Polaroid-v3/
├── index.html              # 主程式
├── manifest.json           # PWA 設定
├── sw.js                   # Service Worker
├── GAS_LINE_Notification.gs # LINE 通知 GAS 腳本
├── LINE_設定教學.md         # 設定教學文件
├── README.md               # 本說明文件
├── .gitignore
└── icons/                  # APP 圖標
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    ├── icon-512.png
    └── icon.svg
```

---

## 📱 安裝到手機

### iOS (Safari)
1. 用 Safari 開啟網頁
2. 點擊分享按鈕 📤
3. 選擇「加入主畫面」

### Android (Chrome)
1. 用 Chrome 開啟網頁
2. 點擊選單 ⋮
3. 選擇「安裝應用程式」

---

## 🔐 隱私說明

- 照片儲存在你的瀏覽器 IndexedDB
- Google 相簿上傳使用 OAuth 授權
- LINE 通知透過你自己的 BOT 發送
- 所有 API Key 存在本機，不會上傳

---

## 📄 授權

MIT License

---

## 👨‍💻 作者

Made with ❤️ by **Sone Wang** - 2024
