(function() {

    const formatting = require('formatting');
    const EventEmitter = require('EventEmitter');
    const templatingEngine = require('templatingEngine');
    const gameUiCommon = require('gameUiCommon');

    class GameUiLevels {
        constructor() {
            this._eventEmitter = new EventEmitter();
            this._onMenu = this._onMenu.bind(this);
        }

        _getLevelList(playerInformation) {
            const levels = [];

            for (let i = 0; i < 30; i++) {
                let callback;
                let classNameTitle = 'game_ui__choose_level__title_block';
                let classNameProtection = 'game_ui__choose_level__protection_block';
                let description = i + 1;

                const isUnBlocked = playerInformation.level >= i;
                if (isUnBlocked) {
                    callback = this._onSelect.bind(this, i);
                    classNameTitle = 'game_ui__choose_level__title';
                    classNameProtection = 'game_ui__choose_level__protection';
                }
                if (playerInformation.records[i]) {
                    description = formatting.getTime(playerInformation.records[i]);
                }
                if (isUnBlocked && !playerInformation.records[i]) {
                    description = '--:--';
                }

                levels.push({
                    tag: 'div', content: [
                        { tag: 'img', attributes: { className: 'game_ui__choose_level__icon', src: `images/levels_preview/temp.png` } },
                        isUnBlocked ? null : { tag: 'img', attributes: { className: 'game_ui__choose_level__lock', src: 'images/levels_preview/lock.png' } },
                        { tag: 'span', attributes: { className: classNameTitle }, content: description },
                        { tag: 'div', attributes: { className: classNameProtection } }
                    ], attributes: { className: 'game_ui__choose_level__item' }, events: { click: callback }
                })
            }

            return {
                tag: 'div', content: levels, attributes: { className: 'game_ui__choose_level__container' }
            };
        }

        _getContent(playerInformation) {
            return [
                this._getLevelList(playerInformation),
                gameUiCommon.getButton('Back', 'back', this._onMenu)
            ];
        }

        render(parentElement, playerInformation) {
            templatingEngine.render(this._getContent(playerInformation), parentElement);
        }

        _onSelect(index) {
            this._eventEmitter.emit('select_level', index);
        }

        _onMenu() {
            this._eventEmitter.emit('back');
        }

        on(eventName, callback) {
            this._eventEmitter.on(eventName, callback);
        }
    }

    module.exports = GameUiLevels;
})();
