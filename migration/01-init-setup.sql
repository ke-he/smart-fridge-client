create table "user" (
    id int primary key,
    email varchar(255) not null,
    name varchar(255) not null
);

create table home (
    id int primary key generated always as identity,
    name varchar(255) not null
);

create table user_home_link (
    userId int,
    homeId int,
    joinDate date not null default current_timestamp,
    isOwner boolean not null default false,
    primary key (userId, homeId),
    foreign key (userId) references "user"(id),
    foreign key (homeId) references home(id)
);

create table fridge (
    id int primary key generated always as identity,
    name varchar(255) not null
);

create table home_fridge_link (
    homeId int,
    fridgeId int,
    primary key (homeId, fridgeId),
    foreign key (homeId) references home(id)
);

create table item_type (
    id int primary key generated always as identity,
    name varchar(255) not null
);

create table item (
    id int primary key generated always as identity,
    name varchar(255) not null,
    itemTypeId int not null,
    expirationDate date not null,
    foreign key (itemTypeId) references item_type(id)
);

create table item_type_home_link (
    itemTypeId int,
    homeId int,
    primary key (itemTypeId, homeId),
    foreign key (itemTypeId) references item_type(id),
    foreign key (homeId) references home(id)
);

create table item_home_link (
    itemId int,
    homeId int,
    primary key (itemId, homeId),
    foreign key (itemId) references item(id),
    foreign key (homeId) references home(id)
);

create table fridge_item_link (
    itemId int,
    fridgeId int,
    primary key (itemId, fridgeId),
    foreign key (itemId) references item(id),
    foreign key (fridgeId) references fridge(id)
);

-- Insert mock data into user table
INSERT INTO "user" (id, email, name) VALUES
    (1, 'john.doe@example.com', 'John Doe'),
    (2, 'jane.smith@example.com', 'Jane Smith');

-- Insert mock data into home table
INSERT INTO home (name) VALUES
    ('Home 1'),
    ('Home 2');

-- Insert mock data into user_home_link table
INSERT INTO user_home_link (userId, homeId, joinDate, isOwner) VALUES
    (1, 1, '2023-01-01', true),
    (2, 2, '2023-01-02', false);

-- Insert mock data into fridge table
INSERT INTO fridge (name) VALUES
    ('Fridge 1'),
    ('Fridge 2');

-- Insert mock data into home_fridge_link table
INSERT INTO home_fridge_link (homeId, fridgeId) VALUES
    (1, 1),
    (2, 2);

-- Insert mock data into item_type table
INSERT INTO item_type (name) VALUES
    ('Dairy'),
    ('Vegetables');

-- Insert mock data into item table
INSERT INTO item (name, itemTypeId, expirationDate) VALUES
    ('Milk', 1, '2023-12-01'),
    ('Carrot', 2, '2023-12-10');

-- Insert mock data into item_type_home_link table
INSERT INTO item_type_home_link (itemTypeId, homeId) VALUES
    (1, 1),
    (2, 2);

-- Insert mock data into item_home_link table
INSERT INTO item_home_link (itemId, homeId) VALUES
    (1, 1),
    (2, 2);

-- Insert mock data into fridge_item_link table
INSERT INTO fridge_item_link (itemId, fridgeId) VALUES
    (1, 1),
    (2, 2);
