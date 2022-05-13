from back_end_api.internal_funcs import *
import json

def get_crime_data_for_id(id):
	return json.dumps(in_get_crime_data_for_id(id))

def get_location_data_for_id(id):
	return json.dumps(in_get_location_data_for_id(id))

def get_all_data_for_id(id):
	return json.dumps(in_get_all_data_for_id(id))

def get_column(col_name):
	return json.dumps(in_get_column(col_name))

def get_columns(col_list):
	return json.dumps(in_get_columns(col_list))