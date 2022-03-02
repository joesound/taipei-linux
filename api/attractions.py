from flask import Flask, render_template, request, session, redirect, url_for, Blueprint



app_api_attractions = Blueprint('attractions', __name__, url_prefix='/api')

@app_api_attractions.route("/attractions", method="GET")
def attractions():
    pass


@app_api_attractions.route("/attraction/<id>", method="GET")
def attractions(id):
    pass








