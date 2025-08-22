from rest_framework import serializers 
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['option_text', 'correct', 'image']


class QuestionPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionPicture
        fields = [
            'caption',
            'image',
        ]

class QuestionSerializer(serializers.ModelSerializer):

    options = OptionSerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)
    images = QuestionPictureSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "question_source", 'category', 'question_text', 'images','options','explanation', 'difficulty']

        # ID field will be used for users to report an issue with a question



class SimpleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title']

