import { onPreRouteUpdate } from "../gatsby-browser";

describe(`gatsby-plugin-snap-engage`, () => {
    describe(`onPreRouteUpdate`, () => {
        describe(`in development mode`, () => {
            const { assign } = window.location;

            beforeAll(() => {
                Object.defineProperty(window, "location", {
                    writable: true,
                    value: { assign: jest.fn() }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            afterAll(() => {
                window.location.assign = assign;
            });

            it(`it does not call any functions, if the includeInDevelopment and multilingual options are false`, () => {
                const pluginOptions = { multilingual: false, id: "1", includeInDevelopment: false };
                const prevLocation = {
                    pathname: "/fr/some-slug"
                };
                const location = {
                    pathname: "/de/some-slug"
                };
                const getLanguage = jest.fn();

                onPreRouteUpdate({ prevLocation, location }, pluginOptions);
                expect(getLanguage).not.toHaveBeenCalled();
            });

            it(`it does call functions, if the includeInDevelopment and multilingual options are true, and the language slug is changed`, () => {
                const pluginOptions = {
                    multilingual: true,
                    id: "1",
                    defaultLocale: "en",
                    locales: {
                        en: "english-script",
                        fr: "french-script"
                    },
                    includeInDevelopment: true
                };
                const prevLocation = {
                    pathname: "/fr/some-slug"
                };
                const location = {
                    pathname: "/de/some-slug"
                };

                expect(jest.isMockFunction(window.location.assign)).toBe(true);
                onPreRouteUpdate({ prevLocation, location }, pluginOptions);
                expect(window.location.assign).toHaveBeenCalled();
            });

            it(`it does not call functions, if the language slug is not changed`, () => {
                const pluginOptions = {
                    multilingual: true,
                    id: "1",
                    defaultLocale: "en",
                    locales: {
                        en: "english-script",
                        fr: "french-script"
                    },
                    includeInDevelopment: true
                };
                const prevLocation = {
                    pathname: "/fr/some-slug"
                };
                const location = {
                    pathname: "/fr/some-other-slug"
                };
                jest.restoreAllMocks();
                expect(jest.isMockFunction(window.location.assign)).toBe(true);
                onPreRouteUpdate({ prevLocation, location }, pluginOptions);
                expect(window.location.assign).not.toHaveBeenCalled();
            });
        });

        describe(`in production mode`, () => {
            const { reload } = window.location;
            let env;

            beforeAll(() => {
                env = process.env.NODE_ENV;
                process.env.NODE_ENV = `production`;

                Object.defineProperty(window, "location", {
                    writable: true,
                    value: { assign: jest.fn() }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            afterAll(() => {
                process.env.NODE_ENV = env;
                window.location.assign = assign;
            });

            it(`it does not call any functions, if the multilingual option is false`, () => {
                const pluginOptions = { multilingual: false, id: "1", includeInDevelopment: false };
                const prevLocation = {
                    pathname: "/fr/some-slug"
                };
                const location = {
                    pathname: "/de/some-slug"
                };
                const getLanguage = jest.fn();

                onPreRouteUpdate({ prevLocation, location }, pluginOptions);
                expect(getLanguage).not.toHaveBeenCalled();
            });

            it(`it does call functions, if the language slug is changed`, () => {
                const pluginOptions = {
                    multilingual: true,
                    id: "1",
                    defaultLocale: "en",
                    locales: {
                        en: "english-script",
                        fr: "french-script"
                    },
                    includeInDevelopment: false
                };
                const prevLocation = {
                    pathname: "/fr/some-slug"
                };
                const location = {
                    pathname: "/de/some-slug"
                };

                expect(jest.isMockFunction(window.location.assign)).toBe(true);
                onPreRouteUpdate({ prevLocation, location }, pluginOptions);
                expect(window.location.assign).toHaveBeenCalled();
            });

            it(`it does not call functions, if the language slug is not changed`, () => {
                const pluginOptions = {
                    multilingual: true,
                    id: "1",
                    defaultLocale: "en",
                    locales: {
                        en: "english-script",
                        fr: "french-script"
                    },
                    includeInDevelopment: true
                };
                const prevLocation = {
                    pathname: "/fr/some-slug"
                };
                const location = {
                    pathname: "/fr/some-other-slug"
                };
                jest.restoreAllMocks();
                expect(jest.isMockFunction(window.location.assign)).toBe(true);
                onPreRouteUpdate({ prevLocation, location }, pluginOptions);
                expect(window.location.assign).not.toHaveBeenCalled();
            });
        });
    });
});
