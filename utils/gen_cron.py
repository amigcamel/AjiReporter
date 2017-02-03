"""Generating cron jobs."""
from django.conf import settings
from os.path import join
import os


def gen_cron(**kw):
    """Generate cronjobs."""
    job = '''{minute} {hour} * * * {user} /home/{user}/.pyenv/versions/{pyenv_name}/bin/python {sender_cli} {mail_kw}'''.format(**kw)

    print('generating cron jobs...')
    with open(join(settings.BASE_DIR, settings.CRONTAB_NAME), 'w') as f:
        job += '\n'  # super important!
        f.write(job)

    print('copying file to cron.d')
    os.system('sudo cp -v {} {}'.format(join(settings.BASE_DIR, settings.CRONTAB_NAME), settings.CRONTAB_PATH))
    print(job)
