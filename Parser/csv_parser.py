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

    length = len( infoDict['neighborhood_cluster'] )
    for row in range(length):
        insertData = ( row,
        infoDict['neighborhood_cluster'][row],
        tryConvert(infoDict['census_tract'][row]),
        infoDict['offense_group'][row],
        tryConvert(infoDict['longitude'][row], float, 0),
        infoDict['end_date'][row],
        infoDict['offense_text'][row],
        tryConvert(infoDict['y_block'][row], float),
        tryConvert(infoDict['district'][row]),
        infoDict['shift'][row],
        tryConvert(infoDict['year'][row]),
        tryConvert(infoDict['ward'][row]),
        infoDict['offense_key'][row],
        infoDict['bid'][row],
        infoDict['sector'][row],
        tryConvert(infoDict['ucr_rank'][row]),
        tryConvert(infoDict['psa'][row]),
        infoDict['block_group'][row],
        infoDict['voting_precinct'][row],
        tryConvert(infoDict['x_block'][row], float),
        infoDict['block'][row],
        infoDict['start_date'][row],
        tryConvert(infoDict['ccn'][row]),
        infoDict['offense'][row],
        infoDict['octo_record_id'][row],
        infoDict['anc'][row],
        infoDict['report_date'][row],
        infoDict['method'][row],
        infoDict['location'][row],
        tryConvert(infoDict['latitude'][row], float, 0)
        )
        
        db.execute('INSERT INTO CrimeData (id, neighborhood_cluster, census_tract, offense_group, longitude, end_date, offense_text, y_block, district, shift, ward, year, offense_key, bid, sector, ucr_rank, psa, block_group, voting_precinct, x_block, block, start_date, ccn, offense, octo_record_id, anc, report_date, method, location, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', insertData)

    db.commit()
    db.close()


infoDict = loadFile('Parser/dc-crimes-search-results.csv')
initDB(infoDict)