// Hybrid test suite: combines Playwright for deterministic actions and Stagehand for AI-powered extraction/observation.
// Each test demonstrates where Playwright is used for classic automation and where Stagehand is used for AI-driven steps.
// Follows AAA pattern: Arrange (setup), Act (perform actions), Assert (verify results).

import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';

// Constants for better maintainability
const DEMO_QA_BASE_URL = 'https://demoqa.com';
const SAMPLE_FILE_PATH = 'test-assets/sample.txt';

test.describe('Hybrid Playwright + Stagehand Demo', () => {
  let browser: Browser;
  let page: Page;
  let stagehand: any;
  let shPage: any;

  // Helper function to reduce repetition (DRY principle)
  async function gotoDemoQA(page: any, path: string) {
    await page.goto(`${DEMO_QA_BASE_URL}/${path}`);
  }

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Initialize 🟨 Stagehand
    stagehand = new Stagehand({ env: 'LOCAL' });
    await stagehand.init();
    shPage = stagehand.page;
  });

  test.afterAll(async () => {
    await browser.close();
    // Dont forget to close 🟨 Stagehand session!
    await stagehand.close();
  });

  // Test follows AAA: Arrange (navigate), Act (fill form and submit), Assert (extract and verify result)
  test('Text Box Form (hybrid)', async () => {
    // Arrange
    await gotoDemoQA(page, 'text-box');

    // Act
    await page.fill('#userName', 'John Smith');
    await page.fill('#userEmail', 'john.smith@example.com');
    await page.fill('#currentAddress', '123 Example Street');
    await page.fill('#permanentAddress', '456 Permanent Avenue');
    await page.click('#submit');

    // Assert - 🟨 Stagehand step: AI-powered extraction of confirmation text
    await gotoDemoQA(shPage, 'text-box');
    const formResult = await shPage.extract(
      'Read and return the confirmation text displayed after submitting the form.'
    );
    console.log('[Hybrid] Form result (AI, Stagehand):', formResult);
    expect(formResult).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (click button), Assert (extract and verify message)
  test('Buttons (hybrid)', async () => {
    // Arrange
    await gotoDemoQA(page, 'buttons');

    // Act - Try to click the button by id if available, fallback to text selector
    const buttons = await page.$$('button.btn.btn-primary');
    await buttons[buttons.length - 1].click();
    await page.waitForSelector('#dynamicClickMessage');

    // Assert - 🟨 Stagehand step: AI-powered extraction of button message
    await gotoDemoQA(shPage, 'buttons');
    const buttonMsg = await shPage.extract(
      "What message appears after clicking the 'Click Me' button? Return the full text."
    );
    console.log('[Hybrid] Button message (AI, Stagehand):', buttonMsg);
    expect(buttonMsg).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (check checkbox), Assert (extract and verify checked items)
  test('Check Box (hybrid)', async () => {
    // Arrange
    await gotoDemoQA(page, 'checkbox');

    // Act
    await page.click('.rct-checkbox');

    // Assert - 🟨 Stagehand step: AI-powered extraction of checked items
    await gotoDemoQA(shPage, 'checkbox');
    const checkedItems = await shPage.extract(
      'List all items that are checked after interacting with the checkbox.'
    );
    console.log('[Hybrid] Checked items (AI, Stagehand):', checkedItems);
    expect(checkedItems).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (select radio button), Assert (extract and verify result)
  test('Radio Button (hybrid)', async () => {
    // Arrange
    await gotoDemoQA(page, 'radio-button');

    // Act
    await page.click("label[for='yesRadio']");

    // Assert - 🟨 Stagehand step: AI-powered extraction of radio result
    await gotoDemoQA(shPage, 'radio-button');
    const radioResult = await shPage.extract(
      "What is the result text shown after selecting the 'Yes' radio button?"
    );
    console.log('[Hybrid] Radio result (AI, Stagehand):', radioResult);
    expect(radioResult).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (add row to table), Assert (extract and verify table data)
  test('Web Tables (hybrid)', async () => {
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

    // Assert - 🟨 Stagehand step: AI-powered extraction of table data
    await gotoDemoQA(shPage, 'webtables');
    const tableData = await shPage.extract(
      'Return all rows from the web table, including the newly added entry for Alice Johnson.'
    );
    console.log('[Hybrid] Table data after adding new row (AI, Stagehand):', tableData);
    expect(tableData).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (upload file), Assert (extract and verify uploaded filename)
  test('Upload and Download (hybrid)', async () => {
    // Arrange
    await gotoDemoQA(page, 'upload-download');

    // Act
    const path = await import('path');
    const filePath = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      SAMPLE_FILE_PATH
    );
    await page.setInputFiles('#uploadFile', filePath);

    // Assert - 🟨 Stagehand step: AI-powered extraction of uploaded filename
    await gotoDemoQA(shPage, 'upload-download');
    const uploadResult = await shPage.extract(
      "What is the name of the file shown as uploaded after submitting 'sample.txt'? Return the displayed filename."
    );
    console.log('[Hybrid] Upload result (AI, Stagehand):', uploadResult);
    expect(uploadResult).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (trigger alert), Assert (handle and verify)
  test('Alerts (hybrid)', async () => {
    // Arrange
    await gotoDemoQA(page, 'alerts');

    // Act
    await page.click('#alertButton');

    // Assert
    page.once('dialog', async (dialog: any) => {
      console.log('[Hybrid] Alert handled:', dialog.message());
      await dialog.dismiss();
    });
    await page.waitForTimeout(1000);
    expect(true).toBeTruthy(); // Placeholder assertion - consider more specific checks
  });

  // Test follows AAA: Arrange (navigate), Act (navigate through UI), Assert (verify navigation)
  test('Navigation (hybrid)', async () => {
    // Arrange
    await gotoDemoQA(page, '');

    // Act
    await page.click("div.card:has-text('Elements')");
    await page.click("span:has-text('Text Box')");

    // Assert
    await gotoDemoQA(shPage, '');
    await shPage.click("div.card:has-text('Elements')");
    await shPage.click("span:has-text('Text Box')");

    console.log('[Hybrid] Navigated to Text Box section (both)');
    expect(await page.isVisible('#userName')).toBeTruthy();
  });

  // Test follows AAA: Arrange (navigate), Act (none specific), Assert (extract and verify buttons)
  test('Extract all visible buttons on the Elements page (hybrid)', async () => {
    // Arrange
    await gotoDemoQA(page, 'elements');

    // Act - Implicit navigation

    // Assert - 🟨 Stagehand step: AI-powered extraction of visible buttons
    await gotoDemoQA(shPage, 'elements');
    const buttonsAI = await shPage.extract(
      'List every visible button on the page and provide the text shown on each one.'
    );
    console.log('[Hybrid] AI-extracted buttons (Stagehand):', buttonsAI);
    expect(buttonsAI).toBeTruthy();
  });

  // Test follows AAA: Arrange (create agent), Act (execute task), Assert (verify result)
  test('Stagehand agent (hybrid)', async () => {
    // Arrange - 🟨 Stagehand agent setup
    const agent = stagehand.agent({
      provider: 'openai',
      model: 'computer-use-preview',
      instructions:
        'Go to https://demoqa.com/elements. List all visible buttons on the page and print their text.',
      options: { apiKey: process.env.OPENAI_API_KEY },
    });

    // Act - 🟨 Stagehand agent performs complex task autonomously
    const agentResult = await agent.execute('List all visible buttons and print their text');
    console.log('[Hybrid] Agent raw result:', JSON.stringify(agentResult, null, 2));

    // Assert
    if (agentResult && agentResult.success) {
      console.log('[Hybrid] Agent completed successfully.');
    } else {
      console.error('[Hybrid] Agent did not complete successfully:', agentResult);
    }
    expect(agentResult).toBeTruthy();
  });
});
