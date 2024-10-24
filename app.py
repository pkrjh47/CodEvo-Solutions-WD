from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'your_openweathermap_api_key_here'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-weather')
def get_weather():
    city = request.args.get('city')
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        weather = {
            'city': data['name'],
            'description': data['weather'][0]['description'],
            'temperature': data['main']['temp'],
            'humidity': data['main']['humidity']
        }
        return jsonify(weather)
    else:
        return jsonify({'error': 'City not found!'})

if __name__ == '__main__':
    app.run(debug=True)
