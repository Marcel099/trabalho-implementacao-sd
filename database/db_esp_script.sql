drop sequence if exists Veiculos_codigo_INC cascade;
drop sequence if exists Posicao_seq_INC cascade;
drop table if exists Veiculos cascade;
drop table if exists Posicao cascade;

CREATE SEQUENCE Veiculos_codigo_INC INCREMENT 1;
CREATE SEQUENCE Posicao_seq_INC INCREMENT 1;

create table Veiculos(
	codigo integer not null primary key default nextval('Veiculos_codigo_INC'::regclass),
	Placa char(7) not null,
	Tipo integer,
	Descricao varchar(50),
	VisivelTodos boolean not null,
	Instituicao integer
);

create table Posicao(
	seq integer not null primary key default nextval('Posicao_seq_INC'::regclass),
	codigo integer not null,
	DataHora timestamp,
	Latitude float,
	Longitude float,
	foreign key (codigo) references Veiculos(codigo)
);

insert into Veiculos(Placa, Tipo, Descricao, VisivelTodos, Instituicao) values 
('BRA2E19', 1, 'Carro', true, 1),
('RIO2A18', 5, 'Caminhão', false, 2),
('BRA0S17', 2, 'Moto', true, 1),
('PLQ8F28', 4, 'Ambulância', true, 4),
('LSN4I49', 1, 'Carro', false, 2);

insert into Posicao(codigo, DataHora, Latitude, Longitude) values 
(3, '2021-01-27 23:55:26', -28.2954466, -52.4465927),
(4, '2021-03-05 12:42:46', -28.2385866, -52.4565970),
(5, '2021-05-10 07:15:30', -28.2277466, -52.3468827),
(2, '2020-08-05 14:27:15', -28.2900466, -52.4065576),
(1, '2021-04-17 16:08:13', -28.2923466, -52.4425617),
(2, '2020-08-05 14:30:45', -28.2900457, -52.4065570);

select * from Veiculos;
select * from Posicao;
