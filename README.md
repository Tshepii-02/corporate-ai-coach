# AI Workplace Companion

Create a modern, professional, responsive web application titled "AI-Powered Workplace Productivity Assistant" designed for a  student transitioning into corporate workflows. The app must feature a clean dashboard layout using a polished slate/pink business aesthetic with plenty of white blue and yellow space.

Include a sidebar menu to switch between 5 functional workspace tabs:

1. ✉️ Email Generator: Inputs for Client Name, Project Name, and Reason for Delay. Clicking "Engineer Prompt" generates a high-empathy, structured system prompt to draft a response under 150 words.

2. 📝 Meeting Summarizer: A large text area to paste transcripts. Clicking the button engineers a prompt that outputs a 3-sentence summary, a key decisions list, and action items with owners.

3. 📅 Task Planner: An input for a main business objective. The engineered prompt outputs a logical 5-day linear schedule tracking task dependencies and blockers.

4. 🔍 Research Assistant: Inputs to compare business platforms or competitor tools. It applies strict constraints to filter out AI hallucinations, outputting 'Data Unavailable' if clear proof is lacking.

5. 💬 Helpdesk Chatbot: An input box for technical workspace issues. The prompt instructs the system to act as an internal IT agent that asks clarifying diagnostic questions first.

Each tab must feature an interactive layout with clear descriptive labels, placeholder text, and a primary button. When the user clicks the button, the app should display the fully engineered prompt structure in a dedicated output box with a prominent "Copy to Clipboard" button.

At the bottom of the app layout, include a clear footer panel labeled "🔒 Responsible AI Guardrails & Ethical Policies". Inside it, add bullet points outlining: Data Privacy Protection (never pasting personal client records), Verification Protocols (manually auditing all summaries to check for hallucinations), and Output Transparency.

The entire interface must look executive, use modern font sizes, be optimized for desktop, tablet, and mobile views, and focus entirely on making daily administrative workflows faster and more efficient.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://corporate-ai-coach.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a6f80f3f-167d-4e45-979e-a464f9d3d990).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
