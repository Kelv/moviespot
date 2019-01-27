from django.contrib import admin

# Register your models here.
from movieloanapp.models import Movie, Customer

admin.site.register(Movie)
admin.site.register(Customer)
