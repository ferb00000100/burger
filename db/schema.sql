DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

create table burgers (
    id int auto_increment,
    burger_name varchar(30) not null,
    devoured BOOLEAN,
    primary key(id)
);
