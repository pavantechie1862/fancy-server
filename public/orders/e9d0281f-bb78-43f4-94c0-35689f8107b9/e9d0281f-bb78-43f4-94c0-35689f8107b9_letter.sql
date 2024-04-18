-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: lims
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` varchar(20) NOT NULL,
  `branch` varchar(30) DEFAULT NULL,
  `address` text,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('B1','Vizag',NULL),('B2','Guntur',NULL),('B3','LB nagar',NULL),('B4','Punjagutta',NULL);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(60) DEFAULT NULL,
  `reporting_name` varchar(100) NOT NULL,
  `reporting_address` text,
  `billing_name` varchar(100) NOT NULL,
  `billing_address` text,
  `email` varchar(100) DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `gst_number` varchar(20) DEFAULT NULL,
  `pan_number` varchar(20) DEFAULT NULL,
  `work_order` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (3,'CUST003','LMN Ltd.','789 Oak Road, Villagetown, USA','LMN Ltd.','789 Oak Road, Villagetown, USA','lmn@example.com','+1-567-890-1234','GST7890123','PANLMN789','WO23456'),(4,'CUST004','PQR Enterprises','101 Pine Street, Hamletville, USA','PQR Enterprises','101 Pine Street, Hamletville, USA','pqr@example.com','+1-234-567-8901','GST4567890','PANPQR012','WO78901'),(5,'CUST005','EFG Inc.','222 Cedar Lane, Countryside, USA','EFG Inc.','222 Cedar Lane, Countryside, USA','efg@example.com','+1-345-678-9012','GST2345678','PANEFG345','WO56789'),(6,'CUST006','JKL Solutions','333 Birch Street, Mountainview, USA','JKL Solutions','333 Birch Street, Mountainview, USA','jkl@example.com','+1-456-789-0123','GST8901234','PANJKL678','WO67890'),(7,'CUST007','RST Group','444 Maple Avenue, Lakeside, USA','RST Group','444 Maple Avenue, Lakeside, USA','rst@example.com','+1-567-890-1234','GST3456789','PANRST901','WO12345'),(8,'CUST008','UVW Enterprises','555 Oak Street, Riverdale, USA','UVW Enterprises','555 Oak Street, Riverdale, USA','uvw@example.com','+1-678-901-2345','GST9012345','PANUVW234','WO23456'),(9,'CUST009','MNO Ltd.','666 Elm Road, Hillside, USA','MNO Ltd.','666 Elm Road, Hillside, USA','mno@example.com','+1-789-012-3456','GST0123456','PANMNO567','WO56789'),(10,'CUST010','GHI Inc.','777 Pine Lane, Seaville, USA','GHI Inc.','777 Pine Lane, Seaville, USA','ghi@example.com','+1-890-123-4567','GST1238901','PANGHI890','WO78901'),(11,'CUST011','ABC Company','123 Main Street, Cityville, USA','ABC Company','123 Main Street, Cityville, USA','abc@example.com','+1-123-456-7890','GST1234567','PANABCP123','WO12345'),(12,'CUST012','XYZ Corporation','456 Elm Avenue, Townburg, USA','XYZ Corporation','456 Elm Avenue, Townburg, USA','xyz@example.com','+1-987-654-3210','GST9876543','PANXYZ456','WO67890'),(13,'CUST013','LMN Ltd.','789 Oak Road, Villagetown, USA','LMN Ltd.','789 Oak Road, Villagetown, USA','lmn@example.com','+1-567-890-1234','GST7890123','PANLMN789','WO23456'),(14,'CUST014','PQR Enterprises','101 Pine Street, Hamletville, USA','PQR Enterprises','101 Pine Street, Hamletville, USA','pqr@example.com','+1-234-567-8901','GST4567890','PANPQR012','WO78901'),(15,'CUST015','EFG Inc.','222 Cedar Lane, Countryside, USA','EFG Inc.','222 Cedar Lane, Countryside, USA','efg@example.com','+1-345-678-9012','GST2345678','PANEFG345','WO56789'),(16,'CUST016','JKL Solutions','333 Birch Street, Mountainview, USA','JKL Solutions','333 Birch Street, Mountainview, USA','jkl@example.com','+1-456-789-0123','GST8901234','PANJKL678','WO67890'),(17,'CUST017','RST Group','444 Maple Avenue, Lakeside, USA','RST Group','444 Maple Avenue, Lakeside, USA','rst@example.com','+1-567-890-1234','GST3456789','PANRST901','WO12345'),(18,'CUST018','UVW Enterprises','555 Oak Street, Riverdale, USA','UVW Enterprises','555 Oak Street, Riverdale, USA','uvw@example.com','+1-678-901-2345','GST9012345','PANUVW234','WO23456'),(19,'CUST019','MNO Ltd.','666 Elm Road, Hillside, USA','MNO Ltd.','666 Elm Road, Hillside, USA','mno@example.com','+1-789-012-3456','GST0123456','PANMNO567','WO56789'),(20,'CUST020','GHI Inc.','777 Pine Lane, Seaville, USA','GHI Inc.','777 Pine Lane, Seaville, USA','ghi@example.com','+1-890-123-4567','GST1238901','PANGHI890','WO78901'),(25,'','','','','','','','','',''),(32,'16ea5287-6','CONNECT CONCRETE LLP','SYNO 125/A, 1 14 mokila, Shankarpally, Rangareddy, Telangana, 501203','CONNECT CONCRETE LLP','SYNO 125/A, 1 14 mokila, Shankarpally, Rangareddy, Telangana, 501203','qc@connectconcrete.in','8008360567','36AAWFK4214G1Z5','AAWFK4214G','null');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dept_id` varchar(50) NOT NULL,
  `department` varchar(50) DEFAULT NULL,
  `additional_info` text,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('BUSSINESS_DEVELOPEMENT','Business Development',NULL),('DPR','DPR',NULL),('FINANCE_ACCOUNTS','Finance & Accounts',NULL),('GEO_TECHNICAL','Geo-technical',NULL),('HIGHWAYS','Highways',NULL),('HR_ADMINISTRATION','H.R & Administration',NULL),('LABORATORY_CHEMICAL','Laboratory – Chemical',NULL),('LABORATORY_MECHANICAL','Laboratory – Mechanical',NULL),('LAND_AQUASITION','Land Acquisition',NULL),('PAVEMENT_TRAFFIC','Pavement & Traffic',NULL),('SHM_A','SHM & A',NULL),('SOFTWARE','Software',NULL),('STRUCTURES','Structures',NULL),('SURVEY','Survey',NULL);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `emp_id` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `personnel_mail` varchar(100) DEFAULT NULL,
  `address` text,
  `additional_info` text,
  `appointed_date` date DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `supervisor` varchar(50) DEFAULT NULL,
  `ssc_certificate` varchar(255) DEFAULT NULL,
  `intermediate_certificate` varchar(255) DEFAULT NULL,
  `degree_certificate` varchar(255) DEFAULT NULL,
  `adhar` varchar(255) DEFAULT NULL,
  `pan` varchar(255) DEFAULT NULL,
  `bank_account` varchar(255) DEFAULT NULL,
  `appointment_letter` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `hashed_password` text,
  `department` varchar(50) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `access` varchar(60) DEFAULT NULL,
  `leaves` int DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `department` (`department`),
  KEY `role` (`role`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`department`) REFERENCES `department` (`dept_id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`role`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('KDM001','Srinivasulu','Kunchala','8179769162','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-25',0.00,'B4','EMP001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM001/profile_image_KDM001.jpg','2023-10-26','KunchalaKDM001','$2b$10$dMQQ4kssopcKc90d9bsc7Ozkqs5pY7oRk94ADyoaOMDI7yw/WnbPK','GEO_TECHNICAL',106,'ADMIN',2),('KDM002','Subhashini','Kunchala','8179769162','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-19',0.00,'B3','KDM001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM002/profile_image_KDM002.jpeg','2023-10-28','KunchalaKDM002','$2b$10$Ue72A9/6Fsj254vN/WwMtu7mUlCVhjg.1et/uPVx8MKKqWJSS/WRm','FINANCE_ACCOUNTS',107,'ADMIN',2),('KDM003','Chandra Sekhar','Sunkara','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-18',0.00,'B3','KDM054',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM003/profile_image_KDM003.jpg','2023-10-27','SunkaraKDM003','$2b$10$cmglkPcBY8.w5equ2OcZpOrrx4nI69gqHrcpIhBHVSSiiGv/lWGPy','LABORATORY_CHEMICAL',108,'ANALYST',2),('KDM015','Raju','Katta','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-25',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM015/profile_image_KDM015.jpg','2023-10-20','KattaKDM015','$2b$10$Jm58NqT2pi4xGIwkwiyaa.kuuNg6Ayt7wawyohCvMQRshdikigvMu','LABORATORY_MECHANICAL',114,'ANALYST',2),('KDM017','Srinivas','B','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-25',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM017/profile_image_KDM017.jpg','2023-10-20','BKDM017','$2b$10$WvQVhVsBpyIfvq6pQnqau.3kiZCrFMlzjsTUYUcMuRC8RAHV5yjdm','LABORATORY_MECHANICAL',109,'ANALYST',2),('KDM054','Srinivasarao','Bhuvanagiri','8179769162','pavanmarapalli171862@gmail.com','KDM Engineers (India) Private Limited, \r\nGuntur, D.No.62/7B,Block \r\nNo.9,R.Agraharam,, Etkur Road,Guntur \r\nDistrict, Guntur-522003, Andhra Pradesh','','2023-10-26',0.00,'B3','KDM001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM054/profile_image_KDM054.jpg','2023-10-27','BhuvanagiriKDM054','$2b$10$f9WrP7cKrmoh6i.FPR6Lvun0HRYWDvrZmkHUJSly2qIgtC0YZ7G0q','LABORATORY_CHEMICAL',117,'HOD',2),('KDM063','Sai kumar','B','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-26',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM063/profile_image_KDM063.jpg','2023-10-28','BKDM063','$2b$10$o4ZrekziMEkj5nNGbASl6uqDFc/I1RLhA/Nn1k/vvW2PdrVAA37fu','LABORATORY_MECHANICAL',118,'ANALYST',2),('KDM086','Srinivas','Gunti','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-25',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM086/profile_image_KDM086.jpg','2023-10-27','GuntiKDM086','$2b$10$I8iC/vNvFnupL7YJlfNHROvB9sY0z55V4L4k0e8QEPGTgDQqF.VOK','LABORATORY_MECHANICAL',109,'ANALYST',2),('KDM093','Chandra Sekhar Gupta ','Illuri','8179769162','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-11-01',0.00,'B3','KDM001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM093/profile_image_KDM093.jpg','2023-10-26','IlluriKDM093','$2b$10$3pqI/X6txNcpqqT.BjOPfevg9IQ0o2PBzJ1SAoXjlFIzYW0uaz1oi','BUSSINESS_DEVELOPEMENT',119,NULL,2),('KDM129','Ramesh','Lingoju','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-26',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM129/profile_image_KDM129.jpg','2023-10-27','LingojuKDM129','$2b$10$BtgzF/b896XqdCx3Ug1F5u.PEimRdTwRn6bJYfdnbCHNXPdfzncKa','LABORATORY_MECHANICAL',129,'ANALYST',2),('KDM225','Srikanth','S','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-19',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM225/profile_image_KDM225.jpg','2023-10-28','SKDM225','$2b$10$s5SnLkYHh97JT/xCompTXe2cxJzl330J85Jp.gsNWGDWT1lS9H7Ly','LABORATORY_MECHANICAL',124,'ANALYST',2),('KDM268','Venkateshwar Reddy','J','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-26',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM268/profile_image_KDM268.jpg','2023-10-27','JKDM268','$2b$10$G0lSt3CVuglRNSCvZSDW/eSBjFvzAhj62TDBxd31N4eZp7xVexuti','LABORATORY_MECHANICAL',123,'ANALYST',2),('KDM269','Mahesh','B','9398187618','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-25',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM269/profile_image_KDM269.jpg','2023-10-27','BKDM269','$2b$10$4i2Roxp3SZWGHTg2amsrmeNV4gKZd9gyND69wIyqnPmVjIzIRrHC.','LABORATORY_MECHANICAL',123,'ANALYST',2),('KDM276','Srikanth','B','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-26',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM276/profile_image_KDM276.jpg','2023-10-21','BKDM276','$2b$10$zwy0pm9XLZd.61hc6h/bHOH6sjbDfqjKXe5xTySCLba1MR199sbA2','LABORATORY_MECHANICAL',124,'ANALYST',2),('KDM311','Srikanth','Dharala','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-11',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM311/profile_image_KDM311.jpg','2023-10-26','DharalaKDM311','$2b$10$kQZK7M6arJom0Sgge708F.vP15qG/v2lkSJveAm8DIMopaoapVNJa','LABORATORY_MECHANICAL',114,'ANALYST',2),('KDM338','Suresh','Rambala','8179769162','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-27',0.00,'B3','KDM001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM338/profile_image_KDM338.jpg','2023-10-26','RambalaKDM338','$2b$10$TL1/y8j2v0KMsQqYNhvvbeiPoVOS8iek4uhz2aqwxxFrUDSsTPA3a','LABORATORY_MECHANICAL',132,'HOD',2),('KDM361','Mahesh','Limgoju','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-24',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM361/profile_image_KDM361.jpg','2023-10-27','LimgojuKDM361','$2b$10$TrMJWgniEvq5fWJY5y3Yq.1nGcROM4rU81.opq46D.4NpKhqjBMyG','LABORATORY_MECHANICAL',136,'ANALYST',2),('KDM382','Ashok','Dasari','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-25',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM382/profile_image_KDM382.jpg','2023-10-28','DasariKDM382','$2b$10$TmvtMr5BzCgzhilJWOxRJuPQvavrAOJ/eLVE8c1OdJ0LthPNBAZ6a','LABORATORY_MECHANICAL',139,'ANALYST',2),('KDM384','Sateesh','Chinaboina','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-18',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM384/profile_image_KDM384.jpg','2023-10-21','ChinaboinaKDM384','$2b$10$3UHjhTd4Ac2/pGtayRMCp..93kTwJ/i/dznpYT13DsyDuSGT..xAu','LABORATORY_MECHANICAL',139,'ANALYST',2),('KDM389','Karthik Reddy','Pabbathireddy','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-18',0.00,'B3','KDM001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM389/profile_image_KDM389.jpg','2023-10-20','PabbathireddyKDM389','$2b$10$2rmw6.cvYEi/seX3mqkJBeLOWqLxi27S21gg84GIwi6r0KMtAObK6','HR_ADMINISTRATION',141,NULL,2),('KDM393','Venkata vishweshwara pavanedra','Sarasa','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-25',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM/profile_image_KDM.jpg','2023-10-20','SarasaKDM','$2b$10$obu9CvMGB1VRHmOyLgKcI.soNAYNE6lnDEMkP1MTTfLm16zARjOBO','LABORATORY_MECHANICAL',145,'ANALYST',2),('KDM396','Ravi kumar singh','','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-26',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM396/profile_image_KDM396.jpg','2023-10-21','KDM396','$2b$10$tJFmaERJxGNobq7dFeX9Uu5A2wyoVYLoZp9xKlxq8aj9Kq4h.14bC','LABORATORY_MECHANICAL',145,'ANALYST',2),('KDM410','Feroz','Sheik','7382309959','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-19',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM410/profile_image_KDM410.jpg','2023-10-20','SheikKDM410','$2b$10$CxoxImNoW4jo.tiQLC3LPOIYFyhjZh/9DDOZVQI0MM/LDRyv8w9Bm','LABORATORY_MECHANICAL',123,'ANALYST',2),('KDM411','Dattu reddy','Mugdhampur','9398187618','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-25',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM411/profile_image_KDM411.jpg','2023-10-20','MugdhampurKDM411','$2b$10$sooOITt5ZobtngjTtr6J4e7rDTPlhOjnaPXbgSg0SWjcyjetwxxNy','LABORATORY_MECHANICAL',148,'ANALYST',2),('KDM414','Dinesh Kumar','Bathula','8179769162','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-19',0.00,'B3','KDM001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM414/profile_image_KDM414.jpg','2023-10-19','BathulaKDM414','$2b$10$87uMjInkCwY8IGLBZ2ThN.uHsvJC1LkiQ2g8.5VFWbHaDG6mG9aUK','SOFTWARE',149,NULL,2),('KDM416','Shekhar','Chennaboina','8179769162','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-18',0.00,'B3','KDM338',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM416/profile_image_KDM416.jpg','2023-10-20','ChennaboinaKDM416','$2b$10$NAtFIDDn4KNYKQMEy4dO3uLmsvlzVoS99vHIH8tb556WSptdMOnoy','LABORATORY_MECHANICAL',123,'ANALYST',2),('KDM419','Saleem','Shaik','8179769162','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-10-26',0.00,'B3','KDM054',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM419/profile_image_KDM419.jpeg','2023-10-26','ShaikKDM419','$2b$10$QYDRGEs/Z9/YoPqiLSO5seVqKcA.KWOZrpoCm2J6krymqvjx5VdkC','LABORATORY_CHEMICAL',116,'ANALYST',2),('KDM426','Venkata Satya Sai Uday Kiran','Eaty','9398187618','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-06-28',0.00,'B3','KDM001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM426/profile_image_KDM426.jpg','2023-11-03','EatyKDM426','$2b$10$pvJM1XCBV35vShfCTCML..szH72JTV6W1blEp1f0/GIXKTma9lPUa','SOFTWARE',153,NULL,2),('KDM427','Pavan','Marapalli','8179769162','pavanmarapalli171862@gmail.com','KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.','','2023-07-01',0.00,'B3','KDM001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/public/employee/KDM427/profile_image_KDM427.jpg','2023-07-20','MarapalliKDM427','$2b$10$ZDW7yuFt5y2Us.fWFnZI7..oDPm08G./88J1kdxBpMh2XXhlg1/uW','SOFTWARE',153,NULL,2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(20) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `subject` text,
  `reason` text,
  `applied_on` date DEFAULT NULL,
  `reporting_manager_approval` tinyint(1) DEFAULT NULL,
  `reporting_manager_approval_date` date DEFAULT NULL,
  `hr_approval` tinyint(1) DEFAULT NULL,
  `hr_approval_on` date DEFAULT NULL,
  `reject` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `leaves_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_groups`
--

DROP TABLE IF EXISTS `material_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_groups` (
  `id` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `additional_info` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_groups`
--

LOCK TABLES `material_groups` WRITE;
/*!40000 ALTER TABLE `material_groups` DISABLE KEYS */;
INSERT INTO `material_groups` VALUES ('GROUP-001','Building Materials','Suppliers of various construction materials.'),('GROUP-002','Solid Fuels','Suppliers of coal, wood, and other solid fuels.'),('GROUP-003','Water','Providers of clean drinking water services.'),('GROUP-004','Building materials - Reinforced structures','Suppliers of materials for reinforced concrete structures.'),('GROUP-005','Ores and Minerals','Miners and suppliers of ores and minerals.'),('GROUP-006','Soil and Rock','Providers of soil and rock excavation services.');
/*!40000 ALTER TABLE `material_groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_material_groups` BEFORE INSERT ON `material_groups` FOR EACH ROW BEGIN
  DECLARE next_serial INT;
  SET next_serial = (SELECT IFNULL(MAX(CAST(SUBSTRING(id, 7) AS SIGNED)), 0) + 1 FROM material_groups);
  SET NEW.id = CONCAT('GROUP-', LPAD(next_serial, 3, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `material_test`
--

DROP TABLE IF EXISTS `material_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sample_id` varchar(70) DEFAULT NULL,
  `test_id` int DEFAULT NULL,
  `assign_to` varchar(30) DEFAULT NULL,
  `status` varchar(60) DEFAULT NULL,
  `submitted_on` datetime DEFAULT NULL,
  `test_result` decimal(35,10) DEFAULT NULL,
  `test_details` json DEFAULT NULL,
  `report_values` json DEFAULT NULL,
  `dept` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sample_id` (`sample_id`),
  CONSTRAINT `material_test_ibfk_1` FOREIGN KEY (`sample_id`) REFERENCES `order_material` (`sample_id`)
) ENGINE=InnoDB AUTO_INCREMENT=375 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_test`
--

LOCK TABLES `material_test` WRITE;
/*!40000 ALTER TABLE `material_test` DISABLE KEYS */;
INSERT INTO `material_test` VALUES (373,'4c5d9ce6-d0e0-4c56-befe-ccd75cdb32b2',156,'KDM393','FINISHED','2023-12-12 11:06:12',0.0000000000,'{\"a10mm\": 0, \"b10mm\": 0, \"c10mm\": 0.03, \"a118mm\": 9.38, \"a236mm\": 24.29, \"a475mm\": 10.38, \"b118mm\": 100, \"b236mm\": 100, \"b475mm\": 100, \"c118mm\": 14, \"c236mm\": 2.9, \"c475mm\": 8.7, \"a300mic\": 17.69, \"a600mic\": 20.8, \"b300mic\": 0, \"b600mic\": 100, \"c300mic\": 0, \"c600mic\": 4}','[{\"value\": \"roundTo3Dec(bulkDensity_loose)\", \"description\": \"Average(Loose)\"}, {\"value\": \"roundTo3Dec(bulkDensity_rooded)\", \"description\": \"Average(Rooded)\"}]','PHYSICAL'),(374,'e19d7be4-9d34-43a5-abea-eac38dad9ae6',157,'KDM393','FINISHED','2023-12-12 11:48:33',0.0000000000,'{\"a\": 556, \"b\": 1755.2, \"c\": 1433, \"d\": 546.1}','[{\"value\": 2.336, \"description\": \"Specific Gravity\"}, {\"value\": 1.82, \"description\": \"Water Absorption\"}]','PHYSICAL');
/*!40000 ALTER TABLE `material_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_material`
--

DROP TABLE IF EXISTS `order_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_material` (
  `order_id` varchar(70) NOT NULL,
  `sample_id` varchar(70) NOT NULL,
  `subgroup` int DEFAULT NULL,
  `source` text,
  `quantity` int DEFAULT NULL,
  `units` varchar(20) DEFAULT NULL,
  `job_number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`order_id`,`sample_id`),
  KEY `sample_id_index` (`sample_id`),
  CONSTRAINT `order_material_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_material`
--

LOCK TABLES `order_material` WRITE;
/*!40000 ALTER TABLE `order_material` DISABLE KEYS */;
INSERT INTO `order_material` VALUES ('1f6f7228-e2ea-465a-ac19-4623b0edad22','e19d7be4-9d34-43a5-abea-eac38dad9ae6',46,'',0,NULL,'KDMEI/HYD/2023/12-1234/FA/(1)(A)'),('29a7eb82-321c-45d2-9819-480b419a3f90','4c5d9ce6-d0e0-4c56-befe-ccd75cdb32b2',46,'some source',123,NULL,'KDMEI/HYD/2023/12-0/FA/(1)(A)');
/*!40000 ALTER TABLE `order_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` varchar(50) NOT NULL,
  `project_name` varchar(400) DEFAULT NULL,
  `subject` varchar(400) DEFAULT NULL,
  `letter` varchar(600) DEFAULT NULL,
  `additional_info` text,
  `discount` decimal(10,2) DEFAULT NULL,
  `transport_fee` decimal(10,2) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `assigned_on` date DEFAULT NULL,
  `order_number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('1f6f7228-e2ea-465a-ac19-4623b0edad22','specific gravity and water absorption','some subject goes here','1f6f7228-e2ea-465a-ac19-4623b0edad22\\1f6f7228-e2ea-465a-ac19-4623b0edad22_letter.png','',11111.00,1111.00,'2023-12-23','2023-12-12',32,'ASSIGNED','2023-12-12','1234'),('29a7eb82-321c-45d2-9819-480b419a3f90','soundness','some subject goes here','29a7eb82-321c-45d2-9819-480b419a3f90\\29a7eb82-321c-45d2-9819-480b419a3f90_letter.png','ksdnf askdjf',123.00,1322.00,'2023-12-15','2023-12-11',18,'ASSIGNED','2023-12-11','0');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(100) DEFAULT NULL,
  `responsibilities` text,
  `min_salary` int DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  KEY `department` (`department`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`department`) REFERENCES `department` (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (106,'Managing Director',NULL,0,'GEO_TECHNICAL'),(107,'Director - Finance',NULL,0,'FINANCE_ACCOUNTS'),(108,'Assistant Manager - Chemical',NULL,0,'LABORATORY_CHEMICAL'),(109,'Senior Technician',NULL,0,'LABORATORY_MECHANICAL'),(110,'Senior Technician',NULL,0,'GEO_TECHNICAL'),(111,'Assistant Manager',NULL,0,'LABORATORY_MECHANICAL'),(112,'Director - Technical',NULL,0,'LABORATORY_MECHANICAL'),(113,'Senior Quality Engineer',NULL,0,'LABORATORY_MECHANICAL'),(114,'Driver',NULL,0,'LABORATORY_MECHANICAL'),(115,'Junior Engineer',NULL,0,'GEO_TECHNICAL'),(116,'Senior Chemist',NULL,0,'LABORATORY_CHEMICAL'),(117,'Head - Chemical',NULL,0,'LABORATORY_CHEMICAL'),(118,'Senior Engineer',NULL,0,'LABORATORY_MECHANICAL'),(119,'Director',NULL,0,'BUSSINESS_DEVELOPEMENT'),(120,'Accountant',NULL,0,'FINANCE_ACCOUNTS'),(121,'Office Boy',NULL,0,'HR_ADMINISTRATION'),(122,'Sweeper',NULL,0,'HR_ADMINISTRATION'),(123,'Lab Technician',NULL,0,'LABORATORY_MECHANICAL'),(124,'Engineer',NULL,0,'LABORATORY_MECHANICAL'),(125,'Manager - Technical',NULL,0,'GEO_TECHNICAL'),(126,'Manager (Geo - Technical)',NULL,0,'GEO_TECHNICAL'),(127,'Driver',NULL,0,'BUSSINESS_DEVELOPEMENT'),(128,'Accounts Executive',NULL,0,'FINANCE_ACCOUNTS'),(129,'Manager (Customer Relations)',NULL,0,'LABORATORY_MECHANICAL'),(130,'Driver',NULL,0,'HR_ADMINISTRATION'),(131,'Manager - Instrumentation',NULL,0,'SHM_A'),(132,'Manager (Quality Control)',NULL,0,'LABORATORY_MECHANICAL'),(133,'Structural Engineer – Trainee',NULL,0,'SHM_A'),(134,'Manager (SHAM&R)',NULL,0,'SHM_A'),(135,'Finance Account Manager',NULL,0,'FINANCE_ACCOUNTS'),(136,'Commercial Executive',NULL,0,'LABORATORY_MECHANICAL'),(137,'Engineer – Trainee',NULL,0,'GEO_TECHNICAL'),(138,'Geotechnical Engineer - Trainee',NULL,0,'GEO_TECHNICAL'),(139,'Lab Assistant',NULL,0,'LABORATORY_MECHANICAL'),(140,'Structural Engineer',NULL,0,'SHM_A'),(141,'Manager HR',NULL,0,'HR_ADMINISTRATION'),(142,'Sales Coordiantor',NULL,0,'LABORATORY_MECHANICAL'),(143,'Trainee Engineer',NULL,0,'LABORATORY_MECHANICAL'),(144,'Instrumentation Engineer',NULL,0,'SHM_A'),(145,'Jr Engineer',NULL,0,'LABORATORY_MECHANICAL'),(146,'GM-Technical',NULL,0,'LABORATORY_MECHANICAL'),(147,'Trainee Engineer',NULL,0,'GEO_TECHNICAL'),(148,'Sr.Technician',NULL,0,'LABORATORY_MECHANICAL'),(149,'Trainee IT Engineer',NULL,0,'SOFTWARE'),(150,'Lab Technician',NULL,0,'LABORATORY_MECHANICAL'),(151,'Instrumentation Engineer Trainee',NULL,0,'SHM_A'),(152,'Sr Chemist',NULL,0,'LABORATORY_CHEMICAL'),(153,'Jr Full Stack Developer',NULL,0,'SOFTWARE'),(154,'Receptionist',NULL,0,'LABORATORY_MECHANICAL'),(155,'Manager Technical',NULL,0,'LABORATORY_MECHANICAL'),(156,'Head - SHM&AI',NULL,0,'SHM_A'),(157,'Engineer - Geo Technical',NULL,0,'GEO_TECHNICAL'),(158,'Head - R&D',NULL,0,'SHM_A'),(159,'Managing Director',NULL,0,'BUSSINESS_DEVELOPEMENT'),(160,'Senior Manager (Contracts & QS)',NULL,0,'DPR'),(161,'Traffic & Road Safety Engineer',NULL,0,'LAND_AQUASITION'),(162,'Quantity SURVEYor',NULL,0,'DPR'),(163,'Deputy General Manager - Bussiness Development',NULL,0,'BUSSINESS_DEVELOPEMENT'),(164,'Director (Technical)',NULL,0,'STRUCTURES'),(165,'Engineer',NULL,0,'STRUCTURES'),(166,'Director',NULL,0,'HIGHWAYS'),(167,'Manager (Finance & Accounts)',NULL,0,'FINANCE_ACCOUNTS'),(168,'Design Engineer -Highway',NULL,0,'HIGHWAYS'),(169,'Driver',NULL,0,'PAVEMENT_TRAFFIC'),(170,'Senior Engineer',NULL,0,'STRUCTURES'),(172,'CAD Engineer',NULL,0,'HIGHWAYS'),(173,'Senior CAD Engineer',NULL,0,'STRUCTURES'),(174,'Engineer',NULL,0,'PAVEMENT_TRAFFIC'),(175,'Bridge Design Engineer',NULL,0,'STRUCTURES'),(176,'Sweeper',NULL,0,'HR_ADMINISTRATION'),(177,'Senior CAD Engineer – Highways',NULL,0,'HIGHWAYS'),(178,'Senior CAD Engineer – Structures',NULL,0,'STRUCTURES'),(179,'Engineer',NULL,0,'HIGHWAYS'),(180,'Drone Pilot',NULL,0,'SURVEY'),(181,'SURVEYor',NULL,0,'SURVEY'),(182,'Draftman',NULL,0,'STRUCTURES'),(183,'Sr.Manager Land Aquasition &Social',NULL,0,'LAND_AQUASITION'),(184,'Sr.Engineer-CAD',NULL,0,'STRUCTURES'),(185,'Sr.Quantity Surveyor',NULL,0,'HIGHWAYS'),(186,'VP-structures',NULL,0,'STRUCTURES'),(187,'Jr.Engineer',NULL,0,'STRUCTURES'),(188,'Office boy',NULL,0,'HR_ADMINISTRATION'),(189,'Engineer',NULL,0,'BUSSINESS_DEVELOPEMENT'),(190,'Sr Design Engineer',NULL,0,'STRUCTURES'),(191,'Manager-Bussiness Development',NULL,0,'BUSSINESS_DEVELOPEMENT'),(192,'Assistant Manager',NULL,0,'DPR'),(193,'Design Engineer',NULL,0,'STRUCTURES'),(194,'Sr CAD Draftsman',NULL,0,'LAND_AQUASITION'),(195,'Draftman',NULL,0,'LAND_AQUASITION'),(196,'Sr GM',NULL,0,'DPR'),(197,'Sr VP - bussiness development',NULL,0,'BUSSINESS_DEVELOPEMENT'),(198,'Sr CAD Engineer',NULL,0,'STRUCTURES'),(199,'Draftsman',NULL,0,'LAND_AQUASITION'),(200,'Trainee Sureyour',NULL,0,'SURVEY'),(201,'Jr Sureyour',NULL,0,'SURVEY'),(202,'SURVEY',NULL,0,'SURVEY'),(203,'Sr.CAD Engineer',NULL,0,'STRUCTURES'),(204,'Draftsman Trainee',NULL,0,'HIGHWAYS'),(205,'Trainee Engineer',NULL,0,'PAVEMENT_TRAFFIC'),(206,'Manager Structures',NULL,0,'STRUCTURES'),(207,'Sr Engineer',NULL,0,'PAVEMENT_TRAFFIC'),(208,'Head - Transformation and Strategy',NULL,0,'HR_ADMINISTRATION'),(209,'Manager Admin& Procurment',NULL,0,'HR_ADMINISTRATION'),(210,'AGM',NULL,0,'HIGHWAYS'),(212,'FSD',NULL,221,'DPR');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subgroup`
--

DROP TABLE IF EXISTS `subgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subgroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `prefix` varchar(100) DEFAULT NULL,
  `additional_info` text,
  `group_id` varchar(100) NOT NULL,
  `units` varchar(30) DEFAULT NULL,
  `tech_ref` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `subgroup_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `material_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subgroup`
--

LOCK TABLES `subgroup` WRITE;
/*!40000 ALTER TABLE `subgroup` DISABLE KEYS */;
INSERT INTO `subgroup` VALUES (30,'Admixture','AM','','GROUP-001',NULL,'Requirements as per Table 2\nof IS: 9103-1999'),(31,'Cement (OPC)','CEM','','GROUP-001',NULL,'Requirements as per\nIS: 269-2015'),(33,'Fly Ash','Fly','','GROUP-001',NULL,'Requirements as per\nIS: 3812 : 2013'),(34,'Coal','Coal','','GROUP-002',NULL,NULL),(35,'Construction Water','Water','','GROUP-003',NULL,'Requirements as per\nIS: 456 - 2000'),(36,'Drinking Water','Water','','GROUP-003',NULL,'Requirements as per\nIS: 10500'),(37,'Coarse Aggregagte','CA','','GROUP-001',NULL,'IS 2386 Part-VII'),(38,'Micro Silica','MS','','GROUP-001',NULL,NULL),(39,'GGBS','GGBS','','GROUP-001',NULL,'Requirement as per \nIS: 12089 – 1987 (RA 2008)'),(40,'Cement (SRC)','CEM','','GROUP-001',NULL,'Requirements as per\nIS: 12330 – 1988 (RA 2009)'),(41,'Cement (PPC)','CEM','','GROUP-001',NULL,'Requirement as per IS: 1489 \n(Part 1) – 1991 (Reaffirmed 2009)'),(42,'Cement (PSC)','CEM','','GROUP-001',NULL,'Requirements as per\nIS: 455 – 1989 (Reaffirmed 2014)'),(43,'Cement (OPC - 53)','CEM','','GROUP-001',NULL,'Requirements as per IS: 269-2015'),(44,'Lime Stone','Lime','','GROUP-005',NULL,NULL),(45,'Gypsum','Gypsum','','GROUP-005',NULL,NULL),(46,'Fine Aggregates','FA','','GROUP-001',NULL,'Requirements as per IS: 2386(Part-III)'),(47,'Soil','Soil','','GROUP-006',NULL,NULL);
/*!40000 ALTER TABLE `subgroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `test_name` varchar(250) NOT NULL,
  `requirements` text,
  `price` int DEFAULT NULL,
  `method` varchar(100) DEFAULT NULL,
  `discipline` varchar(20) DEFAULT NULL,
  `nabl_status` tinyint(1) DEFAULT NULL,
  `additional_info` text,
  `sub_group` int DEFAULT NULL,
  `test_limits` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_group` (`sub_group`),
  CONSTRAINT `test_ibfk_1` FOREIGN KEY (`sub_group`) REFERENCES `subgroup` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (35,'Ash Content (AC) (% by mass)','',1000,'','CHEMICAL',1,'',30,'0.95T ?   AC < 1.05 T\nT – Manufacture’s stated Value)'),(36,'Dry material content (DMC) (%by mass)','',1000,'','CHEMICAL',1,'',30,'0.95T<= DMC >= 1.05T (T-Manufacturer stated value)'),(37,'Chloride content (% by mass)','',1000,'','CHEMICAL',1,'',30,'Within 10% of the value or within 0.2% whichever is greater as stated by the manufacturer'),(40,'pH value (25 degrees C)','',1000,'','CHEMICAL',1,'',30,'Min 6.0'),(43,'Relative Density (25 deg C)','',1000,'','CHEMICAL',1,'',30,'Within 0.02 of the value stated by the manufacturer'),(45,'Total Loss on Ignition (% by mass)','',556,'','CHEMICAL',1,'',31,'Not more than 5.0 %'),(46,'Determination of Silica','',556,'','CHEMICAL',1,'',31,'Not greater than 1.02\nAnd not less than 0.66'),(47,'Determination of Ferric Oxide ','',556,'As per IS 4032','CHEMICAL',1,'',31,NULL),(48,'Determination of Aluminia','',556,'','CHEMICAL',1,'',31,NULL),(49,'Magnesia (MgO), (% by mass)','',556,'','CHEMICAL',1,'',31,'Not more than 6.0 %'),(50,'Insoluble Residue (% by mass)','',556,'','CHEMICAL',1,'',31,'Not more than 5.0 %'),(51,'Total Sulphur content calculated as sulphuric anhydride (SO3)\n(% by mass)','',556,'','CHEMICAL',1,'',31,'Maximum 3.5 %'),(52,'Chloride Content (% by mass)','',556,'','CHEMICAL',1,'',31,'Not more than 0.1%'),(53,'Alkali Content as Na2O (% by mass)','',556,'','CHEMICAL',1,'',31,'Not more than 0.60 %'),(55,'Loss on ignition, percent by mass, max','',833,'','CHEMICAL',1,'',33,'Loss on ignition, percent by mass, max'),(56,'Silicon dioxide (SiO2), percent by mass, (Minimum)','',833,'','CHEMICAL',1,'',33,'35%,25%-35%25%'),(57,'Silicon dioxide (SiO2) plus aluminium oxide (Al2O3) plus iron oxide (Fe2O3), percent by mass, (Minimum)','',833,'','CHEMICAL',1,'',33,'70%,50%'),(58,'Magnesium oxide (MgO), percent by mass, (Maximum)','',833,'','CHEMICAL',1,'',33,'5%'),(59,'Total sulphur as sulphur trioxide (SO3), percent by mass, (Maximum)','',833,'','CHEMICAL',1,'',33,'3%,3%-5%,5%'),(60,'Total chlorides in percent by mass, Max','',833,'','CHEMICAL',0,'',33,'0.05'),(61,'Determination of Moisture content (M)','',1500,'IS 1350 (Part-1), Air oven method','CHEMICAL',1,'',34,NULL),(62,'Determination of Volatile matter content (VM)','',1500,'IS 1350 (Part - 1)','CHEMICAL',1,'',34,NULL),(63,'Determination of Ash content','',1500,'IS 1350 (Part - 1)','CHEMICAL',1,'',34,NULL),(64,'Determination of Fixed  Carbon (FC)','',1500,'IS 1350 (Part - 1)','CHEMICAL',1,'',34,NULL),(65,'Determination of Sulphur','',1500,'IS 1350 (Part - 3)','CHEMICAL',1,'',34,NULL),(66,'Determination of Gross Calorific Value (GCV)','',1500,'IS 1350 (Part - 2)','CHEMICAL',1,'',34,NULL),(67,'pH Value','',250,'','CHEMICAL',1,'',35,'Shall not be less than 6.'),(68,'ml of 0.02 N NaOH required to newtralize 100 ml water using Phenoplphthalein indicator','',250,'','CHEMICAL',1,'',35,'Shall not be more than 5 ml'),(69,'ml of 0.02 N H2SO4 required to newtralize 100 ml water using Mixed indicator','',250,'','CHEMICAL',1,'',35,'Shall not be more than 25ml'),(70,'Organic Solids (mg/l)','',250,'','CHEMICAL',1,'',35,'200 Max'),(71,'Inorganic Solids (mg/l)','',250,'','CHEMICAL',1,'',35,'3000 Max'),(72,'Suspended Solids (mg/l)','',250,'','CHEMICAL',1,'',35,'2000 Max'),(73,'Chlorides as Cl’ (mg/l)','',250,'','CHEMICAL',1,'',35,'500 Max for RCC\n2000 Max for PCC'),(74,'Sulphates as SO3(mg/l)','',250,'','CHEMICAL',1,'',35,'400 Max'),(75,'pH Value','',438,'IS 3025 Pt 16','CHEMICAL',1,'',36,'6.50 – 8.50'),(76,'Dissolved Solids (mg/l), Max.','',438,'IS 3025 Pt - 16','CHEMICAL',1,'',36,'500'),(77,'Total Hardness as CaCO3 (mg/l), Max.','',438,'IS 3025 Pt - 21','CHEMICAL',1,'',36,'200'),(78,'Calcium as Ca (mg/l), Max.','',438,'IS 3025 Pt - 40','CHEMICAL',1,'',36,'75'),(79,'Magnesium as Mg (mg/l), Max.','',438,'IS 3025 - Pt 46','CHEMICAL',1,'',36,'30'),(80,'Alkalinity to methyl orange as CaCO3 (mg/l), Max','',438,'IS 3025 (Pt - 23)','CHEMICAL',1,'',36,'200'),(81,'Chloride as Cl (mg/l), Max.','',438,'IS 3025 Pt - 32','CHEMICAL',1,'',36,'250'),(82,'Sulphate as So4 (mg/l), Max.','',438,'IS 3025 - Pt 24','CHEMICAL',1,'',36,'200'),(83,'Reduction in Alkalinity of 1.0 N NaOH','',875,'','CHEMICAL',1,'',37,'The tests are carried out As per IS: 2386 (Part VII) 1963 (Reaffirmed-2016).The Coarse aggregate samples supplied for testing indicated innocuous category i.e., the samples do not indicate potential deleterious degree of Alkali Reactivity. '),(84,'Silica Dissolved','',875,'','CHEMICAL',1,'',37,'The tests are carried out As per IS: 2386 (Part VII) 1963 (Reaffirmed-2016).The Coarse aggregate samples supplied for testing indicated innocuous category i.e., the samples do not indicate potential deleterious degree of Alkali Reactivity. '),(85,'Sulphate, as SO3\n(% by Weight)','',875,'','CHEMICAL',1,'',37,'0.5% max'),(86,'Chloride, as Cl\n(% by Weight)','',875,'','CHEMICAL',1,'',37,'0.04% max'),(87,'Moisture Content','',1250,'','CHEMICAL',0,'',38,NULL),(91,'Determination of Ferric Oxide','',625,'','CHEMICAL',1,'',39,NULL),(92,'Determination of Alumina','',625,'','CHEMICAL',1,'',39,NULL),(93,'Magnesium Oxide (Max.) (%)','',625,'','CHEMICAL',1,'',39,'17'),(94,'Insoluble residue (Max.) (%)','',625,'','CHEMICAL',1,'',39,'5'),(95,'Total Loss on Ignition','',556,'','CHEMICAL',1,'',40,'Not more than 5.0 %'),(96,'Determination of Silica','',556,'','CHEMICAL',1,'',40,NULL),(97,'Determination of Ferric Oxide','',556,'','CHEMICAL',1,'',40,NULL),(98,'Determination of Alumina','',556,'','CHEMICAL',1,'',40,'Not greater than 1.02\nAnd not less than 0.66'),(99,'Magnesia (Mg0), (% by mass)','',556,'','CHEMICAL',1,'',40,'Not more than 6.0 %'),(100,'Insoluble Residue (% by mass)','',556,'','CHEMICAL',1,'',40,'Not more than 4.0 %'),(101,'Total Sulphur content calculated as sulphuric anhydride (S03)\n(% by mass)','',556,'','CHEMICAL',1,'',40,'Maximum 2.5 %'),(102,'Total Loss on Ignition (% by mass)','',556,'','CHEMICAL',1,'',41,'Not more than 5.0%'),(103,'Magnesia (MgO), (% by mass)','',556,'','CHEMICAL',1,'',41,'Not more than 6.0%'),(104,'Insoluble residue (% by mass)\n(Max.)','',556,'','CHEMICAL',1,'',41,'x+4(100-x)\n         100\nwhere x is the declared percentage of pozzolana in the given PPC The fly ash constituent shall be not less than 15 percent and not more than 35 percent by mass of Portland-Pozzolana Cement'),(105,'Total Sulphur content calculated as sulphuric anhydride (SO3) \n(% by mass)','',556,'','CHEMICAL',1,'',41,'Not more than 3.0%'),(106,'Total Loss on Ignition','',556,'','CHEMICAL',1,'',42,'Not more than 5.0 %'),(107,'Determination of Silica','',556,'','CHEMICAL',1,'',42,NULL),(108,'Sulphide Sulphur (Max.) (%)','',556,'','CHEMICAL',1,'',42,'Not more than 1.5 %'),(109,'Magnesium Oxide (Max.) (%)','',556,'','CHEMICAL',1,'',42,'Not more than 8.0 %'),(110,'Insoluble Residue (% by mass)','',556,'','CHEMICAL',1,'',42,'Not more than 4.0 %'),(111,'Total Sulphur content calculated as sulphuric anhydride (SO3)\n(% by mass)','',556,'','CHEMICAL',1,'',42,'Not more than 3.0 %'),(112,'Sulphide Sulphur','',625,'','CHEMICAL',1,'',39,'2'),(113,'MnO','',625,'','CHEMICAL',1,'',39,'5.5'),(114,'Total Loss on Ignition (% by mass)','',556,'','CHEMICAL',1,'',43,'Not more than 4.0 %'),(115,'Determination of Silica','',556,'','CHEMICAL',1,'',43,'Not greater than 1.02\nAnd not less than 0.88'),(116,'Determination of Ferric Oxide ','',556,'','CHEMICAL',1,'',43,NULL),(117,'Determination of Aluminia','',556,'','CHEMICAL',1,'',43,NULL),(118,'Magnesia (MgO), (% by mass)','',556,'','CHEMICAL',1,'',43,'Not more than 6.0 %'),(119,'Insoluble Residue (% by mass)','',556,'','CHEMICAL',1,'',43,'Not more than 5.0 %'),(120,'Total Sulphur content calculated as sulphuric anhydride (SO3)\n(% by mass)','',556,'','CHEMICAL',1,'',43,'Maximum 3.5 %'),(121,'Chloride Content (% by mass)','',556,'','CHEMICAL',1,'',43,'Not more than 0.1%'),(122,'Alkali Content as Na2O (% by mass)','',556,'','CHEMICAL',1,'',43,'Not more than 0.60 %'),(123,'Loss On Ignition','',417,'','CHEMICAL',1,'',44,NULL),(124,'Determination of Silica','',417,'','CHEMICAL',1,'',44,NULL),(125,'Determination of Cao','',417,'','CHEMICAL',1,'',44,NULL),(126,'Determination of Aluminia','',417,'','CHEMICAL',1,'',44,NULL),(127,'Determination of Sulfuric Anhydride (SO3)','',1000,'','CHEMICAL',1,'',45,NULL),(128,'Determination of Loss on Ignition','',1000,'','CHEMICAL',1,'',45,NULL),(129,'Determination of Loss on Ignition','',0,'','CHEMICAL',1,'',38,NULL),(130,'Determination of Silica','',0,'','CHEMICAL',1,'',38,NULL),(131,'Free Water','',1000,'','CHEMICAL',1,'',45,NULL),(132,'Combined Water','',1000,'','CHEMICAL',1,'',45,NULL),(133,'Cao','',1000,'','CHEMICAL',1,'',45,NULL),(134,'Determination of MgO','',417,'','CHEMICAL',1,'',44,NULL),(135,'Iron Oxide','',417,'','CHEMICAL',1,'',44,NULL),(136,'Ratio of % of Lime to % of Silica, Alumina and Iron Oxide, when calculated by the formula: CaO – 0.7 SO3 ------------------------------------------- 2.8 x SiO2 + 1.2 x Al2O3 + 0.65 x Fe2O3','',0,'','CHEMICAL',1,'',31,'Not greater than 1.02\nAnd not less than 0.66'),(137,'Ratio of % of Lime to % of Silica, Alumina and Iron Oxide, when calculated by the formula: CaO – 0.7 SO3 ------------------------------------------- 2.8 x SiO2 + 1.2 x Al2O3 + 0.65 x Fe2O3','',0,'','CHEMICAL',1,'',43,'Not greater than 1.02\nAnd not less than 0.88'),(138,'Ratio of % of Lime to % of Silica, Alumina and Iron Oxide, when calculated by the formula: CaO – 0.7 SO3 ------------------------------------------- 2.8 x SiO2 + 1.2 x Al2O3 + 0.65 x Fe2O3','',0,'','CHEMICAL',1,'',40,'Not greater than 1.02\nAnd not less than 0.66'),(139,'Crushing Value %','',1000,'','PHYSICAL',1,'',37,'The aggregate crushing value shall not exceed 45% for aggregate used for concrete other than for wearing surfaces and 30% for concrete wearing surfaces, such as runways, roads and pavements'),(140,'Specific gravity','',1000,'','PHYSICAL',1,'',37,NULL),(141,'Water absorption (%)','',1000,'','PHYSICAL',1,'',37,NULL),(145,'Impact Value (%)','',750,'','PHYSICAL',1,'',37,'The aggregate impact value shall not exceed 45% by weight for aggregates used for concrete other than wearing surfaces & 30% by weight for concrete for wearing surfaces, such as runways etc.'),(146,'SIEVE ANALYSIS','',750,'','PHYSICAL',1,'',37,NULL),(147,'10% Fines Value  (KN)','',1500,'','PHYSICAL',1,'',37,'BS: 812 (Part 111)-1990 prescribes a minimum value of 150 kN (15 tons) for aggregate to be used in heavy-duty concrete floor finishes, 100 kN (10 tones) for aggregate to be used in concrete wearing surfaces and 50 kN (5 tons) when used in other concretes.'),(148,'Bulk Density (Kg/cum)','',750,'','PHYSICAL',1,'',37,NULL),(149,'Flakiness index (%)','',500,'','PHYSICAL',1,'',37,'Flakiness shall not exceed 25% as per SP-23 : 1982'),(150,'Elongation index (%)','',500,'','PHYSICAL',1,'',37,NULL),(153,'Bulk Density (Kg/cum)','',750,'','PHYSICAL',1,'',46,NULL),(154,'Materials Finer Than 75 Microns','',750,'','PHYSICAL',1,'',46,NULL),(155,'SIEVE ANALYSIS','',750,'','PHYSICAL',1,'',46,NULL),(156,'Soundness','',0,'IS 2386 ( Part-5) - 1963','PHYSICAL',1,'',46,NULL),(157,'Specific gravity and water absorption','',0,'As per IS 2836 (Part - 3)','PHYSICAL',1,'',46,NULL),(158,'Standard/Modified compaction test of soil','',0,'As per relevant IS: 2720 (Part-7,1980,Part-8,1983)','PHYSICAL',1,'',47,NULL),(159,'Direct Shear tests of soil','',0,'As per IS:2720 (Part - 13) - 1986','PHYSICAL',1,'',47,NULL),(160,'Determination of Free swell index of soils','',0,'As per IS:2720 (Part - XL) , 1977','PHYSICAL',1,'',47,NULL),(161,'Liquid limit and Plastic Limit','',0,'As per relevent IS : 2720 (Part - 5) - 1985','PHYSICAL',1,'',47,NULL),(162,'Grain Size analysis of Soil','',0,'As per relevent IS : 2720 (Part- 4) - 1985','PHYSICAL',1,'',47,NULL),(163,'Specific gravity of soil','',0,'As per IS : 2720 (Part - 3 Section - 1 & 2) - 1980','PHYSICAL',1,'',47,NULL),(164,'Bearing Ratio test','',0,'As per IS : 2720 (Part - 16) - 1987','PHYSICAL',1,'',47,NULL);
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-12 12:12:39
