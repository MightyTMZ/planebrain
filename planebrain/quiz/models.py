from django.db import models
from ckeditor.fields import RichTextField
from django.conf import settings


class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title


class Question(models.Model):

    QUESTION_DIFFICULTY = [
        ('E', "Easy"),
        ('M', "Medium"),
        ('H', "Hard"),
    ]


    category = models.ManyToManyField(Category)
    question_source = models.CharField(max_length=255)
    question_text = RichTextField()
    explanation = RichTextField()
    difficulty = models.CharField(max_length=1, choices=QUESTION_DIFFICULTY, default="M")

    def __str__(self) -> str:
        return f"{self.id} - {self.question_text}"


class Option(models.Model):
    option_text = RichTextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="options")
    correct = models.BooleanField(default=False)
    image = models.ImageField(upload_to="option-images/", blank=True, null=True)

    def __str__(self):
        return f"Question {self.question.id} option: {self.option_text}"

class QuestionPicture(models.Model):
    caption = RichTextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="question-images/")

    def __str__(self):
        return f"Question {self.question.id} - {self.caption}"


# f"https://{settings.AWS_S3_CUSTOM_DOMAIN}/"