// components/icons/GasTankerIcon.tsx

import type { SVGProps } from "react";

export default function GasTankerIcon(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 99 99"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M28 29.5h31.5c4 0 7.2 3.2 7.2 7.2v14.8H24.5V33c0-1.9 1.6-3.5 3.5-3.5Z" />
        <path d="M24.5 35.5h42.2" />
        <path d="M30 29.5v22M61.2 30.1v21.4" opacity=".8" />

        <path d="M41.7 29.5v-3h8v3M45.7 26.5v-2.3" />
        <path d="M22 51.5h46.2v9.8H21.5" />
        <path d="M28 61.3h2.7M46.8 61.3h20" />

        <path d="M66.7 37h9.1c1.7 0 3.2.9 4.1 2.3l7.7 12.1c.5.8.8 1.8.8 2.8v7.1h-5" />
        <path d="M66.7 61.3h2.4V37" />
        <path d="M73 40.7h3.1l5.8 9.1H73v-9.1Z" />
        <path d="M88.4 54.2h-4.8" />

        <circle cx="38.7" cy="62.2" r="7.2" />
        <circle cx="38.7" cy="62.2" r="2.5" />
        <circle cx="76.3" cy="62.2" r="7.2" />
        <circle cx="76.3" cy="62.2" r="2.5" />

        <path d="M20.5 41.3h8M17.5 46.2h11" />
        <path d="M53 40.4v6.2M50 43.5h6" />
      </g>
    </svg>
  );
}