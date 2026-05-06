const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// متغير لتخزين سجل الدردشة
let chatHistory = [];

// مسار الحصول على سجل الدردشة
app.get('/api/chat/history', (req, res) => {
  res.json(chatHistory);
});

// مسار إرسال رسالة وتلقي الرد
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'الرسالة فارغة' });
  }

  // إضافة الرسالة من المستخدم
  chatHistory.push({
    role: 'user',
    content: message,
    timestamp: new Date()
  });

  // محاكاة رد من الموديل (هنا ستضيف اتصال حقيقي بالموديل)
  const botResponse = generateResponse(message);

  chatHistory.push({
    role: 'assistant',
    content: botResponse,
    timestamp: new Date()
  });

  res.json({
    message: botResponse,
    history: chatHistory
  });
});

// مسار حذف السجل
app.post('/api/chat/clear', (req, res) => {
  chatHistory = [];
  res.json({ message: 'تم مسح السجل' });
});

// دالة توليد الرد (يمكنك استبدالها باتصال حقيقي بالموديل)
function generateResponse(userMessage) {
  const responses = [
    'شكراً على سؤالك، هذا موضوع مثير للاهتمام',
    'هذا سؤال جيد جداً',
    'يمكنني مساعدتك في هذا الموضوع',
    'أتفهم ما تقصده'
  ];
  
  // رد بسيط حالياً - استبدله باتصال الموديل الحقيقي
  return responses[Math.floor(Math.random() * responses.length)] + ': ' + userMessage;
}

app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
});
