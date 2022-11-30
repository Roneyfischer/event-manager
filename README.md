Creiei esta estrutura pra ter um ponto de partida no desenvolvimento a partir do express

create table userRoles(
"id" serial unique,
"role" varchar(8) not null primary key
);

create table eventStatus(
"id" serial unique,
"statusName" varchar(32) not null primary key
);

create table groups (
"id" serial unique,
"singularGroup" varchar(32) not null primary key
);

create table users (
"id" serial unique primary key,
"completeName" varchar(255) not null unique,
"role" varchar (32) not null,
"userGroup" varchar(32) not null,
"cpf" varchar(512) not null unique,
"email" varchar(512) not null unique,
"secondUserId" varchar(512) not null unique,
"pass" varchar(856) not null unique,

FOREIGN KEY ("role") REFERENCES "userroles" ("role") ON UPDATE CASCADE
);

create table categories(
"id" serial unique,
"singularUserId" integer not null,
"singularCategory" VARCHAR(255) not null,

primary key("singularCategory"),

FOREIGN KEY ("singularUserId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

create table events (
"id" serial unique,
"singularUserId" integer not null,
"singularEvent" varchar(255) PRIMARY KEY not null,
"singularGroup" varchar(512) not null,
"singularCategory" varchar(255) not null,
"description" varchar(8000) not null,
"createDate" Date not null,
"date" Date not null,
"place" varchar(255) not null,
"maxCapacityPerson" integer not null,
"subscriberNumber" varchar(32),
"company" varchar(8),
"eventStatus" varchar(32) not null,

FOREIGN KEY ("eventStatus") REFERENCES "eventstatus" ("statusName") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("singularUserId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("singularCategory") REFERENCES "categories" ("singularCategory") ON DELETE CASCADE ON UPDATE CASCADE
);


create table subscribers(
"id" serial unique,
"singularUserId" integer not null,
"completeName" VARCHAR(255) not null,
"singularEventId" integer not null,
"singularEvent" VARCHAR(512) not null,
"subscriptionDate" Date,

primary key("singularEventId","singularUserId"),
FOREIGN KEY ("singularUserId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("singularEvent") REFERENCES "events" ("singularEvent") ON DELETE CASCADE ON UPDATE CASCADE
);

---

// FOREIGN KEY ("singularGroup") REFERENCES "groups" ("singularGroup") ON DELETE CASCADE ON UPDATE CASCADE,


insert into "userroles" ("role") values('anonimous');
insert into "userroles" ("role") values('standard');
insert into "userroles" ("role") values('guest');
insert into "userroles" ("role") values('adm');
insert into "userroles" ("role") values('master');

insert into "groups" ("singularGroup") values('default');
insert into "groups" ("singularGroup") values('gerentes');
insert into "groups" ("singularGroup") values('vendedores');
insert into "groups" ("singularGroup") values('pastores');
insert into "groups" ("singularGroup") values('jovens');

insert into "eventstatus" ("statusName") values('aguardando');
insert into "eventstatus" ("statusName") values('aberto');
insert into "eventstatus" ("statusName") values('encerrado');
insert into "eventstatus" ("statusName") values('cancelado');

UPDATE "users" set "role" = 'master' where "id" = '1';

INSERT INTO "groups"("completeName", "singularGroup", "createDate") VALUES('01', 'Serviço Social', '2022/12/12');
INSERT INTO "categories"("completeName", "singularCategory") VALUES('01', 'Serviços Sociais');
INSERT INTO "subscribers"("completeName", "singularEvent", "subscriptionDate") VALUES ('01', '02', '2022/11/03');

FRONT-END REQUISITION/POSTMAN (/auth):

{
"type": "register",
"completeName":"roney01",
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

FALTA:
ok implementar "unsubscribe"
ok 7.Alterar horário de criação para now

    masterUser pode: .
    implementar "edições"

    implementar "status" do event: aguardando/em inscrição/encerrado/cancelado
    implementar "cancel event"
    implementar "delete event"
