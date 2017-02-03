"""URL routing."""
# from django.contrib import admin
from django.conf.urls import url
from django.views.generic.base import TemplateView
from api import views as api_views

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name='base.html'), name='base'),
    url(r'^uploader/', api_views.uploader),
    url(r'^send_test/', api_views.send_test),
    url(r'^view_gen_cron/', api_views.view_gen_cron),
    url(r'^crud_settings/', api_views.crud_settings),
]
