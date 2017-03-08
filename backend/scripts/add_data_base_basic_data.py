import json
import logging
import os
import logging.config

from mongoengine import connect, NotUniqueError

from db_context.tables import User, DB_NAME

CHAT_PATH = os.getenv('REACT_CHAT_PATH')
os.chdir(os.path.join(CHAT_PATH, 'backend'))

logging.config.dictConfig(json.load(open('logging.json')))
log = logging.getLogger(__name__)


def add_develop_user():
    user = User()
    user.name = 'Develop'
    user.email = 'develop+develop@gmail.com'
    user.picture_url = 'http://pad1.whstatic.com/images/thumb/6/65/Look-Handsome-(Boys)-Step-1.jpg/aid566907-728px-Look-Handsome-(Boys)-Step-1.jpg'
    user.password = '__develop'
    try:
        user.save()
        log.debug('inserting user')
    except NotUniqueError:
        log.debug('develop user already in database')
        pass


if __name__ == '__main__':
    connect(DB_NAME)
    add_develop_user()
