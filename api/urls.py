from django.urls import path,include
from .views import ProductListView, ProductDetailView, mens, shop, women, kids, check_authentication
from . import views
from .views import create_order
from rest_framework.routers import DefaultRouter
from api.views import OrderViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('api/products/', ProductListView.as_view(), name='product-list'),
    path('api/products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),  # Add this line
    path('mens/', mens, name='product-list'),
    path('women/', women, name='product-list'),
    path('kids/', kids, name='product-list'),
    path('shop/', shop, name='product-list'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('loginsignup/', views.register_user, name='register'),
    path('check-auth/', check_authentication, name='check_authentication'),
    path('product/<int:pk>',views.product, name='product'),
    path('api/order/', views.order_list, name='order-list'),
    path('cart/', views.cart, name='cart'),  
    path('api/', include(router.urls)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
