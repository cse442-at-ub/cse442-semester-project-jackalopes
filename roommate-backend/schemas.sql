-- Define user table schema
CREATE TABLE user (
    uid bigint(20) NOT NULL UNIQUE AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone tinytext NOT NULL,
    password varchar(1024) NOT NULL,
    PRIMARY KEY (uid)
);
