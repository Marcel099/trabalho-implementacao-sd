from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from flask_cors import CORS
import datetime as dt
import logging
import json

#Logging management
logger = logging.getLogger(__name__) #Creatting logger
logger.setLevel(logging.INFO) 

#Setting logger parameters
formatter = logging.Formatter('%(asctime)s:%(name)s:%(message)s')

file_handler = logging.FileHandler('INFO.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)


#SQL_DB_USER = postgresql://user:password@localhost:port/database
SQL_DB_URI = 'postgresql://postgres:Breaker#2030@localhost:5432/db_esp'

#Create connection
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = SQL_DB_URI

CORS(app) #controlling CORS error
cors = CORS(app, resources={
    r'/*': {
        'origins': '*'   #Grantting access to all origins
    }
})

#Create connection object
db = SQLAlchemy(app)
base = automap_base()                   #Mapping the existent tables
base.prepare(db.engine, reflect=True)   #Reflecting tables 
Posicao = base.classes.posicao          #Creating object from the table 'Posicao'


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
@app.route('/posicao/insert', methods=['POST'])
def insert_location():
    try: #Tryies to insert the new position into the database
        body = request.get_json() #Gets a Json formated input for body
        
        datahora = dt.datetime.strptime(body['datahora'], '%Y-%m-%d %H:%M:%S')
    
        new_object = Posicao(codigo=int(body['codigo']), datahora=datahora,
                            latitude=float(body['latitude']), longitude=float(body['longitude']))
        db.session.add(new_object)
        db.session.commit()
        
        res = Response(json.dumps(default=str), status=201)
        logger.info(res)
        return res
    except Exception as e: #Else, returns an error
        logger.exception(e)
        return Response(json.dumps('Bad Request', default=str), status=400)


#Select the last position of a given vehicle
@app.route('/posicao/select', methods=['GET'])
def select_location():
    try:
        args = request.args #Takes arguments: 'vehicleID'
        
        #Creating a list with all matching IDs
        position_objs = db.session.query(Posicao).filter(Posicao.codigo == args['vehicleID'])
        objs_json = [to_json(object) for object in position_objs] #Converting to a Json fotmated object
    
        res = get_response(200, objs_json[-1]) #Returns the last position in the list
        
        logger.info(res)
        return res
        
    except Exception as e:
        logger.info(e)
        logger.info(get_response(200, {}))
        return get_response(200, {}) #In case of an empty list
        


#Select a list of location between a given time
@app.route('/posicao/select-list', methods=['GET'])
def select_list_location():
    try:
        args = request.args #Takes arguments: 'vehicleID', 'firstTime', 'secTime'

        position_objs = db.session.query(Posicao).all() #Querying the table Posicao
        objs_json = [to_json(object) for object in position_objs 
                    if str(object.datahora) >= args['firstTime'] and str(object.datahora) <= args['secTime'] 
                    and str(object.codigo) == args['vehicleID']] #Converting to a Json fotmated object
        
        res = get_response(200, objs_json)
        logger.info(res)
        return res
    except Exception as e:
        logger.error(e)
        logger.info(get_response(200, {}))
        return get_response(200, {}) #In case of an empty list


app.run()
