# Video eLab  
A qualtrics-integrated webapp for exposing online study participants to A/V stimuli


## Features
- seamlessly move from your qualtrics pre-survey, through your A/V stimuli, and on to your post-survey
- ensure that your participants can see and hear your stimulus with calibration tasks
- confirm that your participants paid attention by reviewing A/V recordings of their sessions in Google Drive


## Demo
[Admin Page](https://sleepy-mountain-8012.herokuapp.com/admin)
  - login with demo/password
  
[Session Demo](https://sleepy-mountain-8012.herokuapp.com/run/test)


## Technologies
- Node 6.9
- Angular 1.6
- Mongo DB 3.2
- Google Drive
- it should be noted that this app employs an experimental web technology called [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API). As such, this app will only work on the latest [Chrome browser](https://www.google.ca/chrome/browser/desktop/index.html). 


## Getting started on your local machine

1. Install [Node.js](https://nodejs.org/en/download/) to run the web server
2. Create a free account on [mLab](https://mlab.com/signup/) for hosting your Mongo Database
3. Login to mLab and create a new Single-node Sandbox database
4. Create a new user for this database with a username and password of your choice
5. Copy the mongodb:// url, swapping the <dbuser> and <dbpassword> for the ones you just created
6. Create a file called `mLab.json` in the project's `credentials` folder and paste your mongodb url in this format  
    ```
    {  
      "URL": "<your_url_here>",  
      "user": "<your_database_username_here>",  
      "password": "<your_database_password_here>"  
    }  
    ```
7. Gain access to the [Google API Console](https://console.developers.google.com) using your google account
8. In the API Console, create a new project called "eLab" and then enable the Google Drive API for it
9. Create a [service account](https://console.developers.google.com/permissions/serviceaccounts) for your eLab project
  - Service account name: videoStore
  - Role: Owner
  - Check **Furnish a new private key** and choose a Key type of **JSON**
10. Move the JSON file that gets downloaded into the `credentials` folder of the project and rename it to `googleDrive.json`
11. Create a file called `jwtSecret.json` in the project's `credentials` folder enter text in this format:
    ```
    {  
      "secret": "<some_secret_string_of_your_choice>"  
    }  
    ```
12. Create a file called `admin.json` in the project's `credentials` folder and enter text in this format:
  ```
  {  
    "username": "<username_of_your_choice>",  
    "password": "<password_of_your_choice>"  
  }  
  ```
13. From the root folder, enter `npm install` into the terminal to install the dependencies for the server project
14. From the root folder, enter `node server.js` to start the web server


## Deploying the eLab to Heroku

**Coming soon**


## Usage

Note: your `<base_url>` is the url for your webserver (e.g. localhost:3030, or your heroku deployment's url).

### 1. Setup your Qualtrics post-survey

  - Login to your Qualtrics account and create or edit your post-survey
  - In your **Survey Flow**, as your first element, [add a new **Embedded Data** element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/)
  - Add 3 empty fields to the **Embedded Data** element: `sid`, `pid`, and `stopTime`
    - These fields will be filled by the webapp via the url query parameters when it redirects to your post-survey

### 2. Create a new study

  - Navigate to the admin page at `<base_url>/admin` and login with the credentials you provided in `admin.json`
  - In the **Manage Studies** section, enter a **Study ID** of your choice to identify your study.
  - In your browser, navigate to the youtube video that you want to use. 
  The url should be of the format `https://www.youtube.com/watch?v=<youtube_id>`. 
  Copy and paste the `<youtube_id>` into your new study's YouTube ID field.
  - Click the **Edit Instructions** button and enter your pre-video briefing text into the popup
  - Enter the url that you want to redirect your participants to in the **Post-Survey URL** field
    - When the participant stops the video or the video ends, they will be redirected to this url
    - This url will have a query string appended to it of the format: 
  `?sid=<the_study_id>&pid=<a_unique_participant_id>&stopTime=<when_the_video_was_stopped>`
  - Click the **Add** button
  - Copy your generated **Study Key** to your clipboard for the pre-survey setup
  - In the **Share AV Data** section enter a **Name** and **Gmail**, and select a **Permission**
    - The permission should always be `reader`
    - This shares the app's session recordings with the given gmail user
    - They can access these recordings by logging into their personal Google Drive and clicking **Shared with me**
      - It will show as a folder called **eLab**
  
### 3. Setup your Qualtrics pre-survey

  - Login to your Qualtrics account and create or edit your pre-survey
  
  - In your **Survey Flow**, as your first element [add a new **Embedded Data** element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/)
  - Add 2 fields to the **Embedded Data** element: `sid`, and `pid`
  - Enter your study's id into the `sid` field, and leave the `pid` field blank
    - the `pid` field will be populated by the **Web Service** element (below)
  
  - At the end of your **Survey Flow**, before your **End of Survey** element [add a new **Web Service** element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/advanced-elements/web-service/)
  - In the URL field, enter `<base_url>/api/auth/generateKey`
  - Add a parameter called `studyKey` with the **Study Key** that was generated for your study as the value
  - Then click **Test URL**
  - If it is successful, you will be presented with the option to add `pid` as embedded data
  - If it is not successful, make sure that your eLab server is running and the url is correct
  - Click **Add Embedded Data**
  
  - On your **End of Survey** element, click **Customize**
  - In the popup that appears, check off the **Redirect to a URL** option
  - In the redirect field, enter a URL of this form: `<base_url>?sid=${e://Field/sid}&pid=${e://Field/pid}`
    - this syntax swaps the values from your **Embedded Data** element into the url's query parameters

### 4. Do a test run of your study

  - Walk through your survey process from pre-survey to post-survey to ensure that the flow is as expected
  
  - If you want to test run the app only, first generate a `pid` by entering `<base_url>/api/auth/generateKey?studyKey=<your_generated_study_key>` into your browser
  - Copy the `pid` from the response that you recieve in your browser
  - To start the webapp, in a Chrome browser enter `<base_url>?sid=<your_study_id>&pid=<your_copied_pid>`
