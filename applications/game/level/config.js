(function () {

    const methods = {
        getWidthHeight(levelId) {
            const padding = 2;
            if (levelId < 1) return [7, 7];
            if (levelId < 3) return [11, 11];
            if (levelId < 5) return [13, 13];
            if (levelId < 25) {
                const value = levelId * 2 + 1 + padding;
                return [value , value];
            }
            return [53, 53];
        },
        getNumberSlowlyTimeAnomaliesInLevel(levelId) {
            if (levelId < 10) return 0;
            return 2;
        },
        getNumberFastTimeAnomaliesInLevel(levelId) {
            if (levelId < 5) return 0;
            if (levelId < 7) return 1;
            if (levelId < 10) return 2;
            return 4;
        },
        getNumberRadiationInLevel(levelId) {
            if (levelId < 5) return 10;
            return 15;
        },
    };


    module.gameLevelConfig = methods;
})();
