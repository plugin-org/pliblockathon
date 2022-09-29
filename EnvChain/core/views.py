from django.shortcuts import render

def index(request):

    return render(request,'index.html')


def weather(request):
    return render(request,'weather.html')

def p1(request,area):
    if area == 'samayapuram':
        temp = '34 C'
        air = 'Co2 level less'
        ground = 'PH < 7' 
    elif area == 'srirangam':
        temp = '38 C'
        air = 'Co2 level moderate'
        ground = 'PH = 7' 
    else:
        temp = '36 C'
        air = 'Co2 level less'
        ground = 'PH < 6' 
    return render(request,'p1.html',{'temp':temp,'area':area,'air':air,'ground':ground})