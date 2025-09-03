from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows your frontend to talk to your backend

# This is our simple, rule-based chat logic
def get_bot_response(user_message):
    msg = user_message.lower() # Convert message to lowercase
    
    if "hello" in msg or "hi" in msg:
        return "Hello there! How can I help you today?"
    elif "how are you" in msg:
        return "I'm just a bunch of code, but I'm doing great! Thanks for asking."
    elif "your name" in msg:
        return "I am a simple chatbot created as a beginner project."
    elif "bye" in msg:
        return "Goodbye! Have a great day."
    else:
        return "I'm not sure how to answer that. I am still learning."

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    bot_response = get_bot_response(user_message)
    return jsonify({'reply': bot_response})

if __name__ == '__main__':
    # Runs the server on http://127.0.0.1:5000
    app.run(debug=True)