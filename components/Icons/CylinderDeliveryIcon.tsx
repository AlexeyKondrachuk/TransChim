import type { SVGProps } from "react";

export default function CylinderDeliveryIcon(
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
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Кузов */}
        <path d="M15 37h49v29H15z" />
        <path d="M15 61h49" />

        {/* Баллоны */}
        <path d="M23 33v-3h8v3" />
        <rect x="21" y="34" width="12" height="27" rx="5" />

        <path d="M38 33v-3h8v3" />
        <rect x="36" y="34" width="12" height="27" rx="5" />

        <path d="M53 33v-3h7v3" />
        <path d="M51 39a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v22H51z" />

        {/* Кабина */}
        <path d="M64 43h11c2 0 3.8 1 4.8 2.7L87 57.5V66H64z" />
        <path d="M70 47h5l5.8 9H70z" />
        <path d="M87 60h-5" />

        {/* Рама */}
        <path d="M12 66h18M45 66h25M84 66h4" />

        {/* Колёса */}
        <circle cx="37" cy="67" r="8" />
        <circle cx="37" cy="67" r="3" />
        <circle cx="77" cy="67" r="8" />
        <circle cx="77" cy="67" r="3" />

        {/* Линии движения */}
        <path d="M10 43h7M7 49h10M11 55h6" />
      </g>
    </svg>
  );
}