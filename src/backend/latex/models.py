from django.db import models
from datetime import datetime
# Create your models here.

class LatexFile(models.Model):
    latex = models.FileField('Uploaded Latex File') #stores the uploaded latex file
    title = models.CharField(max_length=200, default = 'whatever')
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    def __str__(self):
        return self.latex.name
