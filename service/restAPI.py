from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
import json

#SQL_DB_USER = postgresql://user:password@localhost:port/database
SQL_DB_URI = 'postgresql://postgres:Breaker#2030@localhost:5432/db_esp'

#Create connection
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = SQL_DB_URI

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
def get_response(status, id_payload, payload, mesage=False):
    body = {}
    body[id_payload] = payload
    
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
    body = request.get_json()
    
    try:
        new_object = Posicao(seq=body['seq'], codigo=body['codigo'], datahora=body['datahora'],
                            latitude=body['latitude'], longitude=body['longitude'])
        db.session.add(new_object)
        db.session.commit()
        return get_response(200, 'Posicao', to_json(new_object), 'OK')
    except Exception as e:
        print(e)
        return get_response(400, 'Posicao', {}, 'Bad Resquest')


#Select the last position of a given vehicle
@app.route('/posicao/select/<int:vehicleID>/', methods=['GET'])
def select_location(vehicleID):
    #Error: returning all the position where codigo == ID
    #Will be fixed in the next update
    position_objs = db.session.query(Posicao).filter(Posicao.codigo == vehicleID)
    objs_json = [to_json(object) for object in position_objs]
    
    return get_response(200, 'Posicao', objs_json, 'OK')


#Select a list of location between a given time
@app.route('/posicao/select/<int:vehicleID>/<init_time>/<end_time>/', methods=['GET'])
def select_list_location(vehicleID, init_time, end_time):
    #Timestamp broke, yet not possible to compare
    position_objs = db.session.query(Posicao).all()
    objs_json = [to_json(object) for object in position_objs 
                 if int(object.seq) >= int(init_time) and int(object.seq) <= int(end_time) 
                 and object.codigo == vehicleID]
    
    return get_response(200, 'Posicao', objs_json, 'OK')



app.run()
