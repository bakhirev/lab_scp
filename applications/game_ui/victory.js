(function() {

    const formatting = require('formatting');
    const EventEmitter = require('EventEmitter');
    const templatingEngine = require('templatingEngine');
    const gameUiCommon = require('gameUiCommon');

    class GameUiVictory {
        constructor() {
            this._eventEmitter = new EventEmitter();
            this._onMenu = this._onMenu.bind(this);
            this._onNewGame = this._onNewGame.bind(this);
        }

        _getContent(milliseconds) {
            const formattedTime = formatting.getTime(milliseconds);

            return [
                { tag: 'div', content: [
                    { tag: 'p', content: 'Victory!', attributes: { className: 'game_ui__modal_title' } },
                    { tag: 'img', attributes: { src: 'images/gameplay/win.png', className: 'game_ui__modal_image' } },
                    { tag: 'p', content: `Time: ${formattedTime}`, attributes: { className: 'game_ui__modal_text' } },
                ], attributes: { className: 'game_ui__modal_window' } },
                gameUiCommon.getSmallButton('Menu', 'back', this._onMenu),
                gameUiCommon.getSmallButton('Next', 'new_game', this._onNewGame)
            ];
        }

        render(parentElement, milliseconds) {
            templatingEngine.render(this._getContent(milliseconds), parentElement);
        }

        _onMenu() {
            this._eventEmitter.emit('back');
        }

        _onNewGame() {
            this._eventEmitter.emit('next');
        }

        on(eventName, callback) {
            this._eventEmitter.on(eventName, callback);
        }
    }

    module.exports = GameUiVictory;
})();
