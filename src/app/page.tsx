"use client";
import React, { Suspense } from "react";
import HomePage from "../design-system/templates/home-page/HomePage";
import HomePageSkeleton from "../design-system/templates/home-page/HomePageSkeleton";

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  );
}
