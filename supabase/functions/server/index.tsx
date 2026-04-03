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
    const requiredFields = ['name', 'email', 'phone', 'guests', 'occasion', 'delivery', 'note'];
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
            from: 'MyungGa Catering <onboarding@resend.dev>',
            to: 'buza0605@gmail.com',
            subject: 'New Catering Inquiry - MyungGA',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td align="center" style="padding: 40px 0;">
                      <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                          <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #FFCB2F 0%, #FFB800 100%);">
                            <h1 style="margin: 0; color: #1A1A1A; font-size: 28px; font-weight: 700;">New Catering Inquiry</h1>
                            <p style="margin: 8px 0 0; color: #1A1A1A; opacity: 0.9; font-size: 14px;">Received ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                          </td>
                        </tr>
                        
                        <!-- Customer Information -->
                        <tr>
                          <td style="padding: 30px 40px;">
                            <h2 style="margin: 0 0 20px; color: #1A1A1A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFCB2F; padding-bottom: 10px;">Customer Information</h2>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                                  <span style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                                  <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 16px; font-weight: 500;">${body.name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                                  <span style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                  <p style="margin: 4px 0 0;"><a href="mailto:${body.email}" style="color: #FFCB2F; font-size: 16px; font-weight: 500; text-decoration: none;">${body.email}</a></p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                                  <span style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</span>
                                  <p style="margin: 4px 0 0;"><a href="tel:${body.phone}" style="color: #FFCB2F; font-size: 16px; font-weight: 500; text-decoration: none;">${body.phone}</a></p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Event Details -->
                        <tr>
                          <td style="padding: 30px 40px; background-color: #FAFAF5;">
                            <h2 style="margin: 0 0 20px; color: #1A1A1A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFCB2F; padding-bottom: 10px;">Event Details</h2>
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                              <tr>
                                <td style="width: 50%; padding: 12px 12px 12px 0;">
                                  <div style="background: #ffffff; padding: 16px; border-radius: 8px; border-left: 4px solid #FFCB2F;">
                                    <span style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Occasion</span>
                                    <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 16px; font-weight: 600;">${body.occasion}</p>
                                  </div>
                                </td>
                                <td style="width: 50%; padding: 12px 0 12px 12px;">
                                  <div style="background: #ffffff; padding: 16px; border-radius: 8px; border-left: 4px solid #FFCB2F;">
                                    <span style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Number of Guests</span>
                                    <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 16px; font-weight: 600;">${body.guests}</p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2" style="padding: 12px 0 0;">
                                  <div style="background: #ffffff; padding: 16px; border-radius: 8px; border-left: 4px solid #FFCB2F;">
                                    <span style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Delivery Option</span>
                                    <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 16px; font-weight: 600;">${body.delivery}</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Additional Information -->
                        <tr>
                          <td style="padding: 30px 40px;">
                            <h2 style="margin: 0 0 20px; color: #1A1A1A; font-size: 20px; font-weight: 600; border-bottom: 2px solid #FFCB2F; padding-bottom: 10px;">Additional Information</h2>
                            ${body.dietary ? `
                              <div style="margin-bottom: 20px;">
                                <span style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Dietary Restrictions</span>
                                <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 15px; line-height: 1.6;">${body.dietary}</p>
                              </div>
                            ` : ''}
                            <div>
                              <span style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Additional Notes</span>
                              <p style="margin: 4px 0 0; color: #1A1A1A; font-size: 15px; line-height: 1.6;">${body.note || 'None provided'}</p>
                            </div>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="padding: 30px 40px; background-color: #f9f9f9; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #999; font-size: 12px;">Inquiry ID: <span style="font-family: monospace; color: #666;">${inquiryId}</span></p>
                            <p style="margin: 8px 0 0; color: #999; font-size: 12px;">This inquiry was submitted through MyungGA Catering website</p>
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