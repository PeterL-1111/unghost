// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { motion } from "framer-motion";

import { cn } from "~/lib/utils";

export function Welcome({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("flex flex-col", className)}
      style={{ transition: "all 0.2s ease-out" }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h3 className="mb-4 text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        👋 Hello, there!
      </h3>
      <div className="text-muted-foreground px-4 text-center text-lg leading-relaxed">
        Welcome to{" "}
        <a
          href="https://github.com/PeterL-1111/deer-flow-fork"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline transition-all duration-200 hover:scale-105 inline-block"
        >
          👻 Unghost Agent
        </a>
        , an AI-powered personalized outreach assistant built on cutting-edge language models that helps
        you generate leads, research prospects, and create personalized messages with intelligent automation.
      </div>
    </motion.div>
  );
}
