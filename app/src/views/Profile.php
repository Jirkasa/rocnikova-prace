<?php require_once APPROOT . '/src/views/includes/page-start.php'; ?>
    <div class="full-height-page-layout">
        <div class="full-height-page-layout__container">
            <div class="profile-card">
                <img src="./img/Chicken.png" alt="" class="profile-card__image">
                <div class="profile-card__content">
                    <h2 class="heading-secondary u-mb-2"><?php echo $_SESSION["user_username"]; ?></h2>
                    <h3 class="score-text u-mb-4">Skóre: <span class="score-text__value">0</span></h3>
                    <a href="<?php echo URLROOT; ?>/odhlaseni" class="logout-button">
                        <svg>
                            <use xlink:href="./static/icon-sprite.svg#logout"></use>
                        </svg>
                        <span>Odhlásit se</span>
                    </a>
                </div>
            </div>
        </div>
        <footer class="footer">
            <p>Tento web vytvořil <a href="https://jirkasa.github.io/" target="_blank" class="footer__link">Jiří Satora</a></p>
        </footer>
    </div>
<?php require_once APPROOT . '/src/views/includes/page-end.php'; ?>