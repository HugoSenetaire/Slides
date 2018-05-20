from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from beamer.jsonToBeamer import jsonToBeamer
import json
# Create your views here.

@csrf_exempt
def BeamerView(request):
    # Create the HttpResponse object with the appropriate PDF headers.

    if request.method == 'POST':
        jsonBeamer = json.loads(request.body)
        # with open('beamer/jsonBeamer.json',"w") as o:
        #     o.write(jsonBeamer)
        jsonToBeamer(jsonBeamer, 'beamer/beamer.tex')
    return HttpResponse("Salu")
