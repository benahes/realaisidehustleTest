import nodemailer from "nodemailer";

const smtpConfig = {
  host: process.env.SMTP_HOST || "",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

export async function sendPdfDeliveryEmail(
  to: string,
  courseTitle: string,
  pdfUrl: string,
) {
  if (!smtpConfig.host || !smtpConfig.auth.user) {
    console.error("[EMAIL] SMTP not configured");
    return { success: false, error: "SMTP not configured" };
  }

  const from = process.env.SMTP_FROM || smtpConfig.auth.user;

  try {
    await transporter.sendMail({
      from: `"Real AI Side Hustle" <${from}>`,
      to,
      subject: `Your course PDF: ${courseTitle}`,
      text: `Thanks for purchasing ${courseTitle}.\n\nDownload your PDF here:\n${pdfUrl}\n\nIf you have any issues, contact our support team.`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
          <h2 style="color: #7c3aed;">Thanks for your purchase!</h2>
          <p>Your PDF for <strong>${courseTitle}</strong> is ready for download.</p>
          <a href="${pdfUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 16px 0;">Download PDF</a>
          <p style="font-size: 12px; color: #6b7280;">If the button doesn't work, copy this link: ${pdfUrl}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="font-size: 12px; color: #6b7280;">Real AI Side Hustle</p>
        </div>
      `,
    });
    return { success: true };
  } catch (err: any) {
    console.error("[EMAIL] Failed to send PDF delivery email:", err);
    return { success: false, error: err?.message || "Failed to send email" };
  }
}
