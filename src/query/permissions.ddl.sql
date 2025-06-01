CREATE TABLE IF NOT EXISTS `permissions` (
    ` prm_permission ` VARCHAR(100) NOT NULL,
    ` prm_path ` VARCHAR(100) NOT NULL,
    ` prm_method ` VARCHAR(10) NOT NULL,
    ` prm_description ` TINYTEXT NULL,
    UNIQUE INDEX ` prm_permission_UNIQUE ` (` prm_permission ` ASC),
    UNIQUE INDEX ` prm_path_UNIQUE ` (` prm_path ` ASC),
    PRIMARY KEY (` prm_permission `)
) ENGINE = InnoDB;