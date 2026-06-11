from django.db import models

class Metric(models.Model):
    name = models.CharField(max_length=100)

    speed = models.BooleanField(
        default=False, verbose_name="Скорость")
    course = models.BooleanField(
        default=False, verbose_name="Курс")
    age = models.BooleanField(
        default=False, verbose_name="Возраст данных")
    id_marine = models.BooleanField(
        default=False, verbose_name="ID судна")

    def save(self, *args, **kwargs):

        name = "Интенсивность"
        count = 0

        if self.speed:
            name = name + " + скорость"
            count += 1

        if self.course:
            name = name + " + курс"
            count += 1

        if self.age:
            name = name + " + возраст данных"
            count += 1

        if self.id_marine:
            name = name + " + ID судна"
            count += 1

        if count == 0:
          name = name + " движения"     

        self.name = name

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name