import https from 'https';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const email = body?.email || body?.payload?.data?.email || body?.data?.email;
    const name = body?.name || body?.payload?.data?.name || body?.data?.name;
    const recipientName = name || 'there';

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing email address' }) };
    }

    console.log(`New signup: ${email}`);

    const emailHTML = `
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>You're in. but there's something you should know 🕊️</title>
    <style type="text/css">
        /* Reset styles */
        body, p, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; border-radius: 0 !important; }
            .content-padding { padding: 40px 25px !important; }
            .button-table { width: 100% !important; }
        }

        /* Template 1 Button Styles */
        .cta-button {
            display: block;
            padding: 12px 20px;
            background-color: #430A4E;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-family: sans-serif;
            font-size: 14px;
            text-align: center;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F7F5FA; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">

    <div style="display: none; font-size: 1px; color: #F7F5FA; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        You made it! Welcome to the Ziona waitlist. You're one of the first people to say yes...
    </div>

    <center style="width: 100%; background-color: #F7F5FA; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto;">
            
            <table class="email-container" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto; background-color: #ffffff; border-radius: 0 0 16px 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(94, 43, 151, 0.08);">
                
                <tbody><tr>
                    <td bgcolor="#742092" style="padding: 60px 30px; text-align: center; border-bottom: 4px solid #D4AF37;">
                        <img src="https://res.cloudinary.com/dz1wzvee5/image/upload/v1772476654/meta-image_hlc3uu.png" alt="Ziona Logo" style="width: 220px; max-width: 100%; height: auto; display: inline-block; filter: brightness(0) invert(1);">
                    </td>
                </tr>

                <tr>
                    <td class="content-padding" style="padding: 50px 60px 40px 60px; background-color: #ffffff;">
                        
                        <p style="margin: 0 0 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 22px; color: #742092; font-weight: bold;">
                            Hi ${recipientName}, you made it! 👋
                        </p>
                        
                        <p style="margin: 0 0 28px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A;">
                            Welcome to the Ziona waitlist! You're one of the first people to say yes to something we've been building with a lot of care and a lot of prayer.
                        </p>

                        <div style="background-color: #FDFBF4; border-left: 4px solid #D4AF37; padding: 24px; margin-bottom: 30px; border-radius: 0 8px 8px 0; text-align: left;">
                            <p style="margin: 0 0 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; font-weight: bold; color: #742092; text-transform: uppercase; letter-spacing: 1px;">
                                Here's what Ziona is:
                            </p>
                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A;">
                                A faith community app. Built for people who want more than a highlight reel of someone else's belief. A space where the conversations go deeper, the community is real, and your faith doesn't have to compete with the algorithm.
                            </p>
                        </div>

                        <p style="margin: 0 0 24px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #742092; font-weight: bold; text-align: center; background-color: #F7F5FA; padding: 15px; border-radius: 8px;">
                            We're not open yet. But we're getting close.
                        </p>

                        <p style="margin: 0 0 16px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A;">
                            And being on this list means you get:
                        </p>

                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
                            <tbody><tr>
                                <td width="35" valign="top" style="padding-bottom: 12px; font-size: 18px; line-height: 1.6;">✨</td>
                                <td style="padding-bottom: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A;"><strong>First access</strong> when we launch</td>
                            </tr>
                            <tr>
                                <td width="35" valign="top" style="padding-bottom: 12px; font-size: 18px; line-height: 1.6;">🛠️</td>
                                <td style="padding-bottom: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A;"><strong>Behind-the-scenes updates</strong> as we build</td>
                            </tr>
                            <tr>
                                <td width="35" valign="top" style="padding-bottom: 12px; font-size: 18px; line-height: 1.6;">🗣️</td>
                                <td style="padding-bottom: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A;"><strong>A say</strong> in what Ziona becomes</td>
                            </tr>
                        </tbody></table>

                        <p style="margin: 0 0 30px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A;">
                            While you wait, come find us. We post every week: memes, quotes, reels, and real talk about faith and life.
                        </p>

                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 40px;">
                            <tbody><tr>
                                <td align="center">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="280" style="margin-bottom: 15px;">
                                        <tbody><tr>
                                            <td>
                                                <a href="https://www.instagram.com/ziona.app" class="cta-button">
                                                    <table role="presentation" align="center" style="width: auto;">
                                                        <tbody><tr>
                                                            <td style="padding-right: 10px;">
                                                                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="18" height="18" style="display: block; filter: brightness(0) invert(1);">
                                                            </td>
                                                            <td style="color: #ffffff; font-family: sans-serif; font-weight: bold;">Follow on Instagram</td>
                                                        </tr>
                                                    </tbody></table>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                    
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="280">
                                        <tbody><tr>
                                            <td>
                                                <a href="https://www.tiktok.com/@ziona.socials" class="cta-button">
                                                    <table role="presentation" align="center" style="width: auto;">
                                                        <tbody><tr>
                                                            <td style="padding-right: 10px;">
                                                                <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" width="18" height="18" style="display: block; filter: brightness(0) invert(1);">
                                                            </td>
                                                            <td style="color: #ffffff; font-family: sans-serif; font-weight: bold;">Follow on TikTok</td>
                                                        </tr>
                                                    </tbody></table>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                        </tbody></table>

                        <p style="margin: 0 0 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; color: #D4AF37; font-weight: bold; font-style: italic;">
                            See you on the inside. 🕊️
                        </p>

                        <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A;">
                            With love,<br>
                            <strong style="color: #430A4E;">The Ziona Team</strong>
                        </p>

                    </td>
                </tr>

                <tr>
                    <td bgcolor="#F5EEF8" style="padding: 60px 20px; text-align: center; color: #430A4E;">
                        <table role="presentation" align="center" style="margin: 0 auto; width: auto;">
                            <tbody><tr>
                                <td align="center">
                                    <img src="https://res.cloudinary.com/dz1wzvee5/image/upload/v1772476654/meta-image_hlc3uu.png" alt="Ziona" style="width: 150px; height: auto; display: inline-block; margin-bottom: 10px;">
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <div style="font-style: italic; font-size: 14px; font-weight: bold; margin-bottom: 25px;">Community over Clout.</div>
                                </td>
                            </tr>
                        </tbody></table>
                        
                        <table role="presentation" align="center" style="margin: 0 auto; width: auto;">
                            <tbody><tr>
                                <td style="padding: 0 10px;" align="center">
                                    <a href="https://www.instagram.com/ziona.app"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="32" height="32" style="display: block;"></a>
                                </td>
                                <td style="padding: 0 10px;" align="center">
                                    <a href="https://www.tiktok.com/@ziona.socials"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" width="32" height="32" style="display: block;"></a>
                                </td>
                                <td style="padding: 0 10px;" align="center">
                                    <a href="https://www.facebook.com/share/1EMJ8aU7nU/"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="32" height="32" style="display: block;"></a>
                                </td>
                            </tr>
                        </tbody></table>

                        <div style="font-size: 11px; line-height: 1.6; color: #6a5a6e; margin-top: 30px; font-family: sans-serif;">
                            <p>You are receiving this because you signed up for the Ziona waitlist.</p>
                            <p>Ziona is a product of <strong>Zion King LLC</strong>.</p>
                            <p>© 2026 Zion King. All rights reserved.</p>
                            <p><a href="#" style="color: #430A4E; text-decoration: underline;">Unsubscribe</a></p>
                        </div>
                    </td>
                </tr>

            </tbody></table>
            
        </div>
    </center>

</body></html>
    `;

    const emailPayload = JSON.stringify({
      subject: "You're in. but there's something you should know 🕊️",
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

    console.log('Ensend response status:', response.statusCode);
    console.log('Ensend response body:', response.data);

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