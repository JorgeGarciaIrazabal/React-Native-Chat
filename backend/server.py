import json
import logging.config
import os
import socket

import tornado
from bson import ObjectId
from mongoengine import connect
from tornado import web, ioloop
from wshubsapi.connection_handlers.tornado_handler import ConnectionHandler
from wshubsapi.hubs_inspector import HubsInspector

from db_context.tables import ReactChatDocument, DB_NAME, User
from services.Env import Env
from services.constants import Constants

from hubs.MessageHug import MessagesHub
from hubs.UserHub import UserHub


def get_ip():
    return [l for l in (
        [ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")][:1], [
            [(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s in
             [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][0][0]


abspath = os.path.abspath(__file__)
dirName = os.path.dirname(abspath)
os.chdir(dirName)

logging.config.dictConfig(json.load(open('logging.json')))
log = logging.getLogger(__name__)

log.debug('Environment variables: \n{}'.format(json.dumps(dict(os.environ), indent=2)))

DEBUG = True
CHAT_PATH = os.getenv('REACT_CHAT_PATH')


def object_id_handler(obj, depth):
    return str(obj)


def document_handler(obj, depth):
    return {key: obj.__getattribute__(key) for key in obj._data.keys()}


class MainHandler(tornado.web.RequestHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)

    def data_received(self, chunk):
        pass

    def get(self):
        user_count = User.objects.count()
        user = User(name='test', email='test{}@test.com'.format(user_count), password='password')
        user.save()

        self.write("Users {}".format(user_count))


class HiNowClientHandler(ConnectionHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)

    def open(self, *args):
        super(HiNowClientHandler, self).open(*args)
        self.comm_environment.serializer.handlers[ObjectId] = object_id_handler
        self.comm_environment.serializer.handlers[ReactChatDocument] = document_handler

    def on_close(self):
        # self.subscriptionManager.remove_user(self.ID)
        super(HiNowClientHandler, self).on_close()


app = web.Application([
    (r'/ws', HiNowClientHandler),
    (r'/api', MainHandler),
])

if __name__ == '__main__':
    connect(DB_NAME, host=os.getenv('MONGODB_URI', None))
    # HubsInspector.include_hubs_in(os.path.join(Constants().back_end_path, 'hubs', '*'))
    HubsInspector.inspect_implemented_hubs()
    if Constants().environment == Env.LOCAL:
        # Only construct hubsApi if we are in the local environment
        HubsInspector.construct_js_file(os.path.join(Constants().root_path, 'src/hubsApi.js'))
        HubsInspector.construct_js_file(os.path.join(Constants().back_end_path, 'test_functions/WSHubsApi.js'))
    try:
        # get api may throw an exception, use ifconfig if this doesn't work
        log.debug('start listening in: ws://{}:{}/ws'.format(get_ip(), Constants().server_port))
    except:
        log.debug('Unable to get ip, use ifconfig to find the ip')
    app.listen(Constants().server_port)
    ioloop.IOLoop.instance().start()
