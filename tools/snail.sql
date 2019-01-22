 
 
 CREATE TABLE `books` (   
   `id` int(11) NOT NULL AUTO_INCREMENT,   
   `isbn` varchar(20) NOT NULL,   
   `openid` varchar(50) NOT NULL,   
   `title` varchar(100) NOT NULL,   
   `image` varchar(200) DEFAULT NULL,   
   `alt` varchar(200) NOT NULL,   
   `publisher` varchar(100) NOT NULL,   
   `summary` varchar(1000) NOT NULL,   
   `price` varchar(50) DEFAULT NULL,   
   `rate` float DEFAULT NULL,   
   `tags` varchar(100) DEFAULT NULL,   
   `authors` varchar(50) DEFAULT NULL,   
   `count` int(11) DEFAULT '0',   PRIMARY KEY (`id`) 
  ) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) NOT NULL,
  `bookid` varchar(10) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

CREATE TABLE `talks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) NOT NULL,
  `talk` varchar(1000) NOT NULL,
  `pics` varchar(20000) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `create_time` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

CREATE TABLE `talk_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `talkid` varchar(50) NOT NULL,
  `openid` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;