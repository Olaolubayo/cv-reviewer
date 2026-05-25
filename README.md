CV Reviewer
An AI-powered CV review tool built with vanilla HTML, CSS, and JavaScript. Paste your CV and get instant feedback including a score out of 100, strengths, weaknesses, a rewritten professional summary, and overall advice for improvement.
Features

CV score out of 100
Strengths and weaknesses breakdown
AI-rewritten professional summary
Actionable improvement advice
Responsive design for mobile and desktop

Tech Stack

Vanilla HTML, CSS, JavaScript
Groq API (llama-3.3-70b-versatile)

Getting Started

Clone the repo
Create a config.js file in the root folder:

jsconst CONFIG = {
  API_KEY: 'your-groq-api-key-here'
}

Get a free API key at console.groq.com
Open index.html in your browser — no build step required


Note: config.js is excluded from Git via .gitignore to keep your API key safe. Never commit it.

Author
Olubayo — @olaolubayo10