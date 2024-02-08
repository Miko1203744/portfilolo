from django.shortcuts import render


def indexs(request, *args, **kwargs):
    return render(request, 'frontend/indexs.html')
# Create your views here.
