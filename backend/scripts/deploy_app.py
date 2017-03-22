import sys
import os
from subprocess import call
from shutil import copyfile

os.chdir(os.getenv('REACT_CHAT_PATH'))


def get_environment():
    if len(sys.argv) < 2:
        environment = input('Select an environment (local, dev) ').strip()
    else:
        environment = sys.argv[1]
    if environment not in ('local', 'dev'):
        print('Unknown environment')
        return get_environment()
    return environment


if __name__ == '__main__':
    environment = get_environment()

    constants_path = 'src/services/constants.js'
    deploy_path = '__deployFiles/{}_constants.js'.format(environment)
    if os.path.exists(constants_path):
        os.remove(constants_path)
    copyfile(deploy_path, constants_path)

    call('react-native run-android', shell=True)
