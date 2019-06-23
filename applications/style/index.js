(function () {

    const Prolapse = require('Prolapse');
    const Rotate = require('Rotate');

    class StyleUi {
        constructor(elements) {
            this.elements = elements;

            this._onMouseMove = this._onMouseMove.bind(this);
            this.resize();
            this._setProlapse();
            this._setEvents();
        }

        resize() {
            const size = document.body.getBoundingClientRect();
            this._size = { x: size.width, y: size.height };
            this._targetPosition = {
                x: this._size.x / 2,
                y: this._size.y / 2
            };
        }

        _setProlapse() {
            const config = { value: 0 }
            //     propertyName: 'left',
            //     value: 20,
            //     max: 2,
            this._smallRing = new Prolapse(this.elements.smallRing, { propertyName: 'right', value: 3, max: -0.5 });
            this._middleRing = new Prolapse(this.elements.middleRing, { propertyName: 'right', value: 2, max: -1 });
            this._bigRing = new Prolapse(this.elements.bigRing, { propertyName: 'right', value: 2, max: -2 });
            this._octopus1 = new Prolapse(this.elements.octopus1, { value: 4, max: 1 });
            this._octopus2 = new Prolapse(this.elements.octopus2, { max: -1 });
            this._octopus3 = new Prolapse(this.elements.octopus3, { value: 20, max: -1 }, { value: -5 });
            this._octopus4 = new Prolapse(this.elements.octopus4, { value: 32, max: 1 });
            this._ripple = new Prolapse(this.elements.ripple, { value: 0, max: -0.5 }, { propertyName: 'top', value: 0, max: -0.5 });
            this._light = new Rotate(this.elements.light);
        }

        _setEvents() {
            document.body.addEventListener('mousemove', this._onMouseMove);
        }

        _onMouseMove(event) {
            const position = { x: event.clientX, y: event.clientY };
            const leftTop = { x: 1, y: this._size.y };
            const leftBottom = { x: 0, y: 0 };
            const rightMiddle = { x: this._size.x, y: this._targetPosition.y };
            this._smallRing.update(position, rightMiddle, this._size);
            this._middleRing.update(position, rightMiddle, this._size);
            this._bigRing.update(position, rightMiddle, this._size);
            this._octopus1.update(position, leftBottom, this._size);
            this._octopus2.update(position, leftBottom, this._size);
            this._octopus3.update(position, leftBottom, this._size);
            this._octopus4.update(position, leftBottom, this._size);
            this._ripple.update(position, this._targetPosition, this._size);
            // this._light.update(position, leftTop);
            // this._ripple.update(position, this._targetPosition, this._size);
        }
    }

    module.exports = StyleUi;
})();
