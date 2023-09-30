import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

def send_email(from_email, to_emails, subject, body, smtp_password, html_content=None, attachments=None):
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = ', '.join(to_emails)  # for multiple recipients

    # Attach body
    msg.attach(MIMEText(body, 'plain'))

    # Attach HTML content if provided
    if html_content:
        msg.attach(MIMEText(html_content, 'html'))

    # Attach files if provided
    if attachments:
        for file in attachments:
            with open(file, 'rb') as f:
                file_data = f.read()
                file_name = f.name
                attachment = MIMEBase('application', 'octet-stream')
                attachment.set_payload(file_data)
                encoders.encode_base64(attachment)
                attachment.add_header('Content-Disposition', f'attachment; filename={file_name}')
                msg.attach(attachment)

    # Connect to Gmail's SMTP server
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(from_email, smtp_password)
        server.send_message(msg)

# Example usage
#send_email(
#    from_email="your_email@gmail.com",
#   to_emails=["recipient1@example.com", "recipient2@example.com"],
#   subject="Hello!",
#    body="This is the plain text content of the email.",
#   html_content="<h1>This is an HTML Email</h1><p>With some <strong>bold text</strong>.</p>",
#    smtp_password="your_app_password_or_regular_password",  # Use the App Password here
#    attachments=["path_to_file1.txt", "path_to_file2.jpg"]
#)
