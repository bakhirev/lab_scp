(function () {

    const formatting = require('formatting');
    const level = require('level');
    const EventEmitter = require('EventEmitter');
    const gameLevelDistance = require('gameLevelDistance');

    class GameSamosbor {
        constructor(elements) {
            this.elements = elements;
            this._limit = 59 * 1000;
            this._cache = 0;
            this.total = this._limit;
            this._activeLimit = 20 * 1000;
            this.activeTotal = this._activeLimit;
            this.isActive = false;
            this._distance = [];

            this._eventEmitter = new EventEmitter();
        }

        setDefault() {
            this.activeTotal = this._activeLimit;
            this.total = this._limit;
            this.isActive = false;
            this._distance = [];
        }

        step(timeShift, originLevel) {
            if (this.isActive) {
                this._activeStep(timeShift);
            } else {
                this._delayStep(timeShift, originLevel);
            }
        }

        _delayStep(timeShift, originLevel) {
            this.total  -= timeShift;
            if (this.total <= 0) {
                this.total = this._limit;
                this.isActive = true;

                this._distance = level.getCopy(originLevel);
                const randomRowIndex = level.random((originLevel.length - 3) / 2) * 2 + 1;
                const randomColumnIndex = level.random((originLevel[0].length - 3) / 2) * 2 + 1;
                gameLevelDistance.setMaxDistance(this._distance, { row: randomRowIndex, column: randomColumnIndex, prev: { }, way: 1, crossroad: 0, neighbors: 1 });

                this._eventEmitter.emit('begin');
            }
        }

        _activeStep(timeShift) {
            this.activeTotal  -= timeShift;
            if (this.activeTotal <= 0) {
                this.activeTotal = this._activeLimit;
                this.isActive = false;
                this._eventEmitter.emit('end');
            }
        }

        render() {
            const formattedTime = formatting.getTime(this.total);
            if (!this.elements.samosbor || this._cache === formattedTime) return;

            this._cache = formattedTime;
            this.elements.samosbor.innerHTML = formattedTime;
        }

        getDistance(position) {
            if (!this.isActive) return Infinity;
            return (this._distance[position.row] || [])[position.column] || Infinity;
        }

        getPosition() {
            return this._distance;
        }

        on(eventName, callback) {
            this._eventEmitter.on(eventName, callback);
        }
    }

    module.exports = GameSamosbor;
})();
