<?php require_once APPROOT . '/src/views/includes/page-start.php'; ?>
    <section class="home-intro-section">
        <div class="home-intro-section__container">
            <div class="home-intro-section__image-side">
                <img src="./img/Chicken.png" alt="">
            </div>
            <div class="home-intro-section__content-side">
                <div class="home-intro-section__box">
                    <h1 class="heading-primary u-white-text u-mb-4">Přebíhej přes silnice a dostaň se co nejdál</h1>
                    <hr class="u-mb-4">
                    <p class="paragraph u-white-text u-mb-4">Vítej na webu, na kterém si můžeš zahrát jednoduchou hru, kterou jsem vytvořil jako ročníkovou práci do školy. V této hře hraješ za kuře a snažíš se přecházením přes silnice dostat co nejdál.</p>
                    <div class="home-intro-section__buttons">
                        <a href="<?php echo URLROOT; ?>/hra" class="button-primary">
                            <svg>
                                <use xlink:href="./static/icon-sprite.svg#esports"></use>
                            </svg>
                            <span>Spustit hru</span>
                        </a>
                        <?php
                            if (!isLoggedIn()) {
                        ?>
                            <a href="<?php echo URLROOT; ?>/registrace" class="button-primary button-primary--outlined">
                                <svg>
                                    <use xlink:href="./static/icon-sprite.svg#person-add"></use>
                                </svg>
                                <span>Vytvořit účet</span>
                            </a>
                        <?php
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="section">
        <div class="section__content">
            <h2 class="heading-secondary u-center-text u-mb-4">Nejlepší hráči</h2>
            <hr class="horizontal-rule u-mb-4">
            <div class="intro-text <?php echo count($data['leaderboardUsers']) > 0 ? "u-mb-6" : "u-mb-4" ?>">
                <?php
                    if (isLoggedIn()) {
                ?>
                    <p class="paragraph">Zde se nachází žebříček nejlepších hráčů. Můžeš s jeho pomocí porovnat, jak jsi na tom v porovnání s ostatními hráči.</p>
                <?php
                    } else {
                ?>
                    <p class="paragraph">Pokud si vytvoříš účet, tvé nejlepší skóre se bude ukládat do globálního žebříčku a můžeš tak porovnat, jak jsi na tom v porovnání s ostatními hráči.</p>
                <?php
                    }
                ?>
            </div>
            <?php
                if (count($data['leaderboardUsers']) > 0) {
            ?>
                <div class="home-leaderboard-container u-mb-4">
                    <div class="leaderboard">
                        <?php
                            foreach ($data['leaderboardUsers'] as $idx => &$user) {
                            $place = $idx+1;
                            $modifierClass = "";
                            switch ($place) {
                                case 1:
                                    $modifierClass = " leaderboard-item__place--first";
                                    break;
                                case 2:
                                    $modifierClass = " leaderboard-item__place--second";
                                    break;
                                case 3:
                                    $modifierClass = " leaderboard-item__place--third";
                                    break;
                            }
                        ?>
                            <div class="leaderboard-item">
                                <div class="leaderboard-item__place<?php echo $modifierClass; ?>"><?php echo $place; ?></div>
                                <div class="leaderboard-item__content">
                                    <p class="leaderboard-item__username"><?php echo $user->username; ?></p>
                                    <p class="leaderboard-item__score"><?php echo $user->high_score; ?></p>
                                </div>
                            </div>
                        <?php
                            }
                        ?>
                    </div>
                </div>
                <div class="u-center-text">
                    <a href="<?php echo URLROOT; ?>/zebricek" class="button-primary">
                        <svg>
                            <use xlink:href="./static/icon-sprite.svg#leaderboard"></use>
                        </svg>
                        <span>Zobrazit celý žebříček</span>
                    </a>
                </div>
            <?php
                } else {
            ?>
                <hr class="horizontal-rule u-mb-4">
                <div class="icon u-mb-4">
                    <svg>
                        <use xlink:href="./static/icon-sprite.svg#leaderboard"></use>
                    </svg>
                </div>
                <p class="paragraph u-center-text">Zatím si nikdo ze zaregistrovaných uživatelů nezahrál. Buď první!</p>
            <?php
                }
            ?>
        </div>
    </section>
    <section class="home-gallery-section">
        <a href="./img/GalleryImage1.png" data-lightbox="galerie" class="home-gallery-section__image">
            <img src="./img/GalleryImage1.png" alt="Obrázek ze hry Kuře na silnici">
        </a>
        <a href="./img/GalleryImage2.png" data-lightbox="galerie" class="home-gallery-section__image">
            <img src="./img/GalleryImage2.png" alt="Obrázek ze hry Kuře na silnici">
        </a>
        <a href="./img/GalleryImage3.png" data-lightbox="galerie" class="home-gallery-section__image">
            <img src="./img/GalleryImage3.png" alt="Obrázek ze hry Kuře na silnici">
        </a>
    </section>
    <section class="section section--no-vertical-padding">
        <div class="section__content">
            <div class="home-about-section">
                <div class="home-about-section__content">
                    <h2 class="heading-secondary u-center-text u-mb-4">O hře</h2>
                    <hr class="horizontal-rule u-mb-4">
                    <p class="paragraph u-mb-6">Tuto hru jsem se rozhodl naprogramovat, protože jsem musel do školy vytvořit ročníkovou práci. Ta spočívala v tom, vytvořit nějaký web, který používá databázi, umožňuje uživatelům zaregistrovat se, a tak podobně. Vytvořit tedy jednoduchou webovou hru, která by zároveň umožňovala uživatelům vytvořit si účet a uložit si nejlepší skóre v žebříčku mi přišlo jako dobrý nápad.</p>
                    <p class="paragraph">Při tvorbě hry jsem používal JavaScript knihovnu jménem Three.js. Tato knihovna slouží pro práci s 3D grafikou a můžeme s její pomocí vytvářet spoustu zajímavých věcí, včetně her. Pokud umíš programovat v JavaScriptu a chtěl(a) by jsi se knihovnu Three.js naučit používat, tak o ní mám <a href="https://jirkasa.github.io/threejs-navod/" target="_blank" class="link">webové stránky</a>. Nachází se tam tutoriál obsahující spoustu interaktivních ukázek, který tě knihovnou Three.js postupně provede.</p>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer">
        <p>Tento web vytvořil <a href="https://jirkasa.github.io/" target="_blank" class="footer__link">Jiří Satora</a></p>
    </footer>
    <script src="<?php echo ASSETSROOT; ?>/js/home.js"></script>
<?php require_once APPROOT . '/src/views/includes/page-end.php'; ?>