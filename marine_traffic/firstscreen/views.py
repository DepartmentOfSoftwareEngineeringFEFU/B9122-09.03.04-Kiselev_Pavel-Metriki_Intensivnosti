from django.shortcuts import render

# Create your views here.
def screen_gen(request):
    template = 'first.html'
    return render(request, template)