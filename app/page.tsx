import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <main className="flex">
      <Pagination itemCount={1000} currentPage={1} pageSize={20} />
    </main>
  );
}
