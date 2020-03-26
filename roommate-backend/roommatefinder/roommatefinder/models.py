from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator
from django.db import models


class User(AbstractUser):
    picture_url = models.TextField(validators=[URLValidator(
    )], default="http://www-student.cse.buffalo.edu/CSE442-542/2020-Spring/cse-442o/cse442-semester-project-jackalopes/roommate-backend/roommatefinder/roommatefinder/assets/default-profile.png")
