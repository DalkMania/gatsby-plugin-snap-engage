export const getLanguage = (pathname, pluginOptions) => {
    if(pluginOptions.multilingual === true) {
      const currentLocale = pathname.match(/^\/([^?\/]+)/)
      const locales = Object.keys(pluginOptions.locales)
      
      if((currentLocale !== null) && locales.includes(currentLocale[1])) {
        return pluginOptions.locales[currentLocale[1]]
      } 
        
      return pluginOptions.locales[pluginOptions.defaultLocale]
    }
      
    return pluginOptions.id
}