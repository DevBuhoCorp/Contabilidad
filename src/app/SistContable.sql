-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema prueba
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema prueba
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `prueba` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `prueba` ;

-- -----------------------------------------------------
-- Table `prueba`.`Naturaleza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`Naturaleza` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Etiqueta` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`DiarioContable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`DiarioContable` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(2) NULL,
  `Etiqueta` VARCHAR(45) NULL,
  `IDNaturaleza` INT NOT NULL,
  `Estado` VARCHAR(3) NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_DiarioContable_Naturaleza_idx` (`IDNaturaleza` ASC),
  CONSTRAINT `fk_DiarioContable_Naturaleza`
    FOREIGN KEY (`IDNaturaleza`)
    REFERENCES `prueba`.`Naturaleza` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`ModeloPlanContable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`ModeloPlanContable` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Modelo` VARCHAR(45) NULL,
  `Etiqueta` VARCHAR(45) NULL,
  `Estado` VARCHAR(3) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`GrupoCuenta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`GrupoCuenta` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Etiqueta` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`CuentaContable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`CuentaContable` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NumeroCuenta` VARCHAR(45) NULL,
  `Etiqueta` VARCHAR(45) NULL,
  `IDGrupoCuenta` INT NOT NULL,
  `IDPadre` INT NOT NULL,
  `Estado` VARCHAR(3) NULL,
  `Saldo` DECIMAL(10,2) NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_CuentaContable_GrupoCuenta1_idx` (`IDGrupoCuenta` ASC),
  INDEX `fk_CuentaContable_CuentaContable1_idx` (`IDPadre` ASC),
  CONSTRAINT `fk_CuentaContable_GrupoCuenta1`
    FOREIGN KEY (`IDGrupoCuenta`)
    REFERENCES `prueba`.`GrupoCuenta` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CuentaContable_CuentaContable1`
    FOREIGN KEY (`IDPadre`)
    REFERENCES `prueba`.`CuentaContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`PlanContable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`PlanContable` (
  `ID` INT NOT NULL,
  `IDModelo` INT NOT NULL,
  `IDCuenta` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_PlanContable_ModeloPlanContable1_idx` (`IDModelo` ASC),
  INDEX `fk_PlanContable_CuentaContable1_idx` (`IDCuenta` ASC),
  CONSTRAINT `fk_PlanContable_ModeloPlanContable1`
    FOREIGN KEY (`IDModelo`)
    REFERENCES `prueba`.`ModeloPlanContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PlanContable_CuentaContable1`
    FOREIGN KEY (`IDCuenta`)
    REFERENCES `prueba`.`CuentaContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`GrupoPersonalizado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`GrupoPersonalizado` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(45) NULL,
  `Etiqueta` VARCHAR(100) NULL,
  `Comentario` VARCHAR(100) NULL,
  `GrupoPersonalizadocol` VARCHAR(45) NULL,
  `Calculado` TINYINT(1) NULL,
  `Formula` VARCHAR(100) NULL,
  `Estado` VARCHAR(3) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`ListaGrupoPersonalizado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`ListaGrupoPersonalizado` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IDGrupo` INT NOT NULL,
  `IDCuenta` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_ListaGrupoPersonalizado_GrupoPersonalizado1_idx` (`IDGrupo` ASC),
  INDEX `fk_ListaGrupoPersonalizado_CuentaContable1_idx` (`IDCuenta` ASC),
  CONSTRAINT `fk_ListaGrupoPersonalizado_GrupoPersonalizado1`
    FOREIGN KEY (`IDGrupo`)
    REFERENCES `prueba`.`GrupoPersonalizado` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ListaGrupoPersonalizado_CuentaContable1`
    FOREIGN KEY (`IDCuenta`)
    REFERENCES `prueba`.`CuentaContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`CuentaDefecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`CuentaDefecto` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Opcion` VARCHAR(100) NULL,
  `IDCuenta` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_CuentaDefecto_CuentaContable1_idx` (`IDCuenta` ASC),
  CONSTRAINT `fk_CuentaDefecto_CuentaContable1`
    FOREIGN KEY (`IDCuenta`)
    REFERENCES `prueba`.`CuentaContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`TipoCuentaBancaria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`TipoCuentaBancaria` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Etiqueta` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`CuentaBancaria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`CuentaBancaria` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Referencia` VARCHAR(45) NULL,
  `Cuenta` VARCHAR(45) NULL,
  `Etiqueta` VARCHAR(45) NULL,
  `TipoCuenta` INT NOT NULL,
  `Estado` VARCHAR(3) NULL,
  `Web` VARCHAR(45) NULL,
  `SaldoInicial` DECIMAL(10,2) NULL,
  `Fecha` DATETIME NULL,
  `SaldoMinimo` DECIMAL(10,2) NULL,
  `NombreBanco` VARCHAR(45) NULL,
  `NumeroCuenta` VARCHAR(45) NULL,
  `NombreTitular` VARCHAR(45) NULL,
  `DireccionTitular` VARCHAR(45) NULL,
  `CuentaBancariacol` VARCHAR(45) NULL,
  `IDCuenta` INT NOT NULL,
  `IDDiario` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_CuentaBancaria_TipoCuentaBancaria1_idx` (`TipoCuenta` ASC),
  INDEX `fk_CuentaBancaria_CuentaContable1_idx` (`IDCuenta` ASC),
  INDEX `fk_CuentaBancaria_DiarioContable1_idx` (`IDDiario` ASC),
  CONSTRAINT `fk_CuentaBancaria_TipoCuentaBancaria1`
    FOREIGN KEY (`TipoCuenta`)
    REFERENCES `prueba`.`TipoCuentaBancaria` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CuentaBancaria_CuentaContable1`
    FOREIGN KEY (`IDCuenta`)
    REFERENCES `prueba`.`CuentaContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CuentaBancaria_DiarioContable1`
    FOREIGN KEY (`IDDiario`)
    REFERENCES `prueba`.`DiarioContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`CuentaImpuesto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`CuentaImpuesto` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(45) NULL,
  `Etiqueta` VARCHAR(45) NULL,
  `IDCuenta` INT NOT NULL,
  `Estado` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_CuentaImpuesto_CuentaContable1_idx` (`IDCuenta` ASC),
  CONSTRAINT `fk_CuentaImpuesto_CuentaContable1`
    FOREIGN KEY (`IDCuenta`)
    REFERENCES `prueba`.`CuentaContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prueba`.`LibroMayor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prueba`.`LibroMayor` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATETIME NULL,
  `DocContable` VARCHAR(45) NULL,
  `IDCuenta` INT NOT NULL,
  `Etiqueta` VARCHAR(45) NULL,
  `Debe` DECIMAL(10,2) NULL,
  `Haber` DECIMAL(10,2) NULL,
  `IDDiario` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_LibroMayor_CuentaContable1_idx` (`IDCuenta` ASC),
  INDEX `fk_LibroMayor_DiarioContable1_idx` (`IDDiario` ASC),
  CONSTRAINT `fk_LibroMayor_CuentaContable1`
    FOREIGN KEY (`IDCuenta`)
    REFERENCES `prueba`.`CuentaContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LibroMayor_DiarioContable1`
    FOREIGN KEY (`IDDiario`)
    REFERENCES `prueba`.`DiarioContable` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
