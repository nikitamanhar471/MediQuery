import google.generativeai as genai
from dotenv import load_dotenv
import os
import sys
import json
import textwrap

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

# Function to handle AI response generation
def generate_ai_response(prompt, context):
    try:
        base_prompt = (
            "You are a professional medical assistant AI specializing in providing concise, actionable medical advice. "
            "Use the conversation context and the current user question to offer recommendations, "
            "including potential diagnoses, over-the-counter medications, and next steps."
            "When a user describes symptoms, you will: "
            "1. Ask clarifying questions if needed. "
            "2. Use the conversation context and the current user question to offer recommendations, "
            "3. Provide a probable diagnosis based on symptoms & Recommend treatments or medications (e.g., paracetamol, ibuprofen). "
            "4. Advise when medical attention is required. Avoid disclaimers like 'I am an AI'. "
            "Respond based on the user's symptoms and their previous inputs. "
            "Focus on providing a diagnosis, suggested medications, and further steps.\n\n"

        )
        full_prompt = f"{base_prompt}\n\nContext:\n{context}\n\nQ: {prompt}\nA:"

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(full_prompt)

        return format_response(response.text)
    except Exception as e:
        return f"Error generating response: {e}"

# Main execution
if __name__ == "__main__":
    try:
        # Read inputs from command line
        user_input = sys.argv[1] if len(sys.argv) > 1 else input("Ask something: ")
        conversation_context = json.loads(sys.argv[2]) if len(sys.argv) > 2 else []

        # Generate AI response
        formatted_context = "\n".join([f"User: {pair[0]}\nBot: {pair[1]}" for pair in conversation_context])
        result = generate_ai_response(user_input, formatted_context)
        print(result)
    except json.JSONDecodeError as e:
        print(f"Error: Malformed JSON input - {e}")
    except Exception as e:
        print(f"Error: {e}")
