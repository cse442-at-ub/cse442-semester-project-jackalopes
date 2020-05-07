from roommatefinder.models import *
from rest_framework import serializers


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'picture_url',
                  'picture_url', 'show_profile', 'animal_friendly', 'gender', 'max_age', 'max_distance')

class MessageSerializer(serializers.ModelSerializer):
    sender = UserProfileSerializer()

    class Meta:
        model = Message
        fields = ('id', 'sender', 'msg_content')

class MatchMessageSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)

    class Meta:
        model = Match
        fields = ('id', 'messages')

class MatchSerializer(serializers.ModelSerializer):
    user_one = UserProfileSerializer(many=True)
    user_two = UserProfileSerializer(many=True)
    messages = MessageSerializer(many=True)

    class Meta:
        model = Match
        fields = ('id', 'user_one', 'user_two', 'messages')

class CurrentUserSerializer(serializers.ModelSerializer):
    matches = MatchSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'picture_url', 'likes', 'dislikes', 'matches')
