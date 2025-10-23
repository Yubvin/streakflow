import { test, expect } from '@playwright/test';

/**
 * Visual Testing - Reference Screenshots Capture
 * 
 * Purpose: Capture pixel-perfect screenshots from React prototype
 * These screenshots serve as THE REFERENCE for Angular implementation
 * 
 * IMPORTANT: React prototype must be running on http://localhost:3000
 * Run: cd prototype && npm run dev
 */

test.describe('React Prototype - Reference Screenshots', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to React prototype
    await page.goto('http://localhost:3000');
    
    // Wait for app to load
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for animations to settle
    await page.waitForTimeout(500);
  });

  /**
   * Dashboard - full page screenshot
   */
  test('Dashboard - Full Page', async ({ page }) => {
    // Navigate to dashboard (should be default)
    await page.waitForSelector('.habit-card', { timeout: 5000 });
    
    // Wait for all images and content to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'tests/visual/reference/dashboard-full.png',
      fullPage: true
    });
  });

  /**
   * Dashboard - viewport screenshot
   */
  test('Dashboard - Viewport', async ({ page }) => {
    await page.waitForSelector('.habit-card');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'tests/visual/reference/dashboard-viewport.png',
      fullPage: false
    });
  });

  /**
   * Habit Card - individual component
   */
  test('Habit Card - Single Goal', async ({ page }) => {
    // Find first habit card (should be water - multi goal)
    // Find second one (exercise - single goal)
    const habitCards = page.locator('.habit-card');
    const singleGoalCard = habitCards.nth(1); // Exercise - single goal, completed
    
    await singleGoalCard.waitFor();
    
    await singleGoalCard.screenshot({ 
      path: 'tests/visual/reference/habit-card-single-completed.png'
    });
  });

  /**
   * Habit Card - Multi Goal
   */
  test('Habit Card - Multi Goal', async ({ page }) => {
    const habitCards = page.locator('.habit-card');
    const multiGoalCard = habitCards.first(); // Water - multi goal (5/8)
    
    await multiGoalCard.waitFor();
    
    await multiGoalCard.screenshot({ 
      path: 'tests/visual/reference/habit-card-multi-progress.png'
    });
  });

  /**
   * KPI Cards section
   */
  test('KPI Cards Section', async ({ page }) => {
    const kpiSection = page.locator('.grid').first(); // First grid is KPI cards
    await kpiSection.waitFor();
    
    await kpiSection.screenshot({ 
      path: 'tests/visual/reference/kpi-cards-section.png'
    });
  });

  /**
   * Sidebar - navigation
   */
  test('Sidebar - Navigation', async ({ page }) => {
    const sidebar = page.locator('[data-slot="sidebar"]').first();
    await sidebar.waitFor();
    
    await sidebar.screenshot({ 
      path: 'tests/visual/reference/sidebar.png'
    });
  });

  /**
   * Topbar - header
   */
  test('Topbar - Header', async ({ page }) => {
    const topbar = page.locator('header').first();
    await topbar.waitFor();
    
    await topbar.screenshot({ 
      path: 'tests/visual/reference/topbar.png'
    });
  });

  /**
   * Habits Screen - List View
   */
  test('Habits Screen - Table View', async ({ page }) => {
    // Navigate to Habits
    await page.click('text=Habits');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'tests/visual/reference/habits-screen.png',
      fullPage: true
    });
  });

  /**
   * Add Habit Modal
   */
  test('Add Habit Modal', async ({ page }) => {
    // Click Add Habit button
    await page.click('button:has-text("Add Habit")');
    
    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 3000 });
    await page.waitForTimeout(300); // Animation
    
    // Screenshot the modal
    const modal = page.locator('[role="dialog"]');
    await modal.screenshot({ 
      path: 'tests/visual/reference/add-habit-modal.png'
    });
  });

  /**
   * Theme - Dark Mode
   */
  test('Dashboard - Dark Theme', async ({ page }) => {
    // Toggle theme (look for theme toggle button)
    const themeToggle = page.locator('button').filter({ hasText: /theme|dark|light/i }).first();
    
    // If theme toggle exists, click it
    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(300);
    }
    
    // Check if dark mode is active
    const htmlElement = page.locator('html');
    const isDark = await htmlElement.evaluate(el => el.classList.contains('dark'));
    
    if (isDark) {
      await page.screenshot({ 
        path: 'tests/visual/reference/dashboard-dark.png',
        fullPage: false
      });
    }
  });

  /**
   * Empty State
   */
  test('Empty State - No Habits', async ({ page }) => {
    // This requires clearing all habits in the app
    // For now, skip or implement habit deletion in prototype
    test.skip();
  });
});

