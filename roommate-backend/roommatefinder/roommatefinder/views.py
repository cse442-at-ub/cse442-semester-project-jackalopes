from roommatefinder.models import User

from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from roommatefinder.serializers import CurrentUserSerializer
import json

class MatchList(APIView):
    """
    List all users
    """
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        current_user = User.objects.get(username= request.user)
        print(current_user)
        print([user.id for user in current_user.likes.all()])
        users = User.objects.exclude(username= request.user).difference(current_user.likes.all()).difference(current_user.dislikes.all())

        # for user in users:
        #     print(user.likes.clear())

        serializer = CurrentUserSerializer(users, many=True)
        return Response(serializer.data)

class MatchLike(APIView):
    """
    List all users
    """
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        body = json.loads(request.body)
        current_user = User.objects.get(username= request.user)

        liked_user_id = body['user_liked']
        liked_user = User.objects.get(id=liked_user_id)

        current_user.likes.add(liked_user)

        # Check to see if the other user likes this user back
        # if they do, they match! Do something.

        serializer = CurrentUserSerializer(liked_user)
        return Response({
            'status': 'Success',
            'current_number_likes': current_user.likes.count(),
            'liked_user': serializer.data
        })

class MatchDislike(APIView):
    """
    List all users
    """
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        body = json.loads(request.body)
        current_user = User.objects.get(username= request.user)

        disliked_user_id = body['user_disliked']
        disliked_user = User.objects.get(id=disliked_user_id)

        current_user.dislikes.add(disliked_user)
        disliked_user.dislikes.add(current_user)

        serializer = CurrentUserSerializer(disliked_user)
        return Response({
            'status': 'Success',
            'current_number_dislikes': current_user.dislikes.count(),
            'disliked_user': serializer.data
        })
