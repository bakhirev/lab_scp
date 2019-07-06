(function () {

    const EventEmitter = require('EventEmitter');
    const level = require('level');
    const gameLevelConfig = require('gameLevelConfig');
    const gameLevelGame = require('gameLevelGame');
    const gameLevelDistance = require('gameLevelDistance');
    const Render = require('Render');
    const MiniMap = require('MiniMap');
    const Joystick = require('Joystick');
    const Physics = require('Physics');
    const GamePlayer = require('GamePlayer');
    const GameSamosbor = require('GameSamosbor');
    const GameTime = require('GameTime');
    const GameAudio = require('GameAudio');
    const GamePass = require('GamePass');

    class Game {
        constructor(elements, images) {
            this.elements = elements;
            this.width = 7;//7;
            this.height = 7;//3;
            this.cameraPosition = {};
            this._level = null;
            this._levelGame = null;
            this._timer = null;
            this._prevTimer = null;
            this._distance = 1;
            this._isEnd = false;
            this._levelPosition = {};
            this._levelId = 0;

            this._setWorkFlow(images);
            this._setObjects();
            this.resize();
        }

        _setWorkFlow(images) {
            this._eventEmitter = new EventEmitter();
            this._render = new Render(this.elements.display, images);
            this._joystick = new Joystick(this.elements);
            this._physics = new Physics();
            this._audio = new GameAudio();
            this._map = new MiniMap(this.elements);
        }

        _setObjects() {
            this._gameTime = new GameTime(this.elements);
            this._gameSamosbor = new GameSamosbor(this.elements);
            this._gamePlayer = new GamePlayer(this.elements);
            this._gamePass = new GamePass(this.elements);
            this._gameSamosbor.on('begin', () => {
                this._audio.play(true);
            });
            this._gameSamosbor.on('end', () => {
                this._audio.play();
            });
        }

        _setLevel(levelId) {
            this.cameraPosition = {
                move: [125 + 62, 0, 125 + 62],
                rotate: [0, 0, 0]
            };
            const [width, height] = gameLevelConfig.getWidthHeight(levelId);
            this._levelId = levelId;
            this.width = width;
            this.height = height;
            this._levelPosition = {};
            this._level = level.getLevel(this.width, this.height);
            this._distance = gameLevelDistance.getDistanceMap(this._level);
            this._levelGame = gameLevelGame.getGameLevel(this._level, this._distance, levelId);
            this._gamePass.setCorrectKeys(this._levelGame);
            this._map.mapLevel = level.getMap(this.width, this.height);
            this._map.resize(this._levelGame);
            this._render.clearCash();
            this._gameTime.total = 0;
            this._gameSamosbor.setDefault();
            this._gamePlayer.health = 100;
            this._gamePass.clear();
        }

        _setCameraPosition() {
            const begin = this._distance.begin;
            const row = begin.row * 125 + 62;
            const column = begin.column * 125 + 62;
            this.cameraPosition.move = [column, 0, row];
            this._setCameraRotate();
        }

        _setCameraRotate() {
            const begin = this._distance.begin;
            let angle = 0;
            if (this._level[begin.row][begin.column + 1] === 1) angle = Math.PI + Math.PI / 2;
            if (this._level[begin.row + 1][begin.column] === 1) angle = Math.PI;
            if (this._level[begin.row][begin.column - 1] === 1) angle = Math.PI / 2;
            this.cameraPosition.rotate[1] = angle;
        }

        _beginGameLoop() {
            const delay = 1000 / 30;
            this._prevTimer = (new Date()).getTime();
            clearInterval(this._timer);
            this._timer = setInterval(() => {
                let speed = 5;
                if (this._levelPosition.row && this._levelPosition.column) {
                    const prevCode = this._levelGame[this._levelPosition.row][this._levelPosition.column];
                    if (prevCode === 22) speed = 0.5;
                }
                const { dx, dz } = this._joystick.getDeltaPosition(this.cameraPosition, speed);
                this._levelPosition = this._physics.addCollision(this.cameraPosition, this._levelGame, { dx, dz });
                this._map.markVisited(this._levelPosition);

                this.cameraPosition.rotate[1] += this._joystick.getDeltaRotate();

                const code = this._levelGame[this._levelPosition.row][this._levelPosition.column];
                const isStuff = [10, 11, 12, 13, 14].includes(code);
                if (isStuff) {
                    this._audio.playOnce(10);
                    this._levelGame[this._levelPosition.row][this._levelPosition.column] = 9;
                    this._gamePass.checkCode(code, this._levelGame);
                    this._render.clearCash();
                    if (code === 14) {
                        this._gamePlayer.health = 100;
                    }
                }

                const timeShift = this._updatePrevTime();
                const currentTimeShift = this._gameTime.getTimeShift(code, timeShift);
                if (code === 100) {
                    if (!this._isEnd) this._eventEmitter.emit('victory', this._gameTime.total);
                    if (!this._isEnd) this._audio.playOnce(100);
                    this._isEnd = true;
                }
                if (!this._isEnd) this._gameTime.step(currentTimeShift, code);
                if (!this._isEnd) this._gameSamosbor.step(currentTimeShift, this._level);
                const samosborDistance = this._gameSamosbor.getDistance(this._levelPosition);
                this._gamePlayer.step(timeShift, code, samosborDistance);
                if (!this._isEnd) this._audio.step(timeShift, code);
                this._draw(code, samosborDistance);

                if (code === 13) {
                    this._eventEmitter.emit('loot', gameLevelGame.getRandomLoot(this._levelId));
                }
            }, delay);
        }

        _updatePrevTime() {
            const time = (new Date()).getTime();
            const timeShift = time - this._prevTimer;
            this._prevTimer = time;
            return timeShift;
        }

        _draw(code, samosborDistance) {
            let mode = null;
            if (code === 20) mode = 'time';
            if (code === 22) mode = 'time';
            if (samosborDistance < 20) mode = 'samosbor_min';
            if (samosborDistance < 10) mode = 'samosbor_max';
            this._render.render(this._levelGame, this.cameraPosition, mode);

            const samosborPosition = this._gameSamosbor.getPosition();
            this._map.render(this._levelGame, this._levelPosition, samosborDistance, samosborPosition);
            this._gameTime.render();
            this._gameSamosbor.render();
            this._gamePlayer.render();
            if (this._gamePlayer.health === 0) {
                if (!this._isEnd) this._eventEmitter.emit('game_over', this._gameTime.total);
                if (!this._isEnd) this._audio.playOnce(100);
                this._isEnd = true;
            }
        }

        resize() {
            this._render.resize();
        }

        _setStyleForDisplayElements(className) {
            this.elements.timeContainer.className = className || 'display__timer';
            this.elements.samosborContainer.className = className || 'display__destroy';
            this.elements.healthContainer.className = className || 'display__health';
            this.elements.map.className = className || 'display__map';
        }

        save() {
            if (this._isEnd) return;
            return JSON.stringify({
                level: this._level,
                distance: this._distance,
                levelGame: this._levelGame,
                levelMap: this._map.mapLevel,
                cameraPosition: this.cameraPosition,
                actions: {
                    time: this._gameTime.save(),
                    player: this._gamePlayer.save(),
                    pass: this._gamePlayer.save()
                },
            });
        }

        load(text) {
            const data = JSON.parse(text);
            clearInterval(this._timer);
            this._level = data.level;
            this._distance = data.distance;
            this._levelGame = data.levelGame;
            this._map.mapLevel = data.levelMap;
            this.cameraPosition = data.cameraPosition;
            this._map.resize(this._levelGame);
            this._render.clearCash();
            this._gameTime.load(data.actions.time);
            this._gamePlayer.load(data.actions.player);
            this._gamePass.load(data.actions.pass);
            this._isEnd = false;
            this._beginGameLoop();
        }

        pause() {
            clearInterval(this._timer);
            this._audio.pause();
            this._setStyleForDisplayElements('hidden');
        }

        play() {
            if (this._isEnd) return;
            this._setStyleForDisplayElements();
            this._beginGameLoop();
            this._audio.play();
        }

        rePlay(levelId = 0) {
            this.pause();
            this._setStyleForDisplayElements();
            this._setLevel(levelId);
            this._setCameraPosition();
            this._isEnd = false;
            this.play();
        }

        getScore() {
            return this._gameTime.total;
        }

        on(eventName, callback) {
            this._eventEmitter.on(eventName, callback);
        }
    }

    module.exports = Game;
})();
