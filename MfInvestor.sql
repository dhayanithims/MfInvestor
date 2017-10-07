SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `mutualfund` DEFAULT CHARACTER SET utf8 ;
USE `mutualfund` ;

-- -----------------------------------------------------
-- Table `mutualfund`.`activesessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mutualfund`.`activesessions` ;

CREATE  TABLE IF NOT EXISTS `mutualfund`.`activesessions` (
  `UserId` INT(11) NOT NULL ,
  `SessionId` VARCHAR(45) NOT NULL ,
  `SessionToken` VARCHAR(1000) NOT NULL ,
  `IPAddress` VARCHAR(45) NULL DEFAULT NULL ,
  `DeviceInfo` VARCHAR(100) NULL DEFAULT NULL ,
  `LoginTime` DATETIME NOT NULL ,
  UNIQUE INDEX `UserId_UNIQUE` (`UserId` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mutualfund`.`logins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mutualfund`.`logins` ;

CREATE  TABLE IF NOT EXISTS `mutualfund`.`logins` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT ,
  `UserName` VARCHAR(200) NULL DEFAULT NULL ,
  `Password` VARCHAR(45) NULL DEFAULT NULL ,
  `UserGuid` VARCHAR(68) NULL DEFAULT NULL ,
  PRIMARY KEY (`Id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mutualfund`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mutualfund`.`user` ;

CREATE  TABLE IF NOT EXISTS `mutualfund`.`user` (
  `UserId` INT(11) NOT NULL AUTO_INCREMENT ,
  `FirstName` VARCHAR(200) NULL DEFAULT NULL ,
  `LastName` VARCHAR(200) NULL DEFAULT NULL ,
  `Email` VARCHAR(100) NULL DEFAULT NULL ,
  `PhoneNumber` VARCHAR(10) NULL DEFAULT NULL ,
  `BirthDate` DATETIME NULL DEFAULT NULL ,
  PRIMARY KEY (`UserId`) ,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) ,
  UNIQUE INDEX `PhoneNumber_UNIQUE` (`PhoneNumber` ASC) ,
  INDEX `LogonData_UserId_idx` (`UserId` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mutualfund`.`logondata`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mutualfund`.`logondata` ;

CREATE  TABLE IF NOT EXISTS `mutualfund`.`logondata` (
  `Id` INT(11) NOT NULL DEFAULT '0' ,
  `UserId` INT(11) NOT NULL ,
  `UserName` VARCHAR(100) NOT NULL ,
  `Password` VARCHAR(100) NOT NULL ,
  `PwdSalt` VARCHAR(32) NOT NULL ,
  `LastLogin` DATETIME NULL DEFAULT NULL ,
  `LogoutTime` DATETIME NULL DEFAULT NULL ,
  `IsActive` BIT(1) NOT NULL DEFAULT b'1' ,
  `FailedAttempts` TINYINT(4) NOT NULL DEFAULT '0' ,
  `LastAttempt` DATETIME NULL DEFAULT NULL ,
  PRIMARY KEY (`Id`) ,
  UNIQUE INDEX `UserName_UNIQUE` (`UserName` ASC) ,
  INDEX `logondata_userid` (`UserId` ASC) ,
  CONSTRAINT `logondata_userid`
    FOREIGN KEY (`UserId` )
    REFERENCES `mutualfund`.`user` (`UserId` ),
  CONSTRAINT `logondata_username`
    FOREIGN KEY (`UserName` )
    REFERENCES `mutualfund`.`user` (`Email` ))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mutualfund`.`sessionhistory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mutualfund`.`sessionhistory` ;

CREATE  TABLE IF NOT EXISTS `mutualfund`.`sessionhistory` (
  `UserId` INT(11) NOT NULL ,
  `SessionId` VARCHAR(45) NOT NULL ,
  `IPAddress` VARCHAR(45) NULL DEFAULT NULL ,
  `DeviceInfo` VARCHAR(100) NULL DEFAULT NULL ,
  `LoginTime` DATETIME NOT NULL ,
  `LogoutTime` DATETIME NOT NULL )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mutualfund`.`userbankdetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mutualfund`.`userbankdetails` ;

CREATE  TABLE IF NOT EXISTS `mutualfund`.`userbankdetails` (
  `UserId` INT(11) NOT NULL ,
  `AcctNumber` VARCHAR(45) NOT NULL ,
  `BankName` VARCHAR(45) NOT NULL ,
  `IFSC` VARCHAR(45) NOT NULL ,
  `AcctName` VARCHAR(45) NOT NULL ,
  `BranchName` VARCHAR(100) NULL DEFAULT NULL ,
  UNIQUE INDEX `UserId_UNIQUE` (`UserId` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `mutualfund` ;

-- -----------------------------------------------------
-- procedure RegisterUser
-- -----------------------------------------------------

USE `mutualfund`;
DROP procedure IF EXISTS `mutualfund`.`RegisterUser`;

DELIMITER $$
USE `mutualfund`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterUser`(IN Email NVARCHAR(100),
 IN Password VARCHAR(100)
 )
BEGIN
  
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_RegisterUser
-- -----------------------------------------------------

USE `mutualfund`;
DROP procedure IF EXISTS `mutualfund`.`sp_RegisterUser`;

DELIMITER $$
USE `mutualfund`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RegisterUser`(IN Email NVARCHAR(100),
 IN Password VARCHAR(100),
 IN PassswordSalt VARCHAR(32),
 IN MobileNumber VARCHAR(10)
 )
BEGIN

  START TRANSACTION;
  INSERT INTO user(Email, PhoneNumber) Values(Email, MobileNumber);  
  INSERT INTO logondata(UserId, UserName, Password, PwdSalt) values
  (LAST_INSERT_ID(),Email, Password, PassswordSalt);
  COMMIT;  
  
END$$

DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
