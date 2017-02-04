"""View for 'api'."""
import json
import os

from django.conf import settings
from django.contrib import auth
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseForbidden
from django.shortcuts import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from ajireporter.credentials import EMAIL_ACCOUNT, EMAIL_PASSWORD

from utils.gen_cron import gen_cron
from utils.sender import send_mail


@csrf_exempt
def login(request):
    """User login."""
    if request.method == 'POST':
        data = json.loads(request.body)
        username, password = data.get('username'), data.get('password')
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            return HttpResponse('ok')
    else:
        raise PermissionDenied
    return HttpResponse('')


def logout(request):
    """User logout."""
    auth.logout(request)
    return HttpResponseRedirect('/')


@csrf_exempt
def uploader(request):
    """Attachment uploadder."""
    for filename, file in request.FILES.iteritems():
        name = request.FILES[filename].name
        path = os.path.join(settings.UPLOAD_FILE_DIR, name)
        with open(path, 'wb') as f:
            f.write(file.read())
    return HttpResponse('ok')


@csrf_exempt
def send_test(request):
    """Email sender."""
    if request.method == 'POST':
        dic = json.loads(request.body)
        kw = {
            'username': EMAIL_ACCOUNT,
            'password': EMAIL_PASSWORD,
            'send_from': EMAIL_ACCOUNT,
            'send_to': dic['recipients'],
            'subject': dic['subject'],
            'html': dic['content'],
            'file_dir': settings.UPLOAD_FILE_DIR,
            'attachment': dic['attachment']
        }
        send_mail(**kw)
        return HttpResponse('ok')
    return HttpResponseForbidden()


@csrf_exempt
def view_gen_cron(request):
    """View for generating cronjob."""
    if request.method == 'POST':
        dic = json.loads(request.body)
        mail_kw = {
            'username': EMAIL_ACCOUNT,
            'password': EMAIL_PASSWORD,
            'send_from': EMAIL_ACCOUNT,
            'send_to': dic['recipients'],
            'subject': dic['subject'],
            'html': dic['content'],
            'file_dir': settings.UPLOAD_FILE_DIR,
            'attachment': dic['attachment']
        }
        with open(settings.MAIL_KW, 'w') as jf:
            json.dump(mail_kw, jf)

        kw_gen_cron = {
            'minute': dic['minute'],
            'hour': dic['hour'],
            'user': settings.USER,
            'pyenv_name': settings.PYENV_NAME,
            'sender_cli': settings.SENDER_CLI,
            'mail_kw': settings.MAIL_KW
        }
        gen_cron(**kw_gen_cron)
        return HttpResponse('ok')
    return HttpResponseForbidden()


@csrf_exempt
def crud_settings(request):
    """Save settings."""
    if request.method == 'GET':
        if os.path.isfile('settings.json'):
            with open('settings.json') as jf:
                settings = json.load(jf)
            return HttpResponse(settings)
        else:
            return HttpResponse('nodata')
    elif request.method == 'POST':
        settings = request.body
        with open('settings.json', 'w') as jf:
            json.dump(settings, jf)
        return HttpResponse('ok')
    elif request.method == 'DELETE':
        os.remove('settings.json')
        return HttpResponse('ok')
    return HttpResponseForbidden()
