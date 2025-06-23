# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT

import json
import os
import sys
from typing import Dict, List, Optional, Any

from mcp import Server, Tool, ToolInvocation, ToolResult


class PublicSpeakingPublicationTool(Tool):
    """Tool for finding public talks, articles, and interviews by an individual."""

    def __init__(self):
        super().__init__(
            name="Public_Speaking_Publication_Tool",
            description="Discovers public talks, articles, interviews, and other content published by or featuring the specified individual.",
            parameters={
                "person_name": {
                    "type": "string",
                    "description": "Full name of the person to search for"
                }
            },
            returns={
                "type": "object",
                "properties": {
                    "public_talks": {"type": "array"},
                    "articles_publications": {"type": "array"},
                    "interviews": {"type": "array"},
                    "books_whitepapers": {"type": "array"}
                }
            }
        )

    async def invoke(self, invocation: ToolInvocation) -> ToolResult:
        """
        Simulates finding public content by returning mock data.
        In a production environment, this would connect to real data sources.
        """
        person_name = invocation.parameters.get("person_name", "")
        
        # For demo purposes, return mock data
        # In production, this would use proper search APIs and databases
        mock_data = self._get_mock_public_content(person_name)
        
        return ToolResult(
            content=json.dumps(mock_data, ensure_ascii=False),
            metadata={"source": "public_speaking_publication_tool"}
        )
    
    def _get_mock_public_content(self, person_name: str) -> Dict[str, Any]:
        """Generate mock public content data for demonstration purposes."""
        # This is a simplified mock implementation
        # In production, this would be replaced with actual API calls to services like Google Scholar, YouTube, etc.
        
        # Default mock data
        mock_data = {
            "public_talks": [
                {
                    "title": "The Future of AI in Enterprise Applications",
                    "event": "TechConf 2024",
                    "date": "March 15, 2024",
                    "description": "Keynote address on how AI is transforming enterprise software",
                    "video_url": "https://www.youtube.com/watch?v=example1",
                    "slides_url": "https://slideshare.net/example1"
                },
                {
                    "title": "Building Scalable Product Teams",
                    "event": "Product Management Summit",
                    "date": "November 10, 2023",
                    "description": "Panel discussion on scaling product organizations while maintaining quality",
                    "video_url": "https://www.youtube.com/watch?v=example2"
                }
            ],
            "articles_publications": [
                {
                    "title": "5 Strategies for Effective Cross-Functional Collaboration",
                    "publication": "Harvard Business Review",
                    "date": "January 2024",
                    "url": "https://hbr.org/example-article"
                },
                {
                    "title": "How We Reduced Technical Debt by 50% in Six Months",
                    "publication": "Medium",
                    "date": "October 2023",
                    "url": "https://medium.com/@example/technical-debt"
                },
                {
                    "title": "The ROI of User Research: A Case Study",
                    "publication": "UX Collective",
                    "date": "July 2023",
                    "url": "https://uxdesign.cc/example-article"
                }
            ],
            "interviews": [
                {
                    "title": f"Interview with {person_name}: Navigating Product Leadership",
                    "publication": "Product Talk Podcast",
                    "date": "February 2024",
                    "url": "https://producttalk.com/example-episode"
                },
                {
                    "title": f"{person_name} on Building User-Centric Products",
                    "publication": "TechCrunch",
                    "date": "December 2023",
                    "url": "https://techcrunch.com/example-interview"
                }
            ],
            "books_whitepapers": [
                {
                    "title": "The Product Leader's Playbook",
                    "type": "Book",
                    "publication_date": "2022",
                    "publisher": "O'Reilly Media",
                    "description": "A comprehensive guide to product leadership in technology companies",
                    "url": "https://www.amazon.com/example-book"
                },
                {
                    "title": "Measuring Product Impact: Beyond Vanity Metrics",
                    "type": "Whitepaper",
                    "publication_date": "2023",
                    "publisher": "Company Blog",
                    "description": "Research paper on effective product metrics that drive business outcomes",
                    "url": "https://company.com/whitepaper"
                }
            ]
        }
        
        return mock_data


def main():
    """Run the MCP server with the Public Speaking Publication tool."""
    server = Server()
    server.register_tool(PublicSpeakingPublicationTool())
    server.serve()


if __name__ == "__main__":
    main()