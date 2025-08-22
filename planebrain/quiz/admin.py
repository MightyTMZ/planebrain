from django.contrib import admin
from .models import Category, Question, QuestionPicture, Option

admin.site.register(Category)


class PictureInline(admin.TabularInline): 
    model = QuestionPicture
    extra = 0


class OptionInline(admin.TabularInline):
    model = Option
    extra = 2


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [PictureInline, OptionInline]
