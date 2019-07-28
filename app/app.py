# ### Import Dependencies
import os

import pandas as pd
import numpy as np

from flask import Flask, jsonify, render_template, url_for, send_from_directory

app = Flask(__name__)

# ### Load Data
starbucks_df = pd.read_csv('/app/app/data/starbucks_coordinates.csv', encoding="utf-8-sig")


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/starbucks_data")
def starbucks():

    json_list = []
    for index, row in starbucks_df.iterrows():
        current_row = {}
        current_row['lat'] = row['lat']
        current_row['lng'] = row['lng']
        current_row['store_name'] = row['store_name']

        json_list.append(current_row)

    # Return all of the data from the dataframe
    return jsonify(json_list)
  
if __name__ == "__main__":
	app.debug = True
	port = int(os.environ.get("PORT", 5000))
	app.run(host='0.0.0.0', port=port)