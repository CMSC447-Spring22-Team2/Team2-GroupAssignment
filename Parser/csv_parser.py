import csv, sqlite3

def removeExtraChars(oldString):
    return "".join([char.lower() if char.isalpha() else '_' for char in oldString])

def loadFile(path):
    # Open the csv file
    with open(path, 'r') as f:
        # Read in the data and seperate the header
        fileInfo = csv.reader(f)
        columnInfo = next(fileInfo)

        infoDict = {}
        # Go through the array and format column headers
        for i in range(len(columnInfo)):
            columnInfo[i] = removeExtraChars(columnInfo[i])
            if columnInfo[i] == "report_dat":
                columnInfo[i] = "report_date"
            if columnInfo[i] == "yblock":
                columnInfo[i] = "y_block"
            if columnInfo[i] == "xblock":
                columnInfo[i] = "x_block"
            infoDict[columnInfo[i]] = []

        # Parse through the rest of the file and add info to the map accordingly
        for row in fileInfo:
            for column, cell in zip(columnInfo, row):
                infoDict[column].append(cell)

        # Return the parsed infomation in the format of a dict       
        return infoDict

# Helper method to convert text values into numbers
def tryConvert(entry, func = int, default = -1):
    return func(entry) if entry != '' else default

def initDB(infoDict):
    db = sqlite3.connect('cmsc447-team2-data.db')

    # Get length using the length of a column with no blank entries
    length = len( infoDict['neighborhood_cluster'] )
    for row in range(length):
        crimeData = (row,
            infoDict['offense'][row],
            infoDict['offense_group'][row],
            infoDict['offense_text'][row],
            infoDict['offense_key'][row],
            infoDict['method'][row],
            tryConvert(infoDict['ucr_rank'][row]),
            tryConvert(infoDict['psa'][row]),
            tryConvert(infoDict['ccn'][row]),
            infoDict['octo_record_id'][row],
        )

        locationData = (row,
            infoDict['neighborhood_cluster'][row],
            tryConvert(infoDict['census_tract'][row]),
            tryConvert(infoDict['longitude'][row], float, 0),
            tryConvert(infoDict['latitude'][row], float, 0),
            infoDict['location'][row],
            infoDict['block'][row],
            infoDict['block_group'][row],
            tryConvert(infoDict['x_block'][row], float),
            tryConvert(infoDict['y_block'][row], float),
            tryConvert(infoDict['district'][row]),
            tryConvert(infoDict['ward'][row]),
            infoDict['sector'][row],
            infoDict['bid'][row],
            infoDict['voting_precinct'][row],
            infoDict['anc'][row],
        )

        timeData = (row,
            infoDict['start_date'][row],
            infoDict['end_date'][row],
            infoDict['report_date'][row],
            tryConvert(infoDict['year'][row]),
            infoDict['shift'][row],
        )

        db.execute('INSERT INTO CrimeData (id, offense, offense_group, offense_text, offense_key, method, ucr_rank, psa, ccn, octo_record_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', crimeData)
        db.execute('INSERT INTO CrimeLocation (id, neighborhood_cluster, census_tract, longitude, latitude, location, block, block_group, x_block, y_block, district, ward, sector, bid, voting_precinct, anc) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', locationData)
        db.execute('INSERT INTO CrimeTime (id, start_date, end_date, report_date, year, shift) VALUES(?, ?, ?, ?, ?, ?)', timeData)

    db.commit()
    db.close()


infoDict = loadFile('Parser/dc-crimes-search-results.csv')
initDB(infoDict)