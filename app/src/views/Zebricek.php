<?php require_once APPROOT . '/src/views/includes/page-start.php'; ?>
    <div class="page-layout">
        <div class="page-layout__container">
            <div class="page-layout__content">
                <h1 class="heading-secondary u-center-text u-mb-9">Žebříček</h1>
                <?php
                    // LEADERBOARD //
                    if ($data['pageCount'] > 0) {
                ?>
                    <div class="leaderboard u-mb-4">
                        <?php
                            foreach ($data['users'] as $idx => &$user) {
                            $place = $idx+1 + ($data['activePage']-1) * $data['itemsPerPage'];
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
                <?php
                    } else {
                ?>
                    <p class="paragraph u-mb-8 u-center-text">Zatím si nikdo ze zaregistrovaných uživatelů nezahrál. Buď první!</p>
                    <div class="icon">
                        <svg>
                            <use xlink:href="./static/icon-sprite.svg#leaderboard"></use>
                        </svg>
                    </div>
                <?php
                    }
                ?>

                <?php
                    // PAGINATION //
                    if ($data['pageCount'] > 1) {
                ?>
                    <?php
                        // get offset (basically what is the first button page number)

                        $PAGINATION_BUTTONS_COUNT = 9;

                        $offset = 0;
                        if ($data['activePage'] > $PAGINATION_BUTTONS_COUNT/2 && $data['pageCount']> $PAGINATION_BUTTONS_COUNT) {
                            if ($data['activePage'] > ($data['pageCount'] - floor($PAGINATION_BUTTONS_COUNT/2)-1)) {
                                $offset = $data['activePage'] - ($PAGINATION_BUTTONS_COUNT-($data['pageCount']-$data['activePage']));
                            } else {
                                $offset = $data['activePage'] - floor($PAGINATION_BUTTONS_COUNT/2)-1;
                            }
                        }

                        // create pagination buttons
                        $paginationButtons = [];
                        for ($i = 1; $i <= $PAGINATION_BUTTONS_COUNT && $i <= $data['pageCount']; $i++) {
                            // display disabled [...] button if necessary
                            if (
                                (
                                    $i == 2 &&
                                    $data['activePage'] > ceil($PAGINATION_BUTTONS_COUNT/2) &&
                                    $data['pageCount'] > $PAGINATION_BUTTONS_COUNT
                                ) || (
                                    $i == $PAGINATION_BUTTONS_COUNT-1 &&
                                    $data['activePage'] < $data['pageCount'] - floor($PAGINATION_BUTTONS_COUNT/2) &&
                                    $data['pageCount'] > $PAGINATION_BUTTONS_COUNT
                                )
                            ) {
                                array_push($paginationButtons, '<button class="pagination__button" disabled>...</button>');
                                continue;
                            }

                            // get number of current button
                            $number;
                            if ($i == 1) {
                                // first button has always number 1
                                $number = 1;
                            } else if ($i == $PAGINATION_BUTTONS_COUNT) {
                                // last number has always number as page count
                                $number = $data['pageCount'];
                            } else {
                                // number is sum of index and offset
                                $number = $i+$offset;
                            }

                            // add button to pagination buttons array
                            array_push($paginationButtons, '<a href="' . URLROOT . '/zebricek?page=' . $number . '" class="pagination__button ' . ($data['activePage'] == $i+$offset ? "pagination__button--active" : "") . '">' . $number . '</a>');
                        }
                    ?>

                    <div class="pagination">
                        <?php
                            if ($data['activePage'] == 1) {
                        ?>
                            <button class="pagination__button pagination__button--move" disabled>
                                <div class="pagination__button-icon">
                                    <svg>
                                        <use xlink:href="./static/icon-sprite.svg#arrow-left"></use>
                                    </svg>
                                </div>
                            </button>
                        <?php
                            } else {
                        ?>
                            <a href="<?php echo URLROOT ?>/zebricek?page=<?php echo $data['activePage']-1; ?>" class="pagination__button pagination__button--move">
                                <div class="pagination__button-icon">
                                    <svg>
                                        <use xlink:href="./static/icon-sprite.svg#arrow-left"></use>
                                    </svg>
                                </div>
                            </a>
                        <?php
                            }
                        ?>
                        <?php
                            foreach ($paginationButtons as &$button) {
                                echo $button;
                            }
                        ?>
                        <?php
                            if ($data['activePage'] == $data['pageCount']) {
                        ?>
                            <button class="pagination__button pagination__button--move" disabled>
                                <div class="pagination__button-icon">
                                    <svg>
                                        <use xlink:href="./static/icon-sprite.svg#arrow-right"></use>
                                    </svg>
                                </div>
                            </button>
                        <?php
                            } else {
                        ?>
                            <a href="<?php echo URLROOT; ?>/zebricek?page=<?php echo $data['activePage']+1 ?>" class="pagination__button pagination__button--move">
                                <div class="pagination__button-icon">
                                    <svg>
                                        <use xlink:href="./static/icon-sprite.svg#arrow-right"></use>
                                    </svg>
                                </div>
                            </a>
                        <?php
                            }
                        ?>
                    </div>
                <?php
                    }
                ?>
                
            </div>
        </div>
        <footer class="footer">
            <p>Tento web vytvořil <a href="https://jirkasa.github.io/" target="_blank" class="footer__link">Jiří Satora</a></p>
        </footer>
    </div>
<?php require_once APPROOT . '/src/views/includes/page-end.php'; ?>