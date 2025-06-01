CREATE TABLE IF NOT EXISTS `roles_has_permissions` (
    `rhp_role` VARCHAR(15) NOT NULL,
    `rhp_permission` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`rhp_role`),
    INDEX `fk_rhp_roles1_idx` (`rhp_role` ASC),
    INDEX `fk_rhp_permissions1_idx` (`rhp_permission` ASC),
    CONSTRAINT `fk_roles_has_permissions_roles1` FOREIGN KEY (`rhp_role`) REFERENCES `roles` (`rol_role`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_roles_has_permissions_permissions1` FOREIGN KEY (`rhp_permission`) REFERENCES `permissions` (`prm_permission`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;