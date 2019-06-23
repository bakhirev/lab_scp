(function() {

    const methods = {
        v: 1,
        key: 'game_ui',
        save(data) {
            const text = JSON.stringify({ v: this.v, data: data });
            localStorage.setItem(this.key, text);
        },
        load() {
            const text = localStorage.getItem(this.key) || '{}';
            const data = JSON.parse(text);
            if (!data.v || data.v < this.v) return null;
            return data.data;
        }
    };

    module.gameUiStorage = methods;
})();
