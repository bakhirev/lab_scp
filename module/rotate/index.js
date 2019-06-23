(function () {

    class Rotate {
        constructor(element) {
            this.element = element;
        }

        update(position, targetPosition) {
            const angle = Math.atan2(position.y - targetPosition.y, position.x - targetPosition.x);
            this.element.style.transform = `rotate(${angle}rad)`;
        }
    }

    module.exports = Rotate;
})();
