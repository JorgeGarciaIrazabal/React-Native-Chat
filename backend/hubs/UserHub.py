from mongoengine import NotUniqueError
from wshubsapi.client_in_hub import ClientInHub
from wshubsapi.hub import Hub
from wshubsapi.utils_api_hub import UtilsAPIHub

from db_context.tables import User


class UserHub(Hub):
    def log_in(self, user_data: dict, _sender: ClientInHub):
        user = User(**user_data)
        try:
            user.save()
        except NotUniqueError as e:
            user = User.objects(email=user_data['email']).get()

        utils_hub = UtilsAPIHub.get_instance()
        ''' :type :UtilsAPIHub'''
        env = _sender.api_get_real_connected_client().api_get_comm_environment()
        self.__remove_existing_connection(env, user)
        utils_hub.set_id(str(user.pk), _sender)
        return user

    def __remove_existing_connection(self, env, user):
        if str(user.pk) in env.all_connected_clients:
            env.all_connected_clients.pop(str(user.pk))
