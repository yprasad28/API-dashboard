# API Chaining Dashboard
=====================

# Setup Instructions
-----------------

1. Clone the repository: `git clone https://github.com/yprasad28/API-dashboard.git`
2. Install dependencies: `npm create vite@latest`
3. Start the application: `npm run dev`

# Approach
--------

This application uses React.js as the frontend framework, Tailwind CSS for styling, and Axios for making HTTP requests. The API chaining logic is implemented using a recursive approach, where each API call is made and the response is used to determine the next API call in the chain.

# Assumptions and Decisions
-------------------------

* It is assumed that the API endpoints are correctly implemented and return the expected data.
* The application uses a simple recursive approach to implement API chaining, which may not be suitable for complex API chains.
* Error handling is implemented using try-catch blocks, but it is not exhaustive and may not cover all possible error scenarios.

# Completed Features
-----------------

* API chaining implementation using a recursive approach
* User interface for selecting APIs and inputting POST data
* Display of API chain and response data
* Error handling and loading states

# Known Issues
------------

* The application does not handle cases where the API chain is circular (i.e., an API calls itself).
* The application does not implement data transformation logic for transforming response data between API calls.
* The application does not handle cases where the API endpoint returns an error response.

Note: This README file provides a brief overview of the API chaining dashboard application, including setup instructions, approach, assumptions, completed features, and known issues.
