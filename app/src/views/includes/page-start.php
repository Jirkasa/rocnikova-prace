<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, maximum-scale=2.2, minimum-scale=1.0">

    <link rel="icon" type="image/svg+xml" href="<?php echo URLROOT; ?>/img/logo.svg"/>

    <link rel="stylesheet" href="<?php echo ASSETSROOT; ?>/css/style.css">

    <title>
        <?php
            if (isset($data['title'])) {
                echo SITENAME . ' - ' . $data['title'];
            } else {
                echo SITENAME;
            }
        ?>
    </title>
</head>
<body>
    <div class="page">
        <header class="header">
            <div class="header__content">
                <a href="<?php echo URLROOT; ?>" class="header__home-link">
                    <img src="./img/Logo.svg" alt="Logo" class="header__logo">
                    <span class="header__title"><?php echo SITENAME; ?></span>
                </a>
                <button id="HeaderNavigationToggleButton" class="toggle-button">
                    navigace
                    <span class="toggle-button__icon"></span>
                </button>
                <nav id="HeaderNavigation" class="header__navigation">
                    <ul>
                        <li><a href="<?php echo URLROOT; ?>/hra" class="header__navigation-item">Hrát</a></li>
                        <?php if (isLoggedIn()) { ?>
                            <li>
                                <a href="<?php echo URLROOT; ?>/profile" class="profile-button">
                                    <div class="profile-button__icon">
                                        <svg>
                                            <use xlink:href="<?php echo URLROOT; ?>/static/icon-sprite.svg#person"></use>
                                        </svg>
                                    </div>
                                    <span class="profile-button__username"><?php echo $_SESSION["user_username"]; ?></span>
                                </a>
                            </li>
                        <?php } else { ?>
                            <li><a href="<?php echo URLROOT; ?>/prihlaseni" class="header__navigation-item">Přihlásit se</a></li>
                            <li><a href="<?php echo URLROOT; ?>/registrace" class="header__navigation-item">Vytvořit účet</a></li>
                        <?php } ?>
                    </ul>
                </nav>
            </div>
        </header>