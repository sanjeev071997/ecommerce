const ContactEmail = (year, name, email, phone, message) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Admission Inquiry</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                margin: 0 auto;
            }
            .header {
                background: #007bff;
                color: white;
                text-align: center;
                padding: 10px;
                font-size: 20px;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                font-size: 16px;
                color: #333;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #666;
                margin-top: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background: #28a745;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 20px;
            }
            .info {
                background: #f8f9fa;
                padding: 10px;
                border-radius: 5px;
                margin-top: 15px;
            }
            .info p {
                margin: 5px 0;
            }
        </style>
    </head>
    <body>
  
    <div class="container">
        <div class="header">New Admission Inquiry</div>
        <div class="content">
            <p>Dear Admin,</p>
            <p>You have received a new admission inquiry. Here are the details:</p>
            
            <div class="info">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            </div>
  
            <p>Please follow up with the applicant as soon as possible.</p>
            <a href="mailto:${email}" class="button">Reply to Inquiry</a>
        </div>
  
        <div class="footer">
            &copy; ${year} Shree Manglam Shikshan Sansthan. All rights reserved.
        </div>
    </div>
  
    </body>
    </html>
    `;
};

export default ContactEmail;
  