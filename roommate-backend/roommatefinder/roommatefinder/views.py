from roommatefinder.models import User

from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from roommatefinder.serializers import CurrentUserSerializer

class MatchList(APIView):
    """
    List all users
    """
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        users = User.objects.exclude(username= request.user)
        serializer = CurrentUserSerializer(users, many=True)
        return Response(serializer.data)
