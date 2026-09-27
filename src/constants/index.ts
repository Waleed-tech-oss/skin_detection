export const APP_CONFIG = {
  name: "AI Skin Analysis & Recommendation",
  shortName: "DermaAI",
  tagline: "AI-powered skin analysis and personalized skincare recommendations.",
  description:
    "AI-Based Facial Skin Analysis and Personalized Beauty Product Recommendation System",
  version: "0.1.0",
  phase: "Phase 1 - Frontend Foundation",
};

export interface NavRoute {
  title: string;
  href: string;
  icon: string;
}

export const MAIN_NAV_ITEMS: NavRoute[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "New Analysis",
    href: "/analysis",
    icon: "ScanFace",
  },
  {
    title: "My Analysis",
    href: "/skin-profile",
    icon: "Fingerprint",
  },
  {
    title: "Recommendations",
    href: "/recommendations",
    icon: "Sparkles",
  },
  {
    title: "Routine",
    href: "/routine",
    icon: "CalendarCheck",
  },
  {
    title: "History",
    href: "/history",
    icon: "History",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "User",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
  },
];

export const THEME_COLORS = {
  background: "#F6F8F3",
  surface: "#FFFFFF",
  primarySage: "#607D67",
  darkSage: "#365344",
  lightSage: "#DDE8DC",
  veryLightSage: "#EEF4EC",
  warmBeige: "#E7D9C8",
  primaryText: "#1F2923",
  secondaryText: "#68736C",
  border: "#E1E7DF",
  success: "#4D8B6A",
  warning: "#D69A5F",
} as const;
