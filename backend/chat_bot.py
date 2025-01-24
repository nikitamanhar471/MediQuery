import google.generativeai as genai
from dotenv import load_dotenv
import os
import sys
import json
import textwrap
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure the Google Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to format the response text
def format_response(text):
    wrapper = textwrap.TextWrapper(width=80)
    paragraphs = text.split("\n")
    formatted_paragraphs = [wrapper.fill(paragraph.strip()) for paragraph in paragraphs if paragraph.strip()]
    return "\n\n".join(formatted_paragraphs)

# Truncate input if too long
def truncate_input(text, max_length=2000):
    return text[:max_length] + ("..." if len(text) > max_length else "")

# Sanitize response text
def sanitize_text(text):
    return text.encode('utf-8', 'replace').decode('utf-8')

# Function to log AI responses
def log_response(prompt, response):
    try:
        with open("ai_responses.log", "a", encoding="utf-8") as log_file:
            log_file.write(f"[{datetime.now()}]\nPrompt: {prompt}\nResponse: {response}\n\n")
    except Exception as e:
        print(f"Error logging response: {e}")

# Function to handle AI response generation
def generate_ai_response(prompt, context):
    try:
        base_prompt = (
            "You are MediQuery, a professional medical assistant AI specializing in providing guidance based on symptoms. "
            "Introduce yourself warmly and invite users to share their symptoms. Avoid disclaimers like 'I am an AI'. "
            "When a user describes symptoms, you will: "
            "1. Ask clarifying questions if needed. "
            "2. Use the conversation context and the current user question to offer recommendations, "
            "3. Provide a probable diagnosis based on symptoms and recommend treatments or medications, such as the name of an oral medicine, according to the symptoms. "
            "4. Advise when medical attention is required. Avoid disclaimers like 'I am an AI'. "
            "Respond based on the user's symptoms and their previous inputs. "
            "Offer concise, actionable advice and guide users toward professional consultation when necessary. "
            "Keep responses empathetic, natural, and helpful."
        )

        full_prompt = f"{base_prompt}\n\nContext:\n{truncate_input(context)}\n\nQ: {truncate_input(prompt)}\nA:"

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(full_prompt)
        formatted_response = sanitize_text(format_response(response.text))

        log_response(full_prompt, formatted_response)
        return formatted_response
    except Exception as e:
        error_message = f"Error generating response: {e}"
        log_response(prompt, error_message)
        return error_message

# Main execution
if __name__ == "__main__":
    try:
        # Read inputs from command line
        user_input = sys.argv[1] if len(sys.argv) > 1 else input("Ask something: ")
        conversation_context = []

        if len(sys.argv) > 2:
            try:
                context_input = sys.argv[2]
                if context_input.strip():
                    conversation_context = json.loads(context_input)
                else:
                    conversation_context = []
            except json.JSONDecodeError:
                print("Note: Invalid JSON format for conversation context. Proceeding with an empty context.")

        # Generate formatted context string
        formatted_context = "\n".join([f"User: {pair[0]}\nBot: {pair[1]}" for pair in conversation_context])

        # Generate AI response
        result = generate_ai_response(user_input, formatted_context)

        # Print and log the response
        print(result)
    except Exception as e:
        print(f"Error: {e}")
