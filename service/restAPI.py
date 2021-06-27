from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from flask_cors import CORS
import datetime as dt
import json

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
        return {"DataHora": object.datahora, "Latitude": object.latitude, "Longitude": object.longitude}
    except Exception as e:
        print(e)
        return get_response(400, '', {}, 'Bad Resquest')
    

#Function returning formated responses
def get_response(status, payload_id, payload, mesage=False):
    body = {}
    body[payload_id] = payload
    
    if(mesage):
        body['mesage'] = mesage
    
    try:
        return Response(json.dumps(body, default=str), status=status)
    except Exception as e:
        print(e)
        return get_response(400, '', {}, 'Bad Resquest')



#Insert new location in the database
@app.route('/posicao/insert', methods=['POST'])
def insert_location():
    body = request.get_json() #Gets a Json formated input for body
    
    datahora = dt.datetime.fromtimestamp(body['datahora'])
    
    try: #Tryies to insert the new position into the database
        new_object = Posicao(codigo=body['codigo'], datahora=datahora,
                            latitude=body['latitude'], longitude=body['longitude'])
        db.session.add(new_object)
        db.session.commit()
        return "200 Successfully inserted"
    except Exception as e: #Else, returns an error
        print(e)
        return "400 Bad Resquest"


#Select the last position of a given vehicle
@app.route('/posicao/select', methods=['GET'])
def select_location():
    args = request.args #Takes arguments: 'vehicleID'
    
    #Creating a list with all matching IDs
    position_objs = db.session.query(Posicao).filter(Posicao.codigo == args['vehicleID'])
    objs_json = [to_json(object) for object in position_objs] #Converting to a Json fotmated object
    
    try:
        return get_response(200, 'Posicao', objs_json[-1], 'OK') #Returns the last position in the list
    except:
        return get_response(200, 'Posicao', {}, 'OK') #In case of an empty list

#Select a list of location between a given time
@app.route('/posicao/select-list', methods=['GET'])
def select_list_location():
    args = request.args #Takes arguments: 'vehicleID', 'ftime', 'stime'
    
    ftime = dt.datetime.fromtimestamp(int(args['ftime']))
    stime = dt.datetime.fromtimestamp(int(args['stime']))
    
    position_objs = db.session.query(Posicao).all() #Querying the table Posicao
    objs_json = [to_json(object) for object in position_objs 
                 if str(object.datahora) >= ftime and str(object.datahora) <= stime 
                 and str(object.codigo) == args['vehicleID']] #Converting to a Json fotmated object
    
    return get_response(200, 'Posicao', objs_json, 'OK')


app.run()
