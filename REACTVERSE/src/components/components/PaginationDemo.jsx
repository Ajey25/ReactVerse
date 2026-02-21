import { useState } from "react";

export default function PaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setPage((p) => Math.max(1, p - 1))}>◀</button>
      <span>Page {page}</span>
      <button onClick={() => setPage((p) => p + 1)}>▶</button>
    </div>
  );
}
