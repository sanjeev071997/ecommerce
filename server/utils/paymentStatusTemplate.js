export const paymentStatusTemplate = (fee, status, contactInfo) => {
    const statusUpper = status.toUpperCase();
    const statusColor = {
      success: '#28a745',
      failed: '#dc3545',
      pending: '#ffc107'
    };
  
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt - Shree Mangalam Academy Sanstha</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
          }
          .header {
              background-color: #065A79;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .content {
              border: 1px solid #ddd;
              border-top: none;
              padding: 25px;
          }
          .receipt {
              background-color: #f9f9f9;
              border-radius: 5px;
              padding: 20px;
              margin: 20px 0;
          }
          .receipt-header {
              color: #065A79;
              border-bottom: 2px solid #AD1C86;
              padding-bottom: 10px;
              margin-bottom: 15px;
          }
          .receipt-details {
              display: table;
              width: 100%;
          }
          .detail-row {
              display: table-row;
          }
          .detail-label {
              display: table-cell;
              font-weight: bold;
              color: #065A79;
              padding: 8px 0;
              width: 150px;
              vertical-align: top;
          }
          .detail-value {
              display: table-cell;
              padding: 8px 0 8px 10px;
          }
          .status-badge {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 20px;
              font-weight: bold;
              background-color: ${statusColor[status] || '#6c757d'};
              color: white;
          }
          .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 14px;
              color: #6c757d;
              border-top: 1px solid #eee;
              padding-top: 20px;
          }
          .contact-info {
              background-color: #f0f8ff;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="header">
          <h1>Shree Mangalam Academy Sanstha</h1>
          <p>Payment Receipt</p>
      </div>
      
      <div class="content">
          <p>Dear ${fee.parentName},</p>
          <p>This is to inform you about the payment status for your ward <strong>${fee.studentName}</strong>.</p>
          
          <div class="receipt">
              <div class="receipt-header">
                  <h2>Payment Details</h2>
              </div>
              
              <div class="receipt-details">
                  <div class="detail-row">
                      <div class="detail-label">Student Name:</div>
                      <div class="detail-value">${fee.studentName}</div>
                  </div>
                  
                  <div class="detail-row">
                      <div class="detail-label">Class & Roll No:</div>
                      <div class="detail-value">${fee.studentClass} (Roll No: ${fee.rollNumber})</div>
                  </div>
                  
                  <div class="detail-row">
                      <div class="detail-label">Payment Date:</div>
                      <div class="detail-value">${new Date(fee.updatedAt).toLocaleDateString('en-IN')}</div>
                  </div>
                  
                  <div class="detail-row">
                      <div class="detail-label">Transaction ID:</div>
                      <div class="detail-value">${fee.transactionId || 'N/A'}</div>
                  </div>

                   <div class="detail-row">
                      <div class="detail-label">School Fees:</div>
                      <div class="detail-value">₹${fee.feesAmount}</div>
                  </div>

                   <div class="detail-row">
                      <div class="detail-label">Hostel Fees:</div>
                      <div class="detail-value">₹${fee.hostelFees}</div>
                  </div>
                  
                  <div class="detail-row">
                      <div class="detail-label">Total Amount Paid:</div>
                      <div class="detail-value">₹${fee.totalFees}</div>
                  </div>
                  
                  <div class="detail-row">
                      <div class="detail-label">Payment Status:</div>
                      <div class="detail-value"><span class="status-badge">${statusUpper}</span></div>
                  </div>
              </div>
          </div>
          
          ${status === 'failed' ? `
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #856404; margin-top: 0;">Payment Not Completed</h3>
              <p>Your payment was not successful. Please try again or contact our accounts department.</p>
          </div>
          ` : ''}
          
          <div class="contact-info">
              <h3 style="margin-top: 0; color: #065A79;">Contact Information</h3>
              <p><strong>Phone:</strong> ${contactInfo.contactNumbers.join(', ')}</p>
              <p><strong>Email:</strong> ${contactInfo.email}</p>
              <p><strong>Address:</strong> ${contactInfo.address}</p>
          </div>
          
          <p>Please keep this receipt for your records. For any discrepancies, contact us within 7 days.</p>
      </div>
      
      <div class="footer">
          <p>© ${new Date().getFullYear()} Shree Mangalam Academy Sanstha. All rights reserved.</p>
          <p>This is an auto-generated email. Please do not reply.</p>
      </div>
  </body>
  </html>
    `;
  };

  export default paymentStatusTemplate;