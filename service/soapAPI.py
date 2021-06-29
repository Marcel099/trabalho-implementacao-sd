from spyne import Application, rpc, ServiceBase, Unicode, Boolean, Integer, ComplexModel, Array
from spyne.protocol.soap import Soap12
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server
import psycopg2
import logging


HOST='localhost'
DATABASE='postgres'
USER='postgres'
PASSWORD='rafa'

conn = psycopg2.connect(host=HOST, database=DATABASE, user=USER, password=PASSWORD)


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter("%(asctime)s:%(name)s:%(message)s")
file_handler = logging.FileHandler('soap_INFO.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)


class Vehicle(ComplexModel):
    codigo = Integer
    placa = Unicode
    tipo = Integer
    descricao = Unicode
    visiveltodos = Boolean
    instituicao = Integer

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
    @rpc(Unicode, Integer, Unicode, Boolean, Integer, _returns=Boolean)
    def adiciona(self, placa, tipo, desc, vt, inst):
        try:
            sql = f"INSERT INTO veiculos(placa, tipo, descricao, visiveltodos, instituicao) VALUES " +\
                f"('{placa}', {tipo} ,'{desc}', {vt}, {inst})"

            cur = conn.cursor()
            cur.execute(sql)
            cur.close()

            conn.commit()

            logger.info(conn.commit())
            return True
        except Exception as e:
            logger.error(e)
            return False

    @rpc(Integer, Unicode, Integer, Unicode, Boolean, Integer, _returns=Boolean)
    def altera(self, idveiculo, placa, tipo, desc, vt, inst):
        try:
            sql = f"UPDATE veiculos " +\
                f"SET placa = \'{placa}\', " +\
                f"tipo = {tipo}, " +\
                f"descricao = \'{desc}\', " +\
                f"visiveltodos = {vt}, " +\
                f"instituicao = {inst} " +\
                f"WHERE codigo = {idveiculo}"

            cur = conn.cursor()
            cur.execute(sql)
            cur.close()

            conn.commit()
            
            logger.info(conn.commit())
            return True
        except Exception as e:
            logger.error(e)
            return False

    @rpc(Integer, _returns=Boolean)
    def excluir(self, idveiculo):
        try:
            sql = f'DELETE FROM veiculos WHERE codigo={idveiculo}'
            
            cur = conn.cursor()
            cur.execute(sql)
            cur.close()

            conn.commit()
            
            logger.info(conn.commit())
            return True
        except Exception as e:
            logger.error(e)
            return False

    @rpc(Integer, _returns=Vehicle)
    def consulta(self, idveiculo):
        try:
            sql = f'SELECT * FROM veiculos WHERE codigo={idveiculo}'
            
            cur = conn.cursor()
            cur.execute(sql)
            res_list = cur.fetchone()
            cur.close()

            veiculo = convertVehicleListToVehicleObject(res_list)
            
            logger.info(veiculo)
            return veiculo
        except Exception as e:
            logger.error(e)
            return {}

    @rpc(Integer, _returns=Array(Vehicle))
    def listainstituicao(self, idinstituicao):
        try:
            sql = f'SELECT * FROM veiculos WHERE instituicao={idinstituicao}'
            
            cur = conn.cursor()
            cur.execute(sql)
            res_list = cur.fetchall()
            cur.close()

            parsedVehicleList = map(lambda vehicle_list: convertVehicleListToVehicleObject(vehicle_list), res_list)

            logger.info(parsedVehicleList)
            return parsedVehicleList
        except Exception as e:
            logger.error(e)
            return {}

    @rpc(Integer, Integer, _returns=Array(Vehicle))
    def listatipo(self, idinstituicao, tipoVeiculo):
        try:
            sql = f'SELECT * FROM veiculos WHERE instituicao={idinstituicao} and tipo={tipoVeiculo}'
            
            cur = conn.cursor()
            cur.execute(sql)
            res_list = cur.fetchall()
            cur.close()

            parsedVehicleList = map(lambda vehicle_list: convertVehicleListToVehicleObject(vehicle_list), res_list)
            
            logger.info(parsedVehicleList)
            return parsedVehicleList
        except Exception as e:
            logger.error(e)
            return {}



if __name__ == '__main__':
    application = Application([crudsoap], 'spyne.examples.hello.soap',
                              in_protocol=Soap12(validator='lxml'),
                              out_protocol=Soap12(validator='lxml'))

    wsgi_application = WsgiApplication(application)

    print ("listening to http://127.0.0.1:8000")
    print ("wsdl is at: http://localhost:8000/?wsdl")

    server = make_server('127.0.0.1', 8000, wsgi_application)
    server.serve_forever()
