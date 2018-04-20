from django.urls import include, path
from rest_framework import routers
from api.views import LatexFileViewSet, hello_world

router = routers.DefaultRouter()
router.register('latex_files', LatexFileViewSet, 'latex_files')
urlpatterns = [
    path('hello/', hello_world),
    path('', include(router.urls))
]
