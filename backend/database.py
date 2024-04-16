import boto3
from datetime import datetime
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb', region_name='us-east-2')

table = dynamodb.Table('news_table_us-east-2')

def get_all_news():
    response = table.scan() 
    data = response['Items']
    articles = [item['articles'] for item in data]
    return articles

def get_news_by_category(category):
    response = table.scan() 
    data = response['Items']
    articles = [item['articles'] for item in data if item['category']==category]
    return articles

def get_news_by_date(): 
    response = table.query(
    IndexName="date_created-index",
    KeyConditionExpression=Key('date_created').eq(
        datetime.today().strftime('%Y-%m-%d')))

    return response["Items"]
