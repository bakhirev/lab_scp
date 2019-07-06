(function() {

    const EventEmitter = require('EventEmitter');
    const templatingEngine = require('templatingEngine');
    const gameUiCommon = require('gameUiCommon');

    class GameUiAchievements {
        constructor() {
            this._eventEmitter = new EventEmitter();
            this._onMenu = this._onMenu.bind(this);
        }

        _getLootList(playerInformation) {
            const levels = [];

            for (let i = 0, l = playerInformation.loot.length; i < l; i++) {
                const code = playerInformation.loot[i];
                const style = `background-image: url('images/achievements/${code}.png')`;
                const title = 'Болт';

                levels.push({
                    tag: 'div', content: [
                        { tag: 'span', attributes: { className: 'game_ui__loot__title' }, content: title },
                    ], attributes: { className: 'game_ui__loot__item', style: style }
                })
            }

            return {
                tag: 'div', content: levels, attributes: { className: 'game_ui__loot__container' }
            };
        }

        _getContent(playerInformation) {
            return [
                this._getLootList(playerInformation),
                gameUiCommon.getButton('back', 'back', this._onMenu)
            ];
        }

        render(parentElement, playerInformation) {
            templatingEngine.render(this._getContent(playerInformation), parentElement);
        }

        _onMenu() {
            this._eventEmitter.emit('back');
        }

        on(eventName, callback) {
            this._eventEmitter.on(eventName, callback);
        }
    }

    module.exports = GameUiAchievements;
})();
