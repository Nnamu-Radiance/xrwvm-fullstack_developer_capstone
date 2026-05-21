
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import logout, login, authenticate
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import logging
import json
from .restapis import get_request, analyze_review_sentiments, post_review

logger = logging.getLogger(__name__)

@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)

@csrf_exempt
def logout_request(request):
    logout(request)
    return JsonResponse({"userName": ""})

@csrf_exempt
def registration(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data.get('firstName', '')
    last_name = data.get('lastName', '')
    email = data.get('email', '')
    try:
        User.objects.get(username=username)
        return JsonResponse({"userName": username, "error": "Already Registered"})
    except User.DoesNotExist:
        user = User.objects.create_user(
            username=username, password=password,
            first_name=first_name, last_name=last_name, email=email
        )
        login(request, user)
        return JsonResponse({"userName": username, "status": "Authenticated"})

def get_dealerships(request, state="All"):
    if state == "All":
        endpoint = "/fetchDealers"
    else:
        endpoint = f"/fetchDealers/{state}"
    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships})

def get_dealer_reviews(request, dealer_id):
    if dealer_id:
        endpoint = f"/fetchReviews/dealer/{dealer_id}"
        reviews = get_request(endpoint)
        for review in reviews:
            response = analyze_review_sentiments(review['review'])
            review['sentiment'] = response.get('sentiment', 'neutral')
        return JsonResponse({"status": 200, "reviews": reviews})
    return JsonResponse({"status": 400, "message": "Bad Request"})

def get_dealer_details(request, dealer_id):
    if dealer_id:
        endpoint = f"/fetchDealer/{dealer_id}"
        dealership = get_request(endpoint)
        return JsonResponse({"status": 200, "dealer": dealership})
    return JsonResponse({"status": 400, "message": "Bad Request"})

@csrf_exempt
def add_review(request):
    if not request.user.is_anonymous:
        data = json.loads(request.body)
        try:
            post_review(data)
            return JsonResponse({"status": 200})
        except Exception:
            return JsonResponse({"status": 401, "message": "Error in posting review"})
    return JsonResponse({"status": 403, "message": "Unauthorized"})


import requests as req_lib
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def add_review(request):
    if request.method == "POST":
        import json
        data = json.loads(request.body)
        review_text = data.get("review", "")
        try:
            sentiment_url = "http://localhost:5050/analyze/" + review_text.replace(" ", "+")
            sentiment_res = req_lib.get(sentiment_url)
            sentiment = sentiment_res.json().get("sentiment", "neutral")
        except Exception:
            sentiment = "neutral"
        data["sentiment"] = sentiment
        try:
            req_lib.post("http://localhost:3030/insert_review", json=data)
            return JsonResponse({"status": 200, "sentiment": sentiment})
        except Exception as e:
            return JsonResponse({"status": 500, "error": str(e)})
    return JsonResponse({"status": 405})

def get_cars(request):
    from .models import CarMake, CarModel
    cars = CarModel.objects.select_related('car_make')
    car_list = [{"CarModel": c.name, "CarMake": c.car_make.name, "CarYear": c.year, "CarType": c.type} for c in cars]
    return JsonResponse({"CarModels": car_list})
