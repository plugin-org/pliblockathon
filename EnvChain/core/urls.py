from django.urls import path
from .views import *
urlpatterns = [
    path('',index,name='index'),
    path('weather/',weather,name='weather'),
    path("weather/<str:area>",p1,name='p1')
]
