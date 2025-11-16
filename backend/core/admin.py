from django.contrib import admin
from .models import Reporte
class ReporteAdmin(admin.ModelAdmin):
    list_display = (
        "id_reporte",
        "motivo",
        "estado",
        "fecha",
        "administrador",
        "estudiante",
        "publicacion",
    )
    list_filter = ("estado", "fecha")
    search_fields = ("motivo", "estudiante__email", "administrador__email")
    readonly_fields = ("fecha",)


