from fastapi import FastAPI
from pydantic import BaseModel


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
    Batch processes news from the past 24 hours from dynamodb, and gets aggregated news
    data and insights

    Returns:
        aggregated news data and insights from batch processing
    """
    return {"message": "Not Implemented!"}
