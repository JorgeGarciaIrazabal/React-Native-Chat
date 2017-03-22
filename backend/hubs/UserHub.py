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
        self.__remove_existing_connection(str(user.pk))
        utils_hub.set_id(str(user.pk), _sender)
        return user

    def get_users(self, _sender: ClientInHub):
        # todo get only friends from user
        return list(User.objects(id__ne=_sender.ID))

    def get_users_status(self, users_ids):
        connections = map(lambda user_id: user_id in self.clients.all_connected_clients, users_ids)
        return dict(zip(users_ids, connections))

    def __remove_existing_connection(self, user_id):
        if user_id in self.clients.all_connected_clients:
            self.clients.all_connected_clients.pop(user_id)
