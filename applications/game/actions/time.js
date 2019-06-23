(function () {

    const formatting = require('formatting');

    class GameTime {
        constructor(elements) {
            this.elements = elements;
            this._limit = 1000;
            this._time = 0;
            this._cache = 0;
            this.total = 0;
        }

        step(timeShift) {
            this._time += timeShift;
            if (this._time >= this._limit) {
                this.total += this._limit;
                this._time = this._time - this._limit;
            }
        }

        getTimeShift(code, timeShift) {
            if (code === 20) return 4 * timeShift;
            if (code === 22) return timeShift / 4;
            return timeShift;
        }

        render() {
            const formattedTime = formatting.getTime(this.total);
            if (!this.elements.time || this._cache === formattedTime) return;

            this._cache = formattedTime;
            this.elements.time.innerHTML = formattedTime;
        }

        save() {
            return {
                time: this._time,
                total: this.total,
            }
        }

        load(data) {
            this._time = data.time;
            this.total = data.total;
            this._cache = 0;
        }
    }

    module.exports = GameTime;
})();
