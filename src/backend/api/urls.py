from django.urls import include, path
from rest_framework import routers
from api.views import LatexFileViewSet, requestJson

router = routers.DefaultRouter()
router.register('latex_files', LatexFileViewSet, 'latex_files')

urlpatterns = [
    path('json_files/<int:request_id>', requestJson),
    path('', include(router.urls))
]
