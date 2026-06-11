from django.db import models

# Create your models here.
class Metric(models.Model):
    name = models.CharField(max_length=100)
    formula = models.TextField()

    def __str__(self):
        return self.name