from django.db import models
from datetime import datetime
# Create your models here.

class LatexFile(models.Model):
    latex = models.FileField('Uploaded Latex File') #stores the uploaded latex file
    created_ar = models.DateTimeField(default=datetime.now, blank=True)
    def str(self):
        return self.latex.name
