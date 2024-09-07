from django.shortcuts import render,redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth import authenticate,login ,logout
from django.contrib import messages
from django.http import JsonResponse
import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .forms import SignUpForm
from django import forms

class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    

def index(request):
    products = Product.objects.all()
    context = {
        'products': products,
        'is_authenticated': request.user.is_authenticated
    }
    return render(request, 'index.html', context)

def mens(request):
    return render(request,'index.html')

def women(request):
    return render(request,'index.html')

def kids(request):
    return render(request,'index.html')

def shop(request):
    return render(request,'index.html')




def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def logout_user(request):
    logout(request)
    messages.success(request, ("You have been loggerd out"))
    return redirect('/')


def check_authentication(request):
    return JsonResponse({'authenticated': True})




def register_user(request):
    if request.method == "POST":
        try:
            # Load the incoming JSON data
            data = json.loads(request.body)

            # Populate the Django form with the data
            form = SignUpForm({
                'username': data.get('username'),
                'email': data.get('email'),
                'first_name': data.get('first_name', ''),
                'last_name': data.get('last_name', ''),
                'password1': data.get('password'),
                'password2': data.get('password'),
            })

            # Check if the form is valid
            if form.is_valid():
                form.save()  # Save the new user
                username = form.cleaned_data['username']
                password = form.cleaned_data['password1']
                
                # Authenticate and log the user in
                user = authenticate(username=username, password=password)
                login(request, user)
                
                # Return success response
                return JsonResponse({'message': 'Registration successful'}, status=201)
            else:
                # Return validation errors
                return JsonResponse({'errors': form.errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
def product(request,pk):
    product = Product.objects.get(id=pk)
    return render(request, 'index.html', {'product':product})

from django.shortcuts import render, get_object_or_404
class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductDetailView(APIView):  # Add this class
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    


from django.shortcuts import render,redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth import authenticate,login ,logout
from django.contrib import messages
from django.http import JsonResponse
import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .forms import SignUpForm
from django import forms

class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    

def index(request):
    products = Product.objects.all()
    context = {
        'products': products,
        'is_authenticated': request.user.is_authenticated
    }
    return render(request, 'index.html', context)

def mens(request):
    return render(request,'index.html')

def women(request):
    return render(request,'index.html')

def kids(request):
    return render(request,'index.html')

def shop(request):
    return render(request,'index.html')

def cart(request):
    return render(request, 'index.html')




def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def logout_user(request):
    logout(request)
    messages.success(request, ("You have been loggerd out"))
    return redirect('/')


def check_authentication(request):
    return JsonResponse({'authenticated': True})




def register_user(request):
    if request.method == "POST":
        try:
            # Load the incoming JSON data
            data = json.loads(request.body)

            # Populate the Django form with the data
            form = SignUpForm({
                'username': data.get('username'),
                'email': data.get('email'),
                'first_name': data.get('first_name', ''),
                'last_name': data.get('last_name', ''),
                'password1': data.get('password'),
                'password2': data.get('password'),
            })

            # Check if the form is valid
            if form.is_valid():
                form.save()  # Save the new user
                username = form.cleaned_data['username']
                password = form.cleaned_data['password1']
                
                # Authenticate and log the user in
                user = authenticate(username=username, password=password)
                login(request, user)
                
                # Return success response
                return JsonResponse({'message': 'Registration successful'}, status=201)
            else:
                # Return validation errors
                return JsonResponse({'errors': form.errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
def product(request,pk):
    product = Product.objects.get(id=pk)
    return render(request, 'index.html', {'product':product})

from django.shortcuts import render, get_object_or_404
class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductDetailView(APIView):  # Add this class
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer

@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        order = serializer.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Order
from .serializers import OrderSerializer

@api_view(['GET', 'POST'])
def order_list(request):
    if request.method == 'GET':
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
