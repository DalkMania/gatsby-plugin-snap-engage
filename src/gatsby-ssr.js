import React from "react"
import { stripIndent } from "common-tags"

export const onRenderBody = ({ pathname, setPostBodyComponents }, pluginOptions) => {
  if (
    process.env.NODE_ENV === `production` ||
    pluginOptions.includeInDevelopment
  ) {
    const id = getLanguage(pathname, pluginOptions)

    return setPostBodyComponents([
      <script
        key={`gatsby-plugin-snap-engage`}
        dangerouslySetInnerHTML={{
          __html: stripIndent(`
          (function() {
            var se = document.createElement('script'); se.type = 'text/javascript'; se.async = true;
            se.src = '//storage.googleapis.com/code.snapengage.com/js/${id}.js';
            var done = false;
            se.onload = se.onreadystatechange = function() {
              if (!done&&(!this.readyState||this.readyState==='loaded'||this.readyState==='complete')) {
                done = true;
              }
            };
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(se, s);
          })();
          `),
        }}
      />,
    ])
  }
}

const getLanguage = (pathname, pluginOptions) => {
  if(pluginOptions.multilingual === true) {
    const currentLocale = pathname.match(/^\/([^?\/]+)/)
    const locales = Object.keys(pluginOptions.locales)
    let match = false
    if(currentLocale !== null) {
      match = locales.filter(locale => locale === currentLocale[1]).length > 0
    }
    
    if((currentLocale !== null) && match !== false) {
      return pluginOptions.locales[currentLocale[1]]
    } else {
      return pluginOptions.locales[pluginOptions.defaultLocale]
    }
  } else {
    return pluginOptions.id
  }
}