# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT

import json
import os
import sys
from typing import Dict, List, Optional, Any

from mcp import Server, Tool, ToolInvocation, ToolResult


class CompanyInformationTool(Tool):
    """Tool for retrieving company information."""

    def __init__(self):
        super().__init__(
            name="Company_Information_Tool",
            description="Retrieves structured data about a company including industry, size, recent news, funding, products, and more.",
            parameters={
                "company_name": {
                    "type": "string",
                    "description": "Name of the company to research"
                }
            },
            returns={
                "type": "object",
                "properties": {
                    "company_name": {"type": "string"},
                    "industry": {"type": "string"},
                    "size": {"type": "object"},
                    "recent_news": {"type": "array"},
                    "funding": {"type": "array"},
                    "products_services": {"type": "array"},
                    "mission_vision": {"type": "string"},
                    "key_challenges": {"type": "array"},
                    "competitors": {"type": "array"},
                    "company_url": {"type": "string"}
                }
            }
        )

    async def invoke(self, invocation: ToolInvocation) -> ToolResult:
        """
        Simulates company information retrieval by returning mock data.
        In a production environment, this would connect to real data sources.
        """
        company_name = invocation.parameters.get("company_name", "")
        
        # For demo purposes, return mock data
        # In production, this would use proper company data APIs or services
        mock_data = self._get_mock_company_data(company_name)
        
        return ToolResult(
            content=json.dumps(mock_data, ensure_ascii=False),
            metadata={"source": "company_information_tool"}
        )
    
    def _get_mock_company_data(self, company_name: str) -> Dict[str, Any]:
        """Generate mock company data for demonstration purposes."""
        # This is a simplified mock implementation
        # In production, this would be replaced with actual API calls to services like Crunchbase, etc.
        
        # Default mock data
        mock_data = {
            "company_name": company_name,
            "industry": "Enterprise Software",
            "size": {
                "employees": "500-1000",
                "revenue_range": "$50M-$100M annually"
            },
            "recent_news": [
                {
                    "title": f"{company_name} Announces New AI-Powered Analytics Platform",
                    "date": "2 weeks ago",
                    "source": "TechCrunch",
                    "url": "https://techcrunch.com/example-article"
                },
                {
                    "title": f"{company_name} Expands European Operations with New London Office",
                    "date": "1 month ago",
                    "source": "Business Insider",
                    "url": "https://businessinsider.com/example-article"
                },
                {
                    "title": f"{company_name} Named to Fast Company's Most Innovative Companies List",
                    "date": "2 months ago",
                    "source": "Fast Company",
                    "url": "https://fastcompany.com/example-article"
                }
            ],
            "funding": [
                {
                    "round": "Series C",
                    "amount": "$75M",
                    "date": "1 year ago",
                    "investors": ["Accel Partners", "Sequoia Capital", "Andreessen Horowitz"]
                },
                {
                    "round": "Series B",
                    "amount": "$30M",
                    "date": "3 years ago",
                    "investors": ["Accel Partners", "Sequoia Capital"]
                }
            ],
            "products_services": [
                {
                    "name": "Enterprise Analytics Suite",
                    "description": "Comprehensive data analytics platform for large enterprises"
                },
                {
                    "name": "DataFlow",
                    "description": "Real-time data processing and visualization tool"
                },
                {
                    "name": "SecureBI",
                    "description": "Secure business intelligence solution with advanced permissions"
                }
            ],
            "mission_vision": "To empower organizations with data-driven insights that drive innovation and growth.",
            "key_challenges": [
                "Scaling operations to meet growing demand",
                "Integrating AI capabilities across product suite",
                "Expanding into new international markets",
                "Competing with larger, established players"
            ],
            "competitors": ["Tableau", "Microsoft Power BI", "Looker", "Domo"],
            "company_url": f"https://www.{company_name.lower().replace(' ', '')}.com"
        }
        
        return mock_data


def main():
    """Run the MCP server with the Company Information tool."""
    server = Server()
    server.register_tool(CompanyInformationTool())
    server.serve()


if __name__ == "__main__":
    main()