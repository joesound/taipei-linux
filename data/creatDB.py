import mysql.connector
from config import SQL_USER, SQL_PASSWORD
SHOW_DATABSES = "SHOW DATABASES"
SELECT_TABLES = "SELECT TABLES"


mydb = mysql.connector.connect(
  host="localhost",
  user = SQL_USER,
  password = SQL_PASSWORD,
)

mycursor = mydb.cursor()
mycursor.execute("CREATE DATABASE IF NOT EXISTS `taipei_attraction`")
mycursor.execute("USE taipei_attraction")
mycursor.close()
