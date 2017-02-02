from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def uploader(request):
    for filename, file in request.FILES.iteritems():
        name = request.FILES[filename].name
        with open(name, 'wb') as f:
            f.write(file.read())
    return HttpResponse('ok')
