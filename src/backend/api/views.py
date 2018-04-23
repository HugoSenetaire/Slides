from django.shortcuts import render
from rest_framework import viewsets
from api.serializers import LatexFileSerializer
from latex.models import LatexFile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.tex2json import tex2json
import json
import os
from django.shortcuts import get_object_or_404, render

# Create your views here.


class LatexFileViewSet(viewsets.ModelViewSet):
    queryset = LatexFile.objects.all()
    serializer_class = LatexFileSerializer

@api_view()
def requestJson(request, request_id):
    latexFile = get_object_or_404(LatexFile, pk=request_id)
    cwd = os.getcwd()
    cwd = cwd.replace('/backend','/uploaded_media/')
    jsonLatex = tex2json(cwd+latexFile.latex.name)
    result = json.loads(jsonLatex)
    return Response(result)
