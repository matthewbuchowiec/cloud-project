from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
import keywords
import database

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
scheduler = AsyncIOScheduler()
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

def fetch_and_cache_data():
    articles = database.get_all_news()
    analysis = keywords.get_analysis(articles)
    cache["keywords_analysis"] = analysis

# @app.on_event("startup")
# async def start_scheduler():
#     # Schedule the `fetch_and_cache_data` to run every day at 7:00 AM
#     scheduler.add_job(fetch_and_cache_data, trigger=CronTrigger(hour=7, minute=0))
#     scheduler.start()
#     fetch_and_cache_data()

@app.get("/keywords/")
async def get_keywords_analysis():
    """
    Get the keyword analysis
    """
    if "keywords_analysis" not in cache:
        fetch_and_cache_data()
    return cache["keywords_analysis"]
