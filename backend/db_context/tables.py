# coding: utf-8
from datetime import datetime

from inflection import underscore
from mongoengine import Document, CASCADE
from mongoengine import connect, DictField
from mongoengine.fields import StringField, DateTimeField, ReferenceField, EmailField, URLField

DB_NAME = 'ReactChat'


class ReactChatDocument(Document):
    meta = {
        'allow_inheritance': True,
        'abstract': True
    }
    updated_at = DateTimeField(default=datetime.utcnow)
    created_at = DateTimeField(default=datetime.utcnow, index=True)

    def __init__(self, *args, **values):
        values = {underscore(k): v for k, v in values.items()}
        super().__init__(*args, **values)

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)

    def update(self, **kwargs):
        kwargs = {underscore(k): v for k, v in kwargs.items()}
        return super().update(**kwargs)


class User(ReactChatDocument):
    name = StringField(required=True)
    last_name = StringField(required=False)
    picture_url = URLField(required=False)
    email = EmailField(required=False, unique=True)
    password = StringField(required=True)
    facebook_data = DictField(required=False)


class Message(ReactChatDocument):
    sender = ReferenceField(User, required=True, reverse_delete_rule=CASCADE)
    receiver = ReferenceField(User, required=True, reverse_delete_rule=CASCADE)

    body = StringField(required=True)


if __name__ == '__main__':
    connect('ReactChat')
    user = [u.delete() for u in User.objects]
