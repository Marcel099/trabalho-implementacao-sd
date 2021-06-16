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

def to_json(objeto):
    return {"seq": objeto.seq, "codigo": objeto.codigo, "DataHora": objeto.datahora, 
            "Latitude": objeto.latitude, "Longitude": objeto.longitude}

def get_response(status, id_payload, payload, mesage=False):
    body = {}
    body[id_payload] = payload
    
    if(mesage):
        body['mesage'] = mesage
    
    return Response(json.dumps(body, default=str), status=status)

#Insert

#SelectAll
@app.route('/selectAll/', methods=['GET'])
def selectAll():
    position_objs = db.session.query(Posicao).all()
    objs_json = [to_json(objeto) for objeto in position_objs]
    return get_response(200, 'Posicao', objs_json, 'OK')

#SelectOne

app.run()