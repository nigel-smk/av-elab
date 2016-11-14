# Video eLab
## A qualtrics-integrated webapp for exposing online study participants to A/V stimuli

### Features
- seamlessly move from your qualtrics pre-survey, through your A/V stimuli, and on to your post-survey
- ensure that your participants can see and hear your stimulus with calibration tasks
- confirm that your participants paid attention by reviewing A/V recordings of their sessions in Google Drive

### Demo
[Admin Page](https://sleepy-mountain-8012.herokuapp.com/admin)
  - login with demo/password
  
[Session Demo](https://sleepy-mountain-8012.herokuapp.com/run/test)

### Technologies
- Node 6.9
- Angular 1.6
- Mongo DB 3.2
- Google Drive

### Getting started on your local machine

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
  - Check "Furnish a new private key" and choose a Key type of "JSON"
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

### Usage

Note: your `<base_url>` is the url for your webserver (e.g. localhost:3030, or your heroku deployment's url).

#### 1. Setup your Qualtrics post-survey

  - Login to your Qualtrics account and create or edit your post-survey
  - In your "Survey Flow", as your first element, [add a new "Embedded Data" element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/)
  - Add 3 empty fields to the "Embedded Data" element: "sid", "pid", and "stopTime"
  - These fields will be filled by the webapp via the url query parameters when it redirects to your post-survey

#### 2. Create a new study

  - Navigate to the admin page at `<base_url>/admin` and login with the credentials you provided in `admin.json`
  - In the 'Manage Studies' section, enter a 'Study ID' of your choice to identify your study.
  - In your browser, navigate to the youtube video that you want to use. 
  The url should be of the format `https://www.youtube.com/watch?v=<youtube_id>`. 
  Copy and paste the `<youtube_id>` into your new study's YouTube ID field.
  - Click the 'Edit Instructions' button and enter your pre-video briefing text into the popup
  - Enter the url that you want to redirect your participants to in the 'Post-Survey URL' field. 
  When the participant stops the video or the video ends, they will be redirected to this url.
  The url will have a query string appended to it of the format 
  `?sid=<the_study_id>&pid=<a_unique_participant_id>&stopTime=<when_the_video_was_stopped>`
  - Click the 'Add' button
  - Copy your generated "Study Key" to your clipboard for the pre-survey setup
  
#### 3. Setup your Qualtrics pre-survey

  - Login to your Qualtrics account and create or edit your pre-survey  
  
  - In your "Survey Flow", as your first element, [add a new "Embedded Data" element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/)
  - Add 2 fields to the "Embedded Data" element: "sid", and "pid"
  - Enter your study's id into the "sid" field, and leave the pid field blank
  - the "pid" field will be populated by the "Web Service" element (below)
  
  - At the end of your "Survey Flow", before your "End of Survey" element [add a new "Web Service" element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/advanced-elements/web-service/)
  - In the URL field, enter `<base_url>/api/auth/generateKey`
  - Add a parameter called "studyKey" with the Study Key that was generated for your study as the value
  - Then click "Test URL"
  - If it is successful, you will be presented with the option to add "pid" as embedded data
  - If it is not successful, make sure that your eLab server is running and the url is correct
  - Click "Add Embedded Data"  
  
  - On your "End of Survey" element, click "Customize"
  - In the popup that appears, check off the "Redirect to a URL" option
  - In the redirect field, enter a URL of this form: `<base_url>?sid=${e://Field/sid}&pid=${e://Field/pid}`  
    - this syntax swaps the values from your "Embedded Data" element into the url's query parameters

#### 4. Do a test run of your study



### TO DO

#### UI design
- center all text and video
- layout elements nicely
- show users a "Please use a larger screen" page when screen is too small. (Can that be done with css only?)
- determine physical dimensions for the app that will allow it to be the same size on most desktop or laptop screens.


#### Admin Page
- The "active" checkbox on the study management pane needs to be able to prevent the running of studies that are inactive
- The admin password box should be obfuscated
- controls need to be put on the inputs to prevent things like duplicate studies and duplicate shares
- when an item in a row's table is clicked it should set that field into edit mode. Change the new/delete button to a save button.

#### Study Run Page
#### Calibration phase
- The participant number input could probably use some highlighting to indicate that it must be done.
  - maybe grey out the calibration phase until the participant has entered and submitted a valid participant number for the study

####  Survey phase
- need larger text input field.
- a limiter for the length of the text that can be entered. Does not need a char counter but it might be nice.
- might need to add a feature to the Study Management pane so that an experminter can choose what the final survey question will be and maybe add a second question.

#### Compatibility
- Browser priority: Chrome, Firefox, IE, Edge?
- Chrome works, Firefox needs a little work. IE is probably not worth it because it will require flash for the A/V
- Need to check the user's browser type and inform them that the app will not work with their browser.

#### Security
- AWS files are open access. Could result in unwarranted access => charges

#### Unexpected User Behaviour Handling
- prevent user from restarting app once they have begun
thankyou
    redirect option
