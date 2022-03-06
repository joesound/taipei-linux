from pickle import NONE
import mysql.connector
from config import SQL_USER, SQL_PASSWORD

insert_tables = ["cat1", "cat2", "mrt"]
insert_item_name = ["cat1_name", "cat2_name", "mrt_name"]    
        
mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= SQL_USER ,
                password= SQL_PASSWORD ,
                database="taipei_attraction"
                )

def insert_single_data(data_package):
    mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= "root" ,
                password= "root" ,
                database="taipei_attraction"
                )
    mycursor = mydb.cursor()
    try:
        sql = "INSERT INTO `mrt` (`mrt_name`) VALUES  (%s);" #sql指令將資料存入
        val = (data_package,)
        mycursor.execute(sql, val)
        mydb.commit()
        mydb.close()
        return True, "data insert ok"
    except mysql.connector.Error as err:
            mydb.close
            return err, "Something wrong"                            #如果資料庫異常，回傳錯誤訊息


def inset_bus_data(inset_id, bus_data):
    mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= SQL_USER ,
                password= SQL_PASSWORD ,
                database="taipei_attraction"
                )
    mycursor = mydb.cursor()
    try:
        sql = "INSERT INTO `bus` (`main_id`, `bus_name`) VALUES (%s, %s);"                     #sql指令將資料存入
        val = (inset_id, bus_data,)
        mycursor.execute(sql, val)
        mydb.commit()
        mydb.close()
        return True, "data insert ok"
    except mysql.connector.Error as err:
            mydb.close
            return err, "Something wrong"                            #如果資料庫異常，回傳錯誤訊息


def inset_main_data(main_data):
    mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= SQL_USER ,
                password= SQL_PASSWORD ,
                database="taipei_attraction"
                )
    mycursor = mydb.cursor()
    try:
        sql = "INSERT INTO `main` (`id`, `name`, `description`, `address`, `longitude`, `latitude`, `CAT1_id`,`CAT2_id`,`mrt_id`) VALUES (%s, %s, %s, %s, %s, %s, (SELECT `id` FROM `CAT1` WHERE `cat1_name`=%s), (SELECT `id` FROM `CAT2` WHERE `cat2_name`=%s), (SELECT `id` FROM `mrt` WHERE `mrt_name`=%s));" 
        val = (main_data[0], main_data[1],main_data[2],main_data[3],main_data[4],main_data[5],main_data[6],main_data[7],main_data[8])
        mycursor.execute(sql, val)
        mydb.commit()
        mydb.close()
        return True, "data insert ok"
    except mysql.connector.Error as err:
            mydb.close
            return err, "Something wrong"                         


def inset_image_data(main_id, image_data):
    mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= SQL_USER ,
                password= SQL_PASSWORD ,
                database="taipei_attraction"
                )
    mycursor = mydb.cursor()
    try:
        sql = "INSERT INTO `image` (`main_id`, `image_url`) VALUES (%s, %s);"                     #sql指令將資料存入
        val = (main_id, image_data,)
        mycursor.execute(sql, val)
        mydb.commit()
        mydb.close()
        return True, "data insert ok"
    except mysql.connector.Error as err:
            mydb.close
            return err, "Something wrong"                            #如果資料庫異常，回傳錯誤訊息
