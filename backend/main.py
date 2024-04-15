from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import keywords
import database
from datetime import datetime, timedelta

class Data(BaseModel):
    key: str
    value: str

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
cache = {} 

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
    return database.get_news_by_date()

@app.get("/news/count/{category}/")
async def get_news():
    """
    Get the count of news sources for the current day by category from dynamodb, and send it to the frontend

    Returns:
        aggregated news data by category
    """
    return database.get_news_by_date()

def fetch_and_cache_data(category):
    """
    get keyword analysis based on cache
    """
    if category == "total":
        articles = database.get_all_news()
    else: 
        articles = database.get_news_by_category(category)
    analysis = keywords.get_analysis(articles)
    cache[category] = {
        "data": analysis,
        "timestamp": datetime.now()
    }

@app.get("/keywords/{category}/")
async def get_keywords_analysis(category="total"):
    """
    Get the keyword analysis
    """
    # update or invalidate cache
    if category not in cache or (datetime.now() - cache[category]["timestamp"]) > timedelta(hours=24):
        fetch_and_cache_data(category)
    return cache[category]['data']
