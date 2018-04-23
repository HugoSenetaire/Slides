from rest_framework import serializers
from latex.models import LatexFile

class LatexFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LatexFile
        fields = ('pk', 'latex', 'title')
