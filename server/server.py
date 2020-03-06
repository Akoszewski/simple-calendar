import os
from flask import Flask, json, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@cross_origin()
@app.route('/months/', methods=['GET'])
def get_tasks():
    path = './months/'
    filename = request.args.get('month') + '.json'
    events = []
    if os.path.isfile(path + filename):
        with open(path + filename, encoding='utf-8') as f:
            events = json.load(f)
    return jsonify({'events': events})

if __name__ == '__main__':
    app.run(debug=True)