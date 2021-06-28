from zeep import *

client = Client('http://localhost:8000/?wsdl')
response = client.service.adiciona('BRA0S19', 3, 'Bicicleta', True, 3)
print(response)