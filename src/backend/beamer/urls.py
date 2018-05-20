from django.urls import include, path
from beamer.views import BeamerView

urlpatterns = [
    path('', BeamerView),
]
