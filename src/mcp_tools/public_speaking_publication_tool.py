# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT

import json
import os
import sys
from typing import Dict, List, Optional, Any

from mcp.server.fastmcp import FastMCP
from mcp.types import Tool


# Initialize the MCP server
mcp = FastMCP("Public Speaking Publication Tool")


@mcp.tool("public_speaking_publication_tracker")
def public_speaking_publication_tracker(
    person_name: str,
    activity_type: str = "all"
) -> Dict[str, Any]:
    """
    Tracks public speaking engagements, publications, and thought leadership activities.
    
    Args:
        person_name: Full name of the person to research
        activity_type: Type of activity to track (speaking, publications, all)
    
    Returns:
        A dictionary containing public activity information
    """
    # For demo purposes, return mock data
    # In production, this would use proper APIs or databases
    mock_data = _get_mock_activity_data(person_name, activity_type)
    
    return mock_data


def _get_mock_activity_data(person_name: str, activity_type: str) -> Dict[str, Any]:
    """Generate mock public activity data for demonstration purposes."""
    # This is a simplified mock implementation
    # In production, this would be replaced with actual API calls
    
    # Default mock data
    mock_data = {
        "speaking_engagements": [
            {
                "event": "TechConf 2024",
                "title": "The Future of AI in Product Management",
                "date": "October 2024",
                "location": "San Francisco, CA",
                "audience_size": "500+",
                "video_url": "https://youtube.com/example-video"
            },
            {
                "event": "ProductCon",
                "title": "Building AI-First Product Teams",
                "date": "September 2024",
                "location": "Virtual",
                "audience_size": "1000+",
                "video_url": "https://youtube.com/example-video-2"
            }
        ],
        "publications": [
            {
                "title": "The AI Product Manager's Playbook",
                "publication": "Harvard Business Review",
                "date": "November 2024",
                "url": "https://hbr.org/example-article",
                "citations": 45
            },
            {
                "title": "5 Lessons from Scaling AI Product Teams",
                "publication": "Medium",
                "date": "August 2024",
                "url": "https://medium.com/example-article",
                "views": "12K"
            },
            {
                "title": "Ethics in AI Product Development",
                "publication": "TechCrunch",
                "date": "June 2024",
                "url": "https://techcrunch.com/example-article",
                "shares": 234
            }
        ],
        "podcast_appearances": [
            {
                "podcast": "The Product Podcast",
                "episode": "AI and the Future of Product",
                "date": "September 2024",
                "url": "https://podcast.com/example-episode",
                "downloads": "50K+"
            },
            {
                "podcast": "Tech Leaders Talk",
                "episode": "Building Ethical AI Products",
                "date": "July 2024",
                "url": "https://podcast.com/example-episode-2",
                "downloads": "30K+"
            }
        ],
        "thought_leadership_metrics": {
            "total_speaking_events": 8,
            "total_publications": 15,
            "total_podcast_appearances": 6,
            "estimated_reach": "100K+",
            "expertise_areas": ["AI/ML Product Management", "Team Leadership", "Product Strategy", "AI Ethics"]
        },
        "upcoming_events": [
            {
                "event": "AI Product Summit 2025",
                "title": "Keynote: Responsible AI Product Development",
                "date": "March 2025",
                "location": "Austin, TX"
            }
        ]
    }
    
    # Filter based on activity type
    if activity_type == "speaking":
        mock_data = {k: v for k, v in mock_data.items() if k in ["speaking_engagements", "upcoming_events", "thought_leadership_metrics"]}
    elif activity_type == "publications":
        mock_data = {k: v for k, v in mock_data.items() if k in ["publications", "podcast_appearances", "thought_leadership_metrics"]}
    
    return mock_data


def main():
    """Run the MCP server with the Public Speaking Publication tool."""
    mcp.run()


if __name__ == "__main__":
    main()