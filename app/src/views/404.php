<?php require_once APPROOT . '/src/views/includes/page-start.php'; ?>
    <div class="full-height-page-layout">
        <div class="full-height-page-layout__container">
            <div class="message-card u-center-text">
                <h2 class="heading-secondary u-mb-4">404 - Nenalezeno</h2>
                <hr class="u-mb-4">
                <p class="message-card__text paragraph u-mb-4">Tato stránka bohužel nebyla nalezena.</p>
                <div class="icon u-mb-4">
                    <svg>
                        <use xlink:href="./static/icon-sprite.svg#search-off"></use>
                    </svg>
                </div>
                <a href="<?php echo URLROOT; ?>" class="button-primary">Odejít na hlavní stránku</a>
            </div>
        </div>
        <footer class="footer">
            <p>Tento web vytvořil <a href="https://jirkasa.github.io/" target="_blank" class="footer__link">Jiří Satora</a></p>
        </footer>
    </div>
<?php require_once APPROOT . '/src/views/includes/page-end.php'; ?>