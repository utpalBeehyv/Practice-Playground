import DebounceSearch from "./pages/DebounceSearch";
import InfiniteScrolling from "./pages/InfiniteScrolling";
import Pagination from "./pages/Pagination";

const routes = [
  {
    path: "/infinite-scrolling",
    title: "Infinite Scrolling",
    description:
      "Paginated comments feed that loads more as you scroll, using IntersectionObserver.",
    Component: InfiniteScrolling,
  },
  {
    path: "/debounce-search",
    title: "Debounce Search",
    description:
      "Search input with debounced API calls to minimize requests.",
    Component: DebounceSearch,
  },
  {
    path: "/pagination",
    title: "Pagination",
    description:
      "Simple pagination component for navigating through pages of content.",
    Component: Pagination,
  }

];

export default routes;
