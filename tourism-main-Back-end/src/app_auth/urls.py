from django.urls import path
from django.urls import path, re_path, include
from app_auth.views import WebLoginView, UserActivationView,UserResetPasswordView, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("users", UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    re_path(r'', include('djoser.urls')),
    re_path(r'^', include('djoser.social.urls')),
    re_path(r'', include('djoser.urls.jwt')),
    path('login/web/', WebLoginView.as_view(), name='web-login'),
    path('activation/<str:uid>/<str:token>/', UserActivationView.as_view()),
    path('password/reset/confirm/<str:uid>/<str:token>/', UserResetPasswordView.as_view()), 
]