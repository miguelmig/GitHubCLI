drop table if exists "user" cascade;
drop table if exists "languages" cascade;

create table "user" (
  "id" int primary key,
  "username" varchar (40),
  "name" varchar (60),
  "location" varchar (60),
  "company" varchar (60)
);

create table "languages" (
  "id" serial primary key,
  "user_id" int,
  "language" varchar (40),
  foreign key ("user_id") references "user" ("id")
);
