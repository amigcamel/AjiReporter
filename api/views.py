from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseForbidden
from django.conf import settings
from sender import send_mail
import json
import os


@csrf_exempt
def uploader(request):
    for filename, file in request.FILES.iteritems():
        name = request.FILES[filename].name
        path = os.path.join(settings.UPLOAD_FILE_DIR, name)
        with open(path, 'wb') as f:
            f.write(file.read())
    return HttpResponse('ok')


@csrf_exempt
def sendmail(request):
    if request.method == 'POST':
        dic = json.loads(request.body)
        print(dic)
        send_mail(
            username='',
            password='',
            send_from='',
            send_to=dic['recipients'],
            subject=dic['subject'],
            html=dic['content'],
            file_dir=settings.UPLOAD_FILE_DIR,
            attachment=dic['attachment'],
            plain=None
        )
        return HttpResponse('ok')
    return HttpResponseForbidden()
