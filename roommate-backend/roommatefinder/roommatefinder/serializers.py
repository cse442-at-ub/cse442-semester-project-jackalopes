from roommatefinder.models import User
from rest_framework import serializers

class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'picture_url')