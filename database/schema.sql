DROP TABLE IF EXISTS `challan`;
CREATE TABLE `challan` (
  `challan_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_id` int DEFAULT NULL,
  `violation_id` int DEFAULT NULL,
  `officer_id` int DEFAULT NULL,
  `challan_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`challan_id`),
  KEY `vehicle_id` (`vehicle_id`),
  KEY `violation_id` (`violation_id`),
  KEY `officer_id` (`officer_id`),
  CONSTRAINT `challan_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`vehicle_id`),
  CONSTRAINT `challan_ibfk_2` FOREIGN KEY (`violation_id`) REFERENCES `violation` (`violation_id`),
  CONSTRAINT `challan_ibfk_3` FOREIGN KEY (`officer_id`) REFERENCES `officer` (`officer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `driver`;

CREATE TABLE `driver` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `license_number` (`license_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `officer`;

CREATE TABLE `officer` (
  `officer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `badge_number` varchar(50) DEFAULT NULL,
  `station` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`officer_id`),
  UNIQUE KEY `badge_number` (`badge_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `challan_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `challan_id` (`challan_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`challan_id`) REFERENCES `challan` (`challan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE `vehicle` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_number` varchar(20) DEFAULT NULL,
  `owner_name` varchar(100) DEFAULT NULL,
  `vehicle_type` varchar(50) DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `vehicle_number` (`vehicle_number`),
  KEY `driver_id` (`driver_id`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `violation`;
CREATE TABLE `violation` (
  `violation_id` int NOT NULL AUTO_INCREMENT,
  `violation_type` varchar(100) DEFAULT NULL,
  `fine_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`violation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

