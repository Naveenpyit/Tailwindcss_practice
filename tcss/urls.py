from . import views
from django.urls import path

urlpatterns=[
    path('',views.index_view,name='mainpage'),
]