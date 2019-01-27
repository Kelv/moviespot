from django.core.validators import MinValueValidator
from django.db import models


class Movie(models.Model):
	title = models.CharField(verbose_name="Name", blank=False, max_length=50)
	genres = models.CharField(blank=False, default="", max_length=50)
	length = models.IntegerField(default=0, verbose_name="Duration")
	cover = models.FileField(upload_to='covers')
	year = models.IntegerField(default=0)
	country = models.CharField(default='', max_length=50)
	in_stock_qty = models.DecimalField(default=0, verbose_name="In stock quantity",validators=[MinValueValidator(0)])
	borrow_price = models.FloatField(validators=[MinValueValidator(0)])
	
	def __str__(self):
		return self.title


class Customer(models.Model):
	first_name = models.CharField(max_length=50, blank=False)
	last_name = models.CharField(max_length=50, blank=False)
	address = models.CharField(max_length=50, blank=False)
	phone = models.CharField(max_length=50, blank=False)
	gender = models.CharField(max_length=1)
	email = models.EmailField()


class BorrowOrder(models.Model):
	movie = models.ForeignKey(Movie, related_name='loans', on_delete=models.CASCADE)
	customer = models.ForeignKey(Customer, related_name='customers', on_delete=models.CASCADE)
	created_date = models.DateField(auto_now_add=True, editable=False)
	due_date = models.DateTimeField(blank=False)
