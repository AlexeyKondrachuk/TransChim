import type { SVGProps } from "react";

export default function WarehousePickupIcon(
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
        {/* Здание склада */}
        <path d="M14 78V36l35-20 35 20v42" />
        <path d="M9 39l40-23 40 23" />
        <path d="M21 78V42h56v36" />

        {/* Ворота */}
        <path d="M32 78V49h34v29" />
        <path d="M32 56h34M32 63h34" />
        <path d="M32 70h34" />

        {/* Тележка для баллонов */}
        <path d="M42 73h12" />
        <path d="M42 73l-4-17" />
        <path d="M38 56l-2-7h5" />

        {/* Баллон на тележке */}
        <path d="M45 49v-3h7v3" />
        <rect x="43" y="49" width="11" height="22" rx="5" />

        {/* Колёса тележки */}
        <circle cx="42" cy="76" r="3" />
        <circle cx="55" cy="76" r="3" />

        {/* Указатель самовывоза */}
        <path d="M72 51h14" />
        <path d="M81 46l5 5-5 5" />

        {/* Основание */}
        <path d="M10 78h79" />
      </g>
    </svg>
  );
}