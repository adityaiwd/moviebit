# 🎬 Movie Explorer App

A React application for browsing movies using the **OMDb API**, featuring search, autocomplete, infinite scrolling, and detailed movie pages.

This project was built as part of a take-home assignment, with a focus on **clean architecture**, **maintainability**, and **practical UX decisions**.

---

## ✨ Features

### Movie List Page

* Search movies by title
* **Autocomplete suggestions** (debounced, cached, keyboard-navigable)
* **Infinite scrolling** for search results
* Default movie list before user searches
* Poster image fallback for missing/broken posters
* Click poster to open **zoomed modal preview**

### Movie Detail Page

* Fetches and displays full movie details
* Large poster preview with modal
* Handles loading and error states gracefully
* No unnecessary global state

### UI / UX

* Dark mode using **shadcn/ui + Tailwind**
* Loading indicators and error toasts
* Keyboard accessibility for search and autocomplete

---

## 🛠️ Tech Stack

* **React 18**
* **Vite**
* **TypeScript**
* **Redux Toolkit**
* **React Router**
* **Tailwind CSS**
* **shadcn/ui**
* **Axios**
* **Vitest + React Testing Library**

---

## 🧠 Architectural Decisions

### Why Redux is only used on the Movie List page

The movie list page requires:

* Accumulated state (infinite scroll)
* Pagination handling
* Deduplication of results
* Shared state across components

Redux Toolkit is used here to keep state predictable and centralized.

### Why Redux is NOT used on the Movie Detail page

The movie detail page:

* Fetches a single resource
* Has a simple lifecycle
* Is not shared across components

Using local state via a custom hook keeps the code simpler and avoids unnecessary global state.

---

## 📁 Project Structure (Simplified)

```
src/
  app/                # App-level setup (store, router)
  pages/
    MovieListPage/
      components/
      repository/
      state/
      usecases/
    MovieDetailPage/
      repository/
      usecases/
  shared/
    hooks/
    ui/
    repository/
```

This structure separates:

* **data fetching** (repository)
* **business logic** (usecases)
* **state management** (Redux or hooks)
* **presentation components**

---

## 🔍 Autocomplete Implementation

* Uses OMDb search (`page=1`) as suggestion source
* Debounced to avoid rate limits
* Only triggers after **3+ characters**
* Results are cached in-memory
* Supports keyboard navigation (↑ ↓ Enter Esc)

This keeps the feature responsive while being API-friendly.

---

## 🧪 Testing

Unit tests are written for core UI components using **Vitest** and **React Testing Library**:

* SearchBar
* PosterImage (fallback behavior)
* PosterModal
* MovieCard interactions

Tests focus on **user behavior**, not implementation details.

Run tests with:

```bash
npm run test
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

You can get a free API key from:
[https://www.omdbapi.com/](https://www.omdbapi.com/)

### 3. Run the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## ⚠️ Notes on OMDb API

* OMDb has strict rate limits
* Autocomplete and search are debounced and cached to minimize requests
* Some poster URLs are low-resolution or broken — fallbacks are handled in the UI

---

## 🧩 Coding Logic Test – Anagram

The solution for the anagram problem is included in this repository.

**Location: /logic-test/anagram.ts**

### Approach
- ES5-style implementation (no `map`, `sort`, `reduce`, `filter`)
- Uses character frequency counting to generate a stable key for each word
- Groups words that share the same key

This approach avoids sorting and runs in linear time relative to the input size.
