import webview
import os
import sys
import time
from threading import Thread
import logging
from src_api.utils.logger import logger
from src_api.jsapi import Api
log = logging.getLogger(os.path.basename(__file__))


class FStat(object):
    def __init__(self):
        self.name = 'F-Stat'
    
    def start_Server(self):
        pass
    
    def start_UI(self):
        api = Api()
        # webview.create_window('F-Stat', 'ui/index.html',  js_api=api)
        webview.create_window('F-Stat', 'http://localhost:8080/',  js_api=api)
        webview.start(debug=True)



if __name__ == '__main__':
    app = FStat()    
    app.start_UI()
