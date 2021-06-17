drop table if exists Posicao;
drop table if exists Veiculos;

create table Veiculos(
	codigo integer not null primary key,
	Placa char(7) not null,
	Tipo integer,
	Descricao varchar(50),
	VisivelTodos boolean not null,
	Instituicao integer
);

create table Posicao(
	seq integer not null primary key,
	codigo integer not null,
	DataHora timestamp,
	Latitude float,
	Longitude float,
	foreign key (codigo) references Veiculos(codigo)
);

insert into Veiculos values (1, 'BRA2E19', 1, 'Carro', true, 1);
insert into Veiculos values (2, 'RIO2A18', 5, 'Caminhão', false, 2);
insert into Veiculos values (3, 'BRA0S17', 2, 'Moto', true, 1);
insert into Veiculos values (4, 'PLQ8F28', 4, 'Ambulância', true, 4);
insert into Veiculos values (5, 'LSN4I49', 1, 'Carro', false, 2);

insert into Posicao values (1, 3, '2021-01-27 23:55:26', -28.2954466, -52.4465927);
insert into Posicao values (2, 4, '2021-03-05 12:42:46', -28.2385866, -52.4565970);
insert into Posicao values (3, 5, '2021-05-10 07:15:30', -28.2277466, -52.3468827);
insert into Posicao values (4, 2, '2020-08-05 14:27:15', -28.2900466, -52.4065576);
insert into Posicao values (5, 1, '2021-04-17 16:08:13', -28.2923466, -52.4425617);

select * from Veiculos;
select * from Posicao;
