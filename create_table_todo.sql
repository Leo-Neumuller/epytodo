CREATE DATABASE IF NOT EXISTS `epytodo`;
USE `epytodo`;

CREATE TABLE `todo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL UNIQUE,
  `description` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `due_time` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'not started',
  `user_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;