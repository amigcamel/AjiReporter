from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseForbidden
from sender import send_mail
import json


@csrf_exempt
def uploader(request):
    for filename, file in request.FILES.iteritems():
        name = request.FILES[filename].name
        with open(name, 'wb') as f:
            f.write(file.read())
    return HttpResponse('ok')


@csrf_exempt
def sendmail(request):
    if request.method == 'POST':
        dic = json.loads(request.body)
        send_mail('', '', '', dic['recipients'], dic['subject'], dic['content'])
        return HttpResponse('ok')
    return HttpResponseForbidden()
