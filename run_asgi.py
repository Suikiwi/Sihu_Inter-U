import os
import sys
from daphne.cli import CommandLineInterface

# Asegura que el directorio actual esté en el path
sys.path.insert(0, os.path.dirname(__file__))

# Establece la variable de entorno para Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "interu_backend.settings")

# Ejecuta Daphne con el módulo correcto
CommandLineInterface().run(["interu_backend.asgi:application"])
