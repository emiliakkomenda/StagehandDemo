import 'dotenv/config';
import { Stagehand } from '@browserbasehq/stagehand';

// Constants for better maintainability
const DEMO_QA_BASE_URL = 'https://demoqa.com';
const SAMPLE_FILE_PATH = 'test-assets/sample.txt';

async function gotoDemoQA(page: any, path: string) {
  await page.goto(`${DEMO_QA_BASE_URL}/${path}`);
}

async function main() {
  // Initialize 🟨 Stagehand
  const stagehand = new Stagehand({ env: 'LOCAL' });
  await stagehand.init();
  console.log('Stagehand LOCAL session started');
  const page = stagehand.page;
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 1. Text Box Form
  // This test uses Stagehand to fill out a form using natural language, then observes and extracts the result.
  // Demonstrates AI-powered form interaction and output extraction.
  // Follows AAA: Arrange (navigate), Act (fill and submit), Assert (observe and extract)
  try {
    // Arrange
    await gotoDemoQA(page, 'text-box');
    await page.waitForSelector('#userName');

    // Act
    await page.act(
      "Fill the 'Full Name', 'Email', 'Current Address', and 'Permanent Address' fields with example data, then click the 'Submit' button."
    );
    await page.waitForSelector('#output');

    // Assert - 🟨 Stagehand step: AI-powered observation and extraction of form result
    const observed = await page.observe(
      'Observe the output area after submitting the form and return its text'
    );
    console.log('Observed form result:', observed);
    const formResult = await page.extract('Extract the output text after submitting the form');
    console.log('Form result:', formResult);
  } catch (err) {
    console.error('Text Box Form error:', err);
  }

  // 2. Buttons
  // Stagehand clicks a button using natural language, then observes and extracts the resulting message.
  // Shows how Stagehand can interact with and verify dynamic UI feedback.
  // Follows AAA: Arrange (navigate), Act (click button), Assert (observe and extract message)
  try {
    // Arrange
    await gotoDemoQA(page, 'buttons');
    await page.waitForSelector('button#doubleClickBtn');

    // Act
    await page.act("Click the 'Click Me' button.");
    await page.waitForSelector('#dynamicClickMessage');

    // Assert - 🟨 Stagehand step: AI-powered observation and extraction of button message
    const observed = await page.observe(
      "Observe the message displayed after clicking the 'Click Me' button."
    );
    console.log('Observed button message:', observed);
    const buttonMsg = await page.extract(
      "Extract the message after clicking the 'Click Me' button."
    );
    console.log('Button message:', buttonMsg);
  } catch (err) {
    console.error('Buttons error:', err);
  }

  // 3. Check Box
  // Stagehand checks a checkbox and then observes and extracts all checked items.
  // Demonstrates robust state extraction after UI changes.
  // Follows AAA: Arrange (navigate), Act (check checkbox), Assert (observe and extract checked items)
  try {
    // Arrange
    await gotoDemoQA(page, 'checkbox');
    await page.waitForSelector('.rct-checkbox');

    // Act - 🟨 Stagehand step: AI-powered checkbox interaction
    await page.act('Check the main checkbox in the tree.');
    await page.waitForSelector('#result');

    // Assert - 🟨 Stagehand step: AI-powered extraction of checked items
    const observed = await page.observe('Observe and list all checked items');
    console.log('Observed checked items:', observed);
    const checkedItems = await page.extract('Extract the checked items');
    console.log('Checked items:', checkedItems);
  } catch (err) {
    console.error('Check Box error:', err);
  }

  // 4. Radio Button
  // Stagehand selects a radio button and observes/extracts which option is selected.
  // Highlights AI-driven selection and result verification.
  // Follows AAA: Arrange (navigate), Act (select radio), Assert (observe and extract result)
  try {
    // Arrange
    await gotoDemoQA(page, 'radio-button');
    await page.waitForSelector("label[for='yesRadio']");

    // Act - 🟨 Stagehand step: AI-powered radio button selection
    await page.act("Select the radio button labeled 'Yes'.");
    await page.waitForSelector('#result');

    // Assert - 🟨 Stagehand step: AI-powered extraction of radio result
    const observed = await page.observe('Observe which radio button is selected');
    console.log('Observed radio result:', observed);
    const radioResult = await page.extract('Extract the selected radio button result');
    console.log('Radio result:', radioResult);
  } catch (err) {
    console.error('Radio Button error:', err);
  }

  // 5. Web Tables
  // Stagehand adds a new row to a web table, then observes and extracts all table data.
  // Useful for verifying data entry and extraction in dynamic tables.
  // Follows AAA: Arrange (navigate), Act (add row), Assert (observe and extract table data)
  try {
    // Arrange
    await gotoDemoQA(page, 'webtables');
    await page.waitForSelector('#addNewRecordButton');

    // Act - 🟨 Stagehand step: AI-powered row addition
    await page.act(
      "Add a new row to the web table with first name 'Alice', last name 'Johnson', email 'alice.johnson@example.com', age '30', salary '50000', department 'QA', and submit."
    );
    await page.waitForSelector('.rt-tr-group');

    // Assert - 🟨 Stagehand step: AI-powered observation and extraction of table data
    const observed = await page.observe('Observe and list all rows in the web table');
    console.log('Observed table data:', observed);
    const tableData = await page.extract('Extract all rows from the web table');
    console.log('Table data after adding new row:', tableData);
  } catch (err) {
    console.error('Web Tables error:', err);
  }

  // 6. Upload and Download
  // Stagehand uploads a file using natural language, then observes and extracts the uploaded filename.
  // Demonstrates file upload automation and result verification.
  // Follows AAA: Arrange (navigate), Act (upload file), Assert (observe and extract filename)
  try {
    // Arrange
    await gotoDemoQA(page, 'upload-download');
    await page.waitForSelector('#uploadFile');

    // Act - 🟨 Stagehand step: AI-powered file upload
    await page.act("Upload the file 'sample.txt' using the upload button.");
    await page.waitForSelector('#uploadedFilePath');

    // Assert - 🟨 Stagehand step: AI-powered extraction of uploaded filename
    const observed = await page.observe('Observe the uploaded file name');
    console.log('Observed upload result:', observed);
    const uploadResult = await page.extract('Extract the uploaded file name');
    console.log('Upload result:', uploadResult);
  } catch (err) {
    console.error('Upload and Download error:', err);
  }

  // 7. Alerts
  // Stagehand triggers a browser alert and observes the alert message.
  // Shows how Stagehand can handle and verify browser dialogs.
  // Follows AAA: Arrange (navigate), Act (trigger alert), Assert (observe alert)
  try {
    // Arrange
    await gotoDemoQA(page, 'alerts');
    await page.waitForSelector('#alertButton');

    // Act - 🟨 Stagehand step: AI-powered alert interaction
    await page.act('Click the button to trigger the alert dialog.');
    await page.waitForEvent('dialog');

    // Assert - 🟨 Stagehand step: AI-powered observation of alert message
    const observed = await page.observe('Observe the alert message that appears');
    console.log('Observed alert message:', observed);
    console.log('Alert handled');
  } catch (err) {
    console.error('Alerts error:', err);
  }

  // 8. Navigation
  // Stagehand navigates through the UI using natural language, then observes which section is open.
  // Demonstrates AI-powered navigation and context awareness.
  // Follows AAA: Arrange (navigate), Act (navigate to section), Assert (observe section)
  try {
    // Arrange
    await gotoDemoQA(page, '');
    await page.waitForSelector('div.card');

    // Act - 🟨 Stagehand step: AI-powered navigation
    await page.act("Go to the 'Elements' card and open the 'Text Box' section.");
    await page.waitForSelector('#userName');

    // Assert - 🟨 Stagehand step: AI-powered observation of current section
    const observed = await page.observe('Observe which section is currently open');
    console.log('Observed navigation section:', observed);
    console.log('Navigated to Text Box section');
  } catch (err) {
    console.error('Navigation error:', err);
  }

  // 9. AI-powered extraction and observation
  // Stagehand observes and extracts all visible buttons on the Elements page using natural language.
  // Highlights flexible, robust extraction capabilities.
  // Follows AAA: Arrange (navigate), Act (none specific), Assert (observe and extract buttons)
  try {
    // Arrange
    await gotoDemoQA(page, 'elements');
    await page.waitForSelector('button');

    // Act - Implicit navigation

    // Assert - 🟨 Stagehand step: AI-powered extraction of visible buttons
    const observed = await page.observe(
      'Observe and list all visible buttons on the page with their text'
    );
    console.log('Observed buttons:', observed);
    const buttonsAI = await page.extract('List all visible buttons on the page with their text');
    console.log('AI-extracted buttons:', buttonsAI);
  } catch (err) {
    console.error('AI extraction error:', err);
  }

  // 10. Agent: fully autonomous AI workflow
  // Stagehand agent performs a complex, multi-step task using only natural language instructions.
  // Demonstrates autonomous AI workflows for advanced scenarios.
  // Follows AAA: Arrange (create agent), Act (execute task), Assert (verify result)
  try {
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
    console.log('Agent raw result:', JSON.stringify(agentResult, null, 2));

    // Assert
    if (agentResult && agentResult.success) {
      console.log('Agent completed successfully.');
    } else {
      console.error('Agent did not complete successfully:', agentResult);
    }
  } catch (err) {
    console.error('Agent error:', err);
  }

  // Dont forget to close 🟨 Stagehand session!
  await stagehand.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
