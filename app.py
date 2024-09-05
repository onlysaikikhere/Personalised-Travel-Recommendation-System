from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample tourist spots with associated keywords
tourist_spots = [
    {"name": "Paris", "keywords": ["culture", "history", "art"]},
    {"name": "New York", "keywords": ["city", "adventure", "shopping"]},
    {"name": "Bali", "keywords": ["nature", "beaches", "relaxation"]},
    {"name": "Tokyo", "keywords": ["city", "technology", "culture"]},
    {"name": "Alps", "keywords": ["nature", "adventure", "hiking"]},
]

# Function to match user preferences with tourist spots
def recommend_spots(user_keywords):
    recommendations = []
    for spot in tourist_spots:
        # Find spots that match at least one keyword
        match = any(keyword in user_keywords for keyword in spot['keywords'])
        if match:
            recommendations.append(spot['name'])
    return recommendations

# API route to handle form submissions and return recommendations
@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    destination = data.get('destination')
    activities = data.get('activities')
    travel_type = data.get('travelType')
    
    # For now, we'll treat 'activities' and 'travel_type' as keywords
    user_keywords = activities.split() + [travel_type]

    # Get recommendations based on user keywords
    recommendations = recommend_spots(user_keywords)
    
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True)