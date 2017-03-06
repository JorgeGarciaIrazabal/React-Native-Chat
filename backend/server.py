import json
import logging.config
import os
import socket

from bson import ObjectId
from mongoengine import connect
from tornado import web, ioloop
from wshubsapi.connection_handlers.tornado_handler import ConnectionHandler
from wshubsapi.hubs_inspector import HubsInspector

from db_context.tables import ReactChatDocument


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

DEBUG = True
CHAT_PATH = os.getenv('REACT_CHAT_PATH')


def object_id_handler(obj, depth):
    return str(obj)


def document_handler(obj, depth):
    return {key: obj.__getattribute__(key) for key in obj._data.keys()}


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
    (r'/(.*)', HiNowClientHandler),
])

if __name__ == '__main__':
    connect('ReactChat')

    HubsInspector.include_hubs_in(os.path.join(CHAT_PATH, 'backend', 'hubs', '*'))
    HubsInspector.inspect_implemented_hubs()
    HubsInspector.construct_js_file(os.path.join(CHAT_PATH, 'src/hubsApi.js'))
    # HubsInspector.construct_dart_file()
    # Hub.constructJAVAFile("com.application.jorge.whereappu.WebSocket","C:/Software Projects/WhereAppU/app/src/main/java/com/application/jorge/whereappu/WebSocket")
    port = 8844
    ip = get_ip()
    log.debug("start listening in: ws://{}:{}".format(ip, port))
    app.listen(port)
    ioloop.IOLoop.instance().start()
