from roommatefinder.models import *
from django.db.models import Q

from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from roommatefinder.serializers import *
import json

class MatchList(APIView):
    """
    List all users
    """
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        current_user = User.objects.get(username=request.user)
        # print(current_user)
        # print([user.id for user in current_user.likes.all()])
        users = User.objects.exclude(username=request.user).difference(
            current_user.likes.all()).difference(current_user.dislikes.all())

        final_users = []

        # filter users
        for user in users:
            if user.show_profile and user.animal_friendly is current_user.animal_friendly and (current_user.gender is 'AN' or current_user.gender == user.gender) and user.max_age <= current_user.max_age and user.max_distance <= current_user.max_distance:
                final_users.append(user)

        serializer = UserProfileSerializer(final_users, many=True)
        return Response(serializer.data)


class MatchLike(APIView):
    """
    List all users
    """
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        body = json.loads(request.body)
        current_user = User.objects.get(username=request.user)

        liked_user_id = body['user_liked']
        liked_user = User.objects.get(id=liked_user_id)

        current_user.likes.add(liked_user)

        # Check to see if the other user likes this user back
        # if they do, they match! Do something.

        # print(liked_user.likes.all())
        # print(current_user.likes.all())

        if current_user in liked_user.likes.all() and liked_user in current_user.likes.all():
            # print("MATCH")
            m = Match()
            m.save()
            m.user_one.add(current_user)
            m.user_two.add(liked_user)
            # print(m)
            current_user.matches.add(m)
            liked_user.matches.add(m)

        current_user.save()
        liked_user.save()

        serializer = UserProfileSerializer(liked_user)
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
        body = json.loads(request.body.decode('utf-8'))
        current_user = User.objects.get(username=request.user)

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


class UserProfile(APIView):
    """
    List all users
    """
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        current_user = User.objects.get(username=request.user)

        serializer = UserProfileSerializer(current_user)
        return Response(serializer.data)

    def patch(self, request, format=None):
        body = json.loads(request.body.decode('utf-8'))
        current_user = User.objects.get(username=request.user)

        # first_name, last_name, picture_url, show_profile, animal_friendly, gender, max_age, max_distance = body(None)

        if 'first_name' in body:
            current_user.first_name = body['first_name']
        if 'last_name' in body:
            current_user.last_name = body['last_name']
        if 'picture_url' in body:
            current_user.picture_url = body['picture_url']
        if 'show_profile' in body:
            current_user.show_profile = body['show_profile']
        if 'animal_friendly' in body:
            current_user.animal_friendly = body['animal_friendly']
        if 'gender' in body:
            current_user.gender = body['gender']
        if 'max_age' in body:
            current_user.max_age = body['max_age']
        if 'max_distance' in body:
            current_user.max_distance = body['max_distance']

        current_user.save()

        serializer = UserProfileSerializer(current_user)
        return Response({
            'status': 'Success',
            'updated_user': serializer.data
        })

class UserMatches(APIView):
    """
    List all users
    """
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        current_user = User.objects.get(username=request.user)

        serializer = CurrentUserSerializer(current_user)
        return Response(serializer.data)

    def delete(self, request, format=None):
        body = json.loads(request.body.decode('utf-8'))
        current_user = User.objects.get(username=request.user)

        remove_user_id = body['match_user_id']
        matches = Match.objects.filter((Q(user_one__id=current_user.id) | Q(user_two__id=remove_user_id)) | (Q(user_one__id=remove_user_id) | Q(user_two__id=current_user.id)))

        matches.delete()

        serializer = CurrentUserSerializer(current_user)

class Messages(APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        match_id = request.GET.get("match_id")
        match = Match.objects.filter(id=match_id)[0]
        # messages = match.messages.all()
        # print(messages)
        serializer = MatchMessageSerializer(match)
        #serializer = serializers.serialize('json', messages)
        return Response(serializer.data)

    def post(self, request, format=None):
        body = json.loads(request.body.decode('utf-8'))
        user = User.objects.get(username=request.user)
        match_obj = Match.objects.get(id=body["match_id"])
        content = body["content"]

        message = Message.objects.create(match=match_obj, sender=user, msg_content=content)
        match_obj.messages.add(message)

        serializer = MessageSerializer()
        return Response({
            'status': 'Success',
            'content': content
        })
