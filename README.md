Creiei esta estrutura pra ter um ponto de partida no desenvolvimento a partir do express

reate table users (
"id" serial unique,
"singularUser" varchar(255) primary key not null,
"cpf" varchar(255) not null unique,
"email" varchar(512) not null unique,
"pass" varchar(600) not null unique

);
