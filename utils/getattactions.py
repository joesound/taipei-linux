import mysql.connector
from utils.config import SQL_USER, SQL_PASSWORD
 
        
mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= SQL_USER ,
                password= SQL_PASSWORD ,
                database="taipei_attraction"
                )


def get_attraction_by_page_keyword(page,keyword):
        mycursor = mydb.cursor()
        try:
            keyword = "%"+keyword+"%"
            low_limit = page * 12
            sql="SELECT main.id,main.name,CAT2.cat2_name,main.description,main.address,bus.bus_name,mrt.mrt_name,main.longitude,main.latitude,image_sort.image_url FROM ((((main INNER JOIN CAT2 ON main.CAT2_id = CAT2.id) INNER JOIN bus ON main.id = bus.main_id) INNER JOIN mrt ON main.mrt_id = mrt.id) INNER JOIN (SELECT image.main_id, group_concat(image.image_url order by image.main_id SEPARATOR ',') image_url FROM image GROUP BY image.main_id) image_sort ON main.id = image_sort.main_id) WHERE main.description LIKE %s LIMIT %s,13;"
            val=(keyword,low_limit,)
            mycursor.execute(sql, val)
            datas = mycursor.fetchall()
            mycursor.close  
            if len(datas) > 12:
                data = {
                    "nextPage": page+1,
                    "data":[]
                    
                }
                datas = datas[0:12]
            elif len(datas) <= 12 and len(datas)>0:
                data = {
                    "nextPage": None,
                    "data":[]
                }
            else:
                data = {
                    "nextPage": None,
                    "data":[]
                }
                return data

            for each_data in datas:
                insert_data = {
                    "id": each_data[0],
                    "name": each_data[1],
                    "category": each_data[2],
                    "description": each_data[3],
                    "address": each_data[4],
                    "transport": each_data[5],
                    "mrt": each_data[6],
                    "latitude": each_data[7],
                    "longitude": each_data[8],
                    "images": [each_data[9]]
                }
                data["data"].append(insert_data)
            return data
        except mysql.connector.Error as err:
            mycursor.close
            return err


def get_attraction_by_id(id):
    mycursor = mydb.cursor()
    try:
        sql="SELECT main.id,main.name,CAT2.cat2_name,main.description,main.address,bus.bus_name,mrt.mrt_name,main.longitude,main.latitude,image_sort.image_url FROM ((((main INNER JOIN CAT2 ON main.CAT2_id = CAT2.id) INNER JOIN bus ON main.id = bus.main_id) INNER JOIN mrt ON main.mrt_id = mrt.id) INNER JOIN (SELECT image.main_id, group_concat(image.image_url order by image.main_id SEPARATOR ',') image_url FROM image GROUP BY image.main_id) image_sort ON main.id = image_sort.main_id) WHERE main.id = %s;"
        val=(id,)
        mycursor.execute(sql, val)
        datas = mycursor.fetchone()
        mycursor.close  
        if datas:
            data = {"data": {
                "id": datas[0],
                "name": datas[1],
                "category": datas[2],
                "description": datas[3],
                "address": datas[4],
                "transport": datas[5],
                "mrt": datas[6],
                "latitude": datas[7],
                "longitude": datas[8],
                "images": [datas[9]]}
            }
            return data
        else:
            data = {"error": True,"message": "無此id"}
            return data
    except mysql.connector.Error as err:
        mycursor.close
        return err


