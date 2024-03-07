import React, { Suspense } from "react";
import Auth from "../Auth/page";

export default function AuthWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Auth />
    </Suspense>
  );
}
