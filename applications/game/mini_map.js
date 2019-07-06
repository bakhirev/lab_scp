(function() {

    class MiniMap {
        constructor(elements) {
            this.elements = elements;
            this.context = elements.map.getContext('2d');
            this.mapLevel = null;
            this.size = {};
            this.files = {
                card: 'card.png',
                player: 'player.png',
                door: '5.png',
                exit: 'exit.png',
                gift: 'gift.png',
                medical: 'medical.png'
            };
            this._mode = 'big';
            this._textures = {};
            this._level = [[1]];
            this._preloadTextures();
            this._onKeyUp({ button: 0 });

            this._onKeyDown = this._onKeyDown.bind(this);
            this._onKeyUp = this._onKeyUp.bind(this);
            this.elements.display.addEventListener('mousedown', this._onKeyDown, false);
            this.elements.display.addEventListener('mouseup', this._onKeyUp, false);
        }

        _preloadTextures() {
            Object.keys(this.files).forEach(id => {
                const image = new Image();
                image.crossOrigin = 'anonymous';
                image.src = `./images/map/${this.files[id]}`;
                this._textures[id] = image;
            });
        }

        _onKeyDown(event) {
            if (event.button !== 0 || this._mode === 'big') return;
            this._mode = 'big';
            const size = document.body.getBoundingClientRect();
            const min = Math.floor(Math.min(size.width, size.height) * 0.9);
            const top = (size.height - min) / 2;
            const right = ((size.width - min) / 2);
            this._setStyle(top, right, min, min);
            return false;
        }

        _onKeyUp(event) {
            if (event.button !== 0 || this._mode === 'small') return;
            this._mode = 'small';
            const size = document.body.getBoundingClientRect();
            const min = Math.floor(size.height * 0.2);
            this._setStyle(16, 16, min, min);
            return false;
        }

        _setStyle(top, right, width, height) {
            this.elements.map.style.top = `${top}px`;
            this.elements.map.style.right = `${right}px`;
            this.elements.map.style.width = `${width}px`;
            this.elements.map.style.height = `${height}px`;
            this.elements.map.setAttribute('width', `${width}px`);
            this.elements.map.setAttribute('height', `${height}px`);
            this._resize({ width: width, height: height });
        }

        resize(level, defaultSize = {}) {
            this._level = level;
            const size = this.elements.map.getBoundingClientRect();
            if (!size.width) size.width = defaultSize.width || 0;
            if (!size.height) size.height = defaultSize.height || 0;
            this._resize(size);
            this.elements.map.setAttribute('width', `${this.size.width}px`);
            this.elements.map.setAttribute('height', `${this.size.height}px`);
        }

        _resize(size) {
            const cell = Math.floor(Math.min(size.width, size.height) / this._level.length);
            const width = cell * this._level[0].length;
            const height = cell * this._level.length;
            this.size = { width, height, cell };
        }

        markVisited(position) {
            this.mapLevel[position.row][position.column] = 1;
        }

        render(gameLevel, position, samosborDistance, samosborPosition) {
            this.context.clearRect(0, 0, this.size.width, this.size.height);
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, this.size.width, this.size.height);

            this._render(gameLevel, 9, 'white');

            this._render(gameLevel, 10, 'white');
            this._render(gameLevel, 11, 'white');
            this._render(gameLevel, 12, 'white');
            this._render(gameLevel, 13, 'white');
            this._render(gameLevel, 14, 'white');
            this._renderTexture(gameLevel, 10, 'card');
            this._renderTexture(gameLevel, 11, 'card');
            this._renderTexture(gameLevel, 12, 'card');
            this._renderTexture(gameLevel, 13, 'gift');
            this._renderTexture(gameLevel, 14, 'medical');

            this._render(gameLevel, 20, '#3C8381');
            this._render(gameLevel, 22, '#3CA3A1');
            this._render(gameLevel, 21, '#99FF8D');

            this._renderPosition(position, '#70019D');

            this._render(gameLevel, 1, 'white');
            this._renderTexture(gameLevel, 1, 'door');
            this._renderTexture(gameLevel, 100, 'exit');

            if (samosborDistance < Infinity) {
                this._renderDistance(samosborPosition, 20, 'black');
            }
        }

        _renderTexture(gameLevel, code, textureId) {
            gameLevel.forEach((row, rowIndex) => {
                row.forEach((currentCode, columnIndex) => {
                    const y = this.size.cell * rowIndex;
                    const x = this.size.cell * columnIndex;
                    const isVisited = this.mapLevel[rowIndex][columnIndex] === 1;
                    if (currentCode === code && isVisited) this.context.drawImage(this._textures[textureId], x, y, this.size.cell, this.size.cell);
                });
            });
        }

        _render(gameLevel, code, color) {
            this.context.fillStyle = color;
            gameLevel.forEach((row, rowIndex) => {
                row.forEach((currentCode, columnIndex) => {
                    const y = this.size.cell * rowIndex;
                    const x = this.size.cell * columnIndex;
                    const isVisited = this.mapLevel[rowIndex][columnIndex] === 1;
                    if (currentCode === code && isVisited) this.context.fillRect(x, y, this.size.cell, this.size.cell);
                });
            });
        }

        _renderDistance(gameLevel, maxDistance, color) {
            this.context.fillStyle = color;
            gameLevel.forEach((row, rowIndex) => {
                row.forEach((currentCode, columnIndex) => {
                    const y = this.size.cell * rowIndex;
                    const x = this.size.cell * columnIndex;
                    const isVisited = this.mapLevel[rowIndex][columnIndex] === 1;
                    if (currentCode !== 0 && currentCode < maxDistance && isVisited) this.context.fillRect(x, y, this.size.cell, this.size.cell);
                });
            });
        }

        _renderPosition(position, color) {
            this.context.fillStyle = color;
            const r = this.size.cell / 2;
            const y = this.size.cell * position.row + r;
            const x = this.size.cell * position.column + r;
            this.context.beginPath();
            this.context.arc(x, y, r * 0.8, 0, 2 * Math.PI);
            this.context.fill();
        }
    }

    module.exports = MiniMap;
})();

