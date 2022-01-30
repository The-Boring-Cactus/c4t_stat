from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from flask import request
import os
import sys
import time
from threading import Thread
import logging
from src_api.utils.logger import logger
from src_api.jsapi import Api
log = logging.getLogger(os.path.basename(__file__))

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/css/<path>', methods=['GET'])
def ccs(path):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui', 'css'), path)


@app.route('/js/<path>', methods=['GET'])
def js(path):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui', 'js'), path)


@app.route('/icons/<path>', methods=['GET'])
def icons(path):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui', 'icons'), path)


@app.route('/lib/<path>', methods=['GET'])
def lib(path):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui', 'lib'), path)


@app.route('/fonts/<path>', methods=['GET'])
def fonts(path):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui', 'fonts'), path)


# Index
@app.route('/', methods=['GET'])
def index():
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui'), 'index.html')

@app.route('/getMenu', methods=['GET'])
@cross_origin()
def getMenu():
    api = Api()
    return api.getMenu()

@app.route('/getData', methods=['GET'])
@cross_origin()
def getData():
    id = request.args.get('id')
    api = Api()
    return api.getData(id)

@app.route('/insert', methods=['POST'])
@cross_origin()
def insert():
    data =  request.get_json(silent=True)
    data_id = data['data_id']
    title = data['title']
    data = data['data']
    api = Api()
    return api.insert(data_id, title, data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
