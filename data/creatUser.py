import mysql.connector
# from config import SQL_USER, SQL_PASSWORD

#資料庫連線
mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= "root" ,
                password= "root" ,
                database="taipei_attraction"
                )

#建立資料表 function 
def creat_table(table_style):
    mycursor = mydb.cursor()
    sql = "CREATE TABLE IF NOT EXISTS `taipei_attraction`." + table_style
    print(sql)
    mycursor.execute(sql)
    mycursor.close()

#資料表style

#建立use table(id, name, email)
main_style = "`USER`(`id` bigint PRIMARY KEY AUTO_INCREMENT,`name` varchar(255) NOT NULL,`email` varchar(3000) NOT NULL, `password` varchar(255) NOT NULL)"

creat_table(main_style)

