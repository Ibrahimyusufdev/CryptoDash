import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchBar } from "./components/SearchBar";

const queryClient = new QueryClient();

export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <SearchBar />
    </QueryClientProvider>
  )
}