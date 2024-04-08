from fastapi import FastAPI
from pydantic import BaseModel
import keywords
import database

class Data(BaseModel):
    key: str
    value: str


app = FastAPI()

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

@app.get("/keywords/")
async def get_keywords_analysis():
    """
    Get the keyword analysis
    """
    articles = database.get_all_news()
    analysis =  keywords.get_analysis(articles)
    return analysis 
