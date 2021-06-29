from flask import Flask, request, Response
from flask_cors import CORS
from zeep import *
import logging
import json

#Logging management
logger = logging.getLogger(__name__) #Creatting logger
logger.setLevel(logging.INFO) 

#Setting logger parameters
formatter = logging.Formatter('%(asctime)s:%(name)s:%(message)s')

file_handler = logging.FileHandler('balancer_INFO.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)


#Create connection
app = Flask(__name__)

client = Client('http://localhost:8000/?wsdl')


CORS(app) #controlling CORS error
cors = CORS(app, resources={
    r'/*': {
        'origins': '*'   #Grantting access to all origins
    }
})


#Function returning Json formated response
def to_json(object):
    try:
        res = {"seq": object.seq, "DataHora": object.datahora, "Latitude": object.latitude, "Longitude": object.longitude}
        return res
    except Exception as e:
        logger.error(e)
        return get_response(400, {}, 'Bad Resquest')
    

#Function returning formated responses
def get_response(status, payload, mesage=False):
    body = {}
    body = payload
    
    if(mesage):
        body['mesage'] = mesage
    
    try:
        res = Response(json.dumps(body, default=str), status=status)
        return res
    except Exception as e:
        logger.error(e)
        return get_response(400, {}, 'Bad Resquest')



#Insert new location in the database
@app.route('/veiculo/adiciona', methods=['POST'])
def adiciona():
    try: 
        args = request.agrs
        res = client.service.adiciona(args['placa'], args['tipo'], args['desc'], args['vt'], args['inst'])
        
        logger.info(res)
        return res
    except Exception as e: #Else, returns an error
        logger.exception(e)
        return Response(json.dumps('Bad Request', default=str), status=400)


#Select the last position of a given vehicle
@app.route('/veiculo/altera', methods=['GET'])
def altera():
    try:
        args = request.args
        
        res = client.service.altera(args['idveiculo'], args['placa'], args['tipo'], args['desc'], args['vt'], args['inst'])
        
        logger.info(res)
        return res
    except Exception as e:
        logger.info(e)
        logger.info(get_response(400, {}))
        return get_response(400, {}) #In case of an empty list
        

#Select a list of location between a given time
@app.route('/veiculo/axcluir', methods=['GET'])
def excluir():
    try:
        args = request.args

        res = client.service.excluir(args['idveiculo'])
                                   
        logger.info(res)
        return res
    except Exception as e:
        logger.error(e)
        logger.info(get_response(400, {}))
        return get_response(400, {}) #In case of an empty list


@app.route('/veiculo/consulta', methods=['GET'])
def consulta():
    try:
        args = request.args

        res = client.service.excluir(args['idveiculo'])
                                   
        logger.info(res)
        return res
    except Exception as e:
        logger.error(e)
        logger.info(get_response(400, {}))
        return get_response(400, {}) #In case of an empty list


@app.route('/veiculo/listainstituicao', methods=['GET'])
def listainstituicao():
    try:
        args = request.args

        res = client.service.listainstituicao(args['idinstituicao'])
                                   
        logger.info(res)
        return res
    except Exception as e:
        logger.error(e)
        logger.info(get_response(400, {}))
        return get_response(400, {}) #In case of an empty list


@app.route('/veiculo/listatipo', methods=['GET'])
def listatipo():
    try:
        args = request.args

        res = client.service.listatipo(args['idinstituicao'], args['tipoVeiculo'])
                                   
        logger.info(res)
        return res
    except Exception as e:
        logger.error(e)
        logger.info(get_response(400, {}))
        return get_response(400, {}) #In case of an empty list
    

app.run()
