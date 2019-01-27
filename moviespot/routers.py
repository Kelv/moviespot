from rest_framework import routers

from movieloanapp.viewsets import MovieViewSet, ClientViewSet, RentalViewSet

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'rentals', RentalViewSet, basename='rental')
