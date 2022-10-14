import psycopg2
from psycopg2 import sql
import sys
from config import config
import time

WORKING_PATH = "test-data/"


def connectDatabase():
    # create the connection to the database
    # source code from: https://www.youtube.com/watch?v=Q8iYj2ypWss&list=PLrOQsSoS-V6-LRHG_8q0a4KBkWlTWeKhe&index=4
    connection = None
    try:
        params = config()
        print("Connecting to the postgreSQL database ...")
        connection = psycopg2.connect(**params) # extract everything from params
        # create a cursor
        cursor = connection.cursor()
        print("Connection to PostgreSQL is established!")
        # print the current version of PostgreSQL
        print("PostgreSQL database version:")
        cursor.execute("SELECT version()")
        db_version = cursor.fetchone()
        print(db_version)
    except(Exception, psycopg2.OperationalError) as error:
        print("Could not connect to the database!\n {}".format(error))
        sys.exit(1)

    return connection, cursor


def closeDatabase(connection, cursor):
    # close the cursor
    cursor.close()
    # close connection to database
    connection.close()
    print("Database connection terminated.")


def dropTables(connection, cursor):
    table_names = ["users"]
    for table in table_names:
        try:
            cursor.execute(sql.SQL(""" DROP TABLE IF EXISTS {table} CASCADE """).format(table=sql.Identifier(table)))
        except(Exception, psycopg2.DatabaseError) as error:
            print("Could not drop table {table}!\n {error}".format(table=table, error=error))
            connection.rollback()
            cursor.close()
            connection.close()
            sys.exit(1)
    print("Deleted all existing tables successfully!")


def createTables(connection, cursor):
    users_query = """ CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        weight NUMERIC DEFAULT NULL,
        height SMALLINT DEFAULT NULL
    )"""

    query_list = [users_query]

    for query in query_list:
        try:
            cursor.execute(query)
        except(Exception, psycopg2.DatabaseError) as error:
            print("Could not create table {table}!\n {error}".format(table=query.rsplit("_",1), error=error))
            connection.rollback()
            cursor.close()
            connection.close()
            sys.exit(1)

    print("Tables created successfully!")

    # commit the transaction from memory to postgres
    connection.commit()


def loadDataToDB(connection, cursor):
    # define dictionary for CSV file - table name translation
    table_dict = {
        "Users.csv":"users",
    }

    for key, value in table_dict.items():
        # open file in read mode
        with open(WORKING_PATH + key, 'r') as f:
            next(f) # skip header row
            try:
                # read data and treat each 'None' value as postgres Null
                cursor.copy_from(f, value, sep=';', columns=('username','password','weight','height'), null='None')
                connection.commit()
                print("Data from file {} is successfully loaded to table {}".format(key, value))
            except(Exception, psycopg2.DatabaseError) as error:
                print("Could not insert data into table!\n {}".format(error))
                connection.rollback()
                continue


if __name__ == "__main__":
    # create a connection to the postgres database
    connection, cursor = connectDatabase()
    # drop tables if they already exist
    dropTables(connection, cursor)
    # create the tables required
    createTables(connection, cursor)
    # time measure for data loading
    start_time = time.time()
    # load the CSV files into the database
    loadDataToDB(connection, cursor)
    print("Time needed for data loading:\n--- %s seconds ---" % (time.time() - start_time))
    # close the connection to the database
    closeDatabase(connection, cursor)