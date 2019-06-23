(function () {

    const merge = require('merge');

    class Prolapse {
        constructor(element, xConfig, yConfig) {
            this.element = element;
            this._xConfig = xConfig ? merge({ propertyName: 'left', value: 0, max: 2 }, xConfig) : null;
            this._yConfig = yConfig ? merge({ propertyName: 'bottom', value: 0, max: 4 }, yConfig) : null;
        }

        update(position, targetPosition, size) {
            const style = this.element.style;
            if (this._yConfig) {
                style[this._yConfig.propertyName] = this._getNewPosition(this._yConfig, position.y, targetPosition.y, size.y);
            }
            if (this._xConfig) {
                style[this._xConfig.propertyName] = this._getNewPosition(this._xConfig, position.x, targetPosition.x, size.x);
            }
        }

        _getNewPosition(config, position, targetPosition, size) {
            let pxInPercent = targetPosition;
            let percent = (targetPosition - position) / pxInPercent;
            let direction = -1;
            if (position > targetPosition) {
                pxInPercent = size - targetPosition;
                percent = (position - targetPosition) / pxInPercent;
                direction = 1;
            }
            const newPosition = config.value + config.max * percent * direction;
            return `${newPosition}%`;
        }
    }

    module.exports = Prolapse;
})();
