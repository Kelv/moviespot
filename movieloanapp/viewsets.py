from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from movieloanapp.models import Movie, Customer, Rental
from movieloanapp.serializers import MovieSerializer, ClientSerializer, RentalSerializer


class MovieViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset = Movie.objects.all()
	serializer_class = MovieSerializer
	parser_classes = (MultiPartParser, FormParser,)


class ClientViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset = Customer.objects.all()
	serializer_class = ClientSerializer


class RentalViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset = Rental.objects.all()
	serializer_class = RentalSerializer
	
	def create(self, request, *args, **kwargs):
		try:
			movie = Movie.objects.get(pk=request.data['movie'])
			if movie.in_stock_qty > 0:
				res = super(viewsets.ModelViewSet, self).create(request)
				if int(res.status_code / 100) == 2:
					movie.in_stock_qty -= 1
					movie.save()
				return res
			return Response({"error": "Not available movie to rent"})
		except Exception as e:
			return Response({"error": "Could not rent movie" + e})
	
	@action(detail=True, methods=['post'])
	def return_movie(self, request, pk=None):
		rental = Rental.objects.get(pk=pk)
		if rental.status == "RENTED":
			movie = Movie.objects.get(pk=request.data['movie'])
			movie.in_stock_qty += 1
			movie.save()
			rental.status = "RETURNED"
			rental.save()
			return Response(RentalSerializer(rental).data)
		else:
			return Response({"error": "Movie already returned"})
