from mongoengine import NotUniqueError
from wshubsapi.connected_client import ConnectedClient
from wshubsapi.hub import Hub
from wshubsapi.utils_api_hub import UtilsAPIHub

from db_context.tables import User


class UserHub(Hub):
    def log_in(self, user: dict, _sender: ConnectedClient):
        user = User(**user)
        try:
            user.save()
        except NotUniqueError as e:
            user = User.objects(email=user.email).get()

        utils_hub = UtilsAPIHub.get_instance()
        ''' :type :UtilsAPIHub'''
        utils_hub.set_id(user.pk, _sender)

        return user.pk
