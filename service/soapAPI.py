from spyne import Application, rpc, ServiceBase, Unicode
from spyne.protocol.soap import Soap12
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server
import psycopg2

HOST='localhost'
DATABASE='postgres'
USER='postgres'
PASSWORD='rafa'

conn = psycopg2.connect(host=HOST, database=DATABASE, user=USER, password=PASSWORD)

cur = conn.cursor()

class crudsoap(ServiceBase):
    @rpc(_returns=Unicode)
    def adiciona(self):
        return ("funcao adiciona")

    @rpc(_returns=Unicode)
    def altera(self):
        cur.execute('DELETE FROM veiculos WHERE codigo=', idveiculo)
         res = cur.fetchone()
         cur.close()
         return res

    @rpc(Unicode, _returns=Unicode)
    def excluir(self, idveiculo):
        cur.execute('DELETE FROM veiculos WHERE codigo=', idveiculo)
         res = cur.fetchone()
         cur.close()
         return res

    @rpc(Unicode, _returns=Unicode)
    def consulta(self, idveiculo):
         cur.execute('SELECT * FROM veiculos WHERE codigo=',idveiculo)
         res = cur.fetchone()
         cur.close()
         return res

    @rpc(Unicode, _returns=Unicode)
    def listainstituicao(self, idinstituicao):
        cur.execute('SELECT * FROM veiculos WHERE instituicao=',str(idinstituicao))
         res = cur.fetchone()
         cur.close()
         return res

    @rpc(Unicode, Unicode, _returns=Unicode)
    def listatipo(self, idveiculo, idinstituicao):
        cur.execute('SELECT * FROM veiculos WHERE instituicao={} and codigo={}'.format(idinstituicao, idveiculo))
         res = cur.fetchone()
         cur.close()
         return res


application = Application([crudsoap], 'spyne.examples.hello.soap',
                          in_protocol=Soap12(validator='lxml'),
                          out_protocol=Soap12())

wsgi_application = WsgiApplication(application)

if __name__ == '__main__':
    print ("listening to http://127.0.0.1:8000")
    print ("wsdl is at: http://localhost:8000/?wsdl")

    server = make_server('127.0.0.1', 8000, wsgi_application)
    server.serve_forever()