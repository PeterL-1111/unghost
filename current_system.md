# Current System Architecture: Agent File System Mapping

This document provides a high-level overview of the key directories and files related to the agentic system within the `DeerFlow` architecture. It serves as a reference for the PersonaForge refactoring effort.

---

### 1. `/src/graph/nodes/` - The Agent Core Logic

This is the most critical directory for our work. It contains the individual, runnable Python classes that represent each agent in the system.

-   **`researcher_node.py`**: Contains the logic for the Researcher agent. This will be **heavily modified** to use new MCP tools and produce structured `RecipientPersonaProfile` JSON.
-   **`coder_node.py`**: Contains the logic for the Coder agent. This file will be **renamed and repurposed** into our new `strategizer_node.py`.
-   **`human_feedback_node.py`**: Handles the logic for pausing the workflow and waiting for user input. This will be **enhanced** to present a more comprehensive set of artifacts for review.
-   **`reporter_node.py`**: Responsible for generating the final output. This will be **updated** to synthesize the new `OutreachReport`.

### 2. `/src/prompts/` - The Agent "Soul"

This directory contains the Markdown (`.md`) files that define the personality, instructions, and goals for each LLM-powered agent.

-   **`researcher.md`**: Will be **rewritten** to instruct the agent to act as a "Strategic Persona Intelligence Analyst."
-   **`coder.md`**: Will be **replaced** by `strategizer.md`.
-   **`human_feedback.md`**: Will be **updated** to format the new data artifacts (persona, strategy, message) for user review.
-   **`reporter.md`**: Will be **refined** to create the final `OutreachReport`.
-   **New Prompts to be Created**: `strategizer.md` and `message_composer.md`.

### 3. `/src/graph/builder.py` - The Orchestrator

This file acts as the "brain" of the system, defining how the agent nodes are connected and how data flows between them. We will **modify this file significantly** to wire up the new `Strategizer` and `MessageComposer` agents and manage the new workflow states.

### 4. `/src/tools/` & `/src/mcp_tools/` - The Agent Toolkit

These directories contain the tools that agents can use to interact with the outside world.

-   **`/src/tools/`**: Contains existing, general-purpose tools like `tavily_search/` and `crawl.py` that we will continue to use.
-   **`/src/mcp_tools/`**: This directory will house all the **new, specialized tools** we build for PersonaForge, such as `linkedin_profile_scraper.py` and `social_media_activity_tool.py`.

### 5. `/src/schemas/` - The Data Contracts (To Be Created)

This new directory will be created as part of **Task 1**.

-   **`outreach.py`**: This new file will contain the foundational Pydantic models (`RecipientPersonaProfile`, `OutreachStrategy`, `OutreachReport`) that define the structured data passed between all agents. It is the backbone of the new system. 