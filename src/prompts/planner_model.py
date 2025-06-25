# Copyright (c) 2025 Peter Liu
# SPDX-License-Identifier: MIT

from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class StepType(str, Enum):
    RESEARCH = "research"
    PROCESSING = "processing"
    PERSONA_RESEARCH = "persona_research"
    STRATEGY_FORMULATION = "strategy_formulation"
    MESSAGE_DRAFTING = "message_drafting"


class Step(BaseModel):
    need_search: bool = Field(..., description="Must be explicitly set for each step")
    title: str
    description: str = Field(..., description="Specify exactly what data to collect")
    step_type: StepType = Field(..., description="Indicates the nature of the step")
    execution_res: Optional[str] = Field(
        default=None, description="The Step execution result"
    )


class Plan(BaseModel):
    locale: str = Field(
        ..., description="e.g. 'en-US' or 'zh-CN', based on the user's language"
    )
    has_enough_context: bool
    thought: str
    title: str
    steps: List[Step] = Field(
        default_factory=list,
        description="Research & Processing steps to get more context",
    )

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "has_enough_context": False,
                    "thought": (
                        "To craft an effective outreach message to Sarah Johnson, we need to gather comprehensive information about her professional background, interests, and communication style."
                    ),
                    "title": "Personalized Outreach Plan for Sarah Johnson",
                    "steps": [
                        {
                            "need_search": True,
                            "title": "Professional Background Research",
                            "description": (
                                "Gather detailed information about Sarah Johnson's current role, company, career trajectory, and professional achievements."
                            ),
                            "step_type": "persona_research",
                        }
                    ],
                }
            ]
        }