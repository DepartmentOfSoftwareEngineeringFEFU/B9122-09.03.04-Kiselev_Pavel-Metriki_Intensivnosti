from django.shortcuts import render

# Create your views here.
def screen_gen(request):
    template = 'index.html'
    return render(request, template)