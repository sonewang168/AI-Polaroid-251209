# 📷 AI 拍立得 v3 - LINE 通知設定教學

## 📋 設定清單

| 項目 | 狀態 | 說明 |
|------|------|------|
| GAS URL | 🆕 需新建 | 部署本腳本取得 |
| GAS Secret | ♻️ 沿用 | 使用你原有的密鑰 |
| LINE Token | 🆕 需新建 | 建立新 LINE BOT |
| LINE User ID | 🆕 需取得 | 加好友後自動取得 |

---

## 1️⃣ 部署 GAS 腳本

### 步驟 1：建立新專案
1. 前往 [Google Apps Script](https://script.google.com/)
2. 點擊 **「新專案」**
3. 將專案命名為 `AI拍立得-LINE通知`

### 步驟 2：貼上程式碼
1. 刪除預設的 `function myFunction() {}`
2. 貼上 `GAS_LINE_Notification.gs` 的完整程式碼
3. **重要**：修改第 10 行的 SECRET
   ```javascript
   const SECRET = '你的舊密鑰';  // 沿用你的舊密鑰
   ```

### 步驟 3：部署為網頁應用程式
1. 點擊右上角 **「部署」** → **「新增部署作業」**
2. 選擇類型：**「網頁應用程式」**
3. 設定：
   - 說明：`AI拍立得 LINE 通知 v1`
   - 執行身分：**「我」**
   - 存取權：**「所有人」**
4. 點擊 **「部署」**
5. 授權：點擊「授權存取」→ 選擇你的 Google 帳號 → 「允許」
6. **複製網址**：這就是你的 **GAS URL**

---

## 2️⃣ 建立 LINE BOT

### 步驟 1：前往 LINE Developers
1. 前往 [LINE Developers Console](https://developers.line.biz/console/)
2. 登入你的 LINE 帳號

### 步驟 2：建立 Provider（如果沒有）
1. 點擊 **「Create」**
2. 輸入 Provider 名稱，例如：`我的機器人`

### 步驟 3：建立 Messaging API Channel
1. 點擊你的 Provider
2. 點擊 **「Create a new channel」**
3. 選擇 **「Messaging API」**
4. 填寫：
   - Channel name：`AI拍立得通知`
   - Channel description：`照片上傳通知`
   - Category：`工具`
   - Subcategory：`照片編輯`
5. 勾選同意條款
6. 點擊 **「Create」**

### 步驟 4：取得 Channel Access Token
1. 進入剛建立的 Channel
2. 點擊 **「Messaging API」** 分頁
3. 滾動到最下方 **「Channel access token」**
4. 點擊 **「Issue」** 產生 Token
5. **複製 Token**：這就是你的 **LINE Token**

### 步驟 5：設定 Webhook
1. 在 **「Messaging API」** 分頁
2. 找到 **「Webhook settings」**
3. 點擊 **「Edit」**
4. 貼上你的 **GAS URL**
5. 開啟 **「Use webhook」**
6. 關閉 **「Auto-reply messages」**（自動回覆）
7. 關閉 **「Greeting messages」**（歡迎訊息）

---

## 3️⃣ 取得 LINE User ID

### 方法 A：加好友自動取得（推薦）
1. 在 LINE Developers 的 **「Messaging API」** 分頁
2. 找到 **「Bot information」** 區塊
3. 掃描 **QR Code** 加 BOT 為好友
4. 在 LINE 對話中輸入：`我的ID`
5. BOT 會回覆你的 **User ID**

### 方法 B：從 Console 查看
1. 在 LINE Developers Console
2. 點擊 **「Basic settings」** 分頁
3. 找到 **「Your user ID」**
4. 這是你自己的 User ID

---

## 4️⃣ 在 AI 拍立得中設定

1. 開啟 AI 拍立得 APP
2. 點擊 **「雲端」** 分頁
3. 填入以下資訊：

| 欄位 | 填入值 |
|------|--------|
| GAS URL | `https://script.google.com/macros/s/xxxxx/exec` |
| GAS Secret | 你的舊密鑰 |
| LINE Token | 剛才複製的 Channel Access Token |
| LINE User ID | 剛才取得的 User ID |

4. 點擊 **「測試 LINE 通知」**
5. 如果 LINE 收到測試訊息，設定完成！

---

## 5️⃣ 驗證設定

### 測試通知
在 AI 拍立得中點擊「測試 LINE 通知」，應該會收到：

```
🧪 測試通知

📷 AI 拍立得 v3 已成功連接！

✅ LINE 通知功能正常運作
```

### 測試上傳通知
1. 先完成 Google 相簿授權
2. 拍攝一張照片
3. 點擊上傳
4. LINE 會收到上傳成功通知

---

## ❓ 常見問題

### Q: 測試通知失敗？
- 確認 GAS URL 正確（結尾是 `/exec`）
- 確認 GAS Secret 與腳本中的一致
- 確認 LINE Token 沒有多餘空格
- 確認已加 BOT 為好友

### Q: 收不到 User ID？
- 確認 Webhook URL 設定正確
- 確認 Use webhook 已開啟
- 嘗試重新加好友

### Q: 上傳成功但沒收到通知？
- 確認「上傳後 LINE 通知」已開啟
- 確認 LINE 設定都正確

---

## 📝 快速複製清單

部署完成後，你會有：

```
GAS URL: https://script.google.com/macros/s/xxxxxxx/exec
GAS Secret: [你的舊密鑰]
LINE Token: [約 170 字元的長字串]
LINE User ID: U + 32 個字元（如 Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx）
```

---

## 🎉 完成！

設定完成後，每次照片上傳到 Google 相簿，你的 LINE 都會收到通知！

**通知內容包含：**
- ✅ 上傳成功確認
- ⏰ 上傳時間
- 📊 照片數量
- ☁️ 儲存位置
