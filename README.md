# MovieSpot

MovieSpot is a web applicacion for movie rental.
It allows us to:
  - Have a movie catalog
  - Rent movies
  - Stablish arrears penalty

# Technologies

  - [Django] - DjangoThe web framework for perfectionists with deadlines.
  - [Vuejs] - The Progressive JavaScript Framework
  
# How to run?

Clone the project:

```sh
# Get code
git clone https://github.com/Kelv/moviespot

# Create virtual environment and activate it
pip install virtualenv
virtualenv msenv
source msenv/bin/activate

# Install modules
cd moviespot
pip install -r requirements.txt

# Create database structure
python manage.py makemigrations
python manage.py migrate

# Create account with your info
python manage.py createsuperuser

# Run app
python manage.py runserver
```

[Django]: <https://www.djangoproject.com>
[Vuejs]: <https://vuejs.org>
