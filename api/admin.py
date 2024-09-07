from django.contrib import admin
from .models import Category,Product

admin.site.register(Category)
admin.site.register(Product)


from django.contrib import admin
from .models import Order, OrderProduct

class OrderProductInline(admin.TabularInline):
    model = OrderProduct
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderProductInline]
    list_display = ['first_name', 'last_name', 'address', 'email', 'phone', 'total_amount', 'date']

admin.site.register(Order, OrderAdmin)
