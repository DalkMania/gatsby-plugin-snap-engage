import { getLanguage } from "./helpers/getLanguage";

export const onPreRouteUpdate = ({ prevLocation, location }, pluginOptions) => {
    if (
        pluginOptions.multilingual === true &&
        (process.env.NODE_ENV === `production` || pluginOptions.includeInDevelopment)
    ) {
        if (prevLocation) {
            const prevId = getLanguage(prevLocation.pathname, pluginOptions);
            const currId = getLanguage(location.pathname, pluginOptions);

            if (prevId !== currId) {
                window.location.assign(window.location.href);
            }
        }
    }
};
