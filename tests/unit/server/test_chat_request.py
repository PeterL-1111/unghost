# Copyright (c) 2025 Peter Liu
# SPDX-License-Identifier: MIT

import asyncio  # Ensure asyncio is imported
import pytest
from pydantic import ValidationError
from src.config.report_style import ReportStyle
from src.rag.retriever import Resource
from unittest.mock import AsyncMock, patch, MagicMock
from fastapi import HTTPException

from src.server.chat_request import (
    ContentItem,
    ChatMessage,
    ChatRequest,
    TTSRequest,
    GeneratePodcastRequest,
    GeneratePPTRequest,
    GenerateProseRequest,
    EnhancePromptRequest,
)
import src.server.mcp_utils as mcp_utils  # Assuming mcp_utils is the module to test


def test_content_item_text_and_image():
    item_text = ContentItem(type="text", text="hello")
    assert item_text.type == "text"
    assert item_text.text == "hello"
    assert item_text.image_url is None

    item_image = ContentItem(type="image", image_url="http://img.com/1.png")
    assert item_image.type == "image"
    assert item_image.text is None
    assert item_image.image_url == "http://img.com/1.png"


def test_chat_message_with_string_content():
    msg = ChatMessage(role="user", content="Hello!")
    assert msg.role == "user"
    assert msg.content == "Hello!"


def test_chat_message_with_content_items():
    items = [ContentItem(type="text", text="hi")]
    msg = ChatMessage(role="assistant", content=items)
    assert msg.role == "assistant"
    assert isinstance(msg.content, list)
    assert msg.content[0].type == "text"


def test_chat_request_defaults():
    req = ChatRequest()
    assert req.messages == []
    assert req.resources == []
    assert req.debug is False
    assert req.thread_id == "__default__"
    assert req.max_plan_iterations == 1
    assert req.max_step_num == 3
    assert req.max_search_results == 3
    assert req.auto_accepted_plan is False
    assert req.interrupt_feedback is None
    assert req.mcp_settings is None
    assert req.enable_background_investigation is True
    assert req.report_style == ReportStyle.FRIENDLY
    assert req.user_background is None


def test_chat_request_with_values():
    resource = Resource(
        name="test", type="doc", uri="some-uri-value", title="some-title-value"
    )
    msg = ChatMessage(role="user", content="hi")
    req = ChatRequest(
        messages=[msg],
        resources=[resource],
        debug=True,
        thread_id="tid",
        max_plan_iterations=2,
        max_step_num=5,
        max_search_results=10,
        auto_accepted_plan=True,
        interrupt_feedback="stop",
        mcp_settings={"foo": "bar"},
        enable_background_investigation=False,
        report_style="academic",
        user_background="I am a senior software engineer with 10 years of experience in Python and React",
    )
    assert req.messages[0].role == "user"
    assert req.debug is True
    assert req.thread_id == "tid"
    assert req.max_plan_iterations == 2
    assert req.max_step_num == 5
    assert req.max_search_results == 10
    assert req.auto_accepted_plan is True
    assert req.interrupt_feedback == "stop"
    assert req.mcp_settings == {"foo": "bar"}
    assert req.enable_background_investigation is False
    assert req.report_style == ReportStyle.ACADEMIC
    assert req.user_background == "I am a senior software engineer with 10 years of experience in Python and React"


def test_tts_request_defaults():
    req = TTSRequest(text="hello")
    assert req.text == "hello"
    assert req.voice_type == "BV700_V2_streaming"
    assert req.encoding == "mp3"
    assert req.speed_ratio == 1.0
    assert req.volume_ratio == 1.0
    assert req.pitch_ratio == 1.0
    assert req.text_type == "plain"
    assert req.with_frontend == 1
    assert req.frontend_type == "unitTson"


def test_generate_podcast_request():
    req = GeneratePodcastRequest(content="Podcast content")
    assert req.content == "Podcast content"


def test_generate_ppt_request():
    req = GeneratePPTRequest(content="PPT content")
    assert req.content == "PPT content"


def test_generate_prose_request():
    req = GenerateProseRequest(prompt="Write a poem", option="poet", command="rhyme")
    assert req.prompt == "Write a poem"
    assert req.option == "poet"
    assert req.command == "rhyme"

    req2 = GenerateProseRequest(prompt="Write", option="short")
    assert req2.command == ""


def test_enhance_prompt_request_defaults():
    req = EnhancePromptRequest(prompt="Improve this")
    assert req.prompt == "Improve this"
    assert req.context == ""
    assert req.report_style == "academic"


def test_content_item_validation_error():
    with pytest.raises(ValidationError):
        ContentItem()  # missing required 'type'


def test_chat_message_validation_error():
    with pytest.raises(ValidationError):
        ChatMessage(role="user")  # missing content


def test_tts_request_validation_error():
    with pytest.raises(ValidationError):
        TTSRequest()  # missing required 'text'


@pytest.mark.asyncio
@patch("src.server.mcp_utils._get_tools_from_client_session", new_callable=AsyncMock)
@patch("src.server.mcp_utils.StdioServerParameters")
@patch("src.server.mcp_utils.stdio_client")
async def test_load_mcp_tools_exception_handling(
    mock_stdio_client, mock_StdioServerParameters, mock_get_tools
):  # Changed to async def
    mock_get_tools.side_effect = Exception("unexpected error")
    mock_StdioServerParameters.return_value = MagicMock()
    mock_stdio_client.return_value = MagicMock()

    with pytest.raises(HTTPException) as exc:
        await mcp_utils.load_mcp_tools(server_type="stdio", command="foo")  # Use await
    assert exc.value.status_code == 500
    assert "unexpected error" in exc.value.detail


class TestUserBackgroundValidation:
    """Test cases for user_background parameter validation in ChatRequest."""

    def test_user_background_none_is_valid(self):
        """Test that None is a valid value for user_background."""
        req = ChatRequest(user_background=None)
        assert req.user_background is None

    def test_user_background_valid_string(self):
        """Test that valid strings are accepted."""
        background = "I am a senior software engineer with 10 years of experience"
        req = ChatRequest(user_background=background)
        assert req.user_background == background

    def test_user_background_minimum_length(self):
        """Test that strings with minimum length (1 char) are accepted."""
        req = ChatRequest(user_background="A")
        assert req.user_background == "A"

    def test_user_background_maximum_length(self):
        """Test that strings at maximum length (2000 chars) are accepted."""
        background = "A" * 2000
        req = ChatRequest(user_background=background)
        assert req.user_background == background

    def test_user_background_empty_string_validation_error(self):
        """Test that empty strings trigger validation error."""
        with pytest.raises(ValidationError) as exc_info:
            ChatRequest(user_background="")
        
        errors = exc_info.value.errors()
        assert len(errors) == 1
        assert errors[0]["type"] == "string_too_short"
        assert "user_background" in errors[0]["loc"]

    def test_user_background_too_long_validation_error(self):
        """Test that strings over 2000 chars trigger validation error."""
        background = "A" * 2001  # One character over the limit
        with pytest.raises(ValidationError) as exc_info:
            ChatRequest(user_background=background)
        
        errors = exc_info.value.errors()
        assert len(errors) == 1
        assert errors[0]["type"] == "string_too_long"
        assert "user_background" in errors[0]["loc"]

    def test_user_background_non_string_validation_error(self):
        """Test that non-string values trigger validation error."""
        with pytest.raises(ValidationError) as exc_info:
            ChatRequest(user_background=123)
        
        errors = exc_info.value.errors()
        assert len(errors) == 1
        assert errors[0]["type"] == "string_type"
        assert "user_background" in errors[0]["loc"]

    def test_user_background_with_whitespace(self):
        """Test that strings with whitespace are handled correctly."""
        background = "  I am a developer with experience in Python  "
        req = ChatRequest(user_background=background)
        assert req.user_background == background  # No automatic trimming in model

    def test_user_background_unicode_support(self):
        """Test that Unicode characters are supported."""
        background = "I am a developer from España with 5 years of experience 🚀"
        req = ChatRequest(user_background=background)
        assert req.user_background == background

    def test_user_background_multiline_support(self):
        """Test that multiline strings are supported."""
        background = """I am a senior software engineer with:
- 10 years of Python experience
- 5 years of React experience
- Team leadership skills"""
        req = ChatRequest(user_background=background)
        assert req.user_background == background
