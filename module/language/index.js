(function () {

    const methods = {
        translations: {
            ru: {
                ok: 'Ок',
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
                hard: 'Трудно',
                menu: 'Меню',
                next: 'Далее',
                replay: 'Заново',
                achievements: 'Награды',
                loot: 'Хабар',
                findLoot: 'Найден предмет',
                loot0: 'Аптечка (АИ-2)',
                loot1: 'Лампа 6П44С (Пентод)',
                loot2: 'Противогаз ГП-5К',
                loot3: 'Гильза 7.62',
                loot4: 'Вольтметр В3-10А',
                loot5: 'Батарейка Крона',
                loot6: 'Книга (Франке 3., Франц П., Варнке В.)',
                loot7: 'Болт',
                loot8: 'Каска',
                loot9: 'Перчатки кщс тип-2',
                loot10: 'Чертёж',
                loot11: 'Значок ВЛКСМ'
            }
        },
        currentLanguage: 'ru',
        get(id) {
            return this.translations[this.currentLanguage][id];
        }
    };

    module.language = methods;
})();