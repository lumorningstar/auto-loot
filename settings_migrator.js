"use strict"

const DefaultSettings = {
    "enabled": true,
    "auto": false,
    "interval": 100,
    "throttleMax": 800,
    "scanInterval": 400,
    "radius": 250,
    "blacklist": [98260, 98513, 98590, 98599, 98600]
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
    } else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings;
    } else {
        if (from_ver + 1 < to_ver) {
            settings = MigrateSettings(from_ver, from_ver + 1, settings);
            return MigrateSettings(from_ver + 1, to_ver, settings);
        }

        switch (to_ver) {
            default:
                settings = Object.assign(DefaultSettings, settings);
                break;
        }

        return settings;
    }
}
