// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { BadgeInfo } from "lucide-react";

import { Markdown } from "~/components/unghost-agent/markdown";

import about from "./about.md";
import type { Tab } from "./types";

export const AboutTab: Tab = () => {
  return <Markdown>{about}</Markdown>;
};
AboutTab.icon = BadgeInfo;
AboutTab.displayName = "About";
