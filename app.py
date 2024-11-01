from flask import Flask, request, jsonify, render_template
from text_blind_watermark import TextBlindWatermark, TextBlindWatermark2

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/embed', methods=['POST'])
def embed():
    data = request.json
    password = data.get('password')
    text = data.get('text')
    watermark = data.get('watermark')
    
    if data.get('algorithm') == 'algorithm2':
        wm = TextBlindWatermark2(password=password)
    else:
        wm = TextBlindWatermark(password=password)
    
    text_with_wm = wm.embed(text=text, watermark=watermark) if isinstance(wm, TextBlindWatermark2) else wm.embed()
    return jsonify({'text_with_wm': text_with_wm})

@app.route('/extract', methods=['POST'])
def extract():
    data = request.json
    password = data.get('password')
    text_with_wm = data.get('text_with_wm')

    if data.get('algorithm') == 'algorithm2':
        wm = TextBlindWatermark2(password=password)
    else:
        wm = TextBlindWatermark(password=password)
    
    watermark = wm.extract(text_with_wm)
    return jsonify({'watermark': watermark})

if __name__ == '__main__':
    app.run(debug=True)
