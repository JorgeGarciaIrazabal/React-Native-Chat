from wshubsapi.hub import Hub
from mongoengine.queryset.visitor import Q

from db_context.tables import Message


class MessagesHub(Hub):
    def create_message(self, new_message):
        message = Message(**new_message)
        message.save()

    def get_message_with_user(self, _sender, user_id):
        condition = (Q(sender=_sender.ID) & Q(receiver=user_id)) \
                    | (Q(receiver=_sender.ID) & Q(sender=user_id))

        return Message.objects(condition)

    def _define_client_functions(self):
        return dict(
            message_received=lambda message: None
        )
