# ### Import Dependencies
import os

import pandas as pd
import numpy as np

from flask import Flask, jsonify, render_template, url_for, send_from_directory

app = Flask(__name__)

# ### Load Data


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/large_data")
def large():

    json_list = []
    for index, row in large_providers.iterrows():
        current_row = {}
        current_row['corp_parent_name'] = row['corp_parent_facility']
        current_row['corp_parent_ims_id'] = row['corp_parent_ims_id']
        current_row['ta_segment'] = row['ta_segment']
        current_row['volume_segment'] = row['final_volume_segment']
        current_row['geography_type'] = row['geography_type']
        current_row['total_sales'] = row['total_sum']
        current_row['total_site_count'] = row['total_site_count']
        current_row['addr'] = row['addr']
        current_row['city'] = row['city']
        current_row['state'] = row['state']
        current_row['pstl'] = row['pstl']
        current_row['lat'] = row['lat']
        current_row['lng'] = row['lng']

        json_list.append(current_row)

    # Return all of the data from the dataframe
    return jsonify(json_list)

@app.route("/medium_data")
def medium():

    json_list = []
    for index, row in medium_providers.iterrows():
        current_row = {}
        current_row['corp_parent_name'] = row['corp_parent_facility']
        current_row['corp_parent_ims_id'] = row['corp_parent_ims_id']
        current_row['ta_segment'] = row['ta_segment']
        current_row['volume_segment'] = row['final_volume_segment']
        current_row['geography_type'] = row['geography_type']
        current_row['total_sales'] = row['total_sum']
        current_row['total_site_count'] = row['total_site_count']
        current_row['addr'] = row['addr']
        current_row['city'] = row['city']
        current_row['state'] = row['state']
        current_row['pstl'] = row['pstl']
        current_row['lat'] = row['lat']
        current_row['lng'] = row['lng']

        json_list.append(current_row)

    # Return all of the data from the dataframe
    return jsonify(json_list)
  
@app.route("/child_data/<corp_parent_ims_id>")
def child(corp_parent_ims_id):
  
  # get child site data for selected corporate parent
  child_site_data = child_large_medium_dataset.loc[child_large_medium_dataset['corp_parent_ims_id'] == corp_parent_ims_id, :]
  
  json_list = []
  for index, row in child_site_data.iterrows():
    current_row = {}
    current_row['child_site_org_id'] = row['child_site_org_id']
    current_row['child_site_name'] = row['child_site_name']
    current_row['addr'] = row['t3_addr']
    current_row['city'] = row['t3_city']
    current_row['state'] = row['t3_state']
    current_row['pstl'] = row['t3_pstl']
    current_row['corp_parent_ims_id'] = row['corp_parent_ims_id']
    current_row['corp_parent_facility'] = row['corp_parent_facility']
    current_row['lat'] = row['lat']
    current_row['lng'] = row['lng']
    
    json_list.append(current_row)

  # Return all of the data from the dataframe
  return jsonify(json_list)
  
if __name__ == "__main__":
  app.run()