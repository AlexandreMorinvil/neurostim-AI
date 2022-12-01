import json
import random
from time import sleep
import requests
from interface.watchData import WatchData

IP = 'localhost'
PORT = '5000'

API_ENDPOINT  = 'http://'+ IP + ':' + PORT +'/watch_packet'
PACKET_SIZE = 50
SLEEP_TIME = 1






def generate_packet(size: int):
   packet = []
   for i in range(size):
      n = str(random.randint(0, 9))
      watchData = WatchData(n,n,n,n,n,n).__dict__
      packet.append(watchData)
   return packet
   
def sendPacket(packet):
   response = requests.post(url = API_ENDPOINT, data = json.dumps(packet))
   #print(response.text)

def run():
   while(1):
      packet = generate_packet(PACKET_SIZE)
      print(packet)
      sendPacket(packet)
      sleep(SLEEP_TIME)


if __name__ == '__main__':  
   print('start mock watch object ...')
   run()
