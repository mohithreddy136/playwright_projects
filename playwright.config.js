//@ts-check
import { defineConfig, devices } from '@playwright/test';
 
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
 
  // Run tests in files in parallel
  fullyParallel: true,
 
  // Fail the build on CI if test.only is left in the code
  forbidOnly: !!process.env.CI,
 
  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,
 
  // Limit number of workers on CI
  workers: process.env.CI ? 4 : undefined,
 
  // Reporters configuration
  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'always'
    }],
    ['json', {
      outputFile: 'test-results/json-report.json'
    }],
    ['junit', {
      outputFile: 'test-results/junit-report.xml'
    }],
    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ],
 
  use: {
    // Collect trace only on first retry
    trace: 'on-first-retry',
 
    // Uncomment and set baseURL if needed
    // baseURL: 'http://localhost:3000',
  },
 
  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
 
    // Uncomment to test mobile viewports
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
 
    // Uncomment to test branded browsers
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
 
  // Uncomment to run a dev server before tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
 