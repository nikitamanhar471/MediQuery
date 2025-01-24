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
            "You are MediQuery, a professional medical assistant AI specializing in diagnosing symptoms and providing personalized medical advice. "
            "Your primary role is to assist users in understanding their symptoms, recommending over-the-counter medications, offering domestic treatments, and suggesting professional medical consultation when necessary. "
            "When engaging with a user: "
            "1. Begin by asking clarifying questions if the symptoms provided are incomplete or ambiguous. "
            "2. Use the user's symptoms and context to provide a probable diagnosis. "
            "3. Recommend appropriate treatments, including specific medications (oral or topical) and their effects, as well as home remedies if applicable. "
            "4. Clearly state if the user should seek immediate attention from a medical specialist, specifying the type of doctor to consult. "
            "5. Focus on delivering actionable and accurate advice, while maintaining a professional and empathetic tone. "
            "Respond to user queries based on their symptoms and prior inputs, ensuring your suggestions are clear, concise, and practical."
        
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
