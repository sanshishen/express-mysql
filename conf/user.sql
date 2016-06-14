-- create table
create table `user`(
    `id` int(11) not null auto_increment,
    `name` varchar(30),
    `age` tinyint(4),
    primary key (`id`)
) engine=MyISAM default charset=utf-8;