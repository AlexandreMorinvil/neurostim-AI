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
from algorithm.vizualization import generate_heatmap_image
import numpy as np
import random
from interface.watchData import WatchData
#from database import Database

####################################################################################################
#### Represent the different mode available to tranfer data
#### SERIAL : watch - tablet - server - dataBase 
#### STAR : all data is pass to the server
####################################################################################################
class Mode(Enum):
    SERIAL = 0
    STAR = 1

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
                                                               first_parameter_name, 
                                                               second_parameter_name)

            # Response format
            return {
                "heatmap_base64_jpeg_image" :           json.dumps(heatmap_base64_jpeg_image),
                "parameter_graph_base64_jpeg_image":    "",
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
            self.current_session = Session(1, NeuroAlgorithmPrediction())
            self.current_session.algorithm.generate_space(dimensions)
            
            # Response format
            return  { 
                "status" : Session_status.START.value
            }

    def release(self, *_) -> None:
        if self.current_handler != None:
            self.current_handler.release()
        sys.exit(0)

    def push_watch_data_in_stack(self, data):
        if(self.current_save_session):
            self.stack_watch_data += data
            #print(self.stack_watch_data)
            print("push in stack")


    def free_stack_watch_data(self):
        self.stack_watch_data = []
        print("free stack")
