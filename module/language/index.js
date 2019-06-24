(function () {

    const methods = {
        translations: {
            ru: {
                continue: 'Продолжить',
                tournament: 'Чемпионат',
                save: 'Сохранить',
                load: 'Загрузить',
                time: 'Время',
                back: 'Назад',
                enterTitle: 'название',
                levels: 'Уровни',
                easy: 'Легко',
                medium: 'Нормально',
                hard: 'Трудно'
            }
        },
        currentLanguage: 'ru',
        get(id) {
            return this.translations[this.currentLanguage][id];
        }
    };

    module.language = methods;
})();