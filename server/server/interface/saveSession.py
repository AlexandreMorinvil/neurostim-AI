from datetime import date
from datetime import datetime
import os
import json

SAVE_SESSIONS_PATH = 'storage'

class SaveSession():
    session_id = None
    patient_id = None
    date = None
    time = None
    dimension = None
    parameter_count = None
    points = []
    querys = []
    hashHeatMap = ""

    def __init__(self, session_id, patient_id,dimension,parameter_count, points,querys) -> None:
        self.session_id = session_id
        self.patient_id = patient_id
        self.date = date.today().strftime("%d/%m/%Y")
        self.time = datetime.now().strftime("%H:%M:%S")
        self.dimension = dimension
        self.parameter_count = parameter_count
        self.points = points
        self.querys = querys

def save_session_local_tablet(session):
    json_object = session.__dict__
    fileData = {
                'session_id' : json_object['session_id'],
                'patient_id' : json_object['patient_id'],
                'date' : json_object['date'],
                'time' : json_object['time'],
                'dimension' : json_object['dimension'],
                'parameter_count' : json_object['parameter_count'],
                'isCheck' : False,
                'points':json_object['points'],
                'querys':json_object['querys']
                }
    return fileData


def save_session_local(session):
    print(' save localy --------------------------')
    print(session.__dict__)
    json_object = json.dumps(session.__dict__)
    
    with open("storage/"+ str(session.session_id) + ".json", "w") as outfile:
        outfile.write(json_object)

    return get_all_save_sessions()

def save_exported_session(session):
    print(' save localy --------------------------') 
    with open("storage/"+ str(session["session_id"]) + ".json", "w") as outfile:
        outfile.write(json.dumps(session))

    return get_all_save_sessions()

def get_all_save_sessions():
    listSession = []
    for file in get_files():
        # Opening JSON file
        with open("storage/" + file, 'r') as openfile:
            # Reading from json file
            json_object = json.load(openfile)
            fileData = {
                'session_id' : json_object['session_id'],
                'patient_id' : json_object['patient_id'],
                'date' : json_object['date'],
                'time' : json_object['time'],
                'dimension' : json_object['dimension'],
                'parameter_count' : json_object['parameter_count'],
                'isCheck' : False
                }
            print(fileData)
            listSession.append(fileData) 
    return listSession

def get_files():
   for file in os.listdir(SAVE_SESSIONS_PATH):
        if os.path.isfile(os.path.join(SAVE_SESSIONS_PATH, file)):
            yield file

def get_session_by_ID(id):
    f = open(SAVE_SESSIONS_PATH+'/'+ str(id) + '.json')
    data = json.load(f)
    print(data)
    return(data)

def delete_sessions_by_ID(listID):
    for id in listID:
        os.remove(SAVE_SESSIONS_PATH+'/'+ str(id) + '.json')
    return get_all_save_sessions()