const express = require('express');
const twilio = require('twilio');
const path = require('path');

const app = express();
const PORT = 3000;

// Twilio setup (add your credentials)
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'your_account_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const client = twilio(accountSid, authToken);

let reminders = [];

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/add-reminder', (req, res) => {
    const { message, datetime, phone } = req.body;
    
    if (!message || !datetime || !phone) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const reminder = {
        id: Date.now(),
        message: message,
        datetime: new Date(datetime),
        phone: phone,
        sent: false
    };

    reminders.push(reminder);
    scheduleReminder(reminder);
    
    res.json({ success: true, reminder: reminder });
});

app.get('/reminders', (req, res) => {
    res.json(reminders);
});

app.get('/status', (req, res) => {
    res.json({ ready: true });
});

function scheduleReminder(reminder) {
    const now = new Date();
    const reminderTime = new Date(reminder.datetime);
    
    if (reminderTime <= now) {
        return;
    }

    const delay = reminderTime.getTime() - now.getTime();
    
    setTimeout(function() {
        if (!reminder.sent) {
            sendWhatsAppMessage(reminder);
        }
    }, delay);
}

function sendWhatsAppMessage(reminder) {
    client.messages
        .create({
            body: 'Reminder: ' + reminder.message,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:' + reminder.phone
        })
        .then(function(message) {
            reminder.sent = true;
            console.log('Reminder sent to ' + reminder.phone + ': ' + reminder.message);
        })
        .catch(function(error) {
            console.error('Failed to send reminder:', error);
        });
}

function initializeReminders() {
    reminders.forEach(function(reminder) {
        if (!reminder.sent) {
            scheduleReminder(reminder);
        }
    });
}

app.listen(PORT, function() {
    console.log('Server running on http://localhost:' + PORT);
    initializeReminders();
});