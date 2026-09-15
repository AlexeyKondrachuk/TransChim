import type { SVGProps } from "react";

type LogoVariant = "default" | "white";

type LogoSize = "xs" | "sm" | "md" | "lg";

const LOGO_WIDTHS: Record<LogoSize, number> = {
  xs: 210,
  sm: 260,
  md: 360,
  lg: 480,
};

type TranshimLogoProps = Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height"
> & {
  size?: LogoSize;
  variant?: LogoVariant;
  ariaLabel?: string | null;
};



export default function TranshimLogo({
  size = "md",
  variant = "default",
  ariaLabel = "ТрансХим — технические газы",
  className,
  ...props
}: TranshimLogoProps) {
  const isWhite = variant === "white";

  const wordmarkColor = isWhite ? "#ffffff" : "#0a3a76";
  const subtitleColor = isWhite ? "#cdefff" : "#547080";

  return (
    <svg
      viewBox="0 0 1200 300"
      width={LOGO_WIDTHS[size]}
      height="auto"
      fill="none"
      className={className}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel ?? undefined}
      aria-hidden={ariaLabel ? undefined : true}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient
          id="transhim-logo-blue"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(101 76) rotate(51) scale(172)"
        >
          <stop stopColor="#7de7ff" />
          <stop offset="0.28" stopColor="#14b9f1" />
          <stop offset="0.72" stopColor="#0783d0" />
          <stop offset="1" stopColor="#035ba8" />
        </radialGradient>
      </defs>

      {/* Соединения молекулы */}
      <g
        stroke={isWhite ? "#ddf7ff" : "#a8d8ed"}
        strokeWidth="20"
        strokeLinecap="round"
      >
        <path d="M132 142 78 75" />
        <path d="M122 156 54 157" />
        <path d="M137 174 85 234" />
        <path d="M167 137 216 91" />
        <path d="M174 178 231 226" />
      </g>

      {/* Молекула */}
      <g
        fill="url(#transhim-logo-blue)"
        stroke="#54d8ff"
        strokeWidth="3"
      >
        <circle cx="150" cy="158" r="58" />
        <circle cx="69" cy="64" r="35" />
        <circle cx="40" cy="157" r="24" />
        <circle cx="73" cy="247" r="35" />
        <circle cx="229" cy="78" r="25" />
        <circle cx="245" cy="238" r="36" />
      </g>

      {/* Блики */}
      <g fill="#ffffff" opacity="0.72">
        <ellipse
          cx="127"
          cy="130"
          rx="17"
          ry="10"
          transform="rotate(-30 127 130)"
        />
        <ellipse
          cx="57"
          cy="48"
          rx="10"
          ry="6"
          transform="rotate(-30 57 48)"
        />
        <ellipse
          cx="218"
          cy="67"
          rx="7"
          ry="4"
          transform="rotate(-30 218 67)"
        />
      </g>

      {/* Название */}
      <text
        x="320"
        y="157"
        fill={wordmarkColor}
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="148"
        fontWeight="800"
        letterSpacing="-7"
      >
        ТрансХим
      </text>

      {/* Подпись */}
      <text
        x="320"
        y="232"
        fill={subtitleColor}
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="76"
        fontWeight="700"
        textLength="820"
        lengthAdjust="spacingAndGlyphs"
      >
        технические газы
      </text>
    </svg>
  );
}