from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator
from django.db import models

gender_types = (
    ('AN', 'Any'),
    ('FE', 'Female'),
    ('MA', 'Male'),
    ('OT', 'Other')
)


class User(AbstractUser):
    picture_url = models.TextField(validators=[URLValidator(
    )], default="http://www-student.cse.buffalo.edu/CSE442-542/2020-Spring/cse-442o/cse442-semester-project-jackalopes/roommate-backend/roommatefinder/roommatefinder/assets/default-profile.png")
    likes = models.ManyToManyField(
        "User", related_name="user_likes+", blank=True)
    dislikes = models.ManyToManyField(
        "User", related_name="user_dislikes+", blank=True)

    show_profile = models.BooleanField(default=True)
    animal_friendly = models.BooleanField(default=True)
    gender = models.CharField(
        max_length=2, blank=False, null=False, default='AN', choices=gender_types)
    max_age = models.IntegerField(range(18, 120), default=120)
    max_distance = models.IntegerField(range(0, 100), default=100)
