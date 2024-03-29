const withLess = require('next-with-less');

module.exports = {
  ...withLess({
    lessLoaderOptions: {
      /* ... */
      lessOptions: {
        /* ... */
        modifyVars: {
          'primary-color': '#00B2FF',
          'theme-color': '#936dc9',
          'card-theme-color': 'rgba(7, 0, 115, 0.65)',
          'secondary-color': '#f4c83a',
          'sup-color': '#e6bb00',
          'message-color': '#fff6d9',
          'orange-color': '#ffa75c',
          'light-color': '#efe8fe',
          'info-color': '#00B2FF',
          'success-color': '#00c12c',
          'processing-color': '#00a2ae',
          'error-color': '#f04134',
          'highlight-color': '#f04134',
          'warning-color': '#ffbf00',
          'normal-color': '#d9d9d9',
          white: '#fff',
          black: '#000',
          'dark-grey': '#888',
          'grey-color': '#4e4e4e',
          gray: '#e2e8ec',
          'light-grey': '#eee',
          'light-blue': '#f3f7f8',
          'light-card': '#e8f0f2',
          'table-bg': '#f8f9fa',
          'twitter-color': '#1ea2f1',

          'border-select': '#ced4da',
          'border-radius-base': '3px',
          'border-radius-sm': '2px',
          'shadow-color': 'rgba(0, 0, 0, 0.05)',
          'shadow-1-down': '4px 4px 40px rgba(0, 0, 0, 0.05)',
          'border-color-split': '#f4f4f4',
          'border-color-base': '#e5e5e5',
          'font-size-base': '13px',
          'text-color': '#444',
          'hover-color': '#00B2FF',
          'main-background-color': '#fff',
          'sub-background-color': '#fafafa',

          'tablet-screen': '768px',
          'mobile-screen': '500px',
          'smaller-screen': '928px',
          'max-smaller-screen': '375px',

          'group-status-color': '#ffbf00',
          'public-status-color': '#00c12c',
          'private-status-color': '#f04134',
          'offline-status-color': '#e2e8ec',
          'primary-font': 'Merriweather Sans',
          'primary-font-bold': 'Merriweather Sans Bold',
          'secondary-font': 'Roboto'
        }
      }
    }
  }),
  swcMinify: true,
  optimizeFonts: false
};
