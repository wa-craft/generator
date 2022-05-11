class Config {
    private static _instance: Config;

    static getInstance(): Config {
        return Config._instance ?? new Config();
    }
}