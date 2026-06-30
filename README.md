# FlowBook .AI — Workflow OS for Appointments

FlowBook AI is a premium, automated workflow operating system designed specifically for appointment-based businesses. Unlike traditional scheduling tools that stop at booking, FlowBook AI automates the entire back-office workflow—from data recording and documentation to WhatsApp reminders, CRM pipelines, and autonomous AI agents.

---

## 🚀 Key Features

### 1. Smart Booking & Custom Workflows
- **Dynamic Availability:** Support for round-robin scheduling, buffer times, and automatic timezone adjustments.
- **Visual Builder Workflows:** Triggers a chain of events the moment an appointment is booked (e.g., creating CRM leads, generating docs, and alerting team members).

### 2. Multi-Channel Automation
- **Google Workspace Integration:** Automatically records bookings in Google Sheets, generates custom documents (Google Docs), and organizes files in client Google Drive folders.
- **WhatsApp Automation:** Auto-sends instant appointment confirmations, reminders, and follow-ups to minimize no-shows.
- **Payment Gateway Integrations:** Securely collects consultation fees before meetings using Stripe, Razorpay, or PayPal.

### 3. Autonomous AI Agents (Running 24/7)
- **Booking Agent:** Manages scheduling queries and bookings end-to-end.
- **Qualification Agent:** Evaluates and scores leads as soon as they land.
- **Reminder & Follow-up Agents:** Cuts down no-shows and automatically re-books inactive customers.
- **CRM & Analytics Agents:** Moves deals along pipelines and highlights top-performing traffic channels.

### 4. Super Admin Overview Dashboard
- **Key Metrics Tracking:** Real-time data on active leads, workflow runs, conversion rates, and revenue.
- **AI Insights:** Provides summaries of conversions, upcoming follow-ups, and automated lead briefs.
- **Enterprise-Grade Admin Panel:** Full control over panels, user roles, and white-label branding configurations.

---

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Lucide React
- **Bundler & Dev Server:** Vite 6

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/puspharajm/bookflow-ai.git
   cd bookflow-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` or `.env.local` file based on `.env.example` and supply your Gemini API configuration credentials:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` to preview.

5. **Build for production:**
   ```bash
   npm run build
   ```

