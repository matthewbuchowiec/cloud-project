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

cache = {
    'keywords': {},
    'news': {}
} 

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

def fetch_and_cache_news(category):
    """
    get keyword analysis based on cache
    """
    articles =[]
    if category == "total":
        articles = database.get_all_news()
    else: 
        articles = database.get_news_by_category(category)
    cache['news'][category] = {
        "data": articles,
        "timestamp": datetime.now()
    }

def fetch_and_cache_news(category):
    """
    get keyword analysis based on cache
    """
    articles =[]
    if category == "total":
        articles = database.get_all_news()
    else: 
        articles = database.get_news_by_category(category)
    cache['news'][category] = {
        "data": articles,
        "timestamp": datetime.now()
    }

@app.get("/source/count/{category}/")
async def get_source_counts(category):
    """
    Get the count of news sources for the current day by category from dynamodb, and send it to the frontend

    Returns:
        aggregated news data by category
    """
    if category not in cache or (datetime.now() - cache[category]["timestamp"]) > timedelta(hours=24):
        fetch_and_cache_news(category)
    data = cache['news'][category]['data']
    counts = {}
    for category in data: 
        for article in category: 
            source = article['source']
            counts[source] = counts.get(source, 0) + 1
    # only get counts above 5
    filtered_counts = {key: value for key, value in counts.items() if value >= 5}
    return filtered_counts

def fetch_and_cache_keywords(category):
    """
    get keyword analysis based on cache
    """
    if category == "total":
        articles = database.get_all_news()
    else: 
        articles = database.get_news_by_category(category)
    analysis = keywords.get_analysis(articles)
    cache['keywords'][category] = {
        "data": analysis,
        "timestamp": datetime.now()
    }

@app.get("/keywords/{category}/")
async def get_keywords_analysis(category="total"):
    """
    Get the keyword analysis
    """
    # update or invalidate cache
    if category not in cache['keywords'] or (datetime.now() - cache['keywords'][category]["timestamp"]) > timedelta(hours=24):
        fetch_and_cache_keywords(category)
    return cache['keywords'][category]['data']
