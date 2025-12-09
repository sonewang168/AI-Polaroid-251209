// ============================================
// 📷 AI 拍立得 v3 - LINE 通知 GAS 腳本
// ============================================
// 版本: 1.0.0
// 用途: 接收照片上傳通知並推播到 LINE
// ============================================

// 🔐 驗證密鑰（請自行修改）
const SECRET = 'YOUR_SECRET_HERE';  // 沿用你的舊密鑰

// ============================================
// 主要處理函數
// ============================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 驗證密鑰
    if (data.secret !== SECRET) {
      return jsonResponse({ success: false, error: '驗證失敗' });
    }
    
    // 根據 action 分流處理
    const action = data.action || 'sendMessage';
    
    switch (action) {
      case 'sendMessage':
        return handleSendMessage(data);
      case 'getProfile':
        return handleGetProfile(data);
      case 'webhook':
        return handleWebhook(data);
      default:
        return handleSendMessage(data);
    }
    
  } catch (err) {
    console.error('doPost 錯誤:', err);
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>📷 AI 拍立得 LINE 通知服務</title>
        <style>
          body { font-family: -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px 20px; text-align: center; }
          .container { max-width: 500px; margin: 0 auto; }
          h1 { font-size: 2em; margin-bottom: 20px; }
          .status { background: #1e293b; padding: 20px; border-radius: 16px; margin: 20px 0; }
          .online { color: #34C759; font-size: 1.2em; }
          .info { color: #94a3b8; font-size: 0.9em; margin-top: 20px; }
          .badge { display: inline-block; background: linear-gradient(135deg, #06b6d4, #a855f7); padding: 8px 16px; border-radius: 20px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📷 AI 拍立得</h1>
          <div class="badge">LINE 通知服務</div>
          <div class="status">
            <div class="online">✅ 服務運行中</div>
            <div class="info">版本 1.0.0</div>
          </div>
          <div class="info">
            此服務用於接收照片上傳通知<br>
            並推播到你的 LINE
          </div>
        </div>
      </body>
    </html>
  `);
}

// ============================================
// 發送 LINE 訊息
// ============================================

function handleSendMessage(data) {
  const { token, userId, message } = data;
  
  if (!token || !userId || !message) {
    return jsonResponse({ success: false, error: '缺少必要參數' });
  }
  
  const result = sendLinePush(token, userId, message);
  return jsonResponse(result);
}

function sendLinePush(token, userId, message) {
  const url = 'https://api.line.me/v2/bot/message/push';
  
  const payload = {
    to: userId,
    messages: [
      {
        type: 'text',
        text: message
      }
    ]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();
    
    if (code === 200) {
      console.log('LINE 推播成功');
      return { success: true };
    } else {
      const error = JSON.parse(response.getContentText());
      console.error('LINE 推播失敗:', error);
      return { success: false, error: error.message || '推播失敗' };
    }
  } catch (err) {
    console.error('LINE API 錯誤:', err);
    return { success: false, error: err.message };
  }
}

// ============================================
// 發送照片上傳通知（含圖片預覽）
// ============================================

function sendPhotoNotification(token, userId, photoInfo) {
  const url = 'https://api.line.me/v2/bot/message/push';
  
  const messages = [
    {
      type: 'flex',
      altText: '📷 照片已上傳到 Google 相簿',
      contents: {
        type: 'bubble',
        size: 'kilo',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '📷 AI 拍立得',
              weight: 'bold',
              size: 'lg',
              color: '#06b6d4'
            }
          ],
          backgroundColor: '#0f172a',
          paddingAll: '15px'
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '✅ 照片已上傳成功！',
              weight: 'bold',
              size: 'md',
              margin: 'none'
            },
            {
              type: 'separator',
              margin: 'lg'
            },
            {
              type: 'box',
              layout: 'vertical',
              margin: 'lg',
              contents: [
                {
                  type: 'box',
                  layout: 'baseline',
                  contents: [
                    { type: 'text', text: '⏰ 時間', size: 'sm', color: '#94a3b8', flex: 2 },
                    { type: 'text', text: photoInfo.time || new Date().toLocaleString('zh-TW'), size: 'sm', flex: 4 }
                  ]
                },
                {
                  type: 'box',
                  layout: 'baseline',
                  margin: 'md',
                  contents: [
                    { type: 'text', text: '📊 數量', size: 'sm', color: '#94a3b8', flex: 2 },
                    { type: 'text', text: (photoInfo.count || 1) + ' 張', size: 'sm', flex: 4 }
                  ]
                },
                {
                  type: 'box',
                  layout: 'baseline',
                  margin: 'md',
                  contents: [
                    { type: 'text', text: '☁️ 儲存', size: 'sm', color: '#94a3b8', flex: 2 },
                    { type: 'text', text: 'Google 相簿', size: 'sm', color: '#34C759', flex: 4 }
                  ]
                }
              ]
            }
          ],
          backgroundColor: '#1e293b',
          paddingAll: '15px'
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '✨ AI 拍立得 v3',
              size: 'xs',
              color: '#64748b',
              align: 'center'
            }
          ],
          backgroundColor: '#0f172a',
          paddingAll: '10px'
        }
      }
    }
  ];
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + token },
    payload: JSON.stringify({ to: userId, messages: messages }),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    return response.getResponseCode() === 200;
  } catch (err) {
    console.error('Flex 訊息發送失敗:', err);
    return false;
  }
}

// ============================================
// Webhook 處理（取得 User ID）
// ============================================

function handleWebhook(data) {
  // 處理 LINE Webhook 事件
  if (data.events && data.events.length > 0) {
    const event = data.events[0];
    
    if (event.type === 'message' && event.message.type === 'text') {
      const userId = event.source.userId;
      const text = event.message.text;
      const replyToken = event.replyToken;
      const token = data.token;
      
      // 如果用戶輸入 "我的ID" 或 "myid"
      if (text.toLowerCase().includes('myid') || text.includes('我的ID') || text.includes('我的id')) {
        replyMessage(token, replyToken, `🔑 你的 LINE User ID：\n\n${userId}\n\n📋 請複製此 ID 到 AI 拍立得設定中`);
        return jsonResponse({ success: true, userId: userId });
      }
      
      // 如果用戶輸入 "測試"
      if (text.includes('測試') || text.toLowerCase().includes('test')) {
        replyMessage(token, replyToken, '✅ AI 拍立得 LINE 通知服務運作正常！\n\n輸入「我的ID」可取得你的 User ID');
        return jsonResponse({ success: true });
      }
      
      // 預設回覆
      replyMessage(token, replyToken, `👋 你好！\n\n📷 這是 AI 拍立得的通知機器人\n\n可用指令：\n• 我的ID - 取得 User ID\n• 測試 - 測試連線`);
    }
    
    // 加入好友事件
    if (event.type === 'follow') {
      const userId = event.source.userId;
      const replyToken = event.replyToken;
      const token = data.token;
      
      replyMessage(token, replyToken, `🎉 歡迎使用 AI 拍立得！\n\n📷 我會在照片上傳成功時通知你\n\n🔑 你的 User ID：\n${userId}\n\n📋 請複製此 ID 到 APP 設定中`);
      return jsonResponse({ success: true, userId: userId });
    }
  }
  
  return jsonResponse({ success: true });
}

function replyMessage(token, replyToken, message) {
  const url = 'https://api.line.me/v2/bot/message/reply';
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + token },
    payload: JSON.stringify({
      replyToken: replyToken,
      messages: [{ type: 'text', text: message }]
    }),
    muteHttpExceptions: true
  };
  
  try {
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    console.error('回覆訊息失敗:', err);
  }
}

// ============================================
// 取得用戶資料
// ============================================

function handleGetProfile(data) {
  const { token, userId } = data;
  
  if (!token || !userId) {
    return jsonResponse({ success: false, error: '缺少必要參數' });
  }
  
  const url = 'https://api.line.me/v2/bot/profile/' + userId;
  
  const options = {
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + token },
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      const profile = JSON.parse(response.getContentText());
      return jsonResponse({ success: true, profile: profile });
    } else {
      return jsonResponse({ success: false, error: '無法取得用戶資料' });
    }
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ============================================
// 輔助函數
// ============================================

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// 測試函數（可在 GAS 編輯器中執行）
// ============================================

function testSendMessage() {
  const result = sendLinePush(
    'YOUR_LINE_TOKEN',  // 替換成你的 Token
    'YOUR_USER_ID',     // 替換成你的 User ID
    '🧪 測試訊息\n\n📷 AI 拍立得 LINE 通知測試成功！'
  );
  console.log(result);
}
