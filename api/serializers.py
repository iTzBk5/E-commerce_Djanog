
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')  # This will include the category name in the serialized data

    class Meta:
        model = Product
        fields = '__all__'


from rest_framework import serializers
from .models import Order, OrderProduct, Product


class OrderProductSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderProduct
        fields = ['product', 'quantity']

    def to_representation(self, instance):
        try:
            representation = super().to_representation(instance)
        except AttributeError:
            representation = {'product': None, 'quantity': 0}
        except KeyError:
            representation = {'product': None, 'quantity': 0}
        return representation

class OrderSerializer(serializers.ModelSerializer):
    products = OrderProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ['first_name', 'last_name', 'address', 'email', 'phone', 'total_amount', 'products']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation

    def create(self, validated_data):
        products_data = validated_data.pop('products')
        order = Order.objects.create(**validated_data)
        for product_data in products_data:
            OrderProduct.objects.create(order=order, **product_data)
        return order


