import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-bcb00524/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-bcb00524/submit-inquiry", async (c) => {
  try {
    const body = await c.req.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'guests', 'delivery'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      console.log(`Validation error: Missing required fields: ${missingFields.join(', ')}`);
      return c.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, 400);
    }

    // Store inquiry in KV store
    const inquiryId = `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await kv.set(inquiryId, {
      ...body,
      submittedAt: new Date().toISOString(),
    });

    console.log(`Inquiry stored successfully: ${inquiryId}`);

    // Send emails using Resend API
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      console.log('Warning: RESEND_API_KEY not set, skipping email sending');
    } else {
      try {
        // Send email to business owner
        const ownerEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'MyungGA Catering <onboarding@resend.dev>',
            to: 'sunmee0813@gmail.com',
            subject: '🔴🔴🔴 New Catering Inquiry - MyungGA 🔴🔴🔴',
            html: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Catering Inquiry</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #f0ede6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0ede6;">
                  <tr>
                    <td align="center" style="padding: 40px 20px;">
                      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.10);">

                        <!-- Header -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #FFCB2F 0%, #FFB800 100%); padding: 36px 40px 28px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td>
                                  <p style="margin: 0 0 6px; color: #1A1A1A; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">MyungGA Catering</p>
                                  <p style="margin: 10px 0 0; color: #1A1A1A; opacity: 0.75; font-size: 13px;">Received ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Customer Information -->
                        <tr>
                          <td style="padding: 32px 40px 0;">
                            <h2 style="margin: 0 0 16px; color: #1A1A1A; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 2px solid #FFCB2F; padding-bottom: 8px;">👤 Customer Information</h2>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                                  <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Name</span>
                                  <p style="margin: 3px 0 0; color: #1A1A1A; font-size: 16px; font-weight: 600;">${body.name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                                  <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Email</span>
                                  <p style="margin: 3px 0 0;"><a href="mailto:${body.email}" style="color: #d97b00; font-size: 16px; font-weight: 600; text-decoration: none;">${body.email}</a></p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0;">
                                  <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Phone</span>
                                  <p style="margin: 3px 0 0;"><a href="tel:${body.phone}" style="color: #d97b00; font-size: 16px; font-weight: 600; text-decoration: none;">${body.phone}</a></p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Event Details -->
                        <tr>
                          <td style="padding: 28px 40px 0;">
                            <h2 style="margin: 0 0 16px; color: #1A1A1A; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 2px solid #FFCB2F; padding-bottom: 8px;">📅 Event Details</h2>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td width="50%" style="padding: 0 8px 12px 0;">
                                  <div style="background: #FAFAF5; padding: 14px 16px; border-left: 3px solid #FFCB2F;">
                                    <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Guests</span>
                                    <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 18px; font-weight: 700;">${body.guests}</p>
                                  </div>
                                </td>
                                <td width="50%" style="padding: 0 0 12px 8px;">
                                  <div style="background: #FAFAF5; padding: 14px 16px; border-left: 3px solid #FFCB2F;">
                                    <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Delivery</span>
                                    <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 18px; font-weight: 700; text-transform: capitalize;">${body.delivery}</p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  <div style="background: #FAFAF5; padding: 14px 16px; border-left: 3px solid #FFCB2F;">
                                    <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Event / Pickup Date</span>
                                    <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 18px; font-weight: 700;">${body.eventDate || 'Not specified'}</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Additional Information -->
                        <tr>
                          <td style="padding: 28px 40px 0;">
                            <h2 style="margin: 0 0 16px; color: #1A1A1A; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 2px solid #FFCB2F; padding-bottom: 8px;">📝 Additional Information</h2>
                            ${body.occasion ? `
                            <div style="margin-bottom: 16px;">
                              <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Occasion</span>
                              <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${body.occasion}</p>
                            </div>` : ''}
                            ${body.generalnote ? `
                            <div style="margin-bottom: 16px;">
                              <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">General Note</span>
                              <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${body.generalnote}</p>
                            </div>` : ''}
                            ${body.menuPreferencesSpecialRequests ? `
                            <div>
                              <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Menu Preferences & Special Requests</span>
                              <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${body.menuPreferencesSpecialRequests}</p>
                            </div>` : ''}
                            ${body.dietary ? `
                            <div style="margin-bottom: 16px;">
                              <span style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px;">Dietary Restrictions</span>
                              <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${body.dietary}</p>
                            </div>` : ''}
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="padding: 28px 40px 32px; background-color: #FAFAF5; border-top: 1px solid #e8e8e0; margin-top: 28px;">
                            <p style="margin: 0; color: #aaa; font-size: 11px;">Inquiry ID: <span style="font-family: monospace; color: #888;">${inquiryId}</span></p>
                            <p style="margin: 6px 0 0; color: #aaa; font-size: 11px;">Submitted via MyungGA Catering website</p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>
            `,
          }),
        });

        const ownerEmailResult = await ownerEmailResponse.json();

        if (!ownerEmailResponse.ok) {
          console.log(`Error sending email to business owner: ${JSON.stringify(ownerEmailResult)}`);
        } else {
          console.log(`Email sent to business owner successfully`);
        }

        // Note: Customer confirmation email has been removed as requested
      } catch (emailError) {
        console.log(`Error sending emails: ${emailError}`);
        // Don't fail the whole request if emails fail
      }
    }

    return c.json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId
    });

  } catch (error) {
    console.log(`Error processing inquiry: ${error}`);
    return c.json({
      success: false,
      error: 'Failed to process inquiry'
    }, 500);
  }
});

Deno.serve(app.fetch);