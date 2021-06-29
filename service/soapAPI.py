from spyne import Application, rpc, ServiceBase, Unicode, Boolean, Integer, ComplexModel, Array
from spyne.protocol.soap import Soap12
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server
# import xml.etree.ElementTree as ET
import psycopg2
import logging

HOST='localhost'
DATABASE='postgres'
# DATABASE='db_esp'
USER='postgres'
PASSWORD='rafa'
# PASSWORD='Breaker#2030'

# SQL_DB_URI = 'postgresql://postgres:Breaker#2030@localhost:5432/db_esp'

conn = psycopg2.connect(host=HOST, database=DATABASE, user=USER, password=PASSWORD)

class Vehicle(ComplexModel):
    codigo = Integer
    placa = Unicode
    tipo = Integer
    descricao = Unicode
    visiveltodos = Boolean
    instituicao = Integer

# def create_xml(res_list):
#         # we make root element
#         usrconfig = ET.Element("usrconfig")
#
#         # create sub element
#         usrconfig = ET.SubElement(usrconfig, "usrconfig")
#
#         # insert list element into sub elements
#         for user in range(len(res_list)):
#
#                 usr = ET.SubElement(usrconfig, "usr")
#                 usr.text = str(res_list[user])
#
#         tree = ET.ElementTree(usrconfig)
#
#         # write the tree into an XML file
#         tree.write("Output.xml", encoding ='utf-8', xml_declaration = True)
#         return tree

def convertVehicleListToVehicleObject(vehicle_list):
    return Vehicle(
        codigo=vehicle_list[0],
        placa=vehicle_list[1],
        tipo=vehicle_list[2],
        descricao=vehicle_list[3],
        visiveltodos=vehicle_list[4],
        instituicao=vehicle_list[5]
    )

class crudsoap(ServiceBase):
    @rpc(Unicode, Integer, Unicode, Boolean, Integer, _returns=Unicode)
    def adiciona(self, placa, tipo, desc, vt, inst):
        sql = f"INSERT INTO veiculos(placa, tipo, descricao, visiveltodos, instituicao) VALUES " +\
              f"('{placa}', {tipo} ,'{desc}', {vt}, {inst})"

        cur = conn.cursor()
        cur.execute(sql)
        cur.close()

        conn.commit()

        
        return "funcao adiciona"

    @rpc(Integer, Unicode, Integer, Unicode, Boolean, Integer, _returns=Unicode)
    def altera(self, idveiculo, placa, tipo, desc, vt, inst):
      
        sql = f"UPDATE veiculos " +\
              f"SET placa = \'{placa}\', " +\
              f"tipo = {tipo}, " +\
              f"descricao = \'{desc}\', " +\
              f"visiveltodos = {vt}, " +\
              f"instituicao = {inst} " +\
              f"WHERE codigo = {idveiculo}"

        cur = conn.cursor()
        cur.execute(sql)
        # cur.fetchone()  # res =
        cur.close()

        conn.commit()
        
        return "alterado"

    @rpc(Integer, _returns=Unicode)
    def excluir(self, idveiculo):
        sql = f'DELETE FROM veiculos WHERE codigo={idveiculo}'
        
        cur = conn.cursor()
        cur.execute(sql)
        # cur.fetchone()  # res =
        cur.close()

        conn.commit()

        # print(create_xml(res_list))
        # print(res_list)
        return 'deletado'

    @rpc(Integer, _returns=Vehicle)
    def consulta(self, idveiculo):
        sql = f'SELECT * FROM veiculos WHERE codigo={idveiculo}'
        
        cur = conn.cursor()
        cur.execute(sql)
        res_list = cur.fetchone()
        cur.close()

        veiculo = convertVehicleListToVehicleObject(res_list)
        

        return veiculo

    @rpc(Integer, _returns=Array(Vehicle))
    def listainstituicao(self, idinstituicao):
        sql = f'SELECT * FROM veiculos WHERE instituicao={idinstituicao}'
        
        cur = conn.cursor()
        cur.execute(sql)
        res_list = cur.fetchall()
        cur.close()

        parsedVehicleList = map(lambda vehicle_list: convertVehicleListToVehicleObject(vehicle_list), res_list)

        return parsedVehicleList

    @rpc(Integer, Integer, _returns=Array(Vehicle))
    def listatipo(self, idinstituicao, tipoVeiculo):
        sql = f'SELECT * FROM veiculos WHERE instituicao={idinstituicao} and tipo={tipoVeiculo}'
        
        cur = conn.cursor()
        cur.execute(sql)
        res_list = cur.fetchall()
        cur.close()


        parsedVehicleList = map(lambda vehicle_list: convertVehicleListToVehicleObject(vehicle_list), res_list)

        return parsedVehicleList


if __name__ == '__main__':
    application = Application([crudsoap], 'spyne.examples.hello.soap',
                              in_protocol=Soap12(validator='lxml'),
                              out_protocol=Soap12(validator='lxml'))

    wsgi_application = WsgiApplication(application)

    print ("listening to http://127.0.0.1:8000")
    print ("wsdl is at: http://localhost:8000/?wsdl")

    server = make_server('127.0.0.1', 8000, wsgi_application)
    server.serve_forever()
