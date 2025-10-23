import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for visual regression testing
 * Reference: React prototype screenshots
 * Compare: Angular implementation
 */
export default defineConfig({
  testDir: './tests/visual',
  
  // Folder for test artifacts
  snapshotDir: './tests/visual/reference',
  
  // Update snapshots
  updateSnapshots: 'missing',
  
  // Expect options
  expect: {
    toHaveScreenshot: {
      // Max difference in pixels
      maxDiffPixels: 100,
      
      // Threshold for pixel difference (0-1)
      threshold: 0.1,
      
      // Animations stabilization
      animations: 'disabled'
    }
  },
  
  // Global timeout
  timeout: 30000,
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Retry failed tests
  retries: 2,
  
  // Reporter
  reporter: [
    ['list'],
    ['html', { outputFolder: 'tests/visual/reports' }]
  ],
  
  // Shared settings
  use: {
    // Base URL for React prototype
    baseURL: 'http://localhost:3000',
    
    // Screenshot options
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Trace on failure
    trace: 'retain-on-failure'
  },

  // Projects - different browsers and viewports
  projects: [
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      }
    },
    {
      name: 'Desktop Dark',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        colorScheme: 'dark'
      }
    },
    {
      name: 'Tablet',
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 768 }
      }
    },
    {
      name: 'Mobile',
      use: { 
        ...devices['iPhone 14 Pro'],
        viewport: { width: 393, height: 852 }
      }
    }
  ],

  // Dev server (for reference only, run manually)
  // webServer: {
  //   command: 'cd prototype && npm run dev',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: true
  // }
});

