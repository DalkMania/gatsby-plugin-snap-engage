# Gatsby Plugin for Snap Engage

Easily add Snap Engage Chat to your Gatsby site.

## Install

TBD

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
      resolve: require.resolve(`./plugins/gatsby-plugin-snap-engage`),
      options: {
        defaultLocale: 'en',
        locales: {
          'en': 'ab1b58ca-eaee-4ba5-9e04-5f4976123be4',
          'fr': '1512c9c9-9c2a-4ab4-bf4e-6bd6803d550c',
          'de': 'ab1b58ca-eaee-4ba5-9e04-5f4976123be4',
          'jp': '43089032-1971-4536-a9b0-dab14ed7a999'
        },
        includeInDevelopment: true,
      },
    },
];
```