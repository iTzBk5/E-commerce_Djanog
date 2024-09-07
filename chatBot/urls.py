from django.contrib import admin
from django.urls import path,include
from api import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from api.views import OrderViewSet


router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('', views.index, name='index'),
    path('', include(router.urls)),
    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
