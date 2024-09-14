import requests
import json
import uuid
import eel

url = r'https://xi-secae-default-rtdb.firebaseio.com/'


def genUUID():
    return uuid.uuid4().__str__()


@eel.expose
def getDatabaseRows(tableName, timeout=10):
    link = url + tableName + '.json'

    try:
        response = requests.get(link, timeout=timeout)
        return list(response.json().values())
    except:
        return None


@eel.expose
def addDatabaseRow(tableName, newData, timeout=10):
    newData = json.dumps(newData)
    link = url + tableName + '.json'
    
    try:
        requests.post(link, data=newData, timeout=timeout)
    except:
        return False
    
    return True


@eel.expose
def findDatabaseRow(tableName, key, value, timeout=10):
    link = url + tableName + '.json'

    try:
        response = requests.get(link, timeout=timeout).json()
    except:
        return None

    for id, data in response.items():
        if data.get(key) is None:
            continue

        if data[key] == value:
            return {'id': id, 'data': data}
        
    return None


@eel.expose
def editDatabaseRow(tableName, id, newData, timeout=10):
    newData = json.dumps(newData)
    link = url + tableName + '/' + id + '.json'
    
    try:
        requests.put(link, data=newData, timeout=timeout)
    except:
        return False
    
    return True


@eel.expose
def deleteDatabaseRow(tableName, id, timeout=10):
    link = url + tableName + '/' + id + '.json'
    requests.delete(link, timeout=timeout)
    return True


