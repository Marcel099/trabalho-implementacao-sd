from spyne import Application, rpc, ServiceBase, Unicode, AnyXml
from spyne.protocol.soap import Soap12
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server
import xml.etree.ElementTree as ET
import psycopg2
import logging

HOST='localhost'
DATABASE='postgres'
USER='postgres'
PASSWORD='rafa'

conn = psycopg2.connect(host=HOST, database=DATABASE, user=USER, password=PASSWORD)

def create_xml(res_list):
        # we make root element
        usrconfig = ET.Element("usrconfig")
  
        # create sub element
        usrconfig = ET.SubElement(usrconfig, "usrconfig")
  
        # insert list element into sub elements
        for user in range(len(res_list)):
  
                usr = ET.SubElement(usrconfig, "usr")
                usr.text = str(res_list[user])
  
        tree = ET.ElementTree(usrconfig)
  
        # write the tree into an XML file
        tree.write("Output.xml", encoding ='utf-8', xml_declaration = True)
        return tree


class crudsoap(ServiceBase):
    @rpc(Unicode, Unicode, Unicode, Unicode, Unicode, _returns=Unicode)
    def adiciona(self, placa, tipo, desc, vt, inst):
        sql = ("INSERT INTO veiculos(placa, tipo, descricao, visiveltodos, instituicao) VALUES (%s, %s ,%s, %s, %s)" % (placa, tipo, desc, vt, inst))
        
        cur = conn.cursor()
        cur.execute(sql)
        cur.close()
        
        return ("funcao adiciona")

    @rpc(Unicode, _returns=Unicode)
    def altera(self, idveiculo):
        sql = ('UPDATE veiculo SET %s=%s WHERE codigo = ' % idveiculo)
        
        cur = conn.cursor()
        cur.execute(sql)
        res = cur.fetchone()
        cur.close()
        
        return "deletado"

    @rpc(Unicode, _returns=Unicode)
    def excluir(self, idveiculo):
        sql = f'DELETE FROM veiculos WHERE codigo={idveiculo}'
        
        cur = conn.cursor()
        cur.execute(sql)
        res_list = cur.fetchone()
        cur.close()
        
        print(create_xml(res_list))
        print(res_list)
        return 'deletado'

    @rpc(Unicode, _returns=Unicode)
    def consulta(self, idveiculo):
        sql = f'SELECT * FROM veiculos WHERE codigo={idveiculo}'
        
        cur = conn.cursor()
        cur.execute(sql)
        res_list = cur.fetchone()
        cur.close()
        
        print(create_xml(res_list))
        print(res_list)
        return "OK"

    @rpc(Unicode, _returns=Unicode)
    def listainstituicao(self, idinstituicao):
        sql = f'SELECT * FROM veiculos WHERE instituicao={idinstituicao}'
        
        cur = conn.cursor()
        cur.execute(sql)
        res_list = cur.fetchall()
        cur.close()
        
        print(create_xml(res_list))
        print(res_list)
        return "OK"

    @rpc(Unicode, Unicode, _returns=Unicode)
    def listatipo(self, idinstituicao, tipoVeiculo):
        sql = f'SELECT * FROM veiculos WHERE instituicao={idinstituicao} and tipo={tipoVeiculo}'
        
        cur = conn.cursor()
        cur.execute(sql)
        res_list = cur.fetchall()
        cur.close()
        
        print(create_xml(res_list))
        print(res_list)
        return "OK"


application = Application([crudsoap], 'spyne.examples.hello.soap',
                          in_protocol=Soap12(validator='lxml'),
                          out_protocol=Soap12(validator='lxml'))

wsgi_application = WsgiApplication(application)

if __name__ == '__main__':
    print ("listening to http://127.0.0.1:8000")
    print ("wsdl is at: http://localhost:8000/?wsdl")

    server = make_server('127.0.0.1', 8000, wsgi_application)
    server.serve_forever()