CREATE TABLE IF NOT EXISTS `roles` (
    `rol_role` VARCHAR(15) NOT NULL,
    `rol_description` TINYTEXT NULL,
    PRIMARY KEY (`rol_role`),
    UNIQUE INDEX `role_UNIQUE` (`rol_role` ASC)
) ENGINE = InnoDB;