/**
 * Theme Decorator - handles light/dark mode
 * 
 * Applies theme class to document root for both React and Angular.
 */

/**
 * Theme global type for Storybook toolbar
 */
export const themeGlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' }
      ],
      showName: true,
      dynamicTitle: true
    }
  }
};

/**
 * Apply theme to document
 */
export function applyTheme(theme: 'light' | 'dark'): void {
  const html = document.documentElement;
  
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

/**
 * For Storybook decorators (React)
 */
export const themeDecorator = (Story: any, context: any) => {
  const theme = context.globals?.theme || 'light';
  applyTheme(theme);
  return Story();
};

/**
 * For Storybook decorators (Angular)
 */
export const themeDecoratorAngular = (Story: any, context: any) => {
  const theme = context.globals?.theme || 'light';
  applyTheme(theme);
  return Story();
};

