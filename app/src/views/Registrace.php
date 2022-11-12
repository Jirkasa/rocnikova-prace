<?php require_once APPROOT . '/src/views/includes/page-start.php'; ?>
    <div class="full-height-page-layout">
        <div class="full-height-page-layout__container">
            <div class="form-card">
                <div class="form-card__image">
                    <img src="<?php echo URLROOT; ?>/img/GalleryImage2.png" alt="">
                </div>
                <form method="POST" class="form-card__content">
                    <h2 class="heading-secondary u-mb-4">Registrace</h2>
                    <hr class="u-mb-4">
                    <label for="username" class="label u-mb-1">Uživatelské jméno</label>
                    <input type="text" name="username" id="username" value="<?php echo $data["username"]; ?>" class="input <?php echo $data["usernameError"] === "" ? "u-mb-4" : "u-mb-1" ?>">
                    <?php if ($data["usernameError"] !== "") { ?>
                    <div class="input-error u-mb-4">
                        <div class="input-error__icon">
                            <svg>
                                <use xlink:href="./static/icon-sprite.svg#error"></use>
                            </svg>
                        </div>
                        <p class="input-error__text"><?php echo $data["usernameError"]; ?></p>
                    </div>
                    <?php } ?>
                    <label for="password" class="label u-mb-1">Heslo</label>
                    <input type="password" name="password" id="password" value="<?php echo $data["password"]; ?>" class="input <?php echo $data["passwordError"] === "" ? "u-mb-4" : "u-mb-1" ?>">
                    <?php if ($data["passwordError"] !== "") { ?>
                    <div class="input-error u-mb-4">
                        <div class="input-error__icon">
                            <svg>
                                <use xlink:href="./static/icon-sprite.svg#error"></use>
                            </svg>
                        </div>
                        <p class="input-error__text"><?php echo $data["passwordError"]; ?></p>
                    </div>
                    <?php } ?>
                    <label for="password-again" class="label u-mb-1">Heslo znovu</label>
                    <input type="password" name="password-confirm" id="password-again" value="<?php echo $data["confirmPassword"]; ?>" class="input <?php echo $data["confirmPasswordError"] === "" ? "u-mb-6" : "u-mb-1" ?>">
                    <?php if ($data["confirmPasswordError"] !== "") { ?>
                    <div class="input-error u-mb-6">
                        <div class="input-error__icon">
                            <svg>
                                <use xlink:href="./static/icon-sprite.svg#error"></use>
                            </svg>
                        </div>
                        <p class="input-error__text"><?php echo $data["confirmPasswordError"]; ?></p>
                    </div>
                    <?php } ?>
                    <button class="button-primary">Vytvořit účet</button>
                </form>
            </div>
        </div>
        <footer class="footer">
            <p>Tento web vytvořil <a href="https://jirkasa.github.io/" target="_blank" class="footer__link">Jiří Satora</a></p>
        </footer>
    </div>
<?php require_once APPROOT . '/src/views/includes/page-end.php'; ?>