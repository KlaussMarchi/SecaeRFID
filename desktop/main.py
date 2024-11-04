import eel
eel.init('static')

from src.database import *
from src.serial import *

@eel.expose
def getActivities():
    with open('tasks.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

@eel.expose
def App():
    print('running')


App()
eel.start('index.html', size=(1100, 768))

