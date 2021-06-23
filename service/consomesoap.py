from zeep import *

client = Client('http://localhost:8000/?wsdl')
response = client.service.adiciona()
print(response)