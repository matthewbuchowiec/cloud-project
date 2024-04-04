# Project for CS 4287: Cloud Computing

## Description

A news aggregation web app that fetches every 24 hours with keyword trending analysis

## Starting up the application

Backend:

1. Go to the backend folder: `cd backend`
2. Install the dependencies: `python3 -m venv venv` `source venv/bin/activate`
   `pip install -r requirements.txt`
3. Set up AWS credentials
4. Run the application: `uvicorn main:app --reload`
