from django.shortcuts import render
from rest_framework import viewsets
from api.serializers import LatexFileSerializer
from latex.models import LatexFile
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

class LatexFileViewSet(viewsets.ModelViewSet):
    queryset = LatexFile.objects.all()
    serializer_class = LatexFileSerializer

@api_view()
def hello_world(request):
    return Response({"message" : "Hello, beautiful World !"})
