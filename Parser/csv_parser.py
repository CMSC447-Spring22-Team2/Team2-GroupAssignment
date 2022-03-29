import csv

def removeExtraChars(oldString):
    return "".join([char.lower() if char.isalpha() else ' ' for char in oldString])

def loadFile(path):
    # Open the csv file
    with open(path, 'r') as f:
        # Read in the data and seperate the header
        fileInfo = csv.reader(f)
        columnInfo = next(fileInfo)

        # Go through the array and remove extra characters
        for i in range(len(columnInfo)):
            columnInfo[i] = removeExtraChars(columnInfo[i])

        # Create dict from the column info
        infoDict = { i : [] for i in columnInfo }

        # Parse through the rest of the file and add info to the map accordingly
        for row in fileInfo:
            for counter, col in enumerate(row):
                infoDict[columnInfo[counter]].append(col)

        # Return the parsed infomation in the format of a dict       
        return infoDict
    
loadFile('dc-crimes-search-results.csv')