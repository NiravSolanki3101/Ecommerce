from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer
# Create your views here.

def getRoutes(request):
    return JsonResponse("Hey there",safe=False)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):

    products = Product.objects.get(_id=pk)
    serializer = ProductSerializer(products, many=False)

    return Response(serializer.data)
