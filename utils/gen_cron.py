from os.path import join, dirname, abspath
import getpass
import os

user = getpass.getuser()
pyenv_name = 'ajireporter'
bncrawler_cli_path = join(dirname(abspath(__file__)), 'bncrawler_cli.py')
r2m_path = join(dirname(abspath(__file__)), 'r2m.py')
crontab_dir = '/etc/cron.d'
crontab_name = 'ajireporter_cron'
crontab_path = join(crontab_dir, crontab_name)

curdir = join(os.path.dirname(os.path.abspath(__file__)))
tar_crontab_name = os.path.join(curdir, crontab_name)


job = '''{minute},{hour} * * * * {user} /home/{user}/.pyenv/versions/{pyenv_name}/bin/python {bncrawler_cli_path} -c {}'''.format(minute=minute, hour=hour, user=user, pyenv_name=pyenv_name, bncrawler_cli_path=bncrawler_cli_path)



r2m = '''*/20 * * * * {user} /home/{user}/.pyenv/versions/{pyenv_name}/bin/python {r2m_path}'''.format(user=user, r2m_path=r2m_path, pyenv_name=pyenv_name)
jobs.append(r2m)

print('generating cron jobs...')
output = '\n'.join(jobs)
with open(tar_crontab_name, 'w') as f:
    output += '\n'  # super important!
    f.write(output)

print('copying file to cron.d')
os.system('sudo cp -v {} {}'.format(tar_crontab_name, crontab_path))

print(output)
