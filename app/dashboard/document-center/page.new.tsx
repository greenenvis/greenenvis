import { Suspense } from "react";
import DocumentCenterClient from "./DocumentCenterClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <DocumentCenterClient />
    </Suspense>
  );
}
