(function () {

    const templatingEngine = require('templatingEngine');
    const gameUiCommon = require('gameUiCommon');
    const GameUiSave = require('GameUiSave');
    const GameUiLoad = require('GameUiLoad');
    const GameUiMenu = require('GameUiMenu');
    const GameUiRecords = require('GameUiRecords');
    const GameUiOptions = require('GameUiOptions');
    const GameUiTournament = require('GameUiTournament');
    const GameUiVictory = require('GameUiVictory');
    const GameUiGameOver = require('GameUiGameOver');
    const GameUiLevels = require('GameUiLevels');
    const GameUiLoot = require('GameUiLoot');
    const GameUiAchievements = require('GameUiAchievements');
    const GameUiAlert = require('GameUiAlert');
    const gameUiStorage = require('gameUiStorage');
    const language = require('language');

    class GameUi {
        constructor(elements, game) {
            this.elements = elements;
            this._savings = JSON.parse(localStorage.getItem('savings') || '[]');
            this.isPlaying = false;
            this._state = null;
            this._playerInformation = gameUiStorage.load() || {
                level: 0,
                maxLevel: 30,
                name: 'Player_' + Math.ceil(Math.random() * 100000),
                records: [],
                achievements: [],
                loot: [0,1,2,3,4,5,6,7,8]
            };
            this._alertInfo = {};
            this._currentType = 'passing';
            this._currentLevel = 0;
            this._game = game;

            this._gameUiSave = new GameUiSave();
            this._gameUiLoad = new GameUiLoad();
            this._gameUiMenu = new GameUiMenu();
            this._gameUiRecords = new GameUiRecords();
            this._gameUiOptions = new GameUiOptions();
            this._gameUiTournament = new GameUiTournament();
            this._gameUiVictory = new GameUiVictory();
            this._gameUiGameOver = new GameUiGameOver();
            this._gameUiLevels = new GameUiLevels();
            this._gameUiLoot = new GameUiLoot();
            this._gameUiAchievements = new GameUiAchievements();
            this._gameUiAlert = new GameUiAlert();

            this._setWorkFlow();
            this._setEvents();
            this._render('menu');
        }

        _setWorkFlow() {
            const showMenu = this._render.bind(this, 'menu');
            this._gameUiLoad.on('back', showMenu);
            this._gameUiSave.on('back', showMenu);
            this._gameUiRecords.on('back', showMenu);
            this._gameUiOptions.on('back', showMenu);
            this._gameUiLevels.on('back', showMenu);
            this._gameUiLoot.on('back', showMenu);
            this._gameUiAchievements.on('back', showMenu);

            this._gameUiAlert.on('continue', () => {
                this._continue();
            });
            this._gameUiLoad.on('load', (saveItem) => {
                this._game.load(saveItem.data);
                this._continue();
            });
            this._gameUiLoad.on('update_savings', (savings) => {
                this._savings = savings;
                localStorage.setItem('savings', JSON.stringify(savings));
                this._render();
            });
            this._gameUiSave.on('update_savings', (savings) => {
                this._savings = savings;
                localStorage.setItem('savings', JSON.stringify(savings));
                this._render();
            });
            this._gameUiMenu.on('update', (state) => {
                this._render(state);
                if (state === 'game') this._continue();
            });
            this._gameUiTournament.on('select_level', (levelId) => {
                this._currentType = 'tournament';
                this._currentLevel = levelId;
                this._newGame(levelId);
            });
            this._gameUiVictory.on('back', () => {
                this.showBackground();
                this._render('menu');
            });
            this._gameUiVictory.on('next', () => {
                if (this._currentType === 'tournament') {
                    this._newGame(this._currentLevel);
                } else {
                    this._newGame(this._playerInformation.level);
                }
            });
            this._gameUiGameOver.on('back', () => {
                this.showBackground();
                this._render('menu');
            });
            this._gameUiGameOver.on('next', () => {
                this._newGame(this._currentLevel);
            });
            this._gameUiLevels.on('select_level', (levelId) => {
                this._currentType = 'passing';
                this._currentLevel = levelId;
                this._newGame(levelId);
            });
        }

        updateLevel() {
            if (this._currentType === 'tournament') return;
            if (this._currentLevel === this._playerInformation.level && this._currentLevel < 30) {
                this._playerInformation.level += 1;
                gameUiStorage.save(this._playerInformation);
            }
            if (this._currentLevel < 30) {
                this._currentLevel += 1;
            }
        }

        updateRecords(time) {
            const prevTime = this._playerInformation.records[this._currentLevel];
            if (!prevTime || prevTime >= time) {
                this._playerInformation.records[this._currentLevel] = time;
                gameUiStorage.save(this._playerInformation);
            }
        }

        _setEvents() {
            this._onKeyDown = this._onKeyDown.bind(this);
            document.body.addEventListener('keydown', this._onKeyDown, false);
        }

        _onKeyDown(event) {
            if (event.keyCode !== 27) return;
            if (this._state === 'game') {
                this.show('menu');
                this.showBackground();
                return;
            }
            if (this._state === 'menu' && this.isPlaying) {
                this._game.play();
                this.hide();
                return;
            }
            this._render('menu');
        }

        _continue() {
            this._game.play();
            this.hide();
        }

        _newGame(levelId) {
            this.isPlaying = true;
            this._game.rePlay(levelId);
            this.hide();
        }

        _render(stateName) {
            this._state = stateName || this._state;
            this.elements.content.innerHTML = '';
            if (this._state === 'save') this._gameUiSave.render(this.elements.content, this._savings, this._game, this._difficulty);
            if (this._state === 'load') this._gameUiLoad.render(this.elements.content, this._savings);
            if (this._state === 'menu') this._gameUiMenu.render(this.elements.content, this._savings, this.isPlaying, this._playerInformation);
            if (this._state === 'records') this._gameUiRecords.render(this.elements.content);
            if (this._state === 'options') this._gameUiOptions.render(this.elements.content, this._playerInformation);
            if (this._state === 'tournament') this._gameUiTournament.render(this.elements.content, this._game);
            if (this._state === 'levels') this._gameUiLevels.render(this.elements.content, this._playerInformation);
            if (this._state === 'loot') this._gameUiLoot.render(this.elements.content, this._playerInformation);
            if (this._state === 'achievements') this._gameUiAchievements.render(this.elements.content, this._playerInformation);
            if (this._state === 'victory') this._gameUiVictory.render(this.elements.content, this._game.getScore());
            if (this._state === 'game_over') this._gameUiGameOver.render(this.elements.content, this._game.getScore());
            if (this._state === 'alert') this._gameUiAlert.render(this.elements.content, this._alertInfo);
        }

        hide() {
            this._state = 'game';
            this.elements.container.className = 'hidden';
            this.elements.background.className = 'hidden';
        }

        show(stateName) {
            this._game.pause();
            this._render(stateName);
            this.elements.container.className = 'game_ui__container';
        }

        showBackground() {
            this.elements.background.className = 'game_ui__background';
        }

        addLoot(lootId) {
            const loot = this._playerInformation.loot;
            if (!loot.includes(lootId)) {
                loot.push(lootId);
                gameUiStorage.save(this._playerInformation);
            }
            this.isPlaying = false;
            this._alertInfo = {
                message: language.get('findLoot') + '<br>«' + language.get(`loot${lootId}`) + '»',
                url: `images/loot/${lootId}.png`
            };
            this.show('alert');
        }
    }

    module.exports = GameUi;
})();
