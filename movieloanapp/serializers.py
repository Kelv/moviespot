from rest_framework import serializers
from rest_framework import filters
from movieloanapp.models import Movie, Customer, Rental


class MovieSerializer(serializers.ModelSerializer):
	class Meta:
		model = Movie
		fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Customer
		fields = '__all__'


class RentalSerializer(serializers.ModelSerializer):
	movie = MovieSerializer()
	client = ClientSerializer()
	class Meta:
		model = Rental
		fields = '__all__'