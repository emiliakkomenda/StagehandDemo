# Stagehand Demo Project

## Purpose

This project is designed to provide a direct, transparent comparison between Stagehand (AI-powered browser automation) and Playwright (classic browser automation). It includes:

- A Stagehand-only test suite
- A Playwright-only test suite
- A hybrid suite showing how to integrate Stagehand into existing Playwright tests

The goal is to demonstrate the differences, strengths, and integration points of both tools in a clear and minimalistic way. The project structure is intentionally simple to keep the comparison readable.

> [!IMPORTANT]
> This project is intentionally minimalistic and simplified. The sole purpose is to compare Stagehand and Playwright and demonstrate their integration. We do not follow best architectural practices, nor do we add unnecessary abstractions or layers. The code and folder structure are kept as clear and minimal as possible to make the comparison easy to understand. If you are looking for a model E2E test architecture, this is not the right example — this is a deliberate choice to keep the focus on the tools themselves.

## Features

- Automated UI interactions on [DemoQA](https://demoqa.com/)
- AI-powered extraction and self-healing actions
- Agent mode for autonomous multi-step tasks
- TypeScript-based codebase for safety and clarity
- Ready for local execution and CI/CD integration

## How to Run


1. Install dependencies:
   ```sh
   npm install
   ```
   **Technical Note:** Stagehand utilizes external AI models for Agent Mode, Self-Healing, and Data Extraction. This requires an API key from a commercial provider (OpenAI). Running AI-powered scenarios will incur charges or consume credits on your account with that provider.

2. Add your API keys to `.env` (see `.env.example` for required variables).

3. Running individual test suites:

   **Playwright-only tests:**
   ```sh
   npx playwright test Demo/demo-tests-Playwright.spec.ts
   ```

   **Stagehand-only tests:**
   ```sh
   npx ts-node Demo/demo-tests-Stagehand.ts
   ```

   **Hybrid (Playwright + Stagehand) tests:**
   ```sh
   npx playwright test Demo/demo-tests-hybrid.spec.ts
   ```

   (You can also run all Playwright tests at once:)
   ```sh
   npx playwright test
   ```

## Example Scenarios

- Filling and submitting forms
- Clicking buttons and toggling UI elements
- Extracting data using AI
- Running autonomous agents for complex workflows

## Why Stagehand?

Stagehand goes beyond traditional frameworks like Playwright by:

- Allowing natural language instructions and assertions
- Adapting to UI changes with AI-powered self-healing
- Automating entire workflows with a single agent command
- Reducing maintenance and increasing test reliability

# Troubleshooting

**Common issues and solutions:**

- **Missing API Key:**  
   Stagehand requires a valid API key for AI-powered features. Make sure your `.env` file contains the correct key (see `.env.example`).

- **Selectors not working:**  
   Stagehand may not support advanced Playwright selectors (e.g., `:has-text`). Use simple CSS selectors or natural language instructions for best results.

- **Test assets not found:**  
   Ensure all files in `Demo/test-assets/` exist and paths are correct.

- **Agent mode errors:**  
   If agent scenarios fail, check your API key, internet connection, and provider limits.

- **General errors:**  
   Review console output for details. Most issues are related to configuration or selector syntax.

## FAQ

### What is Stagehand?

Stagehand is an AI-powered browser automation framework that combines classic scripting with natural language and agent-based workflows for robust, maintainable, and intelligent web automation.

### Do I need Browserbase to use Stagehand?

No, you can run Stagehand locally using Playwright. Browserbase is recommended for cloud execution, advanced reporting, and higher concurrency.

### Can I use TypeScript?

Yes! This project is fully TypeScript-based for better safety and clarity.

### How is Stagehand different from Playwright?

Stagehand adds AI-powered features like natural language actions, self-healing tests, and agent workflows, making automation more resilient and easier to maintain.

### How do I run the demo?

Install dependencies, add your API keys to `.env`, and run `npm start`.

### Do I need an account with an AI provider to run this demo?

Yes. Since this project utilizes Stagehand's AI-powered features (Agent Mode, Self-Healing, Extraction), a valid API key from an external language model provider (OpenAI) is required. Running these test scenarios will incur usage fees and consume credits on your account with that provider. The demo will not function correctly without a configured and active AI API key.

### Where can I find more documentation?

Visit [stagehand.dev](https://stagehand.dev/) or [GitHub](https://github.com/browserbase/stagehand) for more information and examples.

## License

MIT
