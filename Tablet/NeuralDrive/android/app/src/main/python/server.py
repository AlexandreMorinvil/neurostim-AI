import logging
import json
import signal
from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask import jsonify
from flask.wrappers import Response
from command_handler import CommandHandler
import numpy as np






def main():
    # Server initializations
    app = Flask(__name__)
    socketio = SocketIO(app, cors_allowed_origins="*")
    CORS(app)
    ssid = None

    # Deactivate socket.io logs
    logging.getLogger('socketio').setLevel(logging.ERROR)
    logging.getLogger('engineio').setLevel(logging.ERROR)
    logging.getLogger('werkzeug').setLevel(logging.ERROR)

    # Initialize the command handler
    command_handler = CommandHandler(socketio)

    # Server connections global variables
    connections_set = set()

    ####################################################################################################
    #### Handling the socket connections.
    ####################################################################################################
    @socketio.on('connect')
    def handle_connection():
        connections_set.add(request.sid)
        print("New User {request.sid} connected.  Current users :", connections_set)

    ####################################################################################################
    #### Handling the socket disconnections.
    ####################################################################################################
    @socketio.on('disconnect')
    def handle_disconnection():
        connections_set.discard(request.sid)
        print("User disconnected. Current users : ", connections_set)

    ####################################################################################################
    #### Reception of packets from the smart watch from the socket connected to the smart watch and 
    #### transfer the packet to the connected tablets via the socket connection.
    ####################################################################################################
    @socketio.on('watch_packet')
    def handle_watch_packet(watch_packet):
        emit('watch_packet', watch_packet, broadcast=True, includde_self=False)

    ####################################################################################################
    #### Reception of packets from the smart watch over HTTP and transfer the packet to the connected 
    #### tablets via the socket connection.
    ####################################################################################################
    @app.route("/watch_packet/", methods=["POST", "GET"])
    def watch_packet() -> Response:
        data = request.data.decode('UTF-8')
        response = "packet accepted" 
        data= json.loads(data)
        command_handler.push_watch_data_in_stack(data)
        
        print(data)
        socketio.emit('watch_packet', json.dumps(data), broadcast=True, includde_self=False)
        return jsonify({"content": response})



    ####################################################################################################
    #### Reception and handling of commands from the tablet.
    ####################################################################################################
    @app.route("/command", methods=["POST", "GET"])
    def command() -> Response:
        command = request.get_json()
        response = None
        if command != None:
            response = command_handler.handle_command(command["action"], command["arg"])
        return jsonify({"content": response})

        
    socketio.run(app, host='0.0.0.0',allow_unsafe_werkzeug=True)