export const emailTemplate = `
  <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); padding: 20px; font-family: Arial, sans-serif;">
    <div style="background-color: #ff6b6b; padding: 15px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">MindMap</h1>
    </div>
    <div style="padding: 20px; text-align: center;">
      <p style="font-size: 16px;">Hi there,</p>
      <p style="font-size: 16px;">It seems like you've requested to reset your password for your MindMap account. Click the button below to reset it.</p>
      <a href="{{resetLink}}" style="display: inline-block; padding: 12px 25px; font-size: 16px; color: #fff; background-color: #ff6b6b; border-radius: 5px; text-decoration: none; font-weight: bold;">Reset Password</a>
      <p style="font-size: 16px;">If you did not request this, please ignore this email.</p>
    </div>
    <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #999;">
      <p>Need help? <a href="mailto:support@mindmap.io" style="color: #ff6b6b; text-decoration: none;">Contact our support</a></p>
    </div>
  </div>
`;
