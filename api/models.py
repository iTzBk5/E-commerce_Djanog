from django.db import models
import datetime

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    description = models.CharField(max_length=250, default='', blank=True)
    image = models.ImageField(upload_to='uploads/product/')
    is_sale = models.BooleanField(default=False)
    sale_price = models.DecimalField(max_digits=6, decimal_places=2, default=0)

    def __str__(self):
        return self.name


from django.db import models
from django.utils import timezone

class Order(models.Model):
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    address = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Default should be 0, not an empty string
    date = models.DateTimeField(default=timezone.now)
    products = models.ManyToManyField(Product, through='OrderProduct')

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, related_name='order_products', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_products', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()