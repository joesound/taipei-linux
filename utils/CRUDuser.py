import mysql.connector

mydb = mysql.connector.connect(     #登入資料庫
                host="localhost",
                user= 'root' ,
                password= 'root',
                database="taipei_attraction"
                )


# get user infor
def get_user_by_name(name):
    mycursor = mydb.cursor()
    try:
        sql="SELECT id, name, email FROM user WHERE name=%s"
        val=(name,)
        mycursor.execute(sql.lower(), val)
        user_infor = mycursor.fetchone()
        data = {
            "data":{
                "id": user_infor[0],
                "name": user_infor[1],
                "email": user_infor[2]
            }
        }
        mycursor.close  
        return data
    except mysql.connector.Error as err:
            mycursor.close
            return {"error":True, "message":err}


# create user
def create_user(user_data):
    mycursor = mydb.cursor()
    try:
        name = user_data[0]
        email = user_data[1]
        password = user_data[2]
        sql = "SELECT name FROM user WHERE email=%s"
        val=(email,)
        mycursor.execute(sql.lower(), val)
        user_infor = mycursor.fetchone()
        if user_infor:
            return [400, "此mail已註冊過"]
        sql="INSERT INTO user (name, email, password) VALUES (%s, %s, %s)"
        val=(name, email, password)
        mycursor.execute(sql.lower(), val)
        mydb.commit()
        mycursor.close  
        return [200, True]
    except mysql.connector.Error as err:
            mycursor.close
            return [500, {"message":err}]


#get user data by email
def get_user_by_email(email):
    mycursor = mydb.cursor()
    try:
        sql="SELECT * FROM user WHERE email=%s"
        val=(email,)
        mycursor.execute(sql.lower(), val)
        user_infor = mycursor.fetchone()
        mycursor.close  
        return [200, user_infor]
    except mysql.connector.Error as err:
            mycursor.close
            return [500, {"message":err}]



# tset
# user_data = ["wei", "kuo0930414695@gmail.com", "123456789"]
# info = create_user(user_data)
# print(info)