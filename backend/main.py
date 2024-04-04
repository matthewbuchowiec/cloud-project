from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import FastAPI
import boto3
from botocore.exceptions import NoCredentialsError

class Data(BaseModel):
    key: str
    value: str

app = FastAPI()

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

table = dynamodb.Table('news_table')

@app.get("/")
def default():
    return "Fast API News Server"


@app.get("/test/")
async def load_test():
    """
    Perform a load test by doing computationally demanding operations to showcase
    autoscaling of the server

    Returns:
        dict: A dictionary with a message indicating that the load test is completed.
    """

    return {"message": "Load Test Completed!!"}


@app.get("/news/")
async def get_news():
    """
    Batch processes news from the past 24 hours from dynamodb, and gets aggregated news
    data and insights

    Returns:
        aggregated news data and insights from batch processing
    """
    return {"message": "Not Implemented!"}


@app.get("/items/{id}")
async def read_item(id: int):
    """
    Get an item by id
    """
    try:
        response = table.get_item(
            Key={
                'id': id 
            }
        )
        item = response.get('Item', {})
        if item:
            return {"item": item}
        return {"message": "Item not found"}
    except NoCredentialsError:
        return {"message": "Credentials not found. Make sure you have configured AWS credentials."}
