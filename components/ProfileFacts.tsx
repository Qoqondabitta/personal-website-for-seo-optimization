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

const facts = [
  { icon: User, label: "Name", value: "Abdulakhad Turgunaliev" },
  { icon: Calendar, label: "Born", value: "September 2, 2005" },
  { icon: Calendar, label: "Age", value: `${calcAge("2005-09-02")}` },
  { icon: MapPin, label: "Location", value: "Toronto, Canada" },
  { icon: Briefcase, label: "Occupation", value: "Entrepreneur, Full-Stack Developer" },
  { icon: Star, label: "Known for", value: "Building websites & applications for businesses" },
  { icon: Bike, label: "Business", value: "E-bike rental service (Poland)" },
  { icon: Building2, label: "Experience", value: "Four Seasons Hotel Toronto (since Feb 2025)" },
  { icon: Lightbulb, label: "Interests", value: "AI, Business Development, Technology" },
];

export default function ProfileFacts() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8 border border-white/8 shadow-2xl">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
        Profile Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3 group">
            <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Icon className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{label}</p>
              <p className="text-sm text-slate-200 font-semibold leading-snug">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
