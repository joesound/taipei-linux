import re
from utils.CRUDuser import get_user_by_email, create_user, get_user_by_name

def uesr_signin_check(email, password):
    if email =="":
        return 400, { "error": True, "message": "Need Enter your email"}

    elif bool(re.search(r"^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", email))==False:
        
        return 400, { "error": True, "message": "Please check your email or password"}

    if password=="":
        return 400, { "error": True, "message": "Need Enter your password"}
    
    user_info = get_user_by_email(email)
    if user_info[0] == 200:
        user_password = user_info[1][3]
        if  user_password == password:
            return 200, {"user_info": user_info[1]}
        else:
            return 400, { "error": True, "message": "Please check your email or password"}
    else:
        error = user_info[1]
        return 500, { "error": True, "message": error["message"]}


def creat_user_check(name, email, password):
    if name=="":
        return 400, { "error": True, "message": "Need Enter your name"}
    
    if email =="":
        return 400, { "error": True, "message": "Need Enter your email"}

    elif bool(re.search(r"^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", email))==False:
        return 400, { "error": True, "message": "Please check your email or password"}
    
    if password =="":
        return 400, { "error": True, "message": "Need Enter your email"}
    
    creat_user_info = create_user([name, email, password])
    if creat_user_info[0] == 200:
        return 200, {"ok": creat_user_info[1]}
    elif creat_user_info[0] == 400:
        error  = creat_user_info[1]
        return 400, { "error": True, "message": error}
    else:
        error  = creat_user_info[1]
        return 500, { "error": True, "message": error}




        