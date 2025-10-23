/**
 * Viewport Decorator - defines standard viewports for visual testing
 * 
 * These viewports are used for:
 * 1. Storybook UI (manual testing)
 * 2. Loki visual regression tests
 */

export const viewportParameters = {
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px'
        },
        type: 'mobile'
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px'
        },
        type: 'tablet'
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1280px',
          height: '800px'
        },
        type: 'desktop'
      }
    },
    defaultViewport: 'desktop'
  }
};

/**
 * Standard breakpoints matching Tailwind CSS
 */
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1280
};

