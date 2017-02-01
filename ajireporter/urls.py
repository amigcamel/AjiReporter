# from django.contrib import admin
from django.conf.urls import url
from django.views.generic.base import TemplateView

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name='base.html'), name='base'),
]
