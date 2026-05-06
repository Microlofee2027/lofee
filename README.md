# 🦙 LLaMA Chat App

واجهة دردشة بسيطة وسريعة مع موديل LLaMA المحسّن

## ✨ المميزات

- ✅ واجهة دردشة حديثة وسلسة
- ✅ دعم العربية كاملة
- ✅ تصميم Responsive
- ✅ سجل الدردشة محفوظ
- ✅ بسيطة وسهلة الاستخدام

## 🚀 البدء السريع

### المتطلبات
- Node.js v14 أو أحدث
- ملفات الموديل (flcc.model, flcc.bpe, flcc.json)

### التثبيت

```bash
# 1. استنساخ المستودع
git clone https://github.com/Microlofee2027/lofee.git
cd lofee

# 2. تثبيت المتطلبات
npm install

# 3. إنشاء ملف الإعدادات
cp .env.example .env

# 4. نسخ ملفات الموديل
mkdir models
# انسخ flcc.model و flcc.bpe و flcc.json إلى مجلد models/

# 5. تشغيل التطبيق
npm start
```

### الوصول

افتح المتصفح على: `http://localhost:3000`

## 📁 هيكل المشروع

```
lofee/
├── server.js           # Backend
├── package.json        # المتطلبات
├── .env.example        # إعدادات النموذج
├── public/
│   ├── index.html      # الواجهة الأمامية
│   ├── style.css       # التصميم
│   └── script.js       # الوظائف
└── models/             # مجلد الموديل (أنشئه يدويًا)
    ├── flcc.model
    ├── flcc.bpe
    └── flcc.json
```

## 🔧 التطوير

```bash
# تشغيل مع Hot Reload
npm run dev
```

## 📝 الترخيص

MIT

## 👤 المؤلف

Microlofee2027
