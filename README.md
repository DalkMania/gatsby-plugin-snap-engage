# Gatsby Plugin for Snap Engage

Easily add Snap Engage Chat to your Gatsby site.

## Install

Using NPM

```
npm install --save gatsby-plugin-snap-engage
```

Using Yarn

```
yarn add gatsby-plugin-snap-engage
```

## How to use

```javascript
// In your gatsby-config.js

// Simple setup
plugins: [
  {
      resolve: `gatsby-plugin-snap-engage`,
      options: {
        multilingual: false,
        id: 'YOUR_SNAP_ENGAGE_SCRIPT_ID',
        includeInDevelopment: false,
      },
    },
];

// Multilingual setup
plugins: [
  {
      resolve: `gatsby-plugin-snap-engage`,
      options: {
        multilingual: true,
        defaultLocale: 'en',
        locales: {
          'en': 'YOUR_SNAP_ENGAGE_SCRIPT_ID_FOR_LOCALE',
          'fr': 'YOUR_SNAP_ENGAGE_SCRIPT_ID_FOR_LOCALE'
        },
        includeInDevelopment: false,
      },
    },
];
```