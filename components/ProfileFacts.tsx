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

function BorderedBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/30 text-[11px] font-medium text-white/70 tracking-wide">
      {text}
    </span>
  );
}

type Fact = {
  icon: React.ElementType;
  label: string;
  value: string;
  badge?: string;
};

const facts: Fact[] = [
  { icon: User, label: "Name", value: "Abdulakhad Turgunaliev" },
  { icon: Calendar, label: "Born", value: "September 2, 2005" },
  { icon: Calendar, label: "Age", value: `${calcAge("2005-09-02")}, "September 2, 2005"` },
  { icon: MapPin, label: "Location", value: "International" },
  { icon: Briefcase, label: "Occupation", value: "Public Area Attendant", badge: "Four Seasons Hotel" },
  { icon: Star, label: "Known for", value: "Building websites & applications for businesses" },
  { icon: Bike, label: "Business", value: "E-bike Rental (Poland)", badge: "International Business" },
  { icon: Building2, label: "Experience", value: "Four Seasons Hotel (since Feb 2025)" },
  { icon: Lightbulb, label: "Interests", value: "AI, Entrepreneurship, Technology" },
];

export default function ProfileFacts() {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/[0.03] p-6 md:p-8">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
        Profile Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {facts.map(({ icon: Icon, label, value, badge }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
              <Icon className="w-4 h-4 text-slate-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-medium mb-0.5">{label}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm text-slate-200 font-semibold leading-snug">{value}</p>
                {badge && <BorderedBadge text={badge} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
