(function() {

    const EventEmitter = require('EventEmitter');
    const templatingEngine = require('templatingEngine');
    const gameUiCommon = require('gameUiCommon');

    class GameUiTournament {
        constructor() {
            this._eventEmitter = new EventEmitter();
        }

        _getContent() {
            return [
                gameUiCommon.getButton('easy', 'level_easy', this._onMenu.bind(this, 2)),
                gameUiCommon.getButton('medium', 'level_medium', this._onMenu.bind(this, 10)),
                gameUiCommon.getButton('hard', 'level_hard', this._onMenu.bind(this, 20))
            ];
        }

        render(parentElement) {
            templatingEngine.render(this._getContent(), parentElement);
        }

        _onMenu(difficulty) {
            this._eventEmitter.emit('select_level', difficulty);
        }

        on(eventName, callback) {
            this._eventEmitter.on(eventName, callback);
        }
    }

    module.exports = GameUiTournament;
})();
