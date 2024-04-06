import boto3.dynamodb
import boto3.dynamodb.conditions
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import FastAPI
import boto3
from botocore.exceptions import NoCredentialsError
from datetime import datetime
from boto3.dynamodb.conditions import Key, Attr


class Data(BaseModel):
    key: str
    value: str


app = FastAPI()

dynamodb = boto3.resource('dynamodb', region_name='us-east-2')


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
    Get aggregated news data for the current day by category from dynamodb, and send it to the frontend

    Returns:
        aggregated news data by category
    """

    table = dynamodb.Table('news_table_us-east-2')

    try:
        response = table.query(
            IndexName="date_created-index",
            KeyConditionExpression=Key('date_created').eq(
                datetime.today().strftime('%Y-%m-%d'))
        )

        return response["Items"]
    except NoCredentialsError:
        return {"message": "Credentials not found. Make sure you have configured AWS credentials."}


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
