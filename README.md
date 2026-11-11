# InfioneX IT Solutions — Frontend Internship Program 2026

**Document Code:** `IFX/INTERN/FE/2026-10`  
**Internship Track:** Frontend Development  
**Selected Problem Statement:** **Problem Statement 02 — Interactive Analytics Dashboard UI**    

---

## 📌 1. The Problem

### 1.1 Scenario & Business Objective
Modern enterprises require unified, real-time analytics dashboards to monitor critical performance metrics, user engagement, and sales transactions. InfioneX IT Solutions requires an **Interactive Analytics Dashboard UI** that is modern, fast, accessible, and intuitive across mobile, tablet, and desktop devices.

### 1.2 InfioneX Key Deliverables Requirements
- **Dashboard Layout:** Collapsible sidebar, sticky topbar with global search & notification center, and summary KPI cards.
- **At Least 3 Chart Types:** Built using a chart library (**Recharts**) covering Area/Line, Bar, and Donut/Pie charts.
- **Sortable & Searchable Data Table with Pagination:** Client-side search, multi-column sorting, status & payment filtering, pagination, and invoice receipt inspection.
- **Light / Dark Theme Toggle:** Fully supported and saved across user sessions.
- **Mock REST API with Proper Loading and Error States:** Simulates realistic network latency, displays skeleton placeholders, and provides error recovery with retry triggers.

---

## 💡 2. Our Approach & System Architecture

### 2.1 Modular Component Design
We organized the codebase into isolated, reusable modules conforming to clean code principles:
- **`components/layout/`**: `Sidebar.jsx`, `Topbar.jsx`, and `Layout.jsx` provide responsive navigation with mobile drawer support.
- **`components/dashboard/`**: `KpiCards.jsx`, `RevenueChart.jsx`, `CategoryBarChart.jsx`, `TrafficDonutChart.jsx`, and `RegionalPerformance.jsx`.
- **`components/tables/`**: `DataTable.jsx` and `OrderDetailModal.jsx` handling multi-column sorting, live search filtering, pagination, and receipt modal view.
- **`components/common/`**: `SkeletonLoader.jsx`, `Badge.jsx`, and `ErrorState.jsx` for clean feedback.
- **`services/`**: `mockApi.js` and `mockData.js` managing asynchronous network simulation with configurable error injection.
- **`context/`**: `ThemeContext.jsx` handling light/dark theme persistence via `localStorage`.

### 2.2 Asynchronous Data Layer & Error Handling Strategy
- The application uses `mockApi.js` to simulate asynchronous REST API requests with a **650ms** delay.
- While fetching, animated skeleton loaders maintain layout stability and eliminate jarring layout shifts.
- A **Diagnostic Error Simulator** (`Test Error State: ON/OFF`) is accessible directly from the topbar and settings page. When toggled, subsequent API calls fail with a 500/503 status code, presenting a recovery alert banner with a **Retry** button.

---

## 🛠️ 3. The Tech Stack

| Technology | Role | Version |
| :--- | :--- | :--- |
| **React.js** | Core Frontend Framework | `^19.3.1` |
| **Vite** | Build Tool & Fast Dev Server | `^8.3.5` |
| **Tailwind CSS** | Styling & Theme Custom Variant | `^4.3.3` |
| **Recharts** | Data Visualizations & Charts | `^3.10.1` |
| **Lucide React** | UI Icons | `^1.66.0` |
| **React Router** | Multi-Page Client Navigation | `^7.18.5` |
| **Git & GitHub** | Version Control (Module-Wise Commits) | `v2.54+` |

---

## 🖼️ 4. Screenshots & UI Layout Previews

### 4.1 Dashboard Layout Wireframe (Desktop)
```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [✨ InfioneX 2026]              [🔍 Search metrics...]  [Time: Monthly ▾] [🌙] [🔔] [👤]│
├──────────────┬─────────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard │  [ 💰 Total Revenue ] [ 📦 Total Orders ] [ 👥 Users ]  [ ⚡ Conversion ]│
│ 📈 Analytics │     $128,450 (+14%)      12,845 (+5%)      48,290 (+8%)    3.42% (-0%)  │
│ 🧾 Ledger    ├──────────────────────────────────────────┬──────────────────────────────┤
│ 👥 Customers │  REVENUE & PROFIT GROWTH (Area / Line)   │  TRAFFIC CHANNELS (Donut)    │
│ ⚙️ Settings  │  [■ Revenue] [■ Profit] [■ Expenses]     │  • Direct Traffic     (38%)  │
│              │    /\      /\   /\      /\               │  • Organic Search     (27%)  │
│              │   /  \    /  \_/  \    /  \              │  • Social Media       (18%)  │
│              │  /    \__/         \__/    \             │  • Referral & Email   (17%)  │
│              ├──────────────────────────┬───────────────┴──────────────────────────────┤
│              │  SALES BY CATEGORY (Bar) │  REGIONAL DISTRIBUTION (Progress)            │
│              │  [█] SaaS     [█] Cloud  │  North America  ████████████ 50%             │
│              │  [█] AI Auto  [█] Consult│  Europe (EMEA)  ████████░░░░ 30%             │
│              ├──────────────────────────┴──────────────────────────────────────────────┤
│              │  RECENT TRANSACTIONS TABLE                                              │
│              │  [🔍 Search input] [Status: All ▾] [Payment: All ▾]  [📥 Export CSV]    │
│              │  ────────────────────────────────────────────────────────────────────── │
│              │  TXN-9021 │ Sarah Jenkins  │ Enterprise Suite │ $2,450 │ [Completed]    │
│              │  TXN-9022 │ Alex Chen      │ AI Automation    │ $890   │ [Completed]    │
│              │  TXN-9023 │ Elena Rostova  │ Custom API Conn  │ $420   │ [Pending]      │
│              │  Showing 1 to 6 of 15 entries                     [< Prev] [1] [2] [Next>]
└──────────────┴─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Interactive Receipt Modal Preview
```
┌──────────────────────────────────────────────┐
│  🧾 Transaction Details            [TXN-9021]│
├──────────────────────────────────────────────┤
│  Total Amount: $2,450.00         [Completed] │
│                                              │
│  Customer:  Sarah Jenkins (sarah.j@nexustech)│
│  Payment:   Credit Card (Processed securely) │
│  Product:   Enterprise Cloud Suite (Annual)  │
│  Date:      Oct 30, 2026 at 14:24            │
├──────────────────────────────────────────────┤
│  [🖨️ Print Receipt]                  [ Done ] │
└──────────────────────────────────────────────┘
```

---

## 🚀 5. Steps to Run the Project Locally

### 5.1 Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 5.2 Setup & Execution
1. Open PowerShell / Terminal in the project root:
   ```powershell
   git clone https://github.com/Dhattatreyudu/Analytics-dashboard-ui.git
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Launch development server:
   ```powershell
   npm run dev
   ```

4. Open in browser:
   ```
   http://localhost:5173/
   ```

### 5.3 Production Build Verification
To compile an optimized production build:
```powershell
npm run build
```
To preview the production build locally:
```powershell
npm run preview
```



