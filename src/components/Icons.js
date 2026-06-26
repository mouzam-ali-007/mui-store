import React from "react";

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
};

const Icon = ({ children, className = "" }) => (
  <svg className={className} {...iconProps}>
    {children}
  </svg>
);

export const SearchIcon = ({ className }) => (
  <Icon className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const BagIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M6 8h12l-1.2 11H7.2L6 8Z" />
    <path d="M9 9V7a3 3 0 0 1 6 0v2" />
  </Icon>
);

export const MenuIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Icon>
);

export const ChevronDownIcon = ({ className }) => (
  <Icon className={className}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const ChevronUpIcon = ({ className }) => (
  <Icon className={className}>
    <path d="m18 15-6-6-6 6" />
  </Icon>
);

export const CloseIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M6 6 18 18" />
    <path d="M18 6 6 18" />
  </Icon>
);

export const PlusIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Icon>
);

export const MinusIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M5 12h14" />
  </Icon>
);

export const ArrowLeftIcon = ({ className }) => (
  <Icon className={className}>
    <path d="m11 18-6-6 6-6" />
    <path d="M5 12h14" />
  </Icon>
);

export const FilterIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 7h16" />
    <path d="M7 12h10" />
    <path d="M10 17h4" />
  </Icon>
);
