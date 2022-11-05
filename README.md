Creiei esta estrutura pra ter um ponto de partida no desenvolvimento a partir do express

create table users (
"id" serial unique,
"singularUser" varchar(255) primary key not null,
"cpf" varchar(255) not null unique,
"email" varchar(512) not null unique,
"pass" varchar(600) not null unique
);

create table users (
"id" serial unique,
"singularUser" varchar(255) primary key not null,
"role" varchar (32),
"cpf" varchar(255) not null unique,
"email" varchar(512) not null unique,
"pass" varchar(600) not null unique
);

create table groups (
"id" serial unique,
"singularUser" varchar(255) not null,
"singularGroup" varchar(255) not null,

PRIMARY KEY ("singularUser", "singularGroup"),

FOREIGN KEY ("singularUser") REFERENCES "users" ("singularUser")
);

create table categories(
"id" serial unique,
"singularUser" varchar(255) not null,
"singularCategory" VARCHAR(255) not null,

primary key("singularUser","singularCategory"),

FOREIGN KEY ("singularUser") REFERENCES "users" ("singularUser")
);

create table events (
"id" serial unique,
"singularUser" varchar(255) not null,
"singularEvent" varchar(255) PRIMARY KEY not null,
"singularGroup" varchar(255) not null,
"singularCategory" varchar(255) not null,
"description" varchar(8000) not null,
"createDate" Date not null,
"date" Date not null,
"place" varchar(255) not null,
"maxCapacityPerson" integer not null,
"subscriberNumber" varchar(32),

FOREIGN KEY ("singularUser") REFERENCES "users" ("singularUser"),
FOREIGN KEY ("singularUser", "singularGroup") REFERENCES "groups" ("singularUser", "singularGroup"),
FOREIGN KEY ("singularUser","singularCategory") REFERENCES "categories" ("singularUser","singularCategory")
);

create table subscribers(
"id" serial unique,
"singularUser" VARCHAR(255) not null,
"singularEvent" VARCHAR(255) not null,
"subscriptionDate" Date,

primary key("singularEvent","singularUser"),

FOREIGN KEY ("singularUser") REFERENCES "users" ("singularUser"),
FOREIGN KEY ("singularEvent") REFERENCES "events" ("singularEvent")
);


INSERT INTO "groups"("singularUser", "singularGroup", "createDate") VALUES('01', 'Serviço Social', '2022/12/12');
INSERT INTO "categories"("singularUser", "singularCategory") VALUES('01', 'Serviços Sociais');
INSERT INTO "subscribers"("singularUser", "singularEvent", "subscriptionDate") VALUES ('01', '02', '2022/11/03');

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

interactions
{

    "singularEvent":"event01",
    "singularGroup":"group01",
    "singularCategory":"category01",
    "description":"teste",
    "createDate":"2022/11/04",
    "date":"2022/11/04",
    "singularUser":"01",
    "place":"teste",
    "maxCapacityPerson":"teste"

}

SUBSCRIBE/UNSUBSCRIBE

{
"singularUser": "user"
"singularEvent": "event"
}

Concertar erro:

1. criptografar CPF pra não transitar aberto
2. parar de quebrar quando já tem o cadastro no DB
   3.burlar cookie mandando requisição de login com dados de cadastro/registro/group
