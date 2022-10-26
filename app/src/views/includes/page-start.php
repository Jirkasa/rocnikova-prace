<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, maximum-scale=2.2, minimum-scale=1.0">

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
                <nav class="header__navigation">
                    <ul>
                        <li><a href="<?php echo URLROOT; ?>/hra" class="header__navigation-item">Hrát</a></li>
                        <li><a href="#" class="header__navigation-item">Přihlásit se</a></li>
                        <li><a href="#" class="header__navigation-item">Vytvořit účet</a></li>
                    </ul>
                </nav>
            </div>
        </header>