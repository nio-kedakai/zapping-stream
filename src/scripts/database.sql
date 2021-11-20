DROP DATABASE IF EXISTS zapping_db;   
CREATE DATABASE IF NOT EXISTS zapping_db;   
USE zapping_db; 

DROP TABLE IF EXISTS cuenta; 

CREATE TABLE IF NOT EXISTS cuenta 
  ( 
     id           INT            PRIMARY KEY auto_increment, 
     nombre       VARCHAR(25)    NOT NULL, 
     contrasena   CHAR(25)       NOT NULL, 
     email        VARCHAR(100)   UNIQUE NOT NULL
  ); 