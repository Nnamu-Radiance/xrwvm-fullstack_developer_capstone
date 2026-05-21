from flask import Flask, jsonify
import re

app = Flask(__name__)

@app.route("/analyze/<text>", methods=["GET"])
def analyze_sentiment(text):
    positive_words = ["good","great","excellent","love","amazing","fantastic","wonderful","best","happy","pleased","satisfied","recommend","clean","friendly","helpful","nice","perfect","awesome"]
    negative_words = ["bad","terrible","awful","hate","horrible","worst","poor","disappointing","dirty","rude","never","broken","slow","damaged","disgusting","angry","upset"]
    text_lower = text.lower()
    pos = sum(1 for w in positive_words if w in text_lower)
    neg = sum(1 for w in negative_words if w in text_lower)
    sentiment = "positive" if pos > neg else "negative" if neg > pos else "neutral"
    return jsonify({"sentiment": sentiment})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
