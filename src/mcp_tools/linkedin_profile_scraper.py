# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT

import json
import os
import sys
from typing import Dict, List, Optional, Any

from mcp.server.fastmcp import FastMCP
from mcp.types import Tool


# Initialize the MCP server
mcp = FastMCP("LinkedIn Profile Scraper")


@mcp.tool("linkedin_profile_scraper")
def linkedin_profile_scraper(
    person_name: str,
    company_name: Optional[str] = None,
    job_title: Optional[str] = None
) -> Dict[str, Any]:
    """
    Retrieves comprehensive LinkedIn profile data for a specified person.
    
    Args:
        person_name: Full name of the person to search for
        company_name: Optional company name to narrow search
        job_title: Optional job title to narrow search
    
    Returns:
        A dictionary containing the person's LinkedIn profile information
    """
    # For demo purposes, return mock data
    # In production, this would use a proper LinkedIn API or scraping service
    mock_data = _get_mock_profile_data(person_name, company_name, job_title)
    
    return mock_data


def _get_mock_profile_data(person_name: str, company_name: Optional[str], job_title: Optional[str]) -> Dict[str, Any]:
    """Generate mock LinkedIn profile data for demonstration purposes."""
    # This is a simplified mock implementation
    # In production, this would be replaced with actual API calls or web scraping
    
    # Default mock data
    mock_data = {
        "full_name": person_name,
        "current_role": "Product Manager" if not job_title else job_title,
        "company": "Tech Innovations Inc." if not company_name else company_name,
        "location": "San Francisco Bay Area",
        "about": "Passionate product leader with 10+ years of experience building user-centric solutions.",
        "experience": [
            {
                "title": "Senior Product Manager",
                "company": "Tech Innovations Inc.",
                "duration": "2020 - Present",
                "description": "Leading product strategy for AI-powered analytics platform."
            },
            {
                "title": "Product Manager",
                "company": "DataViz Solutions",
                "duration": "2017 - 2020",
                "description": "Managed data visualization product suite with 50K+ users."
            }
        ],
        "education": [
            {
                "school": "Stanford University",
                "degree": "MBA",
                "field": "Business Administration",
                "years": "2015 - 2017"
            },
            {
                "school": "University of California, Berkeley",
                "degree": "BS",
                "field": "Computer Science",
                "years": "2011 - 2015"
            }
        ],
        "skills": ["Product Strategy", "User Experience", "Data Analytics", "Agile Methodologies", "Team Leadership"],
        "recent_activity": [
            {
                "type": "post",
                "content": "Excited to announce our new AI feature launch! #ProductManagement #AI",
                "date": "2 weeks ago"
            },
            {
                "type": "article",
                "title": "The Future of Product Management in the AI Era",
                "date": "1 month ago"
            }
        ],
        "mutual_connections": ["Jane Smith", "John Doe", "Sarah Johnson"],
        "profile_url": f"https://www.linkedin.com/in/{person_name.lower().replace(' ', '-')}"
    }
    
    return mock_data


def main():
    """Run the MCP server with the LinkedIn Profile Scraper tool."""
    mcp.run()


if __name__ == "__main__":
    main()