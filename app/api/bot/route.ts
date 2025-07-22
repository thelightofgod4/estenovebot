import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/bot` : '';

export async function POST(request: NextRequest) {
  try {
    console.log('Bot webhook received');
    
    // Check if BOT_TOKEN exists
    if (!BOT_TOKEN) {
      console.error('BOT_TOKEN is missing');
      return NextResponse.json({ error: 'Bot token missing' }, { status: 500 });
    }
    
    const update = await request.json();
    console.log('Update received:', update.message?.text);
    
    // Handle /start command
    if (update.message?.text === '/start') {
      const chatId = update.message.chat.id;
      console.log('Processing /start for chat:', chatId);
      
      const result = await sendTelegramMessage(chatId, "🏥 *Welcome to Estenove Hair Transplant Center!*\n\nClick the button below to start your consultation and get detailed information about hair transplant procedures.", {
        parse_mode: 'Markdown',
        inline_keyboard: [[
          { text: "🩺 Start Consultation", web_app: { url: "https://estenovebot.vercel.app/" } }
        ]]
      });
      
      console.log('Send message result:', result);
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Bot error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Set webhook when accessed
  if (BOT_TOKEN && WEBHOOK_URL) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}`);
      const result = await response.json();
      return NextResponse.json({ webhook_set: result.ok });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to set webhook' });
    }
  }
  
  return NextResponse.json({ message: 'Bot API endpoint' });
}

async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      reply_markup: replyMarkup
    }),
  });
  
  return response.json();
} 