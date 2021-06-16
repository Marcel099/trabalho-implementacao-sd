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
base = automap_base()
base.prepare(db.engine, reflect=True)
Posicao = base.classes.posicao

#Function to return a Json formated response
def to_json(object):
    try:
        return {"DataHora": object.datahora, "Latitude": object.latitude, "Longitude": object.longitude}
    except OSError as err:
        return "Erro {0}".format(err)
    
#Function to return formated responses
def get_response(status, id_payload, payload, mesage=False):
    body = {}
    body[id_payload] = payload
    
    if(mesage):
        body['mesage'] = mesage
    
    try:
        return Response(json.dumps(body, default=str), status=status)
    except OSError as err:
        return "Error: {0}".format(err)


#Insert
def insert():
    pass

#SelectAll
@app.route('/selectAll/<int:init_id>/<int:end_id>', methods=['GET'])
def selectAll(init_id, end_id):
    position_objs = db.session.query(Posicao).all()
    objs_json = [to_json(object) for object in position_objs 
                 if object.seq >= init_id and object.seq <= end_id]
    
    return get_response(200, 'Posicao', objs_json, 'OK')

#SelectOne
def selectOne():
    pass


app.run()