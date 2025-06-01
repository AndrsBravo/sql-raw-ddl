CREATE TABLE IF NOT EXISTS `users` (
    `usr_id` INT NOT NULL AUTO_INCREMENT,
    `usr_role` VARCHAR(15) NULL,
    `usr_first_name` VARCHAR(45) NOT NULL,
    `usr_last_name` VARCHAR(45) NULL,
    `usr_email` VARCHAR(100) NULL,
    `usr_password` VARCHAR(100) NOT NULL,
    `usr_phone` VARCHAR(15) NULL,
    PRIMARY KEY (`usr_id`),
    UNIQUE INDEX `id_UNIQUE` (`usr_id` ASC),
    UNIQUE INDEX `password_UNIQUE` (`usr_password` ASC),
    UNIQUE INDEX `email_UNIQUE` (`usr_email` ASC),
    INDEX `fk_users_roles1_idx` (`usr_role` ASC),
    CONSTRAINT `fk_users_roles1` FOREIGN KEY (`usr_role`) REFERENCES `roles` (`rol_role`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;