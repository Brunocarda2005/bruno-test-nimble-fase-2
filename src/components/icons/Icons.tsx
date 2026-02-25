/**
 * Shared SVG icon components.
 * All icons accept standard SVGProps for flexibility.
 * Sized at 16×16 by default; override via width/height props.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const EmailIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M1 5.5l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const AlertIcon = (props: IconProps) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...props}>
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 4.5v4M8 10.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const LinkIcon = (props: IconProps) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7.5 3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

export const HashIcon = (props: IconProps) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M3 6h10M3 10h10M6.5 2l-1 12M10.5 2l-1 12"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M3.5 8l3 3 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CopyIcon = (props: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...props}>
    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const CopiedIcon = (props: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M3 8l4 4 6-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
