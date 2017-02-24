# coding: utf-8
from datetime import datetime

from inflection import underscore
from mongoengine import connect, Q
from mongoengine import Document, CASCADE
from mongoengine.fields import StringField, DateTimeField, ImageField, ReferenceField, GeoPointField, ListField, \
    EmailField, DynamicField


class ReactChatDocument(Document):
    meta = {
        'allow_inheritance': True,
        'abstract': True
    }
    updated_at = DateTimeField(default=datetime.utcnow)
    created_at = DateTimeField(default=datetime.utcnow, index=True)

    def __init__(self, *args, **values):
        values = {underscore(k): v for k, v in values}
        super().__init__(*args, **values)

    def save(self, *args, **kwargs):
        self.updated_on = datetime.utcnow()
        return super().save(*args, **kwargs)


class User(ReactChatDocument):
    name = StringField(required=True)
    # phone_number = Column(Text(collation=u'utf8_unicode_ci'), nullable=False)
    # photo = ImageField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)


class Message(ReactChatDocument):
    sender = ReferenceField(User, required=True, reverse_delete_rule=CASCADE)
    receiver = ReferenceField(User, required=True, reverse_delete_rule=CASCADE)

    body = StringField(required=True)


if __name__ == '__main__':
    connect('ReactChat')
    user = User()
    user.name = "Jorge Garcia Irazabal"
    user.email = 'a@a.com'
    user.password = 'password'
    user.save()
