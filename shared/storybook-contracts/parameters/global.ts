/**
 * Global Parameters for Storybook
 * 
 * Shared configuration for both React and Angular Storybook instances.
 */

export const globalParameters = {
  // Actions panel
  actions: { 
    argTypesRegex: '^on[A-Z].*' 
  },
  
  // Controls panel
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i
    },
    expanded: true
  },
  
  // Backgrounds
  backgrounds: {
    default: 'light',
    values: [
      { 
        name: 'light', 
        value: '#ffffff' 
      },
      { 
        name: 'dark', 
        value: '#0a0a0a' 
      }
    ]
  },
  
  // Layout
  layout: 'centered',
  
  // Accessibility addon
  a11y: {
    element: '#storybook-root',
    config: {},
    options: {},
    manual: false
  }
};

