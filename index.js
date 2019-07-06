(function () {

    const dom_elements = require('dom_elements');
    const StyleUi = require('StyleUi');
    const GameUi = require('GameUi');
    const Game = require('Game');

    const textures = [
        // './images/textures/kirpich.jpg',
        './images/textures/packages/1/floor.jpg',
        './images/textures/packages/1/wall.jpg',
        './images/textures/packages/1/roof.jpg',
        './images/textures/door.jpg', // kirpich
        './images/textures/pass.png',
        './images/textures/gift.png',
        './images/textures/medical.png'
        //
    ];

    const sounds = [
        './mp3/pass.mp3',
        './mp3/dead.mp3',
        './mp3/time.mp3',
        './mp3/radiation.mp3',
    ].map(path => fetch(path));

    function loadTextures(textures, callback) {
        let numberOfTextures = 0;
        const onLoad = () => {
            numberOfTextures -= 1;
            if (!numberOfTextures) callback(images);
        };
        const images = textures.map((path) => {
            numberOfTextures += 1;
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.src = path;
            image.onload = onLoad;
            return image;
        });
    }

    loadTextures(textures, images => {
        const elements = dom_elements.get({
            display: 'view',
            map: 'mini_map_display',
            samosbor: 'display__samosbor',
            health: 'display__health',
            time: 'display__time',
            damage: 'damage_screen',
            pass: 'pass',
            timeContainer: 'display__time_container',
            samosborContainer: 'display__samosbor_container',
            healthContainer: 'display__health_container'
        });
        const game = new Game(elements, images);

        const elementsUi = dom_elements.get({
            background: 'game_ui__background',
            container: 'game_ui',
            content: 'game_ui__content',
        });
        const gameUi = new GameUi(elementsUi, game);

        game.on('loot', function(lootId) {
            gameUi.addLoot(lootId);
        });
        game.on('victory', function(time) {
            gameUi.updateRecords(time);
            gameUi.updateLevel();
            gameUi.isPlaying = false;
            setTimeout(() => {
                gameUi.show('victory');
            }, 2000);
        });
        game.on('game_over', function(time) {
            gameUi.time = time;
            gameUi.isPlaying = false;
            setTimeout(() => {
                gameUi.show('game_over');
            }, 2000);
        });


        const backgroundElements = dom_elements.get({
            smallRing: 'game_ui__bg__small_ring',
            middleRing: 'game_ui__bg__middle_ring',
            road: 'game_ui__bg__road',
            bigRing: 'game_ui__bg__big_ring',
            light: 'game_ui__bg__light',
            octopus1: 'game_ui__bg__octopus_1',
            octopus2: 'game_ui__bg__octopus_2',
            octopus3: 'game_ui__bg__octopus_3',
            octopus4: 'game_ui__bg__octopus_4',
            ripple: 'game_ui__bg__ripple',
        });

        const style = new StyleUi(backgroundElements);
    });

})();
// document.oncontextmenu = function (){return false};