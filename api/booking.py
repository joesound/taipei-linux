from flask import Flask, render_template, request, session, redirect, url_for, Blueprint, make_response
import json
from utils.creatJWT import creat_user_JWT, decode_user_JWT
from utils.bookmiddleware import get_user_book, check_book_content, booking_trip, delete_user_book

app_api_booking = Blueprint('uesr_booking', __name__, url_prefix='/api')
request_url = "http://52.73.173.92:3000"

@app_api_booking.route("/booking", methods=['GET','POST','DELETE','OPTIONS'])
def user_booking():
    if request.method == "GET":
        user_JWT = request.cookies.get('user_token')
        if user_JWT == None:
            response = make_response(json.dumps({"error":True, "message":"未登入系統，拒絕存取"}))
            response.headers['Access-Control-Allow-Origin']=request_url
            response.headers['Access-Control-Allow-Credentials']= "true"
            return response
        decoded_JWT = decode_user_JWT(user_JWT)
        user_email = decoded_JWT["email"]
        code, data = get_user_book(user_email)
        print(data)
        response = make_response(json.dumps(data))
        response.headers['Access-Control-Allow-Origin']=request_url
        response.headers['Access-Control-Allow-Credentials']= "true"
        return response

    if request.method == "POST":
        user_JWT = request.cookies.get('user_token')
        if user_JWT == None:
            response = make_response(json.dumps({"data":None}))
            response.headers['Access-Control-Allow-Origin']=request_url
            response.headers['Access-Control-Allow-Credentials']= "true"
            return response
        attraction_booking_info = json.loads(request.data)
        print(attraction_booking_info)
        decoded_JWT = decode_user_JWT(user_JWT)
        user_email = decoded_JWT["email"]
        book_info  = {"email":user_email, "attractionid":attraction_booking_info["attractionid"], "date":attraction_booking_info["date"], "time":attraction_booking_info["time"], "price":attraction_booking_info["price"]}
        index, message = check_book_content(book_info)
        if index:
            code, message = booking_trip(book_info)
            response = make_response(json.dumps(message))
            response.headers['Access-Control-Allow-Origin']=request_url
            response.headers['Access-Control-Allow-Credentials']= "true"
            return response
        else:
            message = {"error":True, "message":message}
            response = make_response(json.dumps(message))
            response.headers['Access-Control-Allow-Origin']=request_url
            response.headers['Access-Control-Allow-Credentials']= "true"
            return response

    if request.method == "DELETE":
        user_JWT = request.cookies.get('user_token')
        if user_JWT == None:
            response = make_response(json.dumps({"error":True, "message":"未登入系統，拒絕存取"}))
            response.headers['Access-Control-Allow-Origin']=request_url
            response.headers['Access-Control-Allow-Credentials']= "true"
            return response
        decoded_JWT = decode_user_JWT(user_JWT)
        user_email = decoded_JWT["email"]
        code, message = delete_user_book(user_email)
        response = make_response(json.dumps(message))
        response.headers['Access-Control-Allow-Origin']=request_url
        response.headers['Access-Control-Allow-Credentials']= "true"
        return response


    if request.method == "OPTIONS":
        message = {"ok":True}
        header_request_method = request.headers['Access-Control-Request-Method']
        # request_url = request.headers['Origin']
        response = make_response(json.dumps(message))
        response.headers['Access-Control-Allow-Origin']=request_url
        response.headers['Access-Control-Allow-Credentials']= "true"
        response.headers['Access-Control-Allow-Methods']= header_request_method
        return response
