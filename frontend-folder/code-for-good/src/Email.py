import smtplib
from email.message import EmailMessage

def send_email(from_email, to_email, subject, body, smtp_password):
    msg = EmailMessage()
    msg.set_content(body)
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = to_email

    # Connect to Gmail's SMTP server
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(from_email, smtp_password)
        server.send_message(msg)

# Example usage
send_email(
    from_email="your_email@gmail.com",
    to_email="recipient@example.com",
    subject="Hello!",
    body="This is the email content.",
    smtp_password="your_app_password_or_regular_password"  # Use the App Password here, not your regular password
)

