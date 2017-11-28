# Video eLab  
A qualtrics-integrated webapp for exposing online study participants to A/V stimuli


## Features
- seamlessly move from your qualtrics pre-survey, through your A/V stimuli, and on to your post-survey
- ensure that your participants can see and hear your stimulus with calibration tasks
- confirm that your participants paid attention by reviewing A/V recordings of their sessions in Google Drive


## Demo
[Session Demo](https://av-elab.herokuapp.com)


## Technologies
- Node 8.4
- Angular 4
- Mongo DB 3.2
- Google Drive API v3
- it should be noted that this app employs an experimental web technology called [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API). As such, this app will only work on the latest [Chrome browser](https://www.google.ca/chrome/browser/desktop/index.html). 

## Deploying to Heroku

1. (Create a Heroku account)[https://signup.heroku.com/]
2. (Create a google service account for storing the a/v data)[https://developers.google.com/api-client-library/php/auth/service-accounts#creatinganaccount]
3. (Clone this project into a directory on your machine)[https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository]
4. (Create a Heroku project and deploy this code to it)[https://devcenter.heroku.com/articles/git]
5. (Add the mLab add-on to your heroku project resources)[https://devcenter.heroku.com/articles/managing-add-ons#using-the-dashboard]
6. (Set your config variables)[https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application]
  - ADMIN_USERNAME = <the username for admin access>
  - ADMIN_PASSWORD = <the password for admin access>
  - MONGODB_URI = <the uri for db access. This should be populated automatically when you add the mLab resource>
  - SECRET_TOKEN = <the secrect token used to generate tokens for site security. (Generate one here!)[https://randomkeygen.com/]>
  - GDRIVE_CREDENTIALS_JSON = <The contents of the json file that you downloaded when you created the google service account>

## Usage

Note: your `<base_url>` is the url for your webserver (e.g. localhost:4200, or your heroku deployment's url).

### 1. Setup your Qualtrics post-survey

  - Login to your Qualtrics account and create or edit your post-survey
  - In your **Survey Flow**, as your first element, [add a new **Embedded Data** element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/)
  - Add 3 empty fields to the **Embedded Data** element: `study`, `subject`, and `stop-time`
    - These fields will be filled by the eLab via the url query parameters when it redirects to your post-survey

### 2. Create a new study

  - Navigate to the admin page at `<base_url>/admin` and login with the admin credentials 
  - In the **Studies** section, enter a **Study ID** of your choice to identify your study.
  - In your browser, navigate to the youtube video that you want to use. 
  The url should be of the format `https://www.youtube.com/watch?v=<youtube_id>`. 
  Copy and paste the `<youtube_id>` into your new study's YouTube ID field.
  - Click the **Edit Instructions** button and enter your pre-video briefing text into the popup
  - Enter the url that you want to redirect your participants to in the **Post-Survey URL** field
    - When the participant stops the video or the video ends, they will be redirected to this url
    - This url will have a query string appended to it of the format: 
  `?study=<the_study_id>&subject=<a_unique_subject_id>&stop-time=<when_the_video_was_stopped>`
  - Click the **Add** button
  - Copy your generated **Study Key** to your clipboard for the pre-survey setup
  - In the **Shares** section enter a **Gmail**
    - This shares the app's session recordings with the given gmail user
    - They can access these recordings by logging into their personal Google Drive and clicking **Shared with me**
      - It will show as a folder called **eLab**
  
### 3. Setup your Qualtrics pre-survey

  - Login to your Qualtrics account and create or edit your pre-survey
  
  - In your **Survey Flow**, as your first element [add a new **Embedded Data** element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/)
  - Add 2 fields to the **Embedded Data** element: `study`, and `subject`
  - Enter your study's id into the `study` field, and leave the `subject` field blank
    - the `subject` field will be populated by the **Web Service** element (below)
  
  - At the end of your **Survey Flow**, before your **End of Survey** element [add a new **Web Service** element](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/advanced-elements/web-service/)
  - In the URL field, enter `<base_url>/api/session/generate`
  - Add a parameter called `token` with the **Study Key** that was generated for your study as the value
  - Then click **Test URL**
  - If it is successful, you will be presented with the option to add `subject` as embedded data
  - If it is not successful, make sure that your eLab server is running and the url is correct
  - Click **Add Embedded Data**
  
  - On your **End of Survey** element, click **Customize**
  - In the popup that appears, check off the **Redirect to a URL** option
  - In the redirect field, enter a URL of this form: `<base_url>?study=${e://Field/study}&subject=${e://Field/subject}`
    - this syntax swaps the values from your **Embedded Data** element into the url's query parameters

### 4. Do a test run of your study
  
  - On the **Studies** section of the admin dashboard, you can click the `test` button to test a particular study
    - the a/v data can be found under a subject named `test` in the google drive folder for the study
  - you should also walk through your survey process from pre-survey to post-survey to ensure that the flow is as expected
  

# Cool stuff
  - query parameters get stripped from url on entry
  - route guards!
  - observable getUserMedia
  - using animationFrame schedule
  - writing an observable service that subscribes to other observables

# Experimental Tech
https://developer.mozilla.org/en-US/docs/Web/API/Window/URL
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
