from zeep import *

client = Client('http://localhost:8000/?wsdl')
# response = client.service.adiciona('BRA0S19', 3, 'Bicicleta', True, 3)
# print(response)
#
# response = client.service.altera(10, 'BRA0S19', 3, 'Bicicleta Alterada', True, 3)
# print(response)

# response = client.service.excluir(10)
# print(response)

# response = client.service.consulta(5)
# print(response)

response = client.service.listainstituicao(2)
print(response)

# response2 = client.service.listatipo(2, 5)
# print(response2)
