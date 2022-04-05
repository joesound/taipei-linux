from utils.CRUDbook import creat_booking, read_booking, update_booking, delete_booking
from utils.getattactions import get_attraction_by_page_keyword, get_attraction_by_id



def check_book_content(book_info):
    if (book_info["email"] =="") or (book_info["email"] ==False):
        return False, "尚未登入"

    if (book_info["attractionid"] =="") or (book_info["attractionid"]==False):
        return False, "尚未輸入景點ID"

    if (book_info["date"] =="") or (book_info["date"] ==False):
        return False, "尚未輸入日期"

    if (book_info["time"] =="") or (book_info["time"] ==False):
        return False, "尚未輸入時間"
    elif (book_info["time"] != "morning") and (book_info["time"] != "afternoon"):
        return False, "時間輸入異常"

    if (book_info["price"] =="") or (book_info["price"] ==False):
        return False, "尚未輸入價錢"
    elif (book_info["price"] == 2000 and book_info["time"] != "morning") or (book_info["price"] == 2500 and book_info["time"] != "afternoon"):
        return False, "價錢輸入異常"
    
    return True, "ok"




def booking_trip(book_info):
    index, book_data = read_booking(book_info["email"])
    if index:
        return update_booking(book_info)
    else:
        return creat_booking(book_info)


def get_user_book(user_email):
    index, book_data = read_booking(user_email)
    if index:
        attraction_id = book_data[2]
        attraction_data = get_attraction_by_id(attraction_id)
        datetime = str(book_data[3])
        data = {
            "data":{
                "attraction":{
                    "id":attraction_data["data"]["id"],
                    "name":attraction_data["data"]["name"],
                    "address":attraction_data["data"]["address"],
                    "image":attraction_data["data"]["images"][0][0]
                },
                "date": datetime,
                "time": book_data[4],
                "price": book_data[5]
            }
        }
        return 200, data
    elif index==500:
        return 500, book_data
    else:
        return 200, {"data":None}

def delete_user_book(user_email):
    index, book_data = read_booking(user_email)
    if index:
        code, message = delete_booking(user_email)
        return code, message
    else:
        return 400, {"error":True, "message":"尚未預定行程"}


