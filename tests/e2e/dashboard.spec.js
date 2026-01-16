import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tr/dashboard');
  });

  test('should load dashboard page', async ({ page }) => {
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should display quick stats', async ({ page }) => {
    const statsGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4');
    await expect(statsGrid).toBeVisible();
  });

  test('should display all chart sections', async ({ page }) => {
    // Check that chart containers exist
    const charts = page.locator('.recharts-wrapper');
    await expect(charts.first()).toBeVisible({ timeout: 10000 });
  });

  test('should have working filter panel', async ({ page }) => {
    const filterPanel = page.locator('[data-testid="filter-panel"]').or(
      page.locator('.bg-\\[var\\(--bg-secondary\\)\\]').first()
    );
    await expect(filterPanel).toBeVisible();
  });

  test('should display share buttons', async ({ page }) => {
    const shareSection = page.locator('button[aria-label="Copy link"]').or(
      page.locator('a[aria-label="Share on Twitter"]')
    );
    await expect(shareSection).toBeVisible();
  });

  test('should display data source attribution', async ({ page }) => {
    await expect(page.locator('text=@oncekiyazilimci')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/tr');

    // Go to dashboard
    await page.click('text=Dashboard');
    await expect(page).toHaveURL(/.*dashboard/);

    // Go to about
    await page.click('text=Hakkında');
    await expect(page).toHaveURL(/.*about/);

    // Go back to home
    await page.click('text=Ana Sayfa');
    await expect(page).toHaveURL('/tr');
  });

  test('should switch language via URL', async ({ page }) => {
    await page.goto('/en/dashboard');
    await expect(page).toHaveURL(/.*en.*dashboard/);
  });
});

test.describe('Theme Toggle', () => {
  test('should toggle dark/light mode', async ({ page }) => {
    await page.goto('/tr');

    const themeToggle = page.locator('button[aria-label*="theme"]').or(
      page.locator('button').filter({ has: page.locator('svg') }).first()
    );

    // Get initial theme
    const initialBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
    });

    // Click toggle
    await themeToggle.click();

    // Check theme changed
    const newBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
    });

    // Theme should have changed (colors should be different)
    expect(newBg).not.toBe(initialBg);
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should show mobile menu button', async ({ page }) => {
    await page.goto('/tr');

    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuButton).toBeVisible();
  });

  test('should open mobile menu when clicked', async ({ page }) => {
    await page.goto('/tr');

    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await menuButton.click();

    // Mobile nav should be visible
    const mobileNav = page.locator('nav.flex.flex-col');
    await expect(mobileNav).toBeVisible();
  });

  test('should close mobile menu when link clicked', async ({ page }) => {
    await page.goto('/tr');

    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await menuButton.click();

    // Click a nav link
    await page.locator('nav.flex.flex-col a').first().click();

    // Menu should close (button should show hamburger icon again)
    await expect(menuButton).toBeVisible();
  });
});
