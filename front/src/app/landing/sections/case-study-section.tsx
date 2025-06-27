// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { MessageSquare, TrendingUp, Users, Heart, Briefcase, Handshake, Target, UserCheck } from "lucide-react";

import { cn } from "~/lib/utils";

import { SectionHeader } from "../components/section-header";

const caseStudies = [
  {
    id: "tech-startup-founder-outreach",
    icon: TrendingUp,
    title: "Connected with YC startup founder for partnership",
    description:
      "Leveraged shared interests in AI ethics to craft a personalized message that resulted in a 30-minute discovery call and ongoing partnership discussions.",
  },
  {
    id: "sales-director-enterprise-deal",
    icon: Briefcase,
    title: "Secured enterprise sales meeting through LinkedIn research",
    description:
      "Used public speaking analysis and recent company announcements to personalize outreach, leading to a $50K enterprise software evaluation.",
  },
  {
    id: "investor-pitch-connection",
    icon: Target,
    title: "Got investor meeting using mutual connection strategy",
    description:
      "Identified shared university background and mutual connections to secure a 15-minute pitch meeting with a Series A investor.",
  },
  {
    id: "conference-speaker-collaboration",
    icon: Users,
    title: "Landed keynote speaker for company event",
    description:
      "Researched speaker's latest book and podcast appearances to craft compelling event invitation that resulted in confirmed keynote agreement.",
  },
  {
    id: "customer-success-testimonial",
    icon: Heart,
    title: "Turned cold prospect into brand advocate",
    description:
      "Used empathetic messaging around shared industry challenges to build trust, resulting in a customer testimonial and referral program participation.",
  },
  {
    id: "recruitment-talent-acquisition",
    icon: UserCheck,
    title: "Recruited top engineering talent from competitor",
    description:
      "Analyzed GitHub contributions and open source projects to personalize talent acquisition message, leading to successful hire.",
  },
  {
    id: "media-influencer-partnership",
    icon: MessageSquare,
    title: "Secured influencer partnership through content analysis",
    description:
      "Studied influencer's content themes and audience engagement to propose authentic brand partnership that aligned with their values.",
  },
  {
    id: "strategic-vendor-negotiation",
    icon: Handshake,
    title: "Improved vendor terms through relationship building",
    description:
      "Used LinkedIn activity analysis to find common ground with procurement director, resulting in 20% cost reduction and better contract terms.",
  },
];

// Non-clickable case study card component
const CaseStudyCard = ({
  Icon,
  title,
  description,
  className,
}: {
  Icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}) => (
  <div
    className={cn(
      "non-clickable group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl cursor-default",
      // Dark theme styles
      "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 border border-slate-700/50",
      "shadow-xl shadow-indigo-500/10 backdrop-blur-sm",
      // Hover effects
      "transition-all duration-300 ease-in-out hover:shadow-indigo-500/20 hover:border-indigo-500/30 hover:scale-105",
      "w-full h-full",
      className,
    )}
  >
    <div className="z-10 flex transform-gpu flex-col gap-1 p-6">
      <Icon className="h-12 w-12 origin-left transform-gpu text-indigo-400 transition-all duration-300 ease-in-out group-hover:text-indigo-300" />
      <h3 className="text-xl font-semibold text-slate-100 group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="max-w-lg text-slate-300 group-hover:text-slate-200 transition-colors duration-300">{description}</p>
    </div>
  </div>
);

export function CaseStudySection() {
  return (
    <section className="relative container hidden flex-col items-center justify-center md:flex">
      <SectionHeader
        anchor="case-studies"
        title="Success Stories"
        description="Real results from personalized cold outreach campaigns."
      />
      <div className="grid w-3/4 grid-cols-1 gap-2 sm:w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {caseStudies.map((caseStudy) => (
          <div key={caseStudy.title} className="w-full p-2">
            <CaseStudyCard
              Icon={caseStudy.icon}
              title={caseStudy.title}
              description={caseStudy.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
