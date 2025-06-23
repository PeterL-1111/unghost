# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT

import json
import os
import sys
from typing import Dict, List, Optional, Any

from mcp import Server, Tool, ToolInvocation, ToolResult


class SocialMediaActivityTool(Tool):
    """Tool for analyzing social media activity."""

    def __init__(self):
        super().__init__(
            name="Social_Media_Activity_Tool",
            description="Analyzes recent public social media activity for insights into interests and communication style.",
            parameters={
                "person_name": {
                    "type": "string",
                    "description": "Full name of the person to search for"
                },
                "platform": {
                    "type": "string",
                    "description": "Social media platform to search (twitter, blog_rss, mastodon, etc.)",
                    "enum": ["twitter", "blog_rss", "mastodon", "all"],
                    "default": "all"
                }
            },
            returns={
                "type": "object",
                "properties": {
                    "recent_posts": {"type": "array"},
                    "frequent_topics": {"type": "array"},
                    "engagement_patterns": {"type": "string"},
                    "shared_content": {"type": "array"},
                    "communication_style": {"type": "string"}
                }
            }
        )

    async def invoke(self, invocation: ToolInvocation) -> ToolResult:
        """
        Simulates social media activity analysis by returning mock data.
        In a production environment, this would connect to real social media APIs.
        """
        person_name = invocation.parameters.get("person_name", "")
        platform = invocation.parameters.get("platform", "all")
        
        # For demo purposes, return mock data
        # In production, this would use proper social media APIs
        mock_data = self._get_mock_social_media_data(person_name, platform)
        
        return ToolResult(
            content=json.dumps(mock_data, ensure_ascii=False),
            metadata={"source": "social_media_activity_tool", "platform": platform}
        )
    
    def _get_mock_social_media_data(self, person_name: str, platform: str) -> Dict[str, Any]:
        """Generate mock social media data for demonstration purposes."""
        # This is a simplified mock implementation
        # In production, this would be replaced with actual API calls
        
        # Default mock data
        mock_data = {
            "recent_posts": [
                {
                    "platform": "Twitter",
                    "content": "Just published our latest research on AI ethics in enterprise applications. Check it out! #AI #Ethics #Enterprise",
                    "date": "3 days ago",
                    "engagement": "52 likes, 23 retweets"
                },
                {
                    "platform": "Twitter",
                    "content": "Excited to be speaking at @TechConf next month about scaling product teams. Who else will be there?",
                    "date": "1 week ago",
                    "engagement": "78 likes, 12 retweets"
                },
                {
                    "platform": "Blog",
                    "title": "5 Lessons Learned from Scaling Our Product Team",
                    "summary": "Sharing insights from our journey growing from 5 to 50 product managers while maintaining quality and culture.",
                    "date": "2 weeks ago",
                    "url": "https://medium.com/@example/5-lessons-learned-scaling-product-teams"
                }
            ],
            "frequent_topics": ["Product Management", "AI Ethics", "Team Leadership", "Technology Trends", "Work Culture"],
            "engagement_patterns": "Highly engaged with product management and AI ethics content. Regularly responds to comments about team leadership. Posts approximately twice per week with highest engagement on Tuesdays.",
            "shared_content": [
                {
                    "title": "The Future of AI in Enterprise",
                    "source": "Harvard Business Review",
                    "url": "https://hbr.org/example-article"
                },
                {
                    "title": "Building Resilient Product Teams",
                    "source": "Mind the Product",
                    "url": "https://mindtheproduct.com/example-article"
                }
            ],
            "communication_style": "Professional but conversational. Uses data to support points. Occasionally shares personal anecdotes to illustrate concepts. Responds thoughtfully to comments and engages in meaningful discussions. Tends to use bullet points and clear structures in longer posts."
        }
        
        # Customize based on platform if needed
        if platform == "twitter":
            mock_data = {k: v for k, v in mock_data.items() if k in ["recent_posts", "frequent_topics", "communication_style"]}
            mock_data["recent_posts"] = [p for p in mock_data["recent_posts"] if p.get("platform") == "Twitter"]
        
        return mock_data


def main():
    """Run the MCP server with the Social Media Activity tool."""
    server = Server()
    server.register_tool(SocialMediaActivityTool())
    server.serve()


if __name__ == "__main__":
    main()