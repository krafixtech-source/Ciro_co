import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY || ''
  const toEmail = env.RESERVATION_NOTIFICATION_EMAIL || process.env.RESERVATION_NOTIFICATION_EMAIL || 'krafixtech@gmail.com'
  const fromEmail = env.RESERVATION_FROM_EMAIL || process.env.RESERVATION_FROM_EMAIL || 'onboarding@resend.dev'

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'resend-reservation-middleware',
        configureServer(server) {
          server.middlewares.use('/api/send-reservation', async (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

            if (req.method === 'OPTIONS') {
              res.statusCode = 200
              res.end()
              return
            }

            if (req.method === 'POST') {
              let bodyStr = ''
              req.on('data', chunk => {
                bodyStr += chunk
              })

              req.on('end', async () => {
                try {
                  const data = JSON.parse(bodyStr || '{}')
                  const { name, phone, email, guests, vibe, date, time } = data

                  if (!name || !phone || !date || !time) {
                    res.statusCode = 400
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ error: 'Missing required reservation fields' }))
                    return
                  }

                  if (!apiKey) {
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ error: 'Mail service is not configured (missing RESEND_API_KEY in .env)' }))
                    return
                  }

                  let formattedDate = date
                  try {
                    formattedDate = new Date(date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  } catch {
                    formattedDate = date
                  }

                  const emailSubject = `🛎️ New Table Reservation: ${name} (${guests} ${guests === '1' ? 'Guest' : 'Guests'}) - ${date} at ${time}`

                  const htmlContent = `
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <title>New Reservation - Ciro Co.</title>
                  </head>
                  <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FBF5EB; color: #1C1917;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FEF7EC; border: 3px solid #1C1917; border-radius: 18px; box-shadow: 8px 8px 0px #1C1917; overflow: hidden; margin: 0 auto;">
                      <tr>
                        <td style="background-color: #829375; padding: 32px 28px; text-align: center; border-bottom: 3px solid #1C1917;">
                          <div style="display: inline-block; background-color: #FEF7EC; color: #1C1917; font-size: 11px; font-weight: 900; letter-spacing: 0.2em; padding: 6px 14px; border-radius: 999px; text-transform: uppercase; border: 2px solid #1C1917; margin-bottom: 12px;">
                            CIRO CO. • TABLE RESERVATION
                          </div>
                          <h1 style="margin: 0; color: #FEF7EC; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase;">
                            NEW BOOKING CONFIRMED
                          </h1>
                          <p style="margin: 8px 0 0; color: #FEF7EC; opacity: 0.9; font-size: 14px; font-weight: 500;">
                            A customer has reserved a table online.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 24px 28px 12px;">
                          <table width="100%" style="background-color: #FFFFFF; border: 2px solid #829375; border-radius: 12px; padding: 18px; text-align: center;">
                            <tr>
                              <td>
                                <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #829375;">
                                  PARTY SIZE & SCHEDULE
                                </div>
                                <div style="font-size: 26px; font-weight: 900; color: #829375; margin: 6px 0;">
                                  ${guests} ${guests === '1' ? 'Guest' : 'Guests'}
                                </div>
                                <div style="font-size: 16px; font-weight: 700; color: #1C1917;">
                                  📅 ${formattedDate} &nbsp;|&nbsp; ⏰ ${time}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 28px 24px;">
                          <h3 style="margin: 0 0 12px; font-size: 12px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #829375; border-bottom: 2px solid rgba(28,25,23,0.1); padding-bottom: 8px;">
                            GUEST INFORMATION
                          </h3>
                          <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px;">
                            <tr style="border-bottom: 1px dashed rgba(28,25,23,0.15);">
                              <td style="color: #6B7280; font-weight: 700; text-transform: uppercase; font-size: 12px; width: 35%;">Name</td>
                              <td style="font-weight: 800; color: #1C1917; font-size: 15px;">${name}</td>
                            </tr>
                            <tr style="border-bottom: 1px dashed rgba(28,25,23,0.15);">
                              <td style="color: #6B7280; font-weight: 700; text-transform: uppercase; font-size: 12px;">Phone</td>
                              <td style="font-weight: 800; color: #1C1917;">
                                <a href="tel:+91${phone}" style="color: #829375; text-decoration: none; font-weight: 800;">+91 ${phone}</a>
                              </td>
                            </tr>
                            ${email ? `
                            <tr style="border-bottom: 1px dashed rgba(28,25,23,0.15);">
                              <td style="color: #6B7280; font-weight: 700; text-transform: uppercase; font-size: 12px;">Email</td>
                              <td style="font-weight: 700; color: #1C1917;">
                                <a href="mailto:${email}" style="color: #829375; text-decoration: none;">${email}</a>
                              </td>
                            </tr>
                            ` : ''}
                            <tr style="border-bottom: 1px dashed rgba(28,25,23,0.15);">
                              <td style="color: #6B7280; font-weight: 700; text-transform: uppercase; font-size: 12px;">Atmosphere / Vibe</td>
                              <td style="font-weight: 800; color: #1C1917; text-transform: uppercase;">
                                ${vibe === 'both' ? 'Both Worlds (Italian & Mexican)' : vibe ? vibe.toUpperCase() + ' FOCUS' : 'STANDARD'}
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-weight: 700; text-transform: uppercase; font-size: 12px;">Received At</td>
                              <td style="font-weight: 600; color: #6B7280; font-size: 12px;">
                                ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                              </td>
                            </tr>
                          </table>
                          <table width="100%" style="margin-top: 24px;">
                            <tr>
                              <td align="center">
                                <a href="tel:+91${phone}" style="display: block; background-color: #1C1917; color: #FEF7EC; text-align: center; padding: 14px 24px; font-weight: 900; text-decoration: none; border-radius: 8px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; box-shadow: 4px 4px 0px #829375;">
                                  📞 Call Guest (+91 ${phone})
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color: #FAF9F6; padding: 18px 28px; text-align: center; font-size: 11px; color: #9CA3AF; border-top: 2px solid rgba(28,25,23,0.1);">
                          <p style="margin: 0; font-weight: 700; color: #829375; text-transform: uppercase; letter-spacing: 0.1em;">
                            CIRO CO. CUCINA / CULTURE / COFFEE
                          </p>
                          <p style="margin: 4px 0 0;">
                            C11, JLN Marg, Lal Bahadur Nagar, Mata Colony, Jaipur, Rajasthan 302018
                          </p>
                        </td>
                      </tr>
                    </table>
                  </body>
                  </html>
                  `

                  const resendRes = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${apiKey}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      from: fromEmail,
                      to: toEmail,
                      subject: emailSubject,
                      html: htmlContent,
                    }),
                  })

                  const resendData = await resendRes.json()
                  res.statusCode = resendRes.status
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(resendData))
                } catch (err: any) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: err.message || 'Internal server error' }))
                }
              })
              return
            }

            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Method not allowed' }))
          })
        },
      },
    ],
  }
})
