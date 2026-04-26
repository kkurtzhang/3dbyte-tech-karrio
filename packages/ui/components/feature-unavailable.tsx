"use client";

import { AlertTriangle } from "lucide-react";

type FeatureUnavailableProps = {
  title: string;
  description: string;
};

export function FeatureUnavailable({
  title,
  description,
}: FeatureUnavailableProps) {
  return (
    <div className="flex min-h-[320px] items-center justify-center p-6">
      <div className="max-w-xl rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
          {title}
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}
