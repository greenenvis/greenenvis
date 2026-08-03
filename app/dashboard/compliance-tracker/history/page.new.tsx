import { Suspense } from "react";
import HistoryClient from "./HistoryClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <HistoryClient />
    </Suspense>
  );
}
