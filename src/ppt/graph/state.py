# Copyright (c) 2025 Peter Liu
# SPDX-License-Identifier: MIT

from typing import Optional

from langgraph.graph import MessagesState


class PPTState(MessagesState):
    """State for the ppt generation."""

    # Input
    input: str = ""

    # Output
    generated_file_path: str = ""

    # Assets
    ppt_content: str = ""
    ppt_file_path: str = ""
