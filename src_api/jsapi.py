from src_api.db import DataStore
class Api:
    def __init__(self):
        self.name = 'Api'
        self.dataStore = DataStore()
    
    def insert(self, data_id, title, data):
        response = {
            'message': self.dataStore.insert(data_id, title,  data)
        }
        return response
    
    def getMenu(self):
        response = {
            'menu': self.dataStore.getMenu()
        }
        return response
    
    def getData(self, id):
        response = {
            'data': self.dataStore.getData(id)
        }
        return response

    def error(self):
        raise Exception('This is a Python exception')