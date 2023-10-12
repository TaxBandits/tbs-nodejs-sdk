## TaxBandits Form 1099-K API SDK
## Introduction
In this SDK, we demonstrate how to ValidateForm, Create, List, Update, Status, Delete, Transmit, RequestPdf, and RequestDraftPdfUrl of Form1099K using TaxBandits API. Here we use React JS as frontend and Node JS as backend.

## Cloning and Running the Application in local
- Clone the project into your local machine.

    ```
    git clone https://github.com/TaxBandits/tbs-nodejs-sdk.git
    ```
 - Let's Navigate into the tbs-nodejs-sdk &rarr; Form1099K-sdk folder.
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
 - **aws-sdk** - This library simplifies the use of AWS Services.

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
    - **PAGE** - It is passed as params for Business/List API.
	- **PAGE_SIZE** - It is passed as params for Business/List API.
    - **TBS_PUBLIC_API_OAUTH** - Authentication Server URL that we used to generate JWT token.
    - **TBS_PUBLIC_API_BASE_URL** - Authentication Server URL that we used for Create, List and Update Business.
    - **TBS_API_CONSOLE_CLIENT_ID** - It is passed as input for generating JWT token.
    - **AWS_ACCESS_KEY_ID** - AWS account Credentials passed as input for decrypting pdf URL.
    - **AWS_SECRET_KEY_ID** - AWS account Credentials passed as input for decrypting pdf URL.
    - **BUCKET_NAME** - It is passed as input for decrypting pdf URL.
    - **AWS_ENCRYPTION_KEY** - It is passed as input for decrypting pdf URL.
    - **TBS_API_CONSOLE_USER_TOKEN** - It is passed as input for generating JWT token.
	- **TBS_API_CONSOLE_CLIENT_SECRET_KEY** - It is passed as input for generating JWT token.
    >Note : You can get your own ClientId, Secret key and User Token from our TaxBandits Console Site and add it to the `.env` file in TBS_FORM1099K_BACKEND. [Goto TaxBandits Console Site](https://sandbox.taxbandits.com/)

-   `package.json`  - This file stores our application information such as name, version , dependencies and more on.
-   `package-lock.json`  - This is a **lockfile** that contains information about the dependencies/packages with their version numbers that were installed for our node.js project.
-   `server.js`  - The **entry point** to our **nodejs application**. This file defines our express server. It also requires the routes and controllers we'll be using in the application.
-   `routes/`  - This folder contains the route definitions for our API.
-  `routes/business/businessRoute.js`  - In this file we define the route for create, list and get business against generated JWT token.
- `routes/form1099K/form1099Kroute.js`  - In this file we define the route for create, validate form, update, list, get, status, delete, transmit, requestPdfUrl and requestDraftPdfUrls of Form1099K against BusinessId.
-   `controllers/`  - This folder is responsible for handling incoming requests and returning responses to the client.
    -   `controllers/user/userControllers.js`  - This file contains a function that defines the JWS and JWT response sent to a client when making a request to the server.
    - `controllers/business/createBusinessController.js`  - This file contains a function that defines the create business response sent to a client when making a request to the server.
    - `controllers/business/listBusinessController.js`  - This file contains a function that defines the list business response sent to a client when making a request to the server.
    - `controllers/business/getBusinessController.js`  - This file contains a function that defines the get business response sent to a client when making a request to the server.
    - `controllers/form1099K/createForm1099K.js`  - This file contains a function that defines the create Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/deleteForm1099K.js`  - This file contains a function that defines the delete Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/getForm1099K.js`  - This file contains a function that defines the get Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/listForm1099K.js`  - This file contains a function that defines the list Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/requestDraftPdfUrl.js`  - This file contains a function that defines the request draft pdf url Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/requestPdfUrls.js`  - This file contains a function that defines the request pdf url Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/statusForm1099K.js`  - This file contains a function that defines the status Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/transmitForm1099K.js`  - This file contains a function that defines the transmit Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/updateForm1099K.js`  - This file contains a function that defines the update Form1099K response sent to a client when making a request to the server.
    - `controllers/form1099K/validateForm1099K.js`  - This file contains a function that defines the validate Form1099K response sent to a client when making a request to the server.

#### React JS Application
-   `package.json`  - This file stores our application information such as name, version , dependencies and more on. 
-   `package-lock.json`  - This is a **lockfile** that contains information about the dependencies/packages with their version numbers that were installed for our react.js project.
-   `public/`  - This folder contains the HTML file and static assets such as images, svgs, and fonts for our React app.
-   `src/`  - This is a folder that contains our source code.
-   `src/index.js`  - This file is the **entry point** for our **reactjs application** and contains the logic for rendering our App component.
-   `src/app.js`  -  This file is our App component.
-   `src/styles/`  -  This file contains css, bootstrap and fonts file used in our app. 
- `src/components/Spinner`  - This file contains the loader html contents.
-  `src/components/BusinessErrorModal`  - This file contains the html integration for error response for create business API.
	-  `src/components/BusinessSuccessModal`  - This file contains the html integration for success response for create business API.
    - `src/components/ErrorModal`  - This file contains the html integration for error response of Create, Validate and Update method in Form1099K API 
    	- `src/components/SuccessModal`  - This file contains the html integration for success response of Create, Validate and Update method in Form1099K API .
	- `src/components/StatusModal`  - This file contains the html integration for Form1099K API status method response.
	- `src/components/DeleteModal`  - This file contains the html integration for Form1099K API cancel method response.
	- `src/components/TransmitModal`  - This file contains the html integration for Form1099K API transmit method response.
	- `src/components/ReviewModal`  - This file contains the html integration for previewing decryted pdf response from requestPdfUrl and requestDraftPdfUrl method of Form1099K API.
	- `src/components/ViewPdfUrlModal`  - This file contains the html integration for success response of Form1099K API requestPdfUrl method.
	- `src/components/RequestDraftPdfUrlErrorModal`  - This file contains the html integration for error response of Form1099K API requestPdfUrl method.
	- `src/components/RequestPdfUrlErrorModal`  - This file contains the html integration for error response of Form1099K API requestPdfUrl method.
  - `src/pages/`  -  The files in the pages folder indicate the route of the react application.
    -  `src/pages/ListBusinesses.js` - This file contains html integration for listing businesses by requesting list method in Business Endpoint.
    - `src/pages/CreateBusiness.js` - This file contains html integration for creating business by requesting create method in Business Endpoint when there is no records found in list business.
    - `src/pages/CreateForm1099k.js` - This file contains html integration for creating Form1099K by requesting create method in Form1099K Endpoint.
    - `src/pages/ListForm1099k.js` - This file contains html integration for listing Form1099K by requesting list method in Form1099K Endpoint.
    - `src/pages/UpdateForm1099k.js` - This file contains html integration for updating Form1099K by requesting update method in Form1099K Endpoint.
     - `src/utils/`  - This folder contains constants file which is used in create and update business.
	 - `src/utils/constants.js`  - This file stores the static json data. 

## Validate Form1099-K
It checks the request's 1099-K Forms to IRS business standards and field specifications before creating Form1099K. For validating Form1099K, pass the recipient and Form1099K data as input along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). After requesting validateForm method in Form1099K API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099K/ValidateForm] 

## Create Form1099-K
For creating Form1099-K, pass the recipient and Form1099K data as input along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API) against businessId. After requesting create method in Form1099K API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099K/Create]

## Update Form1099-K
For updating Form1099-K we are requesting get Form1099-K method from Form1099K API and fetch the data against SubmissionId and RecordId which is passed as query. After retrieving data we'll update it by requesting TBS Public API Base URL.
After requesting update method in Form1099K API, output will be shown in a modal and navigated to listForm1099NEC page.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099K/Update]

## Form1099-K Status
For displaying Form1099-K Status, pass the SubmissionId and RecordId as query along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). 
After requesting status method in Form1099K API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099K/Status]

## Delete Form1099-K 
For deleting TIN Matching Recipients, pass the SubmissionId and RecordId as query along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). Delete method in Form1099K API shows success response only if requested Form1099K is in not transmitted status else it will show error response. By passing these values we request to TBS Public API Base URL. 
After requesting delete method in Form1099K API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099K/Delete]

## Transmit Form1099-K 
For transmitting Form1099-K, pass the SubmissionId and RecordId as query along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). Transmit method in Form1099K API shows error response for already transmitted forms. By passing these values we request to TBS Public API Base URL. 
After requesting transmit method in Form1099K API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099K/Transmit]

## RequestPdfUrls Form1099-K 
For requestingPdfUrl of Form1099-K, pass the SubmissionId and RecordId as request body along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). requestPdfUrl method in Form1099K API shows success response only for transmitted forms else it shows error response. By passing these values we request to TBS Public API Base URL. 
After requesting requestPdfUrl method in Form1099K API, the response pdf urls will be shown in a table and by choosing anyone url ,it will be decrypted and shown as pdf in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099K/RequestPdfURLs]

In the above URLs, `{version}` is the endpoint version of TaxBandits API. (Version can be v1.6.0. v1.7.0, v1.7.1, {version}).

For more information, please refer: https://developer.taxbandits.com/