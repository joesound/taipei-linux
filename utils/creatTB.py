import mysql.connector
from config import SQL_USER, SQL_PASSWORD

#資料庫連線
mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= SQL_USER ,
                password= SQL_PASSWORD ,
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

#主資料表(id, name, description, address, longitude, latitude, CAT1_id, CAT2_id, mrt_id)
main_style = "`main`(`id` bigint PRIMARY KEY,`name` varchar(255) NOT NULL,`description` varchar(3000) NOT NULL,`address` varchar(255) NOT NULL,`longitude` varchar(255) NOT NULL,`latitude` varchar(255) NOT NULL,`CAT1_id` bigint NOT NULL,`CAT2_id` bigint NOT NULL,`mrt_id`  bigint , FOREIGN KEY (`CAT1_id`) REFERENCES `CAT1`(`id`), FOREIGN KEY (`CAT2_id`) REFERENCES `CAT2`(`id`) , FOREIGN KEY (`mrt_id`) REFERENCES `mrt`(`id`))"

#照片table  
image_style = "`image`(`id` bigint PRIMARY KEY AUTO_INCREMENT,`main_id` bigint NOT NULL,`image_url` varchar(255) NOT NULL,FOREIGN KEY (`main_id`) REFERENCES `main`(`id`))"

#cat1 table 獨立表格
cat1_stlye =  "`CAT1`(`id` bigint PRIMARY KEY AUTO_INCREMENT,`cat1_name` varchar(255) NOT NULL)"

#cat2 table 獨立表格
cat2_stlye =  "`CAT2`(`id` bigint PRIMARY KEY AUTO_INCREMENT,`cat2_name` varchar(255) NOT NULL)"


#mrt table  獨立表格
mrt_stlye =  "`mrt`(`id` bigint PRIMARY KEY AUTO_INCREMENT,`mrt_name` varchar(255) NOT NULL)"

#公車表格 by _id(景點) & 公車資訊
bus_style = "`bus`(`id` bigint PRIMARY KEY AUTO_INCREMENT,`main_id` bigint NOT NULL, `bus_name` varchar(500) NOT NULL, FOREIGN KEY (`main_id`) REFERENCES `main`(`id`))"

#公車table  獨立表格
#bus_style = "`bus`(`id` bigint PRIMARY KEY AUTO_INCREMENT,`bus_name` varchar(255) NOT NULL)"

#intermediary table for main & bus
#intermediary_style = "`inter_main_bus`(`id` bigint PRIMARY KEY AUTO_INCREMENT,`main_id` bigint NOT NULL,`bus_id`  bigint NOT NULL,FOREIGN KEY (`main_id`) REFERENCES `main`(`id`) ,FOREIGN KEY (`bus_id`) REFERENCES `bus`(`id`)) "



#表格建立流程 獨立表格*4 -> 主資料表 -> 照片table -> intermediary table(按照關聯性排序)

tables = [cat1_stlye,cat2_stlye,mrt_stlye,main_style,bus_style,image_style]


#創建表格
for table in tables:
    creat_table(table)