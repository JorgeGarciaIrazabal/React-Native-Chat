from mongoengine import NotUniqueError
from wshubsapi.connected_client import ConnectedClient
from wshubsapi.hub import Hub
from wshubsapi.utils_api_hub import UtilsAPIHub

from db_context.tables import User


class UserHub(Hub):
    def log_in(self, user_data: dict, _sender: ConnectedClient):
        user = User(**user_data)
        try:
            user.save()
        except NotUniqueError as e:
            user = User.objects(email=user_data['email']).get()

        utils_hub = UtilsAPIHub.get_instance()
        ''' :type :UtilsAPIHub'''
        utils_hub.set_id(str(user.pk), _sender)

        return user
