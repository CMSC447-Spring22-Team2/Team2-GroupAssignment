import csv, sqlite3

def removeExtraChars(oldString):
    return "".join([char.lower() if char.isalpha() else '_' for char in oldString])

def loadFile(path):
    # Open the csv file
    with open(path, 'r') as f:
        # Read in the data and seperate the header
        fileInfo = csv.reader(f)
        columnInfo = next(fileInfo)

        col_list = []
        # Go through the array and remove extra characters
        for i in range(len(columnInfo)):
            columnInfo[i] = removeExtraChars(columnInfo[i])
            if columnInfo[i] == "report_dat":
                columnInfo[i] = "report_date"
            if columnInfo[i] == "yblock":
                columnInfo[i] = "y_block"
            if columnInfo[i] == "xblock":
                columnInfo[i] = "x_block"
            col_list.append(columnInfo[i])
            if col_list[i] == "ccn":
                col_list[i] = col_list[0]
                col_list[0] = "ccn"

        # Create dict from the column info
        infoDict = { i : [] for i in columnInfo }

        # Parse through the rest of the file and add info to the map accordingly
        for row in fileInfo:
            for counter, col in enumerate(row):
                infoDict[columnInfo[counter]].append(col)

        # Return the parsed infomation in the format of a dict       
        return (col_list, infoDict)
    
def initDB(infoDict):
    db = sqlite3.connect('cmsc447-team2-data.db')
    length = len( infoDict[1]['ccn'] )
    id = 1
    for row in range(length):
        row_vals = [infoDict[1][val][row] for val in infoDict[0]]

        ccn = int(row_vals[0])
        neighborhood_cluster = row_vals[21] 
        census_tract = int(row_vals[2]) if row_vals[2 ] != '' else -1
        offense_group = row_vals[1]
        longitude = float(row_vals[3]) if row_vals[3] != '' else -1
        end_date = row_vals[4]
        offense_text = row_vals[5]
        y_block = float(row_vals[6])
        district = int(row_vals[7]) if row_vals[7] != '' else -1
        shift = row_vals[8]
        year = int(row_vals[9])  if row_vals[9] != '' else -1
        ward = int(row_vals[10]) if row_vals[10] != '' else -1
        offense_key = row_vals[11]
        bid = row_vals[12]
        sector = row_vals[13]
        ucr_rank = int(row_vals[14]) if row_vals[14] != '' else -1
        psa = int(row_vals[15]) if row_vals[15] != '' else -1
        block_group = row_vals[16]
        voting_precinct = row_vals[17]
        x_block = float(row_vals[18]) if row_vals[15] != '' else -1
        block = row_vals[19]
        start_date = row_vals[20]
        offense = row_vals[22]
        octo_record_id = row_vals[23]
        anc = row_vals[24]
        report_date = row_vals[25]
        method = row_vals[26]
        location = row_vals[27]
        latitude = float(row_vals[28]) if row_vals[28] != '' else -1

        db.execute('INSERT INTO CrimeData (ccn, neighborhood_cluster, census_tract, offense_group, longitude, end_date, offense_text, y_block, district, shift, ward, year, offense_key, bid, sector, ucr_rank, psa, block_group, voting_precinct, x_block, block, start_date, offense, octo_record_id, anc, report_date, method, location, latitude, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', (ccn, neighborhood_cluster, census_tract, offense_group, longitude, end_date, offense_text, y_block, district, shift, ward, year, offense_key, bid, sector, ucr_rank, psa, block_group, voting_precinct, x_block, block, start_date, offense, octo_record_id, anc, report_date, method, location, latitude, id ))
        db.commit()

        id = id + 1


infoDict = loadFile('Parser\dc-crimes-search-results.csv')
initDB(infoDict)