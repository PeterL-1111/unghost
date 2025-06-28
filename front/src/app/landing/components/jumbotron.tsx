// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Github,
  MessageCircle,
  Target,
  Users,
  Zap,
  Sparkles,
  Ghost,
  Search,
  Brain,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AuroraText } from "~/components/magicui/aurora-text";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { cn } from "~/lib/utils";

export function Jumbotron() {
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
  const [isHoveringSecondary, setIsHoveringSecondary] = useState(false);

  return (
    <section className="landing-hero relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 min-h-screen">
      {/* Enhanced Background Pattern with Ghost Theme */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Floating Ghost Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 text-indigo-200/10"
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Ghost className="h-24 w-24" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-1/3 text-purple-200/10"
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Ghost className="h-32 w-32" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/3 text-indigo-200/10"
          animate={{ y: [-10, 10, -10], rotate: [0, 3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Ghost className="h-20 w-20" />
        </motion.div>
      </div>
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),rgba(139,92,246,0.08),transparent_80%)]" />

      {/* Main Content Container */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-20 md:px-8 lg:px-12">
        {/* Hero Content */}
        <div className="mx-auto max-w-6xl text-center">
          {/* Main Heading with Ghost Theme */}
          <motion.div 
            className="space-y-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Ghost Icon with Animation */}
            <motion.div
              className="mx-auto mb-8 flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <motion.div
                className="relative"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Ghost className="h-24 w-24 text-indigo-300/80" />
                <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-xl" />
              </motion.div>
            </motion.div>

            <h1 className="text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl">
              Stop Getting
              <AuroraText className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text pt-6">
                Ghosted
              </AuroraText>
            </h1>

            {/* Enhanced Subtitle with Unghost Theme */}
            <div className="mx-auto mt-16 max-w-4xl space-y-8">
              <p className="text-2xl font-semibold text-slate-100 md:text-3xl lg:text-4xl leading-tight">
                Meet{" "}
                <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent font-bold">
                  Unghost Agent
                </span>
                , your AI-powered personalized outreach assistant.
              </p>
              <p className="mx-auto max-w-3xl text-lg text-slate-200 md:text-xl lg:text-2xl leading-relaxed">
                Transform cold outreach from ignored messages to irresistible conversations. 
                Create high-converting outreach with deep prospect research, intelligent persona analysis, 
                and strategic message crafting that breaks through the noise.
              </p>
              
              {/* Inspiration Credit */}
              <motion.div 
                className="mx-auto max-w-3xl mt-8 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <p className="text-sm text-slate-300 italic">
                  💡 Inspired by{" "}
                  <a 
                    href="https://x.com/bhavye_khetan/status/1929379775602373012" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-300 hover:text-indigo-200 underline decoration-indigo-300/50 hover:decoration-indigo-200 transition-colors"
                  >
                    Bhavye Khetan's insight
                  </a>{" "}
                  about AI's potential for personalized outreach and{" "}
                  <a 
                    href="https://x.com/im_roy_lee/status/1936138361011585190" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 underline decoration-purple-300/50 hover:decoration-purple-200 transition-colors"
                  >
                    Roy Lee's demonstration
                  </a>{" "}
                  of Cluely's innovative AI-powered hack assistance
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Action Buttons with Micro-interactions */}
          <motion.div 
            className="flex flex-col items-center justify-center gap-8 pt-16 sm:flex-row"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              onHoverStart={() => setIsHoveringPrimary(true)}
              onHoverEnd={() => setIsHoveringPrimary(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-70 blur-sm"
                animate={{
                  opacity: isHoveringPrimary ? 0.9 : 0.4,
                  scale: isHoveringPrimary ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              
              <Button
                className="group relative h-16 transform rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 px-14 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/40 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                asChild
              >
                <Link
                  target={
                    env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY ? "_blank" : undefined
                  }
                  href={
                    env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY
                      ? "https://github.com/PeterL-1111/deer-flow-fork"
                      : "/chat"
                  }
                  className="flex items-center gap-4"
                >
                  <motion.div
                    animate={isHoveringPrimary ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                  Start Unghosting Now
                  <motion.div
                    animate={isHoveringPrimary ? { x: 4 } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="relative"
              onHoverStart={() => setIsHoveringSecondary(true)}
              onHoverEnd={() => setIsHoveringSecondary(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle glow for secondary button */}
              <motion.div
                className="absolute -inset-0.5 rounded-2xl bg-slate-500/30 blur-sm"
                animate={{
                  opacity: isHoveringSecondary ? 0.8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              
              <Button
                className="group relative h-16 transform rounded-2xl border-2 border-slate-600/80 bg-slate-800/60 px-14 text-lg font-bold text-slate-200 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-500/80 hover:bg-slate-700/70 hover:text-white hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-500/50"
                variant="outline"
                asChild
              >
                <Link
                  href="https://github.com/PeterL-1111/deer-flow-fork"
                  target="_blank"
                  className="flex items-center gap-4"
                >
                  <motion.div
                    animate={isHoveringSecondary ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Github className="h-6 w-6" />
                  </motion.div>
                  View on GitHub
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Core Features Grid with Ghost Theme */}
          <motion.div 
            className="pt-28"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <h2 className="mb-16 text-3xl font-bold text-slate-100 md:text-4xl lg:text-5xl">
              How We Help You Unghost
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Search className="h-12 w-12 text-indigo-400" />,
                  title: "Deep Research",
                  description: "AI-powered prospect intelligence that finds hidden connection points and conversation starters",
                  accentColor: "indigo" as const,
                  delay: 0.1,
                },
                {
                  icon: <Brain className="h-12 w-12 text-purple-400" />,
                  title: "Smart Personalization", 
                  description: "Behavioral analysis and communication style mapping for authentic, tailored messaging",
                  accentColor: "purple" as const,
                  delay: 0.2,
                },
                {
                  icon: <MessageCircle className="h-12 w-12 text-violet-400" />,
                  title: "Irresistible Messages",
                  description: "AI-crafted outreach that demonstrates genuine research and drives meaningful responses",
                  accentColor: "violet" as const,
                  delay: 0.3,
                },
                {
                  icon: <TrendingUp className="h-12 w-12 text-cyan-400" />,
                  title: "High Response Rates",
                  description: "Transform your outreach from ghosted to replied with data-driven message optimization",
                  accentColor: "cyan" as const,
                  delay: 0.4,
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + feature.delay, ease: "easeOut" }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    accentColor={feature.accentColor}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="pt-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-400 md:text-5xl">3x</div>
                <div className="text-slate-300 mt-2">Higher Response Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 md:text-5xl">85%</div>
                <div className="text-slate-300 mt-2">Personalization Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 md:text-5xl">2min</div>
                <div className="text-slate-300 mt-2">Average Setup Time</div>
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            className="pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <p className="text-slate-400 text-lg">
              Built by{" "}
              <a 
                href="https://twitter.com/heypeter1111" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-300 hover:text-indigo-200 font-semibold transition-colors"
              >
                @heypeter1111
              </a>
              {" "}• Open Source • MIT Licensed
            </p>
          </motion.div>
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

