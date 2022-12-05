from enum import Enum
from inspect import _void
import json
from lib2to3.pgen2.token import STAR
import sys
from typing import Callable, Union
from command import Action
from command import Session_status
from algorithm.NeuroAlgorithmPrediction import NeuroAlgorithmPrediction
from interface.session import Session
from interface.saveSession import *
from algorithm.vizualization import generate_2d_graph_image, generate_heatmap_image
import numpy as np
import random
from interface.watchData import WatchData

####################################################################################################
#### This class execute process depend of the command and the choosen mode
####################################################################################################
class CommandHandler:
    def __init__(self, socketIO):
        self.stack_watch_data = []
        self.current_handler = None
        self.socketIO = socketIO
        self.ssid = None
        self.current_session = None
        self.current_save_session = None
        #self.db : Database = Database()
        #self.db.connect()

####################################################################################################
#### START_SESSION : Create a new session.
#### EXECUTE_QUERY : Execute one iteration of the algorithme
#### RECEIVE_DATA_WATCH : debug canal to recive watch data
####################################################################################################
    def handle_command(self, action: int, arg: Union[int, dict, str]) -> Union[None, list, int]:
        print("Action :", action, ", Arguments :", arg)

        if action == Action.EXECUTE_QUERY.value:
            # Arguments parsing
            parameters_value_list = [int(value) for value in arg["parameters_value_list"]]
            tremor_metric = float(arg["tremor_metric"])

            # Handling : Execute query and generate vizualzations
            algorithm = self.current_session.algorithm
            position, next_query = algorithm.execute_query(parameters_value_list, tremor_metric)

            # save query
            if(self.current_save_session):
                self.current_save_session.querys.append({
                    'parameters_value_list': arg["parameters_value_list"],
                    'tremor_metric' : arg["tremor_metric"],
                    'time': datetime.now().strftime("%H:%M:%S")
                    })
                print(self.current_save_session.querys)

            # Response format
            return {
                "suggested_parameters_list":            json.dumps(next_query)
            }

        elif action == Action.GET_VIZUALIZATIONS.value:

            # Arguments parsing
            first_parameter_index = int(arg["first_parameter"])
            second_parameter_index = int(arg["second_parameter"])
            first_parameter_name = str(arg["first_parameter_name"])
            second_parameter_name = str(arg["second_parameter_name"])

            # Handling : Generate vizualzations
            algorithm = self.current_session.algorithm
            heatmap_base64_jpeg_image = generate_heatmap_image(algorithm.ymu,
                                                               algorithm.dimensions_list,
                                                               first_parameter_index,
                                                               second_parameter_index,
                                                               second_parameter_name,
                                                               first_parameter_name)

            # Save visualisation
            self.current_save_session.hashHeatMap = json.dumps(heatmap_base64_jpeg_image)

            graph_2d_base64_jpeg_image = generate_2d_graph_image(algorithm.ymu,
                                                                 algorithm.dimensions_list,
                                                                 first_parameter_index,
                                                                 first_parameter_name)
            # Response format
            return {
                "heatmap_base64_jpeg_image" :           json.dumps(heatmap_base64_jpeg_image),
                "parameter_graph_base64_jpeg_image":    json.dumps(graph_2d_base64_jpeg_image)
            }

        elif action == Action.RECEIVE_DATA_WATCH.value:
            print(arg["value"])
            if(self.ssid):
                self.socketIO.emit('message', arg["value"], room=self.ssid)

        elif action == Action.START_SESSION.value:
            self.free_stack_watch_data()
            # Arguments parsing
            dimensions = arg["dimensions"]

            # Handling : Create session
            self.current_save_session = SaveSession(random.randint(0, 1000), random.randint(0, 1000),str(arg["dimensions"]), 2, [], [])
            self.current_session = Session(1, NeuroAlgorithmPrediction())
            self.current_session.algorithm.generate_space(dimensions)

            # Response format
            return  {
                "status" : Session_status.START.value
            }

        elif action == Action.START_SESSION.value:
            print('stop session')

        elif action == Action.SAVE_SESSION_LOCAL.value:
            if(self.current_save_session):
                self.current_save_session.points = self.stack_watch_data
                sessions = save_session_local(self.current_save_session)
                self.current_save_session = SaveSession(random.randint(0, 1000), random.randint(0, 1000),'10x10', 2, [], [])
                print(sessions)
                return  sessions
            else :
                 return get_all_save_sessions()

        elif action == Action.GET_SESSION_BY_ID.value:
            session = get_session_by_ID(arg["id"])
            return session

        elif action == Action.GET_SESSION_INFO.value:
            return get_all_save_sessions()

        elif action == Action.DELETE_SESSIONS.value:
            print('Delete session')
            return delete_sessions_by_ID(arg["listID"])
        
        elif action == Action.SAVE_SESSION_LOCAL_TABLET.value:
            if (self.current_save_session):
                print('save_session_local_tablet call')
                self.current_save_session.points = self.stack_watch_data
                return save_session_local_tablet(self.current_save_session)

        elif action == Action.EXPORT_SESSION_TO_DISTANT_SERVER.value:
            print(arg["session"])
            save_exported_session(arg["session"])
            return True




    def release(self, *_) -> None:
        if self.current_handler != None:
            self.current_handler.release()
        sys.exit(0)

    def push_watch_data_in_stack(self, data):
        if(self.current_save_session):
            self.stack_watch_data += data
            print("push in stack")


    def free_stack_watch_data(self):
        self.stack_watch_data = []
        print("free stack")
