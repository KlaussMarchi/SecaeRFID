import eel, sys
eel.init('static')

from src.database import *
from src.serial import *

activities = None
selectedActivitie = None

@eel.expose
def getActivities():
    global activities, selectedActivitie

    if activities:
        return activities

    activities = getDatabaseRows('activities')

    if not activities:
        return [{'label': 'None', 'value': 'None'}]
    
    selectedActivitie = activities[0]
    return activities


@eel.expose
def setActivitie(val):
    global selectedActivitie
    print(val)
    selectedActivitie = val


@eel.expose
def getActivitie():
    global selectedActivitie
    return selectedActivitie


@eel.expose
def App():
    print('running')


if __name__ == '__main__':    
    App()

    try:
        eel.start('index.html', size=(1100, 768))
    except Exception as e:
        eel.start('index.html', size=(1100, 768), mode='default')

