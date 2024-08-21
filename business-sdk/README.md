# TaxBandits Business API SDK
## Introduction
In this SDK, we demonstrate how to create business, list business and update business with TaxBandits Business Endpoints. We will be using React JS as frontend and Node JS as backend.
## Cloning and Running the Application in local

 - Clone the project into your local machine by entering following command in Terminal/Command Prompt.
    ```bash
    git clone https://github.com/SPAN-Enterprises/TaxBandits-SDK.git
    ```
 - Let's Navigate into the business-sdk folder.
 - Open the frontend and backend folder path in a separate integrated terminals, so we can run our frontend and backend in two different ports.

## Dependencies Used
### Runtime dependencies
#### Node JS Application
 - **express** - The application framework for building RESTful APIs with Node.js.
 - **dotenv** - It is used to load environment variables.
 - **axios** - This library is used to make HTTP Calls.
 - **jws** - This library used for generating JWT (JSON Web Token).
 - **moment** - This library used for converting current date into (MM/DD/YYYY) format.
 - **cors** - CORS (Cross-Origin Resource Sharing) helps frontend client to make requests for resources to an external backend server.

#### React JS Application
 - **axios** - This library is used to make HTTP Calls from backend.
 - **bootstrap** - This library is used for bootstrap files.
 - **moment** - This library used for converting current date into (MM/DD/YYYY) format.
 - **react-router-dom** - This library is used for routing our React Application
#### Development dependencies
 - **nodemon** - helps with the speedy development of Node.js application.
 ### NPM Installation
 - In both frontend and backend terminal, type the following command to install npm packages that are mentioned in package.json file. 
    ```bash
    npm install
    ```
 - In order to run the application, type the following command in both frontend and backend terminals. 
    ```bash
    npm run start
    ```
 - Node JS Application(Backend) Runs on  **localhost:3000** and React JS Application(Frontend) Runs on  **localhost:3001**.

## Application Structure
#### Node JS Application
-   `.env`  - This file consists of environment variables.
    - **PORT** - Describes in which port our application runs on.
    -  **PAGE** - It is passed as params for Business/List API.
	-  **PAGE_SIZE** - It is passed as params for Business/List API.
	-  **FROM_DATE** - It is passed as params for Business/List API.
    - **TBS_PUBLIC_API_OAUTH** - Authentication Server URL that we used to generate JWT token.
    -  **TBS_PUBLIC_API_BASE_URL** - Authentication Server URL that we used for Create, List and Update Business.
    - **TBS_API_CONSOLE_CLIENT_ID** - It is passed as input for generating JWT token.
    - **TBS_API_CONSOLE_USER_TOKEN** - It is passed as input for generating JWT token.
	- **TBS_API_CONSOLE_CLIENT_SECRET_KEY** - It is passed as input for generating JWT token.
    >Note : You can get your own ClientId, Secret key and User Token from our TaxBandits Console Site and add it to the `.env` file in TBS_BUSINESS_BACKEND. [Goto TaxBandits Console Site](https://sandbox.taxbandits.com/)
-   `package.json`  - This file stores our application information such as name, version , dependencies and more on. 
-   `package-lock.json`  - This is a **lockfile** that contains information about the dependencies/packages with their version numbers that were installed for our node.js project.
-   `server.js`  - The **entry point** to our **nodejs application**. This file defines our express server. It also requires the routes and controllers we'll be using in the application.
-   `routes/`  - This folder contains the route definitions for our API.
    -  `routes/business/createBusinessRoute.js`  - In this file we define the route for creating business against generated JWT token.
	- `routes/business/getBusinessRoute.js`  - In this file we define the route for get business by passing business Id as params.
	- `routes/business/listBusinessRoute.js`  - In this file we define the route for listing business by passing page, pagesize, Fromdate, Todate as params and passing JWT token as headers.
	- `routes/business/updateBusinessRoute.js`  - In this file we define the route for updating business by passing input data against generated JWT token.
-   `controllers/`  - This folder is responsible for handling incoming requests and returning responses to the client.
    -   `controllers/user/userControllers.js`  - This file contains a function that defines the JWS and JWT response sent to a client when making a request to the server.
    - `controllers/business/createBusinessController.js`  - This file contains a function that defines the create business response sent to a client when making a request to the server.
    - `controllers/business/getBusinessController.js`  - This file contains a function that defines the get business response sent to a client when making a request to the server.
    - `controllers/business/listBusinessController.js`  - This file contains a function that defines the list business response sent to a client when making a request to the server.
    - `controllers/business/updateBusinessController.js`  - This file contains a function that defines the update business response sent to a client when making a request to the server.
-   `utils/`  - This folder contains functions that is used for controllers.
    -   `utils/unixEpoch.js`  - This file contains function that is used for unixEpoch conversion that is passed as payload for generating JWS key.
#### React JS Application
-   `package.json`  - This file stores our application information such as name, version , dependencies and more on. 
-   `package-lock.json`  - This is a **lockfile** that contains information about the dependencies/packages with their version numbers that were installed for our react.js project.
-   `public/`  - This folder contains the HTML file and static assets such as images, svgs, and fonts for our React app.
-   `src/`  - This is a folder that contains our source code.
-   `src/index.js`  - This file is the **entry point** for our **reactjs application** and contains the logic for rendering our App component. 
-   `src/app.js`  -  This file is our App component.
-   `src/styles/`  -  This file contains css, bootstrap and fonts file used in our app. 
- `src/components/`  - The files in the components folder can be reused to multiple pages.
	- `src/components/Spinner`  - This file contains the loader html contents.
	-  `src/components/ErrorModal`  - The files contains the html integration for error response from API.
	-  `src/components/SuccessModal`  - The files contains the html integration for success response from API.
- `src/pages/`  -  The files in the pages folder indicate the route of the react application.
    -   `src/pages/Home.js`  - This file acts as a home page for business API . 
    -  `src/pages/CreateBusiness.js`  - This file contains html integration for creating business by retrieving data from input field and request the create method in Business Endpoint.
    -  `src/pages/ListBusiness.js`  - This file contains html integration for listing businesses by requesting list method in Business Endpoint.
    -  `src/pages/UpdateBusiness.js`  - This file contains html integration for updating business by retrieving data from get business API and updating by requesting the update method in Business Endpoint.
 - `src/utils/`  - This folder contains constants file which is used in create and update business.
	 - `src/utils/constants.js`  - This file stores the static json data.

## Create Business
For creating business, pass the required data from React Js Application (Frontend) to the Node Js Application(Backend). In Backend, JWT will be generated and passed to the TBS Create Business Endpoint in headers as Authorization. By requesting the TBS Create Business Endpoint, the business will be created and output will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Business/Create]

## List Business
For listing business we are passing page, page size, FromDate as params which is taken from env files and ToDate is taken as current date which is also passed as params and JWT token as headers. By passing these values we request to TBS Public API Base URL.
After requesting list method in business API we'll display the response data as a list.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Business/List]

- If there is no business under the User, it shows the response from the list method in Business TBS Public API Base URL.
    #### Sample No Business found
    ![No Business found]
    ```json
    {
    "StatusCode": 404,
    "StatusName": "NotFound",
    "StatusMessage": "The resource you have specified cannot be found",
    "Businesses": null,
    "Page": 1,
    "TotalRecords": 0,
    "TotalPages": 0,
    "PageSize": 10,
    "Errors": null
    }
 
## Update Business
For updating business we are requesting get business method from Business API and fetch the data against Business ID which is passed as params. After retrieving data we'll update it by requesting TBS Public API Base URL.
After requesting update method in business API, output will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Business/Update]

In the above URLs, `{version}` is the endpoint version of TaxBandits API.

For more information, please refer: [https://developer.taxbandits.com/](https://developer.taxbandits.com/)
