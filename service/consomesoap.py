from zeep import *

client = Client('http://localhost:8000/?wsdl')
response = client.service.consulta(2)
print(response)