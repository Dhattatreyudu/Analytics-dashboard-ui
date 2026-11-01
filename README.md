# InfioneX IT Solutions — Frontend Internship Program 2026

**Document Code:** `IFX/INTERN/FE/2026-10`  
**Track:** Frontend Development  
**Selected Problem Statement:** **Problem Statement 02 — Interactive Analytics Dashboard UI**  
**Submission Contact:** `admin@infionex.com`  

---

## 📌 1. Project Overview & Scenario

Businesses rely on dashboards to track sales, users, and overall organizational performance in real-time. This project is a modern, responsive, high-performance **Interactive Analytics Dashboard UI** built for **InfioneX IT Solutions**. 

It provides executives and operations teams with real-time telemetry, visual business intelligence across multiple chart libraries, an interactive and sortable transactions ledger with instant CSV export, light/dark theme switching, and an asynchronous mock REST API layer complete with realistic loading skeletons and controllable error-recovery states.

---

## 🚀 2. Deliverables Checklist & Compliance

| # | Required Deliverable | Status | Implementation Details |
|---|----------------------|--------|------------------------|
| **1** | **Dashboard Layout** (Sidebar, Top Bar, Summary Cards) | ✅ Complete | Responsive collapsible sidebar, sticky topbar with global search & notification panel, and 4 KPI metric cards with trend indicators. |
| **2** | **At Least 3 Chart Types** | ✅ Complete | Built using **Recharts**: <br>• **Line / Area Chart** (Revenue & Profit over time)<br>• **Bar Chart** (Sales by service category)<br>• **Donut / Pie Chart** (Traffic acquisition channels)<br>• *Bonus: Regional Performance Progress meters* |
| **3** | **Sortable & Searchable Data Table with Pagination** | ✅ Complete | Instant client-side search across multiple fields, column sorting (ID, Customer, Product, Date, Amount, Status), status & payment filters, configurable page size, itemized invoice receipt modal, and CSV export. |
| **4** | **Light / Dark Theme Toggle** | ✅ Complete | Class-based dark mode (`.dark`) with smooth color transitions, `localStorage` persistence, and system preference detection. |
| **5** | **Mock REST API with Loading & Error States** | ✅ Complete | Simulated asynchronous REST API layer (`mockApi.js`) with realistic latency (650ms), animated skeleton loaders, and a 1-click Error State simulation toggle to demonstrate graceful error handling & retry functionality. |
| **6** | **Routing & Multi-Page Views** | ✅ Bonus | Full React Router implementation with pages: `/` (Overview), `/analytics` (In-depth Analytics), `/transactions` (Order Ledger), `/customers` (Directory), and `/settings`. |

---

## 🛠️ 3. Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Bundler & Tooling:** [Vite](https://vite.dev/)
- **Styling & Design System:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Visualization & Charts:** [Recharts](https://recharts.org/)
- **Iconography:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Version Control:** Git & GitHub

---

## 📂 4. Project Architecture

```
analytics-dashboard-ui/
├── index.html                   # HTML entry point with Plus Jakarta Sans & meta tags
├── package.json                 # Project dependencies & build scripts
├── vite.config.js               # Vite config with @tailwindcss/vite plugin
├── src/
│   ├── main.jsx                 # Application root mounting
│   ├── App.jsx                  # Main router setup and page routes
│   ├── index.css                # Tailwind CSS v4 directives & custom themes
│   ├── context/
│   │   └── ThemeContext.jsx     # Light/Dark mode state & localStorage persistence
│   ├── services/
│   │   ├── mockData.js          # Realistic telemetry datasets (KPIs, time-series, orders)
│   │   └── mockApi.js           # Simulated REST API service with latency & error controls
│   ├── utils/
│   │   ├── formatters.js        # Currency, number, and date formatters
│   │   └── exportCsv.js         # CSV export utility for tables
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx        # Colored status badges with indicator dots
│   │   │   ├── ErrorState.jsx   # Error banner with retry trigger
│   │   │   └── SkeletonLoader.jsx # Animated skeleton placeholders
│   │   ├── layout/
│   │   │   ├── Layout.jsx       # Layout orchestrator with footer
│   │   │   ├── Sidebar.jsx      # Responsive & collapsible sidebar
│   │   │   └── Topbar.jsx       # Sticky top navigation bar
│   │   ├── dashboard/
│   │   │   ├── KpiCards.jsx     # Summary metrics with trends
│   │   │   ├── RevenueChart.jsx # Area/Line chart with series toggles
│   │   │   ├── CategoryBarChart.jsx # Bar chart with category analytics
│   │   │   ├── TrafficDonutChart.jsx # Donut chart with channel breakdown
│   │   │   └── RegionalPerformance.jsx # Geographic distribution
│   │   └── tables/
│   │       ├── DataTable.jsx    # Sortable, searchable table with pagination & CSV export
│   │       └── OrderDetailModal.jsx # Invoice receipt inspection modal
│   └── pages/
│       ├── DashboardPage.jsx    # Primary Executive Dashboard
│       ├── AnalyticsPage.jsx    # Granular deep-dive metrics
│       ├── TransactionsPage.jsx # Full operational transactions ledger
│       ├── CustomersPage.jsx    # Enterprise client directory
│       └── SettingsPage.jsx     # Appearance & diagnostic controls
```

---

## ⚙️ 5. Getting Started & Running the Project

### Prerequisites
- Node.js (v18 or higher recommended, tested on v24)
- npm (v9 or higher)

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd analytics-dashboard-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Building for Production
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 💡 6. Key Features Walkthrough

### 1. Executive Summary KPI Cards
- Displays **Total Revenue ($128,450)**, **Total Orders (12,845)**, **Active Users (48,290)**, and **Conversion Rate (3.42%)**.
- Shows percentage changes against the previous cycle with color-coded positive/negative badges (`+14.2%`, `-0.4%`).

### 2. Multi-Type Data Visualizations
- **Revenue & Profit Growth (Area/Line):** Features custom gradients, interactive series filters (show/hide Revenue, Profit, or Expenses), and time-range filtering (`weekly`, `monthly`, `quarterly`).
- **Sales by Category (Bar Chart):** Visualizes performance across software, cloud, and consulting product lines with hover tooltips and formatted currency values.
- **Traffic Acquisition (Donut Chart):** Highlights customer acquisition distribution (Direct, Search, Social, Referral, Email) with center stats and breakdown legend.
- **Regional Performance:** Real-time market share progress meters for North America, EMEA, APAC, and LATAM.

### 3. Interactive Data Table
- **Live Search:** Filters results across Order ID, Customer Name, Email, and Product in real-time.
- **Column Sorting:** Click any column header (`Order ID`, `Customer`, `Product`, `Date`, `Amount`, `Status`) to sort ascending or descending.
- **Multi-Filter Controls:** Filter by status (`Completed`, `Pending`, `Processing`, `Cancelled`) and payment methods (`Credit Card`, `Stripe`, `PayPal`, `Apple Pay`).
- **Pagination:** Select 5, 6, 10, or 15 items per page with page jump buttons and total counts.
- **One-Click CSV Export:** Generates and downloads a clean CSV file of all currently filtered data.
- **Itemized Receipt Modal:** Clicking any transaction opens a detailed invoice modal with option to print receipt.

### 4. Mock REST API & Diagnostic Mode
- **Realistic Network Latency:** Simulates realistic server response times (650ms).
- **Skeleton Loading:** Displays pulse animations for KPI cards, chart canvases, and table rows while fetching.
- **Error Simulation Toggle:** Includes a button in the topbar and settings page (`Test Error State: ON/OFF`). When enabled, the application demonstrates error handling, showing a descriptive error banner and a working **Retry** button.

---

## 📬 7. InfioneX Submission Template

To submit your project to InfioneX IT Solutions:

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete InfioneX Frontend Internship Problem Statement 02 - Analytics Dashboard"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. Send an email to **admin@infionex.com**:
   - **Subject:** `InfioneX Internship 2026 - Problem Statement 02 Submission - [Your Full Name]`
   - **Body:**
     ```text
     Dear InfioneX Talent Acquisition & Review Team,

     I have completed Problem Statement 02 (Interactive Analytics Dashboard UI) for the InfioneX Frontend Internship Program 2026.

     Project Details:
     - Chosen Problem Statement: Problem Statement 02 (Interactive Analytics Dashboard UI)
     - Tech Stack: React.js (v19), Vite, Tailwind CSS (v4), Recharts, Lucide React, React Router
     - GitHub Repository: https://github.com/<your-username>/<repo-name>
     - Live Demo (if deployed): https://<your-project>.vercel.app

     Key Deliverables Completed:
     1. Modern Dashboard layout with responsive sidebar, sticky top bar, and KPI metric cards.
     2. At least 3 chart types (Area/Line chart, Bar chart, Donut chart, and Regional distribution).
     3. Sortable, searchable data table with multi-filter controls, pagination, receipt modal, and CSV export.
     4. Polished Light/Dark theme toggle with localStorage persistence.
     5. Asynchronous mock REST API service with skeleton loading states and interactive error simulation with retry mechanism.
     6. Comprehensive documentation and clean modular code architecture.

     Thank you for this opportunity, and I look forward to your review and feedback.

     Warm regards,
     [Your Full Name]
     [Your Phone Number]
     [Your LinkedIn Profile]
     ```

---
*Created for InfioneX IT Solutions Internship Program 2026.*
