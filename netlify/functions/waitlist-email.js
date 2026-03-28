import https from 'https';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const email = body?.email || body?.payload?.data?.email || body?.data?.email;
    const name = body?.name || body?.payload?.data?.name || body?.data?.name;

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing email address' }) };
    }

    console.log(`New signup: ${email}`);

    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 40px 30px; background: #f9fafb; }
    .content h2 { color: #1f2937; margin-top: 0; }
    .content p { margin: 16px 0; color: #4b5563; }
    .button { background: #667eea; color: white !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; font-weight: 600; }
    .footer { padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Ziona! 🙏</h1>
    </div>
    <div class="content">
      <h2>Hi ${name || 'there'}!</h2>
      <p>Thank you for joining the Ziona waitlist. We're excited to have you as part of our faith-based community.</p>
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>You'll be among the first to know when we launch</li>
        <li>Get exclusive updates on our progress</li>
        <li>Early access to new features</li>
      </ul>
      <div style="text-align: center;">
        <a href="https://ziona.app" class="button">Visit Our Website</a>
      </div>
    </div>
    <div class="footer">
      <p>Blessings,<br/><strong>The Ziona Team</strong></p>
      <p>© ${new Date().getFullYear()} Ziona. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    const emailPayload = JSON.stringify({
      subject: 'Welcome to the Ziona Waitlist! 🙏',
      message: emailHTML,
      sender: { name: 'Ziona Team', email: 'noreply@ziona.app' },
      recipients: { email: email, name: name || '' }
    });

    const options = {
      hostname: 'api.smtpexpress.com',
      path: '/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ENSEND_API_KEY}`,
        'Content-Length': Buffer.byteLength(emailPayload)
      }
    };

    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => resolve({ statusCode: res.statusCode, data }));
      });
      req.on('error', reject);
      req.write(emailPayload);
      req.end();
    });

    if (response.statusCode === 200) {
      console.log('Email sent successfully');
      return { statusCode: 200, body: JSON.stringify({ message: 'Email sent' }) };
    } else {
      throw new Error(`Ensend API error: ${response.data}`);
    }
  } catch (error) {
    console.error('Function error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};