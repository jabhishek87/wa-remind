# wa-remind

reminder whatsapp
A Node.js application that allows you to set reminders through a web interface and receive notifications via WhatsApp using Twilio.

## Features

- 📱 Web-based UI for adding reminders
- 🔔 WhatsApp notifications at scheduled times
- 📋 View active reminders
- ⏰ Real-time status updates

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Twilio WhatsApp Setup

1. **Create Twilio Account:**
   - Go to https://www.twilio.com/
   - Sign up for a free account
   - Get your Account SID and Auth Token from the dashboard

2. **Enable WhatsApp Sandbox:**
   - In Twilio Console, go to Messaging > Try it out > Send a WhatsApp message
   - Follow instructions to join the WhatsApp Sandbox
   - Send "join <sandbox-keyword>" to the Twilio WhatsApp number

3. **Set Environment Variables:**
   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

### 3. Start the Application

```bash
npm start
```

### 4. Using the Application

1. **Access the Web Interface:**
   - Open your browser and go to `http://localhost:3000`

2. **Add a Reminder:**
   - Enter your reminder message
   - Set the date and time
   - Enter the phone number (with country code, e.g., +1234567890)
   - Click "Add Reminder"

3. **Phone Number Format:**
   - Include country code: `+1234567890`
   - Must be a verified number in Twilio Sandbox

### 5. Important Notes

- **Keep the application running** for reminders to be sent
- **Phone numbers** must be verified in Twilio Sandbox for free accounts
- **Time zone** is based on your server's local time
- **Twilio Sandbox** has limitations - upgrade for production use

## API Endpoints

- `GET /` - Web interface
- `POST /add-reminder` - Add new reminder
- `GET /reminders` - List all reminders
- `GET /status` - Check service status

## Troubleshooting

### Reminders Not Sending
- Check Twilio credentials are set correctly
- Verify phone number is added to Twilio Sandbox
- Ensure the reminder time is in the future
- Check Twilio console for error logs

### Environment Variables
```bash
# Linux/Mac
export TWILIO_ACCOUNT_SID=your_sid
export TWILIO_AUTH_TOKEN=your_token

# Windows
set TWILIO_ACCOUNT_SID=your_sid
set TWILIO_AUTH_TOKEN=your_token
```

### Port Already in Use
```bash
# Kill process using port 3000
sudo lsof -t -i:3000 | xargs kill -9
```

## Production Setup

1. **Upgrade Twilio Account** for production WhatsApp messaging
2. **Use Environment Variables** for credentials
3. **Add Database** for persistent reminder storage
4. **Implement Authentication** for multi-user support

## Development

```bash
# Install nodemon for development
npm install -g nodemon

# Run in development mode
npm run dev
```

## Security Notes

- Never commit Twilio credentials to version control
- Use environment variables for sensitive configuration
- Implement rate limiting for production use