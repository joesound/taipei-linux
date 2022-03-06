import mysql.connector
from utils.config import SQL_USER, SQL_PASSWORD
 
        
mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= SQL_USER ,
                password= SQL_PASSWORD ,
                database="taipei_attraction"
                )


def get_attraction_by_page_keyword(page,keyword):
    if keyword:
        mycursor = mydb.cursor()
        try:
            keyword = "%"+keyword+"%"
            sql="SELECT main.id,main.name,CAT2.cat2_name,main.description,main.address,bus.bus_name,mrt.mrt_name,main.longitude,main.latitude,image_sort.image_url FROM ((((main INNER JOIN CAT2 ON main.CAT2_id = CAT2.id) INNER JOIN bus ON main.id = bus.main_id) INNER JOIN mrt ON main.mrt_id = mrt.id) INNER JOIN (SELECT image.main_id, group_concat(image.image_url order by image.main_id SEPARATOR ',') image_url FROM image GROUP BY image.main_id) image_sort ON main.id = image_sort.main_id) WHERE main.description LIKE %s;"
            val=(keyword,)
            mycursor.execute(sql, val)
            datas = mycursor.fetchall()
            data_len = len(datas)
            mycursor.close
            if data_len <= 12:
                data = {
                    "nextPage": None,
                    "data":[]
                }
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
            page_index, nextpage = cal_next_page(page, data_len)
            if page_index:
                data = {
                    "nextPage": nextpage,
                    "data":[]
                }
                for each_data in datas[page*12:page*12+12]:
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
            else:
                data = {
                    "nextPage": None,
                    "data":[]
                }
                return data
        except mysql.connector.Error as err:
            mycursor.close
            return err
    else:
        mycursor = mydb.cursor()
        try:
            sql="SELECT main.id,main.name,CAT2.cat2_name,main.description,main.address,bus.bus_name,mrt.mrt_name,main.longitude,main.latitude,image_sort.image_url FROM ((((main INNER JOIN CAT2 ON main.CAT2_id = CAT2.id) INNER JOIN bus ON main.id = bus.main_id) INNER JOIN mrt ON main.mrt_id = mrt.id) INNER JOIN (SELECT image.main_id, group_concat(image.image_url order by image.main_id SEPARATOR ',') image_url FROM image GROUP BY image.main_id) image_sort ON main.id = image_sort.main_id);"
            mycursor.execute(sql)
            datas = mycursor.fetchall()
            data_len = len(datas)
            mycursor.close
            if data_len <= 12:
                data = {
                    "nextPage": None,
                    "data":[]
                }
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
            page_index, nextpage = cal_next_page(page, data_len)
            if page_index:
                data = {
                    "nextPage": nextpage,
                    "data":[]
                }
                for each_data in datas[page*12:page*12+12]:
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
            else:
                data = {
                    "nextPage": None,
                    "data":[]
                }
                return data
        except mysql.connector.Error as err:
            mycursor.close
            return err

def cal_next_page(now_page, data_len):
    if now_page > (data_len // 12):
        nextpage = None
        return False, nextpage 
    else:
        nextpage  = now_page + 1
        return True, nextpage
    