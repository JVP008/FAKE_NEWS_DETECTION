import joblib
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# Load model and vectorizer
model = joblib.load('model.pkl')
tfidf = joblib.load('tfidf.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    text_tfidf = tfidf.transform([text])
    prediction = model.predict(text_tfidf)[0]
    label = 'Real' if prediction == 1 else 'Fake'
    return jsonify({'prediction': label})

@app.route('/predict', methods=['GET'])
def predict_get():
    return "Please use POST with JSON {\"text\": \"...\"} to get a prediction.", 405

if __name__ == '__main__':
    app.run(debug=True)
