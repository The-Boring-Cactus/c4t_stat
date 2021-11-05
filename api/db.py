from tinydb import TinyDB, Query
import json
class DataStore:
    def __init__(self):
        self.name = 'DataStore'
        self.db = TinyDB('data.dat')
        self.data = self.db.table('data')
        self.analysis = self.db.table('analysis')
    
    def insert(self, data_id, title, data):
        Data = Query()
        jdata = json.loads(data)
        return self.data.upsert({'id': data_id, 'title': title, 'data': jdata}, Data.id == data_id)
    
    def getMenu(self):
        data = self.data.all()
        menu = []
        for d in data:
            menu.append({'id': d['id'], 'title': d['title']})
        return menu

    def getData(self, id):
        Data = Query()
        data = self.data.search(Data.id==id)
        return data[0]