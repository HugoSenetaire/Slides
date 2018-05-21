from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from beamer.jsonToBeamer import jsonToBeamer
import json
from pylatex import *
from subprocess import call
import time
@csrf_exempt
def BeamerView(request):
    # Create the HttpResponse object with the appropriate PDF headers.

    if request.method == 'POST':
        jsonBeamer = json.loads(request.body)
        # i = jsonBeamer["id"]
        # with open('beamer/jsonBeamer.json',"w") as o:
        #     o.write(jsonBeamer)
        jsonToBeamer(jsonBeamer, 'beamer/beamer.tex')
        call(['xelatex /home/lou/enpc/Slides/src/backend/beamer/beamer.tex'], shell=True)
        # call(['rm -f /home/lou/enpc/Slides/src/frontend/src/assets/beamer.pdf'], shell=True)
        # time.sleep(10)
        # filename = 'beamer'+str(i)+'.pdf'
        command = 'cp /home/lou/enpc/Slides/src/backend/beamer.pdf /home/lou/enpc/Slides/src/uploaded_media/'
        call([command], shell=True)
        # call(['/usr/bin/convert /home/lou/enpc/Slides/src/backend/beamer.pdf /home/lou/enpc/Slides/src/frontend/src/assets/beamer.png'], shell=True)
    return None
