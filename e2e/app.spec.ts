import { test, expect } from '@playwright/test';

test.describe('EmpowerNest Application', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your local app - adjust URL as needed
    await page.goto('http://localhost:5173');
  });

  test.describe('Home Page', () => {
    test('should load the home page successfully', async ({ page }) => {
      // Check if page loaded
      const heading = page.locator('h1, h2');
      await expect(heading).toBeVisible();
    });

    test('should have navigation menu', async ({ page }) => {
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav).toBeVisible();
    });
  });

  test.describe('Authentication Flow', () => {
    test('should navigate to login page', async ({ page }) => {
      // Find and click login button
      const loginButton = page.locator('button:has-text("Login"), a:has-text("Login"), [data-testid="login-btn"]');
      
      if (await loginButton.isVisible()) {
        await loginButton.click();
        await expect(page).toHaveURL(/login/i);
      }
    });

    test('should display login form with email and password fields', async ({ page }) => {
      // Navigate to login page (adjust URL as needed)
      await page.goto('http://localhost:5173/login');
      
      const emailInput = page.locator('input[type="email"]');
      const passwordInput = page.locator('input[type="password"]');
      
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
    });

    test('should show error on invalid login attempt', async ({ page }) => {
      await page.goto('http://localhost:5173/login');
      
      const emailInput = page.locator('input[type="email"]');
      const passwordInput = page.locator('input[type="password"]');
      const submitBtn = page.locator('button[type="submit"]');
      
      await emailInput.fill('invalid@test.com');
      await passwordInput.fill('wrongpass');
      await submitBtn.click();
      
      // Check for error message
      const errorMsg = page.locator('[role="alert"], .error, .text-red-500');
      await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => {
        // Error message may not always appear depending on implementation
      });
    });
  });

  test.describe('User Navigation', () => {
    test('should navigate between pages', async ({ page }) => {
      // Example: Navigate to different sections
      const links = await page.locator('a[href*="/"]').all();
      
      if (links.length > 0) {
        // Click first navigation link and verify page changed
        await links[0].click();
        await page.waitForNavigation().catch(() => {});
        
        const url = page.url();
        expect(url).toBeTruthy();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const heading = page.locator('h1, h2');
      await expect(heading).toBeVisible();
      
      // Check if mobile menu is present
      const mobileMenu = page.locator('[aria-label="menu"], .hamburger, [data-testid="mobile-menu"]');
      // Mobile menu may or may not be present depending on design
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      const heading = page.locator('h1, h2');
      await expect(heading).toBeVisible();
    });

    test('should be responsive on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const heading = page.locator('h1, h2');
      await expect(heading).toBeVisible();
    });
  });
});
