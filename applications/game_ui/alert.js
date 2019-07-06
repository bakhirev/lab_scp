(function() {

    const EventEmitter = require('EventEmitter');
    const templatingEngine = require('templatingEngine');
    const gameUiCommon = require('gameUiCommon');
    const language = require('language');

    class GameUiAlert {
        constructor() {
            this._eventEmitter = new EventEmitter();
            this._onContinue = this._onContinue.bind(this);
        }

        _getContent(parameters) {
            return [
                { tag: 'div', content: [
                    { tag: 'p', content: parameters.message, attributes: { className: 'game_ui__modal_title' } },
                    { tag: 'img', attributes: { src: parameters.url, className: 'game_ui__modal_image' } },
                ], attributes: { className: 'game_ui__modal_window' } },
                gameUiCommon.getSmallButton('ok', 'play', this._onContinue),
            ];
        }

        render(parentElement, parameters) {
            templatingEngine.render(this._getContent(parameters), parentElement);
        }

        _onContinue() {
            this._eventEmitter.emit('continue');
        }

        on(eventName, callback) {
            this._eventEmitter.on(eventName, callback);
        }
    }

    module.exports = GameUiAlert;
})();
