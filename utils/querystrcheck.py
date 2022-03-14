

def query_str_check(page,keyword):
    if page == None:  # defalt page=0
        page = 0   
    if keyword == None:
        keyword=""
    if keyword == "null":
        keyword=""
    try:
        page = int(page)
        return True, [page, keyword]
    except:
        return False, {"error": True,"message": "請輸入數字"}

def query_by_id(id):
    if id == None:  # defalt page=0
        id = 0   
    try:
        id = int(id)
        return True, id
    except:
        return False, {"error": True,"message": "請輸入數字"}
