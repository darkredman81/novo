-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema webitclo_a156
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema webitclo_a156
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `webitclo_a156` DEFAULT CHARACTER SET utf8 ;
USE `webitclo_a156` ;

-- -----------------------------------------------------
-- Table `webitclo_a156`.`tipobilhete`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`tipobilhete` (
  `idTipoBilhete` INT(11) NOT NULL,
  `preco` DECIMAL(4,2) NULL DEFAULT NULL,
  `tipoBilheteDes` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idTipoBilhete`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`users` (
  `idUser` INT(9) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `nif` INT(9) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `morada` VARCHAR(45) NULL DEFAULT NULL,
  `telefone` VARCHAR(20) NULL DEFAULT NULL,
  `telemovel` VARCHAR(20) NULL DEFAULT NULL,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  `salario` DECIMAL(6,2) NULL DEFAULT '50.00',
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `dateReg` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`bilhete`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`bilhete` (
  `idbilhete` INT(11) NOT NULL,
  `idparticipante` INT(9) NOT NULL,
  `tipobilhete` INT(11) NOT NULL,
  PRIMARY KEY (`idbilhete`, `idparticipante`),
  INDEX `user_idx` (`idparticipante` ASC),
  CONSTRAINT `tipo`
    FOREIGN KEY (`idbilhete`)
    REFERENCES `webitclo_a156`.`tipobilhete` (`idTipoBilhete`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user`
    FOREIGN KEY (`idparticipante`)
    REFERENCES `webitclo_a156`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`camposadicionais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`camposadicionais` (
  `idCamposAdicionais` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL DEFAULT NULL,
  `valor` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idCamposAdicionais`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`patrocinios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`patrocinios` (
  `idPatrocinador` INT(11) NOT NULL,
  `Patrocinador` VARCHAR(45) NULL DEFAULT NULL,
  `montante` DECIMAL(10,2) NULL DEFAULT NULL,
  `urllogo` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`idPatrocinador`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`salas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`salas` (
  `idSala` INT(11) NOT NULL,
  `lotacao` INT(11) NULL DEFAULT NULL,
  `sala` VARCHAR(45) NULL DEFAULT NULL,
  `Salascol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idSala`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`speakers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`speakers` (
  `idSPKR` INT(9) NOT NULL AUTO_INCREMENT,
  `salario` DECIMAL(6,2) NULL DEFAULT NULL,
  `profilepic` VARCHAR(95) NULL DEFAULT NULL,
  `fb` VARCHAR(95) NULL DEFAULT NULL,
  `twitter` VARCHAR(95) NULL DEFAULT NULL,
  `personalweb` VARCHAR(95) NULL DEFAULT NULL,
  `LinkedIn` VARCHAR(95) NULL DEFAULT NULL,
  `gplus` VARCHAR(95) NULL DEFAULT NULL,
  `Cargo` VARCHAR(99) NULL DEFAULT NULL,
  PRIMARY KEY (`idSPKR`),
  CONSTRAINT `id`
    FOREIGN KEY (`idSPKR`)
    REFERENCES `webitclo_a156`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`sessoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`sessoes` (
  `idSessao` INT(3) NOT NULL,
  `tempo` DATETIME NULL DEFAULT NULL,
  `localizacao` VARCHAR(45) NULL DEFAULT NULL,
  `sala` INT(11) NOT NULL,
  `tempofim` DATETIME NULL DEFAULT NULL,
  `keyspeaker` INT(9) NOT NULL,
  `nome` VARCHAR(45) NULL DEFAULT NULL,
  `maxUsers` INT(9) NULL DEFAULT NULL,
  `bilhete` DECIMAL(4,2) NULL DEFAULT NULL,
  `descrissao` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idSessao`),
  INDEX `sala_idx` (`sala` ASC),
  INDEX `key_idx` (`keyspeaker` ASC),
  CONSTRAINT `key`
    FOREIGN KEY (`keyspeaker`)
    REFERENCES `webitclo_a156`.`speakers` (`idSPKR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sala`
    FOREIGN KEY (`sala`)
    REFERENCES `webitclo_a156`.`salas` (`idSala`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`sessoestipobilhete`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`sessoestipobilhete` (
  `idTipoBilhetes` INT(11) NOT NULL,
  `idsessaos` INT(3) NOT NULL,
  PRIMARY KEY (`idTipoBilhetes`, `idsessaos`),
  INDEX `sessao_idx` (`idsessaos` ASC),
  CONSTRAINT `sessao`
    FOREIGN KEY (`idsessaos`)
    REFERENCES `webitclo_a156`.`sessoes` (`idSessao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tipose`
    FOREIGN KEY (`idTipoBilhetes`)
    REFERENCES `webitclo_a156`.`tipobilhete` (`idTipoBilhete`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`speakerssessao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`speakerssessao` (
  `idspeaker` INT(9) NOT NULL,
  `idSessao` INT(3) NOT NULL,
  PRIMARY KEY (`idspeaker`, `idSessao`),
  INDEX `idSessao_idx` (`idSessao` ASC),
  CONSTRAINT `idSessao`
    FOREIGN KEY (`idSessao`)
    REFERENCES `webitclo_a156`.`sessoes` (`idSessao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idSpeaker`
    FOREIGN KEY (`idspeaker`)
    REFERENCES `webitclo_a156`.`speakers` (`idSPKR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webitclo_a156`.`workshop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webitclo_a156`.`workshop` (
  `idWorkshop` INT(11) NOT NULL,
  `nome` VARCHAR(45) NULL DEFAULT NULL,
  `datainicio` DATE NULL DEFAULT NULL,
  `datafim` DATE NULL DEFAULT NULL,
  `local` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idWorkshop`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
