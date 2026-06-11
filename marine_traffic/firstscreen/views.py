from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Metric
from .serializers import MetricSerializer

@api_view(['GET'])
def hello(request):
    return Response({
        "message": "Django работает"
    })

@api_view(['GET'])
def get_metrics(request):

    metrics = Metric.objects.all()

    serializer = MetricSerializer(
        metrics,
        many=True
    )

    return Response(serializer.data)

@api_view(['POST'])
def create_metric(request):

    serializer = MetricSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)