// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import {
  ChevronRight,
  Github,
  MessageCircle,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { AuroraText } from "~/components/magicui/aurora-text";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { cn } from "~/lib/utils";

export function Jumbotron() {
  return (
    <section className="landing-hero relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 min-h-screen">
      {/* Refined Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),rgba(139,92,246,0.08),transparent_80%)]" />

      {/* Main Content Container */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-20 md:px-8 lg:px-12">
        {/* Hero Content */}
        <div className="mx-auto max-w-6xl text-center">
          {/* Main Heading */}
          <div className="space-y-10">
            <h1 className="text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl">
              Cold Outreach
              <AuroraText className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text pt-6">
                Reimagined
              </AuroraText>
            </h1>

            {/* Enhanced Subtitle */}
            <div className="mx-auto mt-16 max-w-4xl space-y-8">
              <p className="text-2xl font-semibold text-slate-100 md:text-3xl lg:text-4xl leading-tight">
                Meet{" "}
                <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent font-bold">
                  Unghost Agent
                </span>
                , your AI-powered personalized outreach assistant.
              </p>
              <p className="mx-auto max-w-3xl text-lg text-slate-200 md:text-xl lg:text-2xl leading-relaxed">
                Create high-converting cold messages with deep prospect
                research, intelligent persona analysis, and strategic message
                crafting that breaks through the noise.
              </p>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-8 pt-16 sm:flex-row">
            <Button
              className="group h-16 transform rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 px-14 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              asChild
            >
              <Link
                target={
                  env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY ? "_blank" : undefined
                }
                href={
                  env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY
                    ? "https://github.com/unghost-agent/project-bolt"
                    : "/chat"
                }
                className="flex items-center gap-4"
              >
                Start Creating Outreach
                <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              className="group h-16 transform rounded-2xl border-2 border-slate-600/80 bg-slate-800/60 px-14 text-lg font-bold text-slate-200 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-slate-500/80 hover:bg-slate-700/70 hover:text-white hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-500/50"
              variant="outline"
              asChild
            >
              <Link
                href="https://github.com/unghost-agent/project-bolt"
                target="_blank"
                className="flex items-center gap-4"
              >
                <Github className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                View on GitHub
              </Link>
            </Button>
          </div>

          {/* Enhanced Core Features Grid */}
          <div className="pt-28">
            <h2 className="mb-16 text-3xl font-bold text-slate-100 md:text-4xl lg:text-5xl">
              Core Features
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Target className="h-12 w-12 text-indigo-400" />}
                title="Prospect Intel"
                description="Deep research & behavioral insights for personalized outreach"
                accentColor="indigo"
              />
              <FeatureCard
                icon={<Users className="h-12 w-12 text-purple-400" />}
                title="Persona Analysis"
                description="Communication style mapping and preference detection"
                accentColor="purple"
              />
              <FeatureCard
                icon={<MessageCircle className="h-12 w-12 text-violet-400" />}
                title="Smart Messaging"
                description="AI-crafted personalized outreach drafts that convert"
                accentColor="violet"
              />
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-cyan-400" />}
                title="High Conversion"
                description="Response-optimized content with proven frameworks"
                accentColor="cyan"
              />
            </div>
          </div>

          {/* Enhanced Feature Tags */}
          <div className="mt-20 space-y-6">
            <p className="text-lg font-medium text-slate-400">Powered by advanced AI research tools</p>
            <div className="flex flex-wrap justify-center gap-6">
              <FeatureTag label="LinkedIn Research" color="indigo" />
              <FeatureTag label="Company Intelligence" color="purple" />
              <FeatureTag label="Message Personalization" color="violet" />
              <FeatureTag label="Response Optimization" color="cyan" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: "indigo" | "purple" | "violet" | "cyan";
}

function FeatureCard({
  icon,
  title,
  description,
  accentColor,
}: FeatureCardProps) {
  const accentClasses = {
    indigo: "group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/20",
    purple: "group-hover:border-purple-500/50 group-hover:shadow-purple-500/20",
    violet: "group-hover:border-violet-500/50 group-hover:shadow-violet-500/20",
    cyan: "group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/20",
  };

  return (
    <div className={cn(
      "group transform rounded-3xl border border-slate-700/60 bg-slate-800/40 p-10 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 hover:bg-slate-700/50 hover:shadow-2xl",
      accentClasses[accentColor]
    )}>
      <div className="flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-700/60 transition-all duration-500 group-hover:scale-110 group-hover:bg-slate-600/70">
          {icon}
        </div>
      </div>
      <h4 className="mt-8 text-xl font-bold text-white">{title}</h4>
      <p className="mt-4 text-base text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

interface FeatureTagProps {
  label: string;
  color: "indigo" | "purple" | "violet" | "cyan";
}

function FeatureTag({ label, color }: FeatureTagProps) {
  const colorClasses = {
    indigo: "border-indigo-500/40 bg-indigo-500/15 text-indigo-300 hover:border-indigo-400/60 hover:bg-indigo-500/25",
    purple: "border-purple-500/40 bg-purple-500/15 text-purple-300 hover:border-purple-400/60 hover:bg-purple-500/25",
    violet: "border-violet-500/40 bg-violet-500/15 text-violet-300 hover:border-violet-400/60 hover:bg-violet-500/25",
    cyan: "border-cyan-500/40 bg-cyan-500/15 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/25",
  };

  return (
    <div className={cn(
      "rounded-full border px-8 py-4 text-sm font-semibold transition-all duration-300 hover:scale-105 cursor-default",
      colorClasses[color]
    )}>
      {label}
    </div>
  );
}

