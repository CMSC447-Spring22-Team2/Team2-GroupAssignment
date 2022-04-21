-- SQLite
DROP TABLE IF EXISTS CrimeData;
DROP TABLE IF EXISTS CrimeLocation;
DROP TABLE IF EXISTS CrimeTime;

CREATE TABLE IF NOT EXISTS CrimeData (
    id int primary key,
    offense text,
    offense_group text,
    offense_text text,
    offense_key text, 
    method text,
    ucr_rank int,
    psa int, 
    ccn int,
    octo_record_id text
);

CREATE TABLE IF NOT EXISTS CrimeLocation (
    id int NOT NULL,
    neighborhood_cluster text,
    census_tract int,
    longitude float,
    latitude float,
    location text,
    block text,
    block_group text,
    x_block float, 
    y_block float,
    district int,
    ward int,
    sector text,
    bid text,
    voting_precinct text,
    anc text,
    FOREIGN KEY (id) REFERENCES CrimeData (id)
);

CREATE TABLE IF NOT EXISTS CrimeTime (
    id int NOT NULL,
    start_date text,
    end_date text,
    report_date text,
    year int,
    shift text,
    FOREIGN KEY (id) REFERENCES CrimeData (id)
);