# Finance Dashboard

A **Finance Dashboard** built using **React + Redux + Vite**, designed to track income, expenses, and savings with interactive visualizations.
![Screenshot_3-4-2026_133756_pdbharadwaj github io](https://github.com/user-attachments/assets/0cfbefd4-3a2e-4adf-bb46-feee1f3f5172)

---

# Features

## Data Visualization

* Bar Chart for overall balance overview
* Pie Chart for income/expense breakdown
* Dynamic category-based coloring
* Savings (Net) visualization

## Smart UI

* Dropdown filters (Income / Expense / Net)
* Responsive design
* Clean and minimal dashboard layout
* Sorting, filtering and searching in the transactions table

## State Management

* Managed using Redux
* Real-time updates on adding transactions

## Dynamic Coloring System

* Automatic color assignment for categories
* Consistent color mapping across charts
* Supports unlimited categories

## Dark Mode Ready

* UI supports dark-themed styling
* Chart compatibility maintained
![Screenshot_3-4-2026_133821_pdbharadwaj github io](https://github.com/user-attachments/assets/d7824a20-839b-4e0d-b03e-9172460e3186)

---

# Tech Stack

* **Frontend**: React (Vite)
* **State Management**: Redux
* **Charts**: Recharts
* **Styling**: CSS
* **Deployment**: GitHub Pages

---

# Project Structure

```
src/
│── components/      # Reusable components
│── pages/           # Main pages (Dashboard)
│── redux/           # Redux store & slices
│── styles/          # CSS files
│── App.jsx
│── main.jsx
```

---

# Installation & Setup

## 1️. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

## 2️. Install Dependencies

```bash
npm install
```

## 3️. Run Development Server

```bash
npm run dev
```

---

# How It Works

## Data Flow

1. User adds transactions (Income/Expense)
2. Data stored in Redux store
3. Charts dynamically update

## Chart Logic

* Income & Expense are filtered separately
* Savings = Income - Expense
* Categories mapped dynamically to colors

---

# Category Color System

* Uses a predefined color palette
* Automatically assigns colors to new categories
* Ensures consistent visualization across charts

---

# Deployment (GitHub Pages)

## Step 1: Install gh-pages

```bash
npm install gh-pages --save-dev
```

## Step 2: Update package.json

```json
"homepage": "https://pdbharadwaj.github.io/Finance_Dashboard/",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

## Step 3: Deploy

```bash
npm run deploy
```

---

# Common Issues & Fixes

## Blank Page After Deployment

* Ensure homepage is set to "."
* Use `dist` instead of `build`

## Chart Not Rendering

* Check data format
* Ensure categories exist

## Colors Changing Randomly

* Use persistent color mapping

---

# Future Improvements

* Add authentication
* Export reports (PDF/CSV)
* Persistent storage (Firebase / Backend)
* Advanced analytics (monthly trends)
* Donut charts & animations

---

# Preview

A clean dashboard showing:

* Income vs Expense distribution
* Category-wise spending
* Savings overview

---

# Acknowledgements

* React
* Redux
* Recharts
* Vite

---
