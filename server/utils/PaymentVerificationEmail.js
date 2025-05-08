// const PaymentVerificationEmail = ({ studentName, parentName, txnId, amount, currentYear }) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8">
//       <title>Payment Verification Received</title>
//       <style>
//         body {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           line-height: 1.6;
//           color: #333;
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//         }
//         .header {
//           background-color: #065A79;
//           padding: 20px;
//           text-align: center;
//           border-radius: 8px 8px 0 0;
//         }
//         .logo {
//           color: white;
//           font-size: 24px;
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
//         .content {
//           padding: 20px;
//           border: 1px solid #e0e0e0;
//           border-top: none;
//           border-radius: 0 0 8px 8px;
//         }
//         .highlight {
//           color: #AD1C86;
//           font-weight: bold;
//         }
//         .footer {
//           margin-top: 30px;
//           font-size: 12px;
//           color: #777;
//           text-align: center;
//         }
//         .button {
//           display: inline-block;
//           padding: 10px 20px;
//           background-color: #AD1C86;
//           color: white;
//           text-decoration: none;
//           border-radius: 4px;
//           margin: 15px 0;
//         }
//         .details {
//           background-color: #f9f9f9;
//           padding: 15px;
//           border-radius: 4px;
//           margin: 20px 0;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="header">
//         <div class="logo">Shree Mangalam Academy Sanstha</div>
//       </div>

//       <div class="content">
//         <h2>Payment Verification Received</h2>

//         <p>Dear ${parentName},</p>

//         <p>We have received your payment verification for <span class="highlight">${studentName}</span>.</p>

//         <div class="details">
//           <p><strong>Transaction ID:</strong> ${txnId}</p>
//           <p><strong>Amount:</strong> ₹${amount}</p>
//           <p><strong>Status:</strong> Pending admin verification</p>
//         </div>

//         <p>Our team will verify your payment and update the status within 24-48 hours. You'll receive another email once your payment is confirmed.</p>

//         <p>If you have any questions, please contact our accounts department at:</p>
//         <p>Email: shreemangalamacademy11@gmail.com<br>
//         Phone: +9199.2826.3305, +9194.1364.5511 </p>

//         <p>Thank you for your patience and cooperation.</p>

//         <p>Best regards,<br>
//         <strong>Accounts Department</strong><br>
//         Shree Mangalam Academy Sanstha</p>
//       </div>

//       <div class="footer">
//         © ${currentYear} Shree Mangalam Academy Sanstha. All rights reserved.
//         <p>This is an automated message, please do not reply directly to this email.</p>
//       </div>
//     </body>
//     </html>
//   `;
// };

// export default PaymentVerificationEmail;

const PaymentVerificationEmail = ({
  studentName,
  parentName,
  txnId,
  feesAmount,
  hostelFees,
  amount,
  currentYear,
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Payment Verification Received</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #065A79;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
          color: white;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .content {
          padding: 25px;
          border: 1px solid #e0e0e0;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .highlight {
          color: #AD1C86;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        .details {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 25px 0;
        }
        .detail-row {
          display: table;
          width: 100%;
          margin-bottom: 10px;
        }
        .detail-label {
          display: table-cell;
          width: 150px;
          font-weight: bold;
          color: #065A79;
          vertical-align: top;
        }
        .detail-value {
          display: table-cell;
          padding-left: 10px;
        }
        .status-badge {
          display: inline-block;
          padding: 5px 10px;
          background-color: #ffc107;
          color: #000000;
          border-radius: 20px;
          font-weight: bold;
        }
        .contact-info {
          background-color: #f0f8ff;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Shree Mangalam Academy Sanstha</div>
        <div>Payment Verification</div>
      </div>
      
      <div class="content">
        <p>Dear ${parentName},</p>
        
        <p>We have received your payment verification for your ward <span class="highlight">${studentName}</span>.</p>
        
        <div class="details">
          <div class="detail-row">
            <div class="detail-label">Student Name:</div>
            <div class="detail-value">${studentName}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Transaction ID:</div>
            <div class="detail-value">${txnId || "N/A"}</div>
          </div>
           <div class="detail-row">
             <div class="detail-label">School Fees:</div>
              <div class="detail-value">₹${feesAmount}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Hostel Fees:</div>
              <div class="detail-value">₹${hostelFees}</div>
            </div>
          <div class="detail-row">
            <div class="detail-label">Amount Paid:</div>
            <div class="detail-value">₹${amount}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Status:</div>
            <div class="detail-value"><span class="status-badge">Pending Verification</span></div>
          </div>
        </div>
        
        <p>Our accounts team will verify your payment and update the status within 24-48 working hours.</p>
        
        <div class="contact-info">
          <h3 style="margin-top: 0; color: #065A79;">Contact Information</h3>
          <p><strong>Phone:</strong> +919928263305, +919413645511</p>
          <p><strong>Email:</strong> shreemangalamacademy11@gmail.com</p>
          <p><strong>Address:</strong> Udaipurwati road Gudha, District Jhunjhunu, Raj. pin 333022</p>
        </div>
        
        <p>Thank you for your cooperation.</p>
        
        <p>Best regards,<br>
        <strong>Accounts Department</strong><br>
        Shree Mangalam Academy Sanstha</p>
      </div>
      
      <div class="footer">
        © ${currentYear} Shree Mangalam Academy Sanstha. All rights reserved.
        <p>This is an auto-generated email. Please do not reply.</p>
      </div>
    </body>
    </html>
  `;
};

export default PaymentVerificationEmail;
