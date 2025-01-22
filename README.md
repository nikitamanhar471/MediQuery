# MediQuery Chatbot

MediQuery is a responsive, AI-powered chatbot designed to provide health-related guidance and basic medical advice. It leverages Google Gemini’s generative AI for contextual and dynamic responses.

---

## Features

- **Interactive Chat Interface**: A responsive UI similar to WhatsApp, with dynamic features such as typing indicators and a functional enter button.
- **Context-Aware Responses**: The chatbot maintains conversation history for meaningful, contextually-aware interactions.
- **Medicine Recommendations**: Suggests over-the-counter medicines and remedies for common health issues.
- **Google Gemini AI Integration**: Utilizes state-of-the-art generative AI for accurate and concise health guidance.

---

## Project Structure

### **Backend**
- `app.js`: Main entry point for the Node.js server.
- `chatController.js`: Handles API endpoints and interaction with the AI model.
- `chat_bot.py`: Python script to generate AI responses using Google Gemini.
- `.env`: Contains environment variables such as API keys.
- `routes/chat.js`: Defines routes for chatbot communication.
- `controllers/chatController.js`: Manages chat logic and API interactions.

### **Frontend**
- Built using React.js, providing a user-friendly and dynamic chat interface.

---

## Prerequisites

- Node.js and Yarn installed
- Python 3.11 or higher installed
- A Google Cloud API key with access to Google Gemini AI

---

## Installation

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd MediQuery
```

### **2. Set Up Backend**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # For Linux/Mac
.venv\Scripts\activate    # For Windows
yarn install
```

### **3. Set Up Frontend**
```bash
cd frontend
yarn install
```

### **4. Configure Environment Variables**
Create a `.env` file in the `backend` directory and add:
```
GOOGLE_API_KEY=<your-google-api-key>
PORT=5000
```

---

## Running the Application

### **1. Start the Backend**
```bash
cd backend
source .venv/bin/activate   # Activate virtual environment
node app.js
```

### **2. Start the Frontend**
```bash
cd frontend
yarn start
```

---

## API Endpoints

### **POST** `/api/chat`
- **Description**: Sends a user query to the chatbot and receives a response.
- **Request Body**:
  ```json
  {
    "prompt": "<user_query>",
    "conversationContext": [
      ["previous_user_query", "previous_bot_response"]
    ]
  }
  ```
- **Response**:
  ```json
  {
    "response": "<bot_response>"
  }
  ```

---

## Troubleshooting

### **Common Issues**
- **JSONDecodeError in `chat_bot.py`:** Ensure the `conversationContext` is passed correctly as a JSON string.
- **Google Gemini API Key Errors:** Verify your API key in the `.env` file and ensure it has the correct permissions.
- **Frontend Not Loading:** Make sure the backend is running on the specified port.

---

## Contributors

- **Nikita Manhar and Team**  
- **follow on LinkdIn www.linkedin.com/in/nikita-manhar**

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

