# Comments Viewer

A small React + Vite app that fetches comments from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/comments) API and lets you search through them by name, email, or comment body.

## Features

- Fetches comments on load via a reusable `useGetData` hook (loading/error/data state, request cancellation on unmount).
- Client-side search that matches across name, email, and comment text.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Stack

- React 19 + React Compiler
- Vite
- Axios
