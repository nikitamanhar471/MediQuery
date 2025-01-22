import google.generativeai as genai
from dotenv import load_dotenv
import os
import textwrap  # Import textwrap for formatting the response

load_dotenv()

# Configure the Google Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Format the response text
def format_response(text):
    wrapper = textwrap.TextWrapper(width=80)  # Set width for wrapping text
    paragraphs = text.split("\n")  # Split by paragraphs if any
    formatted_paragraphs = [wrapper.fill(paragraph.strip()) for paragraph in paragraphs if paragraph.strip()]
    return "\n\n".join(formatted_paragraphs)  # Join paragraphs with double line breaks

# Prompt handling
if __name__ == "__main__":
    import sys

    user_input = sys.argv[1] if len(sys.argv) > 1 else input("Ask something: ")
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(user_input)
    formatted_text = format_response(response.text)
    print(formatted_text)
