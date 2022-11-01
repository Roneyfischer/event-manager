Creiei esta estrutura pra ter um ponto de partida no desenvolvimento a partir do express

reate table users (
"id" serial unique,
"singularUser" varchar(255) primary key not null,
"cpf" varchar(255) not null unique,
"email" varchar(512) not null unique,
"pass" varchar(600) not null unique

);

FRONT-END REQUISITION/POSTMAN (/auth):

{
"type": "register",
"singularUser":"roney01",
"cpf": "07399617996",
"email": "fischer.roney@gmail.com",
"pass": "123456",
"passConfirmation":"123456"
}

{
"type": "login",
"cpf": "8",
"pass": "8"  
}

Concertar erro:
1.criptografar CPF pra não transitar aberto
