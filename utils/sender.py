# -*- encoding: utf-8 -*-
"""Mail sender, ref: http://stackoverflow.com/a/25394911/1105489."""
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.header import Header
from email import encoders
from mimetypes import guess_type
from os.path import join


def send_mail(username, password, send_from, send_to, subject, html, file_dir='', attachment=None, plain=None):
    """Mail sender."""
    msg = MIMEMultipart('mixed')
    msg['From'] = send_from
    # msg['To'] = send_to
    msg['Subject'] = Header(subject, 'utf-8')

    # Record the MIME types of both parts - text/plain and text/html.
    if html:
        part1 = MIMEText(html, 'html', 'utf-8')
        msg.attach(part1)
    else:
        part2 = MIMEText(plain, 'plain', 'utf-8')
        msg.attach(part2)

    if attachment:
        for f in attachment:
            print(f)
            f = join(file_dir, f)
            content_type = guess_type(f)[0].split('/')[1]
            content_type = content_type if content_type else 'octet-stream'
            part = MIMEBase('application', content_type)
            fp = open(f, "rb")
            part.set_payload(fp.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', 'attachment; filename="%s"' % f)
            msg.attach(part)
            fp.close()
    smtp = smtplib.SMTP('smtp.mail.yahoo.com', 587)
    smtp.starttls()
    smtp.login(username, password)
    smtp.sendmail(send_from, send_to, msg.as_string())
    smtp.quit()

if __name__ == '__main__':
    import sys
    import json
    with open(sys.argv[1]) as jf:
        kw = json.load(jf)
    send_mail(**kw)
