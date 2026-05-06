const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const status = document.getElementById('status');

let isFirstMessage = true;

// تحميل السجل عند فتح الصفحة
async function loadHistory() {
    try {
        const response = await fetch('/api/chat/history');
        const history = await response.json();
        
        if (history.length > 0) {
            isFirstMessage = false;
            chatBox.innerHTML = '';
            history.forEach(msg => {
                displayMessage(msg.content, msg.role);
            });
            scrollToBottom();
        }
    } catch (error) {
        console.error('خطأ في تحميل السجل:', error);
    }
}

// إرسال الرسالة
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;

    // إزالة رسالة الترحيب
    if (isFirstMessage) {
        chatBox.innerHTML = '';
        isFirstMessage = false;
    }

    // عرض رسالة المستخدم
    displayMessage(message, 'user');
    messageInput.value = '';

    // تغيير الحالة
    updateStatus('جاري الكتابة...', 'loading');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) throw new Error('خطأ في الاتصال');

        const data = await response.json();
        displayMessage(data.message, 'assistant');
        updateStatus('جاهز', 'ready');
    } catch (error) {
        console.error('خطأ:', error);
        displayMessage('حدث خطأ. حاول لاحقاً', 'assistant');
        updateStatus('خطأ', 'error');
    }

    scrollToBottom();
}

// عرض الرسالة
function displayMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;

    messageDiv.appendChild(messageContent);
    chatBox.appendChild(messageDiv);
}

// تحديث الحالة
function updateStatus(text, type) {
    status.textContent = text;
    status.className = type === 'loading' ? 'loading' : type === 'error' ? 'error' : '';
}

// التمرير لأسفل
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// مسح السجل
async function clearChat() {
    if (confirm('هل أنت متأكد من رغبتك في مسح السجل؟')) {
        try {
            await fetch('/api/chat/clear', { method: 'POST' });
            chatBox.innerHTML = `
                <div class="welcome-message">
                    <h2>مرحباً! 👋</h2>
                    <p>ابدأ محادثتك مع موديل LLaMA</p>
                </div>
            `;
            isFirstMessage = true;
            updateStatus('تم المسح', 'ready');
        } catch (error) {
            console.error('خطأ:', error);
            updateStatus('خطأ في المسح', 'error');
        }
    }
}

// معالجات الأحداث
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
clearBtn.addEventListener('click', clearChat);

// تحميل السجل عند فتح الصفحة
loadHistory();
