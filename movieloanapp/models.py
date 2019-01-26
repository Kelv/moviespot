import datetime

from django.db import models


class Movie(models.Model):
	title = models.TextField(verbose_name="Name", blank=False)
	genres = models.TextField(blank=False, default="")
	length = models.IntegerField(default=0)
	cover = models.FileField(upload_to='covers')
	year = models.IntegerField(default=0)
	country = models.TextField(default='')
	in_stock = models.IntegerField()


class Customer(models.Model):
	first_name = models.TextField(blank=False)
	last_name = models.TextField(blank=False)
	address = models.TextField(blank=False)
	phone = models.TextField(blank=False)
	gender = models.TextField(max_length=1)


class MovieLoan(models.Model):
	movie = models.ForeignKey(Movie, related_name='loans')
	customer = models.ForeignKey(Customer, related_name='customers')
	created_date = models.DateField(auto_now=True)
	due_date = models.DateTimeField(blank=False)
