(function () {

    const methods = {
        getTime(milliseconds) {
            const timeSeconds = Math.floor(milliseconds / 1000);
            let minutes = Math.floor(timeSeconds / 60);
            let seconds = timeSeconds - minutes * 60;
            if (minutes < 10) minutes = `0${minutes}`;
            if (seconds < 10) seconds = `0${seconds}`;
            return `${minutes}:${seconds}`;
        },
    };

    module.formatting = methods;
})();
