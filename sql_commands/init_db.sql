-- SQLite
DROP TABLE IF EXISTS CrimeData;

CREATE TABLE IF NOT EXISTS CrimeData (
    id int primary key,
    neighborhood_cluster text,
    census_tract int,
    offense_group text,
    longitude float,
    end_date text,
    offense_text text,
    y_block float,
    district int,
    shift text, 
    ward int,
    year int,
    offense_key text, 
    bid text,
    sector text,
    ucr_rank int,
    psa int, 
    block_group text,
    voting_precinct text,
    x_block float, 
    block text,
    start_date text,
    ccn int,
    offense text,
    octo_record_id text,
    anc text,
    report_date text,
    method text,
    location text,
    latitude float
);

select * from CrimeData;