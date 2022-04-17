import mysql.connector

mydb = mysql.connector.connect(     #登入資料庫book
                host="localhost",
                user= 'root' ,
                password= 'Cwl@8506070618',
                database="taipei_attraction"
                )


def creat_booking(book_info):
    user_email = book_info["email"]
    attraction_id = int(book_info["attractionid"])
    date = book_info["date"]
    time = book_info["time"]
    price = book_info["price"]
    mycursor = mydb.cursor()
    try:
        sql="INSERT INTO booking (email, attractionid, date, time, price) VALUES (%s, %s, %s, %s, %s)"
        val=(user_email, attraction_id, date, time, price, )
        mycursor.execute(sql.lower(), val)
        mydb.commit()
        mycursor.close 
        return 200, {"ok":True}
    except mysql.connector.Error as err:
            mycursor.close
            return 500, {"error":True, "message":err}



def read_booking(key):
    mycursor = mydb.cursor()
    try:
        sql = "SELECT * FROM booking WHERE email=%s"
        val = (key,)
        # val = (query,key,)
        mycursor.execute(sql.lower(), val)
        booking_info = mycursor.fetchone()
        mycursor.close  
        if booking_info:
            return True, booking_info
        else:
            return False, booking_info

    except mysql.connector.Error as err:
            mycursor.close
            return 500, {"error":True, "message":err}

def update_booking(book_info):
    user_email = book_info["email"]
    attraction_id = int(book_info["attractionid"])
    date = book_info["date"]
    time = book_info["time"]
    price = book_info["price"]
    mycursor = mydb.cursor()
    try:
        sql="UPDATE booking SET attractionid=%s, date=%s, time=%s, price=%s WHERE email = %s"
        val=(attraction_id, date, time, price, user_email, )
        mycursor.execute(sql.lower(), val)
        mydb.commit()
        mycursor.close 
        return 200, {"ok":True}
    except mysql.connector.Error as err:
            mycursor.close
            return 500, {"error":True, "message":err}

def delete_booking(user_email):
    mycursor = mydb.cursor()
    try:
        sql="DELETE FROM booking WHERE email=%s"
        val=(user_email, )
        mycursor.execute(sql.lower(), val)
        mydb.commit()
        mycursor.close 
        return 200, {"ok":True}
    except mysql.connector.Error as err:
            mycursor.close
            return 500, {"error":True, "message":err}

# test
# creat_booking({"email":"kuo0930414695@gmail.com", "attractionid":1, "date":"2022-06-07", "time":"morning", "price":2000})
