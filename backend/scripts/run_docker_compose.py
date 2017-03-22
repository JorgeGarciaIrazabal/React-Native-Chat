import json
import os
import logging.config
import subprocess

CHAT_PATH = os.getenv('REACT_CHAT_PATH')
os.chdir(os.path.join(CHAT_PATH, 'backend'))

logging.config.dictConfig(json.load(open('logging.json')))
log = logging.getLogger(__name__)

if __name__ == '__main__':
    subprocess.run(['docker-compose', 'up', '-d'])
