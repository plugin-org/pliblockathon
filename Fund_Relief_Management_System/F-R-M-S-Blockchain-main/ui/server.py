from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
client = MongoClient('mongodb://docker:mongopw@localhost:55000')
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
    )
class Login(BaseModel):
    username: str
    password: str

@app.post('/userlogin')
async def userlogin(login:Login):
    try:
        if (client.frmsvue.users.count_documents(dict(login))== 1): return True
        else: return False
    except Exception as e:
        print(str(e))
        return False

@app.post('/adminlogin')
async def adminlogin(login:Login):
    try:
        if (client.frmsvue.admins.count_documents(dict(login))==1):return True
        else : return False
    except Exception as e:
        print(str(e))
        return False
class Profile(BaseModel):
    username:str

@app.post('/userproile')
async def userprofile(userprofile: Profile):
    filter = dict(userprofile)
    project={
        "_id":0,
        'walletid':1
    }
    return dict(client.frmsvue.users.find_one(filter,project))