(function() {

    const EventEmitter = require('EventEmitter');
    const templatingEngine = require('templatingEngine');
    const gameUiCommon = require('gameUiCommon');

    class GameUiMenu {
        constructor() {
            this._eventEmitter = new EventEmitter();
        }

        _getContent(savings, isPlaying) {
            return [
                isPlaying ? gameUiCommon.getButton('continue', 'back', this._select.bind(this, 'game')) : null,
                gameUiCommon.getButton('tournament', 'new_game', this._select.bind(this, 'tournament')),
                gameUiCommon.getButton('levels', 'new_game', this._select.bind(this, 'levels')),
                savings.length ? gameUiCommon.getButton('load', 'load', this._select.bind(this, 'load')) : null,
                isPlaying ? gameUiCommon.getButton('save', 'save', this._select.bind(this, 'save')) : null,
                // gameUiCommon.getButton('Records', 'records', this._select.bind(this, 'records')),
                // gameUiCommon.getButton('Options', 'options', this._select.bind(this, 'options'))
            ];
        }

        render(parentElement, savings, isPlaying) {
            templatingEngine.render(this._getContent(savings, isPlaying), parentElement);
        }

        _select(code) {
            this._eventEmitter.emit('update', code);
        }

        on(eventName, callback) {
            this._eventEmitter.on(eventName, callback);
        }
    }

    module.exports = GameUiMenu;
})();
