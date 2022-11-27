<?php require_once APPROOT . '/src/views/includes/page-start.php'; ?>
    <div id="CanvasContainer" class="game">
        <canvas id="WebGLCanvas" class="game__canvas"></canvas>
        <div id="GameLoadIcon" class="game__load-icon">
            <svg>
                <use xlink:href="./static/icon-sprite.svg#spinner"></use>
            </svg>
        </div>
        <div class="game__score">Skóre: <span id="Score">0</span></div>
    </div>
    <script src="<?php echo ASSETSROOT; ?>/js/game.js"></script>
<?php require_once APPROOT . '/src/views/includes/page-end.php'; ?>