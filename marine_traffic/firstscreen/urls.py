from django.urls import path
from .views import hello, get_metrics, create_metric

urlpatterns = [
    path('hello/', hello),
    path('metrics/create/', create_metric),
    path('metrics/', get_metrics),
]