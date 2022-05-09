import sqlite3
import os
from typing import Union

def getFilePath(rel_filepath):
    '''
    Returns an absolute path to the given file, assuming the given filepath is relative to this file.
    '''
    base_path = os.path.dirname(__file__)
    return os.path.join(base_path, rel_filepath)

DATABASE = getFilePath('../cmsc447-team2-data.db')
global_db = None
COLUMN_NAMES = {
	'CrimeData':[
		'crime_id',
		'location_id',
		'offense',
		'offense_group',
		'offense_text',
		'offense_key', 
		'method',
		'ucr_rank',
		'psa', 
		'ccn',
		'octo_record_id',
		'start_date',
		'end_date',
		'report_date',
		'year',
		'shift'
	],
	'CrimeLocation': [
		'location_id',
		'neighborhood_cluster',
		'census_tract',
		'longitude',
		'latitude',
		'location',
		'block',
		'block_group',
		'x_block', 
		'y_block',
		'district',
		'ward',
		'sector',
		'bid',
		'voting_precinct',
		'anc'
	]
}

# Backend database helper methods
def get_db():
	global global_db
	if global_db is None:
		global_db = sqlite3.connect(DATABASE)
	global_db.row_factory = sqlite3.Row
	return global_db

def query_db(query, args=(), one=False):
	cur = get_db().execute(query, args)
	rv = cur.fetchall()
	cur.close()
	return (rv[0] if rv else None) if one else rv

def action_db(action, args=()):
	db = get_db()
	cur = db.execute(action, args)
	db.commit()
	cur.close()

def close_db():
	global global_db
	if global_db is not None:
		global_db.close()
		global_db = None

# Frontend helper methods
def in_get_crime_data_for_id(id: Union[int, str]) -> dict[str, any]:
	id = str(id) if isinstance(id, int) else id
	result = query_db('SELECT * FROM CrimeData WHERE crime_id = ' + id)
	if len(result) == 0:
		return {}

	return {key:val for key, val in zip(COLUMN_NAMES['CrimeData'], result[0])}

def in_get_location_data_for_id(id: Union[int, str]) -> dict[str, any]:
	id = str(id) if isinstance(id, int) else id
	result = query_db('SELECT * FROM CrimeLocation WHERE location_id = ' + id)
	if len(result) == 0:
		return {}

	return {key:val for key, val in zip(COLUMN_NAMES['CrimeLocation'], result[0])}

def in_get_all_data_for_id(id: Union[int, str]) -> dict[str, any]:
	ret_dict = in_get_crime_data_for_id(id)
	if len(ret_dict) > 0:
		ret_dict.update(in_get_location_data_for_id(ret_dict['location_id']))
	return ret_dict

def in_get_column(col_name: str) -> list:
	col_name = col_name.lower()
	result = query_db('SELECT ' + col_name + ' FROM CrimeData INNER JOIN CrimeLocation ON CrimeLocation.location_id = CrimeData.location_id')
	if len(result) == 0:
		return []

	return [row[0] for row in result]

def in_get_columns(col_list: str) -> dict[list]:
	map(str.lower, col_list)
	col_names = ', '.join(col_list)
	result = query_db('SELECT ' + col_names + ' FROM CrimeData INNER JOIN CrimeLocation ON CrimeLocation.location_id = CrimeData.location_id')
	if len(result) == 0:
		return {}
	
	return {key:[row[iter] for row in result] for iter, key in enumerate(col_list)}