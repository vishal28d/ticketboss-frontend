# TicketBoss-Frontend

A modern React-based frontend for TicketBoss — a ticketing & event management platform.  
This is the **frontend** application that connects with the backend API to let users browse events, purchase tickets, manage their account, etc.


## Tech Stack

- React  
- JavaScript / JSX  
- CSS   
- Connection to backend REST/API endpoints  

## Prerequisites

Before you start, make sure you have:

- Node.js (version **>= 14.x**)  
- npm (version **>= 6.x**) or Yarn  
- Access/URL to the backend API (you will need to set an environment variable)  
- Git for version control  

## Setup & Run Locally

Follow these steps to get the project up and running locally.

## 1. Clone the repository
git clone https://github.com/vishal28d/ticketboss-frontend.git
cd ticketboss-frontend

## 2. Install dependencies
npm install

## 3. Setup environment variables
## Create a file named .env in the root of the project with content like:
## REACT_APP_API_URL=https://your-backend-api-url.com
cp .env.example .env
## Then open `.env` and update the API URL and other settings as needed.
## I have already provided MONGO_URI for convenience.

## 4. Run the application in development mode
npm start
## or
yarn start
use npm start to run


 Developed by Vishal Maurya

