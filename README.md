---

# 🌍 Personalized Travel Recommendation System

A web-based application that recommends tourist destinations based on user preferences! 🏖️

This project allows users to submit travel preferences, such as favorite destinations, activities, and travel types (e.g., adventure, relaxation, culture). Based on the input, the system provides personalized recommendations of worldwide tourist spots that match the user’s preferences.

## 🚀 Features
- **Interactive Survey**: Users fill out a travel survey to input past travel destinations, favorite activities, and travel types.
- **Personalized Recommendations**: Using a keyword-matching algorithm, the backend suggests destinations tailored to user preferences.
- **Global Tourist Database**: The system uses a JSON-based tourist spot database, with over 500 worldwide destinations.
- **User-friendly Interface**: A responsive and modern UI with smooth form validation and error handling.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Backend**: Python (Flask)
- **Data**: Tourist spots stored in an external `tourist_spots.json` file

## 📂 Folder Structure
```
├── app.py               # Backend server using Flask
├── tourist_spots.json    # JSON file containing tourist spots data
├── website.html  
```

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/onlysaikikhere/SSH-internal.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SSH-internal
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
5. Open the frontend on your local server (usually `http://localhost:5000`).

## 👥 Contributing
Feel free to fork this repository and submit pull requests. Contributions are welcome to improve the recommendation logic, add more destinations, or enhance the UI!

---
