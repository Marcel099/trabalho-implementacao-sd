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
    
    try: #Tryies to insert the new position into the database
        new_object = Posicao(seq=body['seq'], codigo=body['codigo'], datahora=body['datahora'],
                            latitude=body['latitude'], longitude=body['longitude'])
        db.session.add(new_object)
        db.session.commit()
        return get_response(200, 'Posicao', to_json(new_object), 'OK')
    except Exception as e: #Else, returns an error
        print(e)
        return get_response(400, 'Posicao', {}, 'Bad Resquest')


#Select the last position of a given vehicle
@app.route('/posicao/select/', methods=['GET'])
def select_location():
    args = request.args #Takes arguments: 'vehicleID'
    
    #Creating a list with all matching IDs
    position_objs = db.session.query(Posicao).filter(Posicao.codigo == args['vehicleID'])
    objs_json = [to_json(object) for object in position_objs] #Converting to a Json fotmated object
    
    return get_response(200, 'Posicao', objs_json[-1], 'OK') #Returns the last position in the list


#Select a list of location between a given time
@app.route('/posicao/select/', methods=['GET'])
def select_list_location():
    #Timestamp broke, yet not possible to compare
    args = request.args #Takes arguments: 'vehicleID', 'ftime', 'stime'
    
    print(args['ftime'], args['stime'])
    
    position_objs = db.session.query(Posicao).all()
    objs_json = [to_json(object) for object in position_objs 
                 if str(object.seq) >= args['ftime'] and str(object.seq) <= args['stime'] 
                 and object.codigo == args['vehicleID']]
    
    return get_response(200, 'Posicao', objs_json, 'OK')


app.run()
