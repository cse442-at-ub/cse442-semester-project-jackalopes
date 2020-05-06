from roommatefinder.models import User, Match
from rest_framework import serializers


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'picture_url',
                  'picture_url', 'show_profile', 'animal_friendly', 'gender', 'max_age', 'max_distance')


class MatchSerializer(serializers.ModelSerializer):
    user_one = UserProfileSerializer(many=True)
    user_two = UserProfileSerializer(many=True)

    class Meta:
        model = Match
        fields = ('user_one', 'user_two')

class CurrentUserSerializer(serializers.ModelSerializer):
    matches = MatchSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'picture_url', 'likes', 'dislikes', 'matches')
