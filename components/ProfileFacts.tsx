"use client";

import {
  User,
  Calendar,
  MapPin,
  Briefcase,
  Star,
  Bike,
  Building2,
  Lightbulb,
} from "lucide-react";

function calcAge(birthdate: string): number {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

type Badge = { text: string; variant: "primary" | "global" };

type Fact = {
  icon: React.ElementType;
  label: string;
  value: string;
  badge?: Badge;
  highlight?: boolean;
};

const facts: Fact[] = [
  { icon: User, label: "Name", value: "Abdulakhad Turgunaliev" },
  { icon: Calendar, label: "Born", value: "September 2, 2005" },
  { icon: Calendar, label: "Age", value: `${calcAge("2005-09-02")}` },
  { icon: MapPin, label: "Location", value: "Toronto, Canada" },
  {
    icon: Briefcase,
    label: "Occupation",
    value: "Entrepreneur, Full-Stack Developer",
    badge: { text: "Primary", variant: "primary" },
    highlight: true,
  },
  { icon: Star, label: "Known for", value: "Building websites & applications for businesses" },
  {
    icon: Bike,
    label: "Business",
    value: "International E-bike Rental (Poland)",
    badge: { text: "Global", variant: "global" },
    highlight: true,
  },
  { icon: Building2, label: "Experience", value: "Four Seasons Hotel Toronto (since Feb 2025)" },
  { icon: Lightbulb, label: "Interests", value: "AI, Business Development, Technology" },
];

const badgeStyles: Record<Badge["variant"], string> = {
  primary:
    "bg-blue-500/15 border border-blue-500/30 text-blue-300",
  global:
    "bg-violet-500/15 border border-violet-500/30 text-violet-300",
};

export default function ProfileFacts() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8 border border-white/8 shadow-2xl">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
        Profile Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facts.map(({ icon: Icon, label, value, badge, highlight }) => (
          <div
            key={label}
            className={`flex items-start gap-3 group rounded-xl p-2 -m-2 transition-all duration-200 ${
              highlight
                ? "hover:bg-white/[0.04] hover:scale-[1.02]"
                : "hover:bg-white/[0.02]"
            }`}
          >
            <div
              className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                highlight
                  ? "bg-blue-500/15 border border-blue-500/25 group-hover:bg-blue-500/25"
                  : "bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20"
              }`}
            >
              <Icon className={`w-4 h-4 ${highlight ? "text-blue-300" : "text-blue-400"}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-medium">{label}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <p
                  className={`text-sm leading-snug ${
                    highlight
                      ? "text-white font-bold"
                      : "text-slate-200 font-semibold"
                  }`}
                >
                  {value}
                </p>
                {badge && (
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide ${badgeStyles[badge.variant]}`}
                  >
                    {badge.text}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
