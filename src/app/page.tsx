"use client";
import React, { Suspense } from "react";
import HomePage from "../design-system/templates/home-page/HomePage";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
