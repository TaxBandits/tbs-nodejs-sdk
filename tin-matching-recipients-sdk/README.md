# TaxBandits TIN Matching Recipients API SDK
## Introduction
In this SDK, we demonstrate how to  Request, List, Status and Cancel TIN Matching Recipients using TaxBandits API. Here we use React JS as frontend and Node JS as backend.
## Cloning and Running the Application in local

 - Clone the project into your local machine.
    ```bash
    git clone https://github.com/SPAN-Enterprises/TaxBandits-SDK.git
    ```
 - Let's Navigate into the sdk-nodejs &rarr; tin-matching-recipients-sdk folder.
 - Open the frontend and backend folder path in a separate integrated terminals, so we can run our frontend and backend in two different ports.

## Dependencies Used
### Runtime dependencies
#### Node JS Application
 - **express** - The server for handling and routing HTTP requests.
 - **dotenv** - It is used to load environment variables.
 - **axios** - This library is used to make HTTP Calls.
 - **jws** - This library used for generating JWT (JSON Web Token).
 - **moment** - This library used for converting current date into (MM/DD/YYYY) format.
 - **cors** - CORS (Cross-Origin Resource Sharing) helps frontend client to make requests for resources to an external backend server.
#### React JS Application
 - **axios** - This library is used to make HTTP Calls from backend.
 - **bootstrap** - This library is used for bootstrap files.
 - **moment** - This library used for converting current date into (MM/DD/YYYY) format.
 - **react-router-dom** - This library is used for routing in React Application.
### Development dependencies
 - **nodemon** - helps with the speedy development of Node.js application.
### NPM Installation
 - In both frontend and backend, type the following command to install npm packages that are mentioned in package.json file. 
    ```bash
    npm install
    ```
 - In order to run the application, type the following command in both frontend and backend terminals. 
    ```bash
    npm run start
    ```
 - Node JS Application Runs on  **localhost:3000** and React JS Application Runs on  **localhost:3001**.

## Application Structure
#### Node JS Application
-   `.env`  - This file consists of environment variables.
    - **PORT** - Describes in which port our application runs on.
     -  **PAGE** - It is passed as params for Business/List API.
	-  **PAGE_SIZE** - It is passed as params for Business/List API.
    - **TBS_PUBLIC_API_OAUTH** - Authentication Server URL that we used to generate JWT token.
    -  **TBS_PUBLIC_API_BASE_URL** - Authentication Server URL that we used for Create, List and Update Business.
    - **TBS_API_CONSOLE_CLIENT_ID** - It is passed as input for generating JWT token.
    - **TBS_API_CONSOLE_USER_TOKEN** - It is passed as input for generating JWT token.
	- **TBS_API_CONSOLE_CLIENT_SECRET_KEY** - It is passed as input for generating JWT token.
    >Note : You can get your own ClientId, Secret key and User Token from our TaxBandits Console Site and add it to the `.env` file in TBS_TIN_MATCHING_RECIPIENT_BACKEND. [Goto TaxBandits Console Site](https://sandbox.taxbandits.com/)

-   `package.json`  - This file stores our application information such as name, version , dependencies and more on. 
-   `package-lock.json`  - This is a **lockfile** that contains information about the dependencies/packages with their version numbers that were installed for our node.js project.
-   `server.js`  - The **entry point** to our **nodejs application**. This file defines our express server. It also requires the routes and controllers we'll be using in the application.
-   `routes/`  - This folder contains the route definitions for our API.
    -  `routes/business/createBusinessRoute.js`  - In this file we define the route for creating business against generated JWT token.
	- `routes/business/listBusinessRoute.js`  - In this file we define the route for listing business by passing page, pagesize, Fromdate, Todate as params and passing JWT token as headers.
	- `routes/tinMatching/tinMatchingRoute.js`  - In this file we define the route for TIN Matching Recipients.
-   `controllers/`  - This folder is responsible for handling incoming requests and returning responses to the client.
    -   `controllers/user/userControllers.js`  - This file contains a function that defines the JWS and JWT response sent to a client when making a request to the server.
    - `controllers/business/createBusinessController.js`  - This file contains a function that defines the create business response sent to a client when making a request to the server.
    - `controllers/business/listBusinessController.js`  - This file contains a function that defines the list business response sent to a client when making a request to the server.
    - `controllers/tinmatching/requestController.js`  - This file contains a function that defines the TIN Matching Recipient response sent to a client when making a TIN Matching request to the server.
    - `controllers/tinmatching/listController.js`  - This file contains a function that defines the list TIN Matching Recipient response sent to a client when making a request to the server.
    - `controllers/tinmatching/statusController.js`  - This file contains a function that defines the TIN Matching Recipient Request Status response sent to a client when making a request to the server.
    - `controllers/tinmatching/cancelController.js`  - This file contains a function that defines the TIN Matching Recipient Request Cancel  response sent to a client when making a request to the server.
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
	- `src/components/Recipient`  - This file contains the html integration for TIN Matching Recipients Request method API.
	- `src/components/Spinner`  - This file contains the loader html contents.
	-  `src/components/BusinessErrorModal`  - This file contains the html integration for error response for create business API.
	-  `src/components/BusinessSuccessModal`  - This file contains the html integration for success response for create business API.
	- `src/components/ErrorModal`  - This file contains the html integration for error response for TIN Matching Recipient API.
	- `src/components/SuccessModal`  - This file contains the html integration for success response for TIN Matching Recipient API.
	- `src/components/StatusModal`  - This file contains the html integration for TIN Matching Recipient API status method response.
	- `src/components/CancelModal`  - This file contains the html integration for TIN Matching Recipient API cancel method response.
- `src/pages/`  -  The files in the pages folder indicate the route of the react application.
    -  `src/pages/ListBusiness.js` - This file contains html integration for listing businesses by requesting list method in Business Endpoint.
    - `src/pages/CreateBusiness.js` - This file contains html integration for creating business by requesting create method in Business Endpoint when there is no records found in list business.
    - `src/pages/Request.js` - This file contains html integration for requesting TIN Matching Recipients by requesting request method in TIN Matching Recipients Endpoint.
    - `src/pages/ListTINMatchingRecipient.js` - This file contains html integration for listing TIN Matching Recipients by requesting list method in TIN Matching Recipients Endpoint.
 - `src/utils/`  - This folder contains constants file which is used in create and update business.
	 - `src/utils/constants.js`  - This file stores the static json data.

## Request TIN Matching
For requesting TIN Matching, pass the recipient data as input along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). After requesting request method in TIN Matching Recipient API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/v1.7.3/TINMatchingRecipients/Request]

## List TIN Matching
For listing TIN Matching Recipients, BusinessId is passed as query parameter  along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API).
After requesting list method in TIN Matching Recipients, the reponse is shown as a table.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/v1.7.3/TINMatchingRecipients/List]
## TIN Matching Status
For displaying TIN Matching Recipients Status, pass the SubmissionId and RecordId as query along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). 
After requesting status method in TIN Matching Recipients API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/v1.7.3/TINMatchingRecipients/Status]

## Cancel TIN Matching 
For canceling TIN Matching Recipients, pass the SubmissionId and RecordId as query along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). Cancel method in TIN Matching Recipient API shows success response only if requested TIN Matching Recipient Status is in ORDER CREATED else it will show error response. By passing these values we request to TBS Public API Base URL. 
After requesting status method in TIN Matching Recipients API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/v1.7.3/TINMatchingRecipients/CancelRequest]


For more information, please refer: https://developer.taxbandits.com/