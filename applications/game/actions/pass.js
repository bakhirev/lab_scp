(function () {

    const templatingEngine = require('templatingEngine');

    class GamePass {
        constructor(elements) {
            this.elements = elements;
            this._allCorrectKeys = [10, 11, 12];
            this._correctKeys = [];
            this._keys = [];
            this._cache = 0;
        }

        setCorrectKeys(gameLevel) {
            this._correctKeys = [];
            gameLevel.forEach(row => {
                row.forEach(code => {
                    if (this._allCorrectKeys.includes(code)) {
                        this._correctKeys.push(code);
                    }
                });
            });
        }

        checkCode(code, levelGame, levelPosition) {
            if (this._correctKeys.indexOf(code) === -1) return false;
            levelGame[levelPosition.row][levelPosition.column] = 9;
            this._keys.push(code);
            this._render();
            if (this._keys.length === this._correctKeys.length) {
                this._replaceCode(levelGame, 1, 9);
            }
            return true;
        }

        _replaceCode(levelGame, oldCode, newCode) {
            levelGame.forEach((row, rowIndex) => {
                row.forEach((code, columnIndex) => {
                    if (code === oldCode) levelGame[rowIndex][columnIndex] = newCode;
                });
            });
        }

        _render() {
            if (!this.elements.health || this._cache === this.health) return;
            this.elements.pass.innerHTML = '';
            templatingEngine.render(this._getContent(), this.elements.pass);
        }

        _getContent() {
            return this._keys.map(() => ({
                tag: 'div', attributes: { className: 'pass__key' }
            }));
        }

        clear() {
            this.load({ keys: [] });
        }

        save() {
            return {
                keys: this._keys
            }
        }

        load(data) {
            this._keys = data.keys;
            this._render();
        }
    }

    module.exports = GamePass;
})();
