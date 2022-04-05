import jwt

def creat_user_JWT(name, email):
    encoded_jwt = jwt.encode({"name":name,"email":email}, "secret", algorithm="HS256")
    return encoded_jwt

def decode_user_JWT(token):
    decode_jwt = jwt.decode(token, "secret", algorithms=["HS256"])
    return decode_jwt
