# TaxBandits Form1099-NEC API SDK
## Introduction
In this SDK, we demonstrate how to ValidateForm, Create, List, Update, Status, Delete, Transmit, RequestPdf, and RequestDraftPdfUrl of Form1099NEC using TaxBandits API. Here we use React JS as frontend and Node JS as backend.
## Cloning and Running the Application in local

 - Clone the project into your local machine.
    ```bash
    git clone https://github.com/TaxBandits/tbs-nodejs-sdk.git
    ```
 - Let's Navigate into the tbs-nodejs-sdk &rarr; form1099NEC-sdk folder.
 - Open the frontend and backend folder path in a separate integrated terminals, so we can run our frontend and backend in two different ports.

## Dependencies Used
### Runtime dependencies
#### Node JS Application
 - **express** - The application framework for building RESTful APIs with Node.js
 - **dotenv** - It is used to load environment variables.
 - **axios** - This library is used to make HTTP Calls.
 - **jsonwebtoken** - This library used for generating JWS (JSON Web Signature).
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
    - **TBS_PUBLIC_API_BASE_URL** - Base URL with which we can request Business and Form1099NEC Endpoints.
    - **TBS_API_CONSOLE_CLIENT_ID** - It is passed as input for generating JWT token.
    - **AWS_ACCESS_KEY_ID** - AWS account Credentials passed as input for decrypting pdf URL.
    - **BUCKET_NAME** - It is S3 Bucket name which is passed as input for decrypting pdf URL. You can find this in the Sandbox console site -> API Credentials.
    - **AWS_ENCRYPTION_KEY** - It is passed as input for decrypting pdf URL.
    - **TBS_API_CONSOLE_USER_TOKEN** - It is passed as input for generating JWT token.
	- **TBS_API_CONSOLE_CLIENT_SECRET_KEY** - It is passed as input for generating JWT token.
    >Note : You can get your own ClientId, Secret key and User Token from our TaxBandits Console Site and add it to the `.env` file in TBS_FORM1099NEC_BACKEND. [Goto TaxBandits Console Site](https://sandbox.taxbandits.com/)

-   `package.json`  - This file stores our application information such as name, version , dependencies and more on. 
-   `package-lock.json`  - This is a **lockfile** that contains information about the dependencies/packages with their version numbers that were installed for our node.js project.
-   `server.js`  - The **entry point** to our **nodejs application**. This file defines our express server. It also requires the routes and controllers we'll be using in the application.
-   `routes/`  - This folder contains the route definitions for our API.
    -  `routes/business/businessRoute.js`  - In this file we define the route for create, list and get business against generated JWT token.
	- `routes/form1099NEC/form1099NECRoute.js`  - In this file we define the route for create, validate form, update, list, get, status, delete, transmit, requestPdfUrl and requestDraftPdfUrls of Form1099NEC against BusinessId.
-   `controllers/`  - This folder is responsible for handling incoming requests and returning responses to the client.
    -   `controllers/user/userControllers.js`  - This file contains a function that defines the JWS and JWT response sent to a client when making a request to the server.
    - `controllers/business/createBusinessController.js`  - This file contains a function that defines the create business response sent to a client when making a request to the server.
    - `controllers/business/listBusinessController.js`  - This file contains a function that defines the list business response sent to a client when making a request to the server.
    - `controllers/business/getBusinessController.js`  - This file contains a function that defines the get business response sent to a client when making a request to the server.
    - `controllers/form1099NEC/createForm1099NECController.js`  - This file contains a function that defines the create Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/deleteForm1099NECController.js`  - This file contains a function that defines the delete Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/getForm1099NECController.js`  - This file contains a function that defines the get Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/listForm1099NECController.js`  - This file contains a function that defines the list Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/requestDraftPdfUrlController.js`  - This file contains a function that defines the request draft pdf url Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/requestPdfUrlsController.js`  - This file contains a function that defines the request pdf url Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/statusform1099NECController.js`  - This file contains a function that defines the status Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/transmitForm1099NECController.js`  - This file contains a function that defines the transmit Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/updateform1099NECController.js`  - This file contains a function that defines the update Form1099NEC response sent to a client when making a request to the server.
    - `controllers/form1099NEC/validateForm1099NECController.js`  - This file contains a function that defines the validate Form1099NEC response sent to a client when making a request to the server.

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
	-  `src/components/BusinessErrorModal`  - This file contains the html integration for error response for create business API.
	-  `src/components/BusinessSuccessModal`  - This file contains the html integration for success response for create business API.
	- `src/components/ErrorModal`  - This file contains the html integration for error response of Create, Validate and Update method in Form1099NEC API .
	- `src/components/SuccessModal`  - This file contains the html integration for success response of Create, Validate and Update method in Form1099NEC API .
	- `src/components/StatusModal`  - This file contains the html integration for Form1099NEC API status method response.
	- `src/components/DeleteModal`  - This file contains the html integration for Form1099NEC API cancel method response.
	- `src/components/TransmitModal`  - This file contains the html integration for Form1099NEC API transmit method response.
	- `src/components/ReviewModal`  - This file contains the html integration for previewing decryted pdf response from requestPdfUrl and requestDraftPdfUrl method of Form1099NEC API.
	- `src/components/ViewPdfUrlModal`  - This file contains the html integration for success response of Form1099NEC API requestPdfUrl method.
	- `src/components/RequestDraftPdfUrlErrorModal`  - This file contains the html integration for error response of Form1099NEC API requestPdfUrl method.
	- `src/components/RequestPdfUrlErrorModal`  - This file contains the html integration for error response of Form1099NEC API requestPdfUrl method.
	- `src/components/ReconStateAL`  - This file contains the html integration for Recipient's Recon State Details of State Alabama in FORM1099NEC API create method and update method.
	- `src/components/ReconStateWV`  - This file contains the html integration for Recipient's Recon State Details of State West Virginia in FORM1099NEC API create method and update method.
- `src/pages/`  -  The files in the pages folder indicate the route of the react application.
    -  `src/pages/ListBusiness.js` - This file contains html integration for listing businesses by requesting list method in Business Endpoint.
    - `src/pages/CreateBusiness.js` - This file contains html integration for creating business by requesting create method in Business Endpoint when there is no records found in list business.
    - `src/pages/CreateForm1099nec.js` - This file contains html integration for creating Form1099NEC by requesting create method in Form1099NEC Endpoint.
    - `src/pages/ListForm1099NEC.js` - This file contains html integration for listing Form1099NEC by requesting list method in Form1099NEC Endpoint.
    - `src/pages/UpdateForm1099NEC.js` - This file contains html integration for updating Form1099NEC by requesting update method in Form1099NEC Endpoint.
 - `src/utils/`  - This folder contains constants file which is used in create and update business.
	 - `src/utils/constants.js`  - This file stores the static json data.
     
## Validate Form1099-NEC
It checks the request's 1099-NEC Forms to IRS business standards and field specifications before creating Form1099NEC. For validating Form1099NEC, pass the recipient and Form1099NEC data as input along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). After requesting validateForm method in Form1099NEC API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/ValidateForm]

## Create Form1099-NEC
For creating Form1099-NEC, pass the recipient and Form1099NEC data as input along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API) against businessId. After requesting create method in Form1099NEC API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/Create]

## List Form1099-NEC
For listing Form1099-NEC, BusinessId is passed as query parameter along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API).
After requesting list method in Form1099-NEC, the response is shown as a table.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/List]

## Update Form1099-NEC
For updating Form1099-NEC we are requesting get Form1099-NEC method from Form1099NEC API and fetch the data against SubmissionId and RecordId which is passed as query. After retrieving data we'll update it by requesting TBS Public API Base URL.

After requesting update method in Form1099NEC API, output will be shown in a modal and navigated to listForm1099NEC page.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/Update]

## Form1099-NEC Status
For displaying Form1099-NEC Status, pass the SubmissionId and RecordId as query along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). 
After requesting status method in Form1099NEC API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/Status]

## Delete Form1099-NEC 
For deleting TIN Matching Recipients, pass the SubmissionId and RecordId as query along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). Delete method in Form1099NEC API shows success response only if requested Form1099NEC is in not transmitted status else it will show error response. By passing these values we request to TBS Public API Base URL. 
After requesting delete method in Form1099NEC API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/Delete]

## Transmit Form1099-NEC 
For transmitting Form1099-NEC, pass the SubmissionId and RecordId as query along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). Transmit method in Form1099NEC API shows error response for already transmitted forms. By passing these values we request to TBS Public API Base URL. 
After requesting transmit method in Form1099NEC API, the response will be shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/Transmit]

## RequestDraftPdfUrl Form1099-NEC 
For requestingDraftPdfUrl of Form1099-NEC, pass the RecordId as request body along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). requestDraftPdfUrl method in Form1099NEC API shows success response only for not transmitted forms else it shows error response. By passing these values we request to TBS Public API Base URL. 
After requesting requstingDraftPdfUrl method in Form1099NEC API, the response pdf url will be decrypted and pdf is shown in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/RequestDraftPdfUrl]

## RequestPdfUrls Form1099-NEC 
For requestingPdfUrl of Form1099-NEC, pass the SubmissionId and RecordId as request body along with Access Token in the header as Bearer Token (Generated using TaxBandits OAuth authentication API). requestPdfUrl method in Form1099NEC API shows success response only for transmitted forms else it shows error response. By passing these values we request to TBS Public API Base URL. 
After requesting requestPdfUrl method in Form1099NEC API, the response pdf urls will be shown in a table and by choosing anyone url ,it will be decrypted and shown as pdf in a modal.

**TBS Public API Base URL:** [https://testapi.taxbandits.com/{version}/Form1099NEC/RequestPdfURLs]

 In the above URLs, `{version}` is the endpoint version of TaxBandits API. Likely v1.6.1, v1.7.0, v1.7.1, v1.7.3.
 
For more information, please refer:[Developer.taxbandits.com](https://developer.taxbandits.com/)