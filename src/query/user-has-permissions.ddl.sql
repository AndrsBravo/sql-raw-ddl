CREATE TABLE IF NOT EXISTS `users_has_permissions` (
    `uhp_user` INT NOT NULL,
    `uhp_permission` INT NOT NULL,
    `uhp_granted` SMALLINT DEFAULT 0,
    INDEX `fk_uhp_users1_idx` (`uhp_user` ASC),
    INDEX `fk_uhp_permissions1_idx` (`uhp_user` ASC),
    CONSTRAINT `fk_uhp_users1` FOREIGN KEY (`uhp_user`) REFERENCES `users` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_uhp_permissions1` FOREIGN KEY (`uhp_permission`) REFERENCES `permissions` (`prm_permission`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;