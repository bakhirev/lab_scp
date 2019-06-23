(function () {
    // 0..8 непроходимые обьекты
    // 9 пустой корридор
    // 10..19 вещи
    // 20..29 ловушки
    // 100 выход
    const level = require('level');
    const gameLevelParts = require('gameLevelParts');
    const gameLevelConfig = require('gameLevelConfig');

    const methods = {
        getGameLevel(originMap, distance, levelId) {
            let gameLevel = [...originMap].map(row => row.map(code => code === 1 ? 9 : code));
            let notUsedParts = gameLevelParts.getParts(gameLevel);
            notUsedParts.sort(() => Math.random() - 0.5);

            [gameLevel, notUsedParts] = this._addRadiationInLevel(gameLevel, notUsedParts, distance.begin, levelId);
            [gameLevel, notUsedParts] = this._addFastTimeAnomaliesInLevel(gameLevel, notUsedParts, distance.begin, levelId);
            [gameLevel, notUsedParts] = this._addSlowlyTimeAnomaliesInLevel(gameLevel, notUsedParts, distance.begin, levelId);

            if (levelId > 5) this._addPass(gameLevel, distance.deadlocks[0], 10); // pass
            if (levelId > 7) this._addPass(gameLevel, distance.deadlocks[1], 11);
            if (levelId > 9) this._addPass(gameLevel, distance.deadlocks[2], 12);

            gameLevel[distance.end.row][distance.end.column] = 100; // ends

            if (levelId > 5) {
                const [row, column] = this._getPrevPoint(gameLevel, distance.end.row, distance.end.column);
                gameLevel[row][column] = 1;
            }

            return gameLevel;
        },
        _addPass(gameLevel, deadlock, code) {
            if (deadlock) gameLevel[deadlock.row][deadlock.column] = code;
        },
        _getPrevPoint(gameLevel, row, column) {
            if (gameLevel[row - 1][column]) return [row - 1, column];
            if (gameLevel[row + 1][column]) return [row + 1, column];
            if (gameLevel[row][column - 1]) return [row, column - 1];
            if (gameLevel[row][column + 1]) return [row, column + 1];
        },
        _addFastTimeAnomaliesInLevel(gameLevel, parts, respawnPoint, levelId) {
            const timeLimit = gameLevelConfig.getNumberFastTimeAnomaliesInLevel(levelId);
            let count = 0;
            const notUsedParts = parts.filter(part => {
                if (count > timeLimit
                    || part.size <= 5
                    || (respawnPoint.row === part.begin[0] && respawnPoint.column === part.begin[1])
                    || (respawnPoint.row === part.end[0] && respawnPoint.column === part.end[1])) return true;
                count += 1;
                gameLevel = this._replacePart(gameLevel, part, 20);
                return false;
            });
            return [gameLevel, notUsedParts];
        },
        _addSlowlyTimeAnomaliesInLevel(gameLevel, parts, respawnPoint, levelId) {
            if (levelId < 9) return [gameLevel, parts];
            const timeLimit = gameLevelConfig.getNumberSlowlyTimeAnomaliesInLevel(levelId);
            let count = 0;
            const notUsedParts = parts.filter(part => {
                if (count > timeLimit
                    || (part.size < 2 || part.size > 3)
                    || (respawnPoint.row === part.begin[0] && respawnPoint.column === part.begin[1])
                    || (respawnPoint.row === part.end[0] && respawnPoint.column === part.end[1])) return true;
                count += 1;
                gameLevel = this._replacePart(gameLevel, part, 22);
                return false;
            });
            return [gameLevel, notUsedParts];
        },
        _addRadiationInLevel(gameLevel, parts, respawnPoint, levelId) {
            const radiationLimit = gameLevelConfig.getNumberRadiationInLevel(levelId);
            let radiation = 0;
            const notUsedParts = parts.filter(part => {
                if (radiation > radiationLimit
                    || (part.size < 3 || part.size > 4)
                    || (respawnPoint.row === part.begin[0] && respawnPoint.column === part.begin[1])
                    || (respawnPoint.row === part.end[0] && respawnPoint.column === part.end[1])) return true;
                radiation += part.size;
                gameLevel = this._replacePart(gameLevel, part, 21);
                return false;
            });
            return [gameLevel, notUsedParts];
        },
        _replacePart(gameLevel, part, newCode) {
            return part.type === 'vertically'
                ? this._replaceVerticallyPart(gameLevel, part, newCode)
                : this._replaceHorizontallyPart(gameLevel, part, newCode);
        },
        _replaceVerticallyPart(gameLevel, part, newCode) {
            return gameLevel.map((row, rowIndex) => {
                return (rowIndex >= part.begin[0] && rowIndex <= part.end[0])
                    ? row.map((code, columnIndex) => {
                        return (columnIndex === part.begin[1]) ? newCode : code;
                    }) : row
            });
        },
        _replaceHorizontallyPart(gameLevel, part, newCode) {
            return gameLevel.map((row, rowIndex) => {
                return rowIndex === part.begin[0]
                    ? row.map((code, columnIndex) => {
                        return (columnIndex >= part.begin[1] && columnIndex <= part.end[1]) ? newCode : code;
                    }) : row
            });
        }
    };

    module.gameLevelGame = methods;
})();
