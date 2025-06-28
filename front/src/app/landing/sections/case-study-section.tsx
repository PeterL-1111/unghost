// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { MessageSquare, TrendingUp, Users, Heart, Briefcase, Handshake, Target, UserCheck, Ghost, Zap } from "lucide-react";

import { cn } from "~/lib/utils";

import { SectionHeader } from "../components/section-header";

const caseStudies = [
  {
    id: "tech-startup-founder-outreach",
    icon: TrendingUp,
    title: "YC Founder Partnership: From Ghost to Golden Opportunity",
    description:
      "Used AI research to discover shared interests in AI ethics. Crafted personalized message that led to 30-minute discovery call and ongoing $250K partnership discussions.",
  },
  {
    id: "sales-director-enterprise-deal",
    icon: Briefcase,
    title: "Enterprise Sale: Unghosted LinkedIn Research Wins $50K Deal",
    description:
      "Analyzed recent speaking engagements and company announcements to create highly personalized outreach. Result: enterprise software evaluation worth $50K ARR.",
  },
  {
    id: "investor-pitch-connection",
    icon: Target,
    title: "Series A Investor: Alumni Connection Breaks Through",
    description:
      "AI uncovered shared university background and mutual connections. Strategic outreach secured 15-minute pitch that became lead investor conversation.",
  },
  {
    id: "conference-speaker-collaboration",
    icon: Users,
    title: "Keynote Speaker: Book Research Lands Major Event",
    description:
      "Deep analysis of speaker's latest book and podcast appearances created compelling event invitation. Secured confirmed keynote for 1,000+ attendee conference.",
  },
  {
    id: "customer-success-testimonial",
    icon: Heart,
    title: "Cold Prospect → Brand Advocate: Empathy Wins",
    description:
      "Used AI to identify shared industry challenges and craft empathetic messaging. Result: customer testimonial, case study, and active referral program participation.",
  },
  {
    id: "recruitment-talent-acquisition",
    icon: UserCheck,
    title: "Top Engineering Talent: GitHub Analysis Secures Hire",
    description:
      "Analyzed open source contributions and technical interests for personalized recruiting message. Successfully hired senior engineer from FAANG competitor.",
  },
  {
    id: "media-influencer-partnership",
    icon: MessageSquare,
    title: "Influencer Partnership: Content Analysis Drives Authentic Collab",
    description:
      "AI studied 6 months of content themes and audience engagement patterns. Proposed brand partnership that achieved 2.3M impressions and 8.7% engagement rate.",
  },
  {
    id: "strategic-vendor-negotiation",
    icon: Handshake,
    title: "Vendor Renegotiation: Relationship Intel Saves 20%",
    description:
      "LinkedIn activity analysis revealed common ground with procurement director. Built rapport that led to 20% cost reduction and improved contract terms.",
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
      // Dark theme styles with ghost theme accents
      "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 border border-slate-700/50",
      "shadow-xl shadow-indigo-500/10 backdrop-blur-sm",
      // Enhanced hover effects
      "transition-all duration-300 ease-in-out hover:shadow-indigo-500/20 hover:border-indigo-500/30 hover:scale-105",
      "hover:bg-gradient-to-br hover:from-slate-800 hover:via-slate-700 hover:to-indigo-800",
      "w-full h-full",
      className,
    )}
  >
    {/* Subtle ghost pattern overlay */}
    <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwQzE1IDEwIDEwIDE1IDEwIDIwVjMwTDE1IDI1TDIwIDMwTDI1IDI1TDMwIDMwVjIwQzMwIDE1IDI1IDEwIDIwIDEwWiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTgiIHI9IjIiIGZpbGw9IiNmZmYiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSIxOCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K')] bg-repeat" />
    
    <div className="z-10 flex transform-gpu flex-col gap-1 p-6 relative">
      <Icon className="h-12 w-12 origin-left transform-gpu text-indigo-400 transition-all duration-300 ease-in-out group-hover:text-indigo-300 group-hover:scale-110" />
      <h3 className="text-xl font-semibold text-slate-100 group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="max-w-lg text-slate-300 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed">
        {description}
      </p>
      
      {/* Success indicator */}
      <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <Zap className="h-4 w-4" />
        <span className="font-medium">Unghosted ✓</span>
      </div>
    </div>
  </div>
);

export function CaseStudySection() {
  return (
    <section className="relative container hidden flex-col items-center justify-center md:flex">
      <SectionHeader
        anchor="success-stories"
        title="Real Unghosting Wins"
        description="From ignored messages to game-changing conversations. See how AI-powered personalization transforms cold outreach."
      />
      
      {/* Stats bar */}
      <div className="mb-16 grid grid-cols-3 gap-8 w-full max-w-3xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-400">3x</div>
          <div className="text-slate-400 text-sm">Higher Response Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-400">85%</div>
          <div className="text-slate-400 text-sm">Message Personalization</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-cyan-400">2min</div>
          <div className="text-slate-400 text-sm">Average Setup Time</div>
        </div>
      </div>
      
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
      
      {/* Call to action */}
      <div className="mt-16 text-center">
        <p className="text-lg text-slate-300 mb-4">
          Ready to stop getting ghosted?
        </p>
        <div className="flex items-center justify-center gap-2 text-indigo-300">
          <Ghost className="h-5 w-5" />
          <span className="text-sm font-medium">Join thousands who've unghosted their outreach</span>
        </div>
      </div>
    </section>
  );
}
