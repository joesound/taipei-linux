
from flask import Flask, render_template, request, session, redirect, url_for, Blueprint, make_response

from utils.getattactions import get_attraction_by_page_keyword, get_attraction_by_id
from utils.querystrcheck import query_str_check, query_by_id
import json

app_api_attractions = Blueprint('attraction', __name__, url_prefix='/api')

@app_api_attractions.route("/attractions", methods=['GET'])
def attractions_by_page_keyword():
    get_query_page = request.args.get('page')
    get_query_keyword = request.args.get('keyword')
    index_data_format, query_data_info = query_str_check(get_query_page,get_query_keyword)
    if index_data_format:
        query_data = get_attraction_by_page_keyword(query_data_info[0],query_data_info[1])
        response = make_response(json.dumps(query_data))
        response.headers['Access-Control-Allow-Origin']='*'
        return  response
    else:
        return  json.dumps(query_data_info)

@app_api_attractions.route("/attraction/<id>", methods=['GET'])
def attraction_by_id(id):
    index_data_format, query_id_info = query_by_id(id)
    if index_data_format:
        data = get_attraction_by_id(query_id_info)
        return  json.dumps(data)
    else:
        return json.dumps(query_id_info)

@app_api_attractions.route("/attraction/", methods=['GET'])
def attraction_no_insert_id():
    data = {"error": True,"message": "請輸入 api/attraction/<id>"}
    return json.dumps(data)








