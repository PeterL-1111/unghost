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
      <h3 className="mb-2 text-center text-3xl font-medium">
        👋 Hello, there!
      </h3>
      <div className="text-muted-foreground px-4 text-center text-lg">
        Welcome to{" "}
        <a
          href="https://github.com/PeterL-1111/deer-flow-fork"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          👻 Unghost Agent
        </a>
        , an AI-powered personalized outreach assistant built on cutting-edge language models, helps
        you generate leads, research prospects, and create personalized messages.
      </div>
    </motion.div>
  );
}
