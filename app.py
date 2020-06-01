from flask import Flask, request, render_template, jsonify
app = Flask(__name__, template_folder='templates/startbootstrap-landing-page-gh-pages/', static_folder='templates/startbootstrap-landing-page-gh-pages/')

from flask_cors import CORS
CORS(app, support_credentials=True)

import corpora_machine
import search_engine
import json

@app.route('/')
def homePage():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def searcFunction():
    req = json.loads(request.data)
    query = req['query']
    results = jsonify(search_engine.search(query=query))
    return results

if __name__ == '__main__':
    app.run()