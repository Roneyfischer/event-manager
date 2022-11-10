Creiei esta estrutura pra ter um ponto de partida no desenvolvimento a partir do express

create table userRoles(
"id" serial unique,
"role" varchar(8) not null primary key
);

create table users (
"id" serial unique primary key,
"singularUser" varchar(255) not null,
"role" varchar (32),
"cpf" varchar(255) not null unique,
"email" varchar(512) not null unique,
"secondUserId" varchar(512) not null unique,
"pass" varchar(600) not null unique,

FOREIGN KEY ("role") REFERENCES "userroles" ("role") ON UPDATE CASCADE
);

create table groups (
"id" serial unique,
"singularUserId" integer not null,
"singularGroup" varchar(255) not null,

PRIMARY KEY ("singularUserId", "singularGroup"),

FOREIGN KEY ("singularUserId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

create table categories(
"id" serial unique,
"singularUserId" integer not null,
"singularCategory" VARCHAR(255) not null,

primary key("singularUserId","singularCategory"),

FOREIGN KEY ("singularUserId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

create table events (
"id" serial unique,
"singularUserId" integer not null,
"singularEvent" varchar(255) PRIMARY KEY not null,
"singularGroup" varchar(255) not null,
"singularCategory" varchar(255) not null,
"description" varchar(8000) not null,
"createDate" Date not null,
"date" Date not null,
"place" varchar(255) not null,
"maxCapacityPerson" integer not null,
"subscriberNumber" varchar(32),
"company" varchar(8),

FOREIGN KEY ("singularUserId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("singularUserId", "singularGroup") REFERENCES "groups" ("singularUserId", "singularGroup") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("singularUserId","singularCategory") REFERENCES "categories" ("singularUserId","singularCategory") ON DELETE CASCADE ON UPDATE CASCADE
);

create table subscribers(
"id" serial unique,
"singularUserId" integer not null,
"singularEvent" VARCHAR(255) not null,
"subscriptionDate" Date,

primary key("singularEvent","singularUserId"),

FOREIGN KEY ("singularUserId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("singularEvent") REFERENCES "events" ("singularEvent") ON DELETE CASCADE ON UPDATE CASCADE
);

---

insert into "userroles" ("role") values('adm');
insert into "userroles" ("role") values('standard');

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
   4.burlar cookie mandando requisição de login com dados de cadastro/registro/group
3. desfazer no auth/login macarrão
   7-1 o user Standard e Adm pode excluir somente a própria conta. Fazer a leitura
4. somente user adm pode editar e criar: categorias, grupos, eventos
   8-1.implementar funções de edição
   9.implementar função de un/subscription
5. Na rota, chamar uma função externa que verificar o JWToken e retorna direciona o conteúdo. Tirar regras das rotas.
6. masterUser pode: excluir usuários de terceiros, alterar ROLE de qualquer usuário, criar usuários de terceiros.
   7.Alterar horário de criação para now
