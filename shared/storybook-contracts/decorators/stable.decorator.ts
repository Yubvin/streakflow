/**
 * Stable Decorator - eliminates all sources of non-determinism
 * 
 * This decorator ensures that:
 * - Animations are disabled
 * - Date/Time is fixed
 * - Random values are deterministic
 * - Fonts are fully loaded
 * - Cursor/caret is hidden
 * 
 * CRITICAL: This decorator MUST be applied to both React and Angular Storybook
 * for visual comparisons to work reliably.
 */

const FIXED_DATE = new Date('2024-01-15T12:00:00.000Z');
const FIXED_TIMESTAMP = FIXED_DATE.getTime();

/**
 * Fix Date.now() and new Date() to return fixed values
 */
export function setupFixedDate(): void {
  // Save original Date
  const OriginalDate = Date;
  
  // Create fixed Date class
  class FixedDate extends OriginalDate {
    constructor(...args: any[]) {
      if (args.length === 0) {
        super(FIXED_TIMESTAMP);
      } else {
        // @ts-ignore
        super(...args);
      }
    }
    
    static now(): number {
      return FIXED_TIMESTAMP;
    }
  }
  
  // Replace global Date
  // @ts-ignore
  globalThis.Date = FixedDate;
}

/**
 * Fix Math.random() to return deterministic values
 */
export function setupFixedRandom(): void {
  let seed = 12345;
  
  Math.random = (): number => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

/**
 * Disable all animations and transitions
 */
export function disableAnimations(): void {
  const style = document.createElement('style');
  style.setAttribute('data-stable-decorator', 'animations');
  style.innerHTML = `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
    
    * {
      caret-color: transparent !important;
    }
    
    /* Hide scrollbars for consistent screenshots */
    ::-webkit-scrollbar {
      display: none;
    }
    * {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  
  document.head.appendChild(style);
}

/**
 * Wait for fonts to be fully loaded
 */
export async function waitForFonts(): Promise<void> {
  if ('fonts' in document) {
    await document.fonts.ready;
  }
}

/**
 * Apply all stabilization fixes
 */
export function applyStableEnvironment(): void {
  setupFixedDate();
  setupFixedRandom();
  disableAnimations();
  
  // Wait for fonts (async, but best effort)
  waitForFonts().catch(() => {
    // Ignore errors
  });
}

/**
 * For Storybook decorators (React)
 */
export const stableDecorator = (Story: any) => {
  applyStableEnvironment();
  return Story();
};

/**
 * For Storybook decorators (Angular)
 */
export const stableDecoratorAngular = (Story: any) => {
  applyStableEnvironment();
  return Story();
};

