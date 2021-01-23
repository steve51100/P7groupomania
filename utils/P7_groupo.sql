-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema p7groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema p7groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `p7groupomania` DEFAULT CHARACTER SET latin1 ;
USE `p7groupomania` ;

-- -----------------------------------------------------
-- Table `p7groupomania`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p7groupomania`.`users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `lastName` VARCHAR(255) NOT NULL COMMENT '',
  `firstName` VARCHAR(255) NOT NULL COMMENT '',
  `email` VARCHAR(50) NOT NULL COMMENT '',
  `password` VARCHAR(255) NOT NULL COMMENT '',
  `moderation` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  UNIQUE INDEX `email` (`email` ASC)  COMMENT '')
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `p7groupomania`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p7groupomania`.`posts` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `userId` INT(10) UNSIGNED NOT NULL COMMENT '',
  `title` VARCHAR(50) NOT NULL COMMENT '',
  `content` TEXT NOT NULL COMMENT '',
  `date` DATETIME NOT NULL COMMENT '',
  `likes` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_userId` (`userId` ASC)  COMMENT '',
  CONSTRAINT `fk_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `p7groupomania`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `p7groupomania`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p7groupomania`.`comments` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `userId` INT(10) UNSIGNED NOT NULL COMMENT '',
  `postId` INT(10) UNSIGNED NOT NULL COMMENT '',
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `comContent` VARCHAR(255) NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_comments_postId` (`postId` ASC)  COMMENT '',
  INDEX `fk_comments_userId` (`userId` ASC)  COMMENT '',
  CONSTRAINT `fk_comments_postId`
    FOREIGN KEY (`postId`)
    REFERENCES `p7groupomania`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `p7groupomania`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `p7groupomania`.`gifs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p7groupomania`.`gifs` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `userId` INT(11) NOT NULL COMMENT '',
  `name` VARCHAR(50) NOT NULL COMMENT '',
  `title` TEXT NOT NULL COMMENT '',
  `url` VARCHAR(255) NOT NULL COMMENT '',
  `date` DATETIME NOT NULL COMMENT '',
  `users_id` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_gifs_users1_idx` (`users_id` ASC)  COMMENT '',
  CONSTRAINT `fk_gifs_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `p7groupomania`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `p7groupomania`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p7groupomania`.`likes` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `postId` INT(10) UNSIGNED NOT NULL COMMENT '',
  `userId` INT(10) UNSIGNED NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `userId` (`userId` ASC)  COMMENT '',
  INDEX `fk_like_postId` (`postId` ASC)  COMMENT '',
  CONSTRAINT `fk_like_postId`
    FOREIGN KEY (`postId`)
    REFERENCES `p7groupomania`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_like_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `p7groupomania`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_postId`
    FOREIGN KEY (`postId`)
    REFERENCES `p7groupomania`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `p7groupomania`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
