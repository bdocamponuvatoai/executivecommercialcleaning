"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { presetFromParams } from "@/lib/walkthrough";
import { WalkthroughForm } from "./walkthrough-form";

function PresetWalkthrough() {
  const params = useSearchParams();
  const space = params.get("space");
  const service = params.get("service");
  // Re-mount when the preset changes so defaultValue/defaultChecked apply.
  return (
    <WalkthroughForm
      key={`${space}|${service}`}
      preset={presetFromParams(space, service)}
    />
  );
}

/**
 * The static HTML contains the plain form (Suspense fallback); the client then
 * applies any `?space=` / `?service=` preset from the URL.
 */
export function Walkthrough() {
  return (
    <Suspense fallback={<WalkthroughForm preset={{}} />}>
      <PresetWalkthrough />
    </Suspense>
  );
}
