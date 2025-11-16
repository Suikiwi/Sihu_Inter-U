from django.urls import path, include
from accounts.views import PasswordResetConfirmView


urlpatterns = [
   
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
    path("api/auth/users/reset_password_confirm/", PasswordResetConfirmView.as_view()),

    path("", include("core.urls")),
    
]
