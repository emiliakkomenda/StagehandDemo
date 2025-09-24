// Playwright-only test suite: classic, deterministic browser automation using selectors and direct actions.
// Each test demonstrates a typical UI automation scenario using Playwright.
// Follows AAA pattern: Arrange (setup), Act (perform actions), Assert (verify results).

import { test, expect, chromium, Browser, Page } from '@playwright/test';
import path from 'path';

// Constants for better maintainability
const DEMO_QA_BASE_URL = 'https://demoqa.com';
const SAMPLE_FILE_PATH = 'test-assets/sample.txt';

test.describe('Playwright Demo Tests', () => {
  let browser: Browser;
  let page: Page;

  // Helper function to reduce repetition (DRY principle)
  async function gotoDemoQA(page: Page, path: string) {
    await page.goto(`${DEMO_QA_BASE_URL}/${path}`);
  }

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test.afterAll(async () => {
    await browser.close();
  });

  // Test follows AAA: Arrange (navigate), Act (fill form and submit), Assert (verify output)
  test('Text Box Form', async () => {
    // Arrange
    await gotoDemoQA(page, 'text-box');

    // Act
    await page.fill('#userName', 'John Smith');
    await page.fill('#userEmail', 'john.smith@example.com');
    await page.fill('#currentAddress', '123 Example Street');
    await page.fill('#permanentAddress', '456 Permanent Avenue');
    await page.click('#submit');

    // Assert
    const result = await page.textContent('#output');
    console.log('Submitted form output:', result);
    expect(result).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (click button), Assert (verify message)
  test('Buttons', async () => {
    // Arrange
    await gotoDemoQA(page, 'buttons');

    // Act
    const buttons = await page.$$('button.btn.btn-primary');
    await buttons[buttons.length - 1].click();
    await page.waitForSelector('#dynamicClickMessage');

    // Assert
    const buttonMsg = await page.textContent('#dynamicClickMessage');
    console.log("Message after clicking 'Click Me':", buttonMsg);
    expect(buttonMsg).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (check checkbox), Assert (verify checked items)
  test('Check Box', async () => {
    // Arrange
    await gotoDemoQA(page, 'checkbox');

    // Act
    await page.click('.rct-checkbox');

    // Assert
    const checkedItems = await page.textContent('#result');
    console.log('Checked tree items:', checkedItems);
    expect(checkedItems).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (select radio button), Assert (verify result)
  test('Radio Button', async () => {
    // Arrange
    await gotoDemoQA(page, 'radio-button');

    // Act
    await page.click('label[for="yesRadio"]');

    // Assert
    const radioResult = await page.textContent('.text-success');
    console.log('Selected radio button result:', radioResult);
    expect(radioResult).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (add row to table), Assert (verify table contents)
  test('Web Tables', async () => {
    // Arrange
    await gotoDemoQA(page, 'webtables');

    // Act
    await page.click('#addNewRecordButton');
    await page.fill('#firstName', 'Alice');
    await page.fill('#lastName', 'Johnson');
    await page.fill('#userEmail', 'alice.johnson@example.com');
    await page.fill('#age', '30');
    await page.fill('#salary', '50000');
    await page.fill('#department', 'QA');
    await page.click('#submit');

    // Assert
    const tableRows = await page.$$eval('.rt-tbody .rt-tr-group', (rows) =>
      rows.map((row) => row.textContent)
    );
    console.log("Web table rows after adding 'Alice Johnson':", tableRows);
    expect(tableRows.length).toBeGreaterThan(0);
  });

  // Test follows AAA: Arrange (navigate), Act (upload file), Assert (verify upload result)
  test('Upload and Download', async () => {
    // Arrange
    await gotoDemoQA(page, 'upload-download');

    // Act
    const filePath = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      SAMPLE_FILE_PATH
    );
    await page.setInputFiles('#uploadFile', filePath);

    // Assert
    const uploadResult = await page.inputValue('#uploadFile');
    console.log('Uploaded file path:', uploadResult);
    expect(uploadResult).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (trigger alert), Assert (handle and verify)
  test('Alerts', async () => {
    // Arrange
    await gotoDemoQA(page, 'alerts');

    // Act
    await page.click('#alertButton');

    // Assert
    page.once('dialog', async (dialog: any) => {
      console.log('Alert dialog message:', dialog.message());
      await dialog.dismiss();
    });
    await page.waitForTimeout(1000);
    expect(true).toBeTruthy(); // Placeholder assertion - consider more specific checks
  });

  // Test follows AAA: Arrange (navigate), Act (navigate through UI), Assert (verify navigation)
  test('Navigation', async () => {
    // Arrange
    await gotoDemoQA(page, '');

    // Act
    await page.click('div.card:has-text("Elements")');
    await page.click('span:has-text("Text Box")');

    // Assert
    console.log('Navigation: Elements > Text Box');
    expect(await page.isVisible('#userName')).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (none specific), Assert (extract and verify buttons)
  test('Extract all visible buttons on the Elements page', async () => {
    // Arrange
    await gotoDemoQA(page, 'elements');

    // Act - Implicit navigation

    // Assert
    const buttons = await page.$$eval('button', (btns) => btns.map((btn) => btn.textContent));
    console.log('Visible buttons on Elements page:', buttons);
    expect(buttons.length).toBeGreaterThan(0);
  });
});
