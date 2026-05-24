const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

function getWelcomeEmailHtml(name) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to PawAdopt</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding:30px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#16a34a,#15803d); border-radius:16px 16px 0 0; padding:30px 20px; text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center; padding-bottom:16px;">
                    <img src="https://img.icons8.com/color/96/pets.png" alt="PawAdopt" width="64" height="64" style="display:block; margin:0 auto;" />
                  </td>
                </tr>
                <tr>
                  <td style="font-size:28px; color:#ffffff; font-weight:800; letter-spacing:-0.5px;">PawAdopt</td>
                </tr>
                <tr>
                  <td style="font-size:14px; color:rgba(255,255,255,0.85); padding-top:6px;">Every adoption changes two lives.</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Banner -->
          <tr>
            <td style="background:#ffffff; padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="overflow:hidden;">
                    <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1120&h=360&fit=crop" alt="Adopt a pet" width="560" height="180" style="display:block; width:100%; height:180px; object-fit:cover;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Body -->
          <tr>
            <td style="background:#ffffff; padding:32px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#16a34a; padding-bottom:8px;">Welcome aboard!</td>
                </tr>
                <tr>
                  <td style="font-size:24px; font-weight:700; color:#171717; padding-bottom:14px;">Hi ${name}! 🐾</td>
                </tr>
                <tr>
                  <td style="font-size:15px; line-height:24px; color:#52525b; padding-bottom:20px;">
                    We're so excited to have you join the <strong style="color:#16a34a;">PawAdopt</strong> family! By signing up, you've taken the first step toward giving a loving home to a pet in need — and changing a life forever.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Start Cards -->
          <tr>
            <td style="background:#ffffff; padding:0 28px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4; border-radius:12px; border:1px solid #bbf7d0;">
                <tr>
                  <td style="padding:20px 18px; font-size:16px; font-weight:700; color:#166534; text-align:center;">How It Works</td>
                </tr>
                <tr>
                  <td style="padding:0 18px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${[
                        { step: "1", icon: "🔍", title: "Browse Pets", desc: "Explore dogs, cats, birds & more" },
                        { step: "2", icon: "📋", title: "Submit Request", desc: "Pick a pet and fill out the adoption form" },
                        { step: "3", icon: "🏠", title: "Meet Your Friend", desc: "Get approved and bring your pet home!" },
                      ].map(({ step, icon, title, desc }) => `
                        <tr>
                          <td style="padding:10px 0; border-top:1px solid #dcfce7;">
                            <table cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="width:38px; height:38px; background:#16a34a; border-radius:50%; text-align:center; font-size:16px; color:#fff; font-weight:700;">${icon}</td>
                                <td style="padding-left:12px;">
                                  <strong style="font-size:14px; color:#171717;">${title}</strong>
                                  <br/>
                                  <span style="font-size:12px; color:#71717a;">${desc}</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      `).join("")}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#ffffff; padding:0 28px 24px; text-align:center;">
              <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/pets" style="display:inline-block; background-color:#16a34a; color:#ffffff; text-decoration:none; padding:14px 36px; border-radius:12px; font-size:16px; font-weight:700; box-shadow:0 2px 8px rgba(22,163,74,0.3);">Start Browsing Pets</a>
            </td>
          </tr>

          <!-- Stats -->
          <tr>
            <td style="background:#ffffff; padding:0 28px 32px; text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${[
                    { num: "5,000+", label: "Pets Adopted" },
                    { num: "1,200+", label: "Happy Families" },
                    { num: "350+", label: "Shelter Partners" },
                  ].map(({ num, label }) => `
                    <td style="text-align:center; padding:0 8px;">
                      <div style="font-size:22px; font-weight:800; color:#16a34a;">${num}</div>
                      <div style="font-size:11px; color:#71717a; padding-top:2px;">${label}</div>
                    </td>
                  `).join("")}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pet Gallery -->
          <tr>
            <td style="background:#ffffff; padding:0 28px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center; padding-bottom:12px;">
                    <span style="font-size:13px; color:#71717a; font-weight:600;">Meet some friends waiting for you</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        ${[
                          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=300&fit=crop",
                          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop",
                          "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop",
                          "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=300&h=300&fit=crop",
                        ].map((url) => `
                          <td style="width:25%; padding:3px;">
                            <img src="${url}" width="122" height="122" style="display:block; width:100%; border-radius:10px; aspect-ratio:1; object-fit:cover;" />
                          </td>
                        `).join("")}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#09090b; border-radius:0 0 16px 16px; padding:28px 24px; text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:13px; color:#a1a1aa; padding-bottom:10px;">
                    &copy; ${new Date().getFullYear()} PawAdopt &bull; support@pawadopt.com
                  </td>
                </tr>
                <tr>
                  <td style="font-size:11px; color:#52525b;">
                    You received this email because you created an account on PawAdopt.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendWelcomeEmail(user) {
  try {
    const { error } = await resend.emails.send({
      from: `PawAdopt <${FROM_EMAIL}>`,
      to: [user.email],
      subject: `Welcome to PawAdopt, ${user.name}! \u{1F90D}\u{2764}\u{FE0F}`,
      html: getWelcomeEmailHtml(user.name),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    console.log(`Welcome email sent to ${user.email}`);
    return { success: true };
  } catch (err) {
    console.error("Email send failed:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { sendWelcomeEmail };
