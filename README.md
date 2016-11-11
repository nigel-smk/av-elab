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

1) Install [Node.js](https://nodejs.org/en/download/) to run the web server
2) Create a free account on [mLab](https://mlab.com/signup/) for hosting your Mongo Database
3) Login to mLab and create a new Single-node Sandbox database
4) Create a new user for this database with a username and password of your choice
5) Copy the mongodb:// url, swapping the <dbuser> and <dbpassword> for the ones you just created
6) Create a file called `mLab.json` in the project's `credentials` folder and paste your mongodb url in this format
    ```
    {
      "URL": "<your_url_here>",
      "user": "<your_database_username_here>",
      "password": "<your_database_password_here>"
    }
    ```
3) Gain access to the [Google API Console](https://console.developers.google.com) using your google account
4) In the API Console, create a new project called "eLab" and then enable the Google Drive API for it
5) Create a [service account](https://console.developers.google.com/permissions/serviceaccounts) for your eLab project
  - Service account name: videoStore
  - Role: Owner
  - Check "Furnish a new private key" and choose a Key type of "JSON"
6) Move the JSON file that gets downloaded into the `credentials` folder of the project and rename it to `googleDrive.json`
7) Create a file called `jwtSecret.json` in the project's `credentials` folder enter text in this format:
    ```
    {
      "secret": "<some_secret_string_of_your_choice>"
    }
    ```
8) From the root folder, enter `npm install` into the terminal to install the dependencies for the server project
9) From the root folder, enter `node server.js` to start the web server

Demo:


# peterson-lab
Study-runner for showing video a stimulus and taking survey responses. Intended for use on amazon's mechanical turk. 

Written with the MEAN stack. Employs Amazon S3 cloud for video hosting and Google Drive for image and long-term data storage. 

#TO DO

##UI design
- center all text and video
- layout elements nicely
- show users a "Please use a larger screen" page when screen is too small. (Can that be done with css only?)
- determine physical dimensions for the app that will allow it to be the same size on most desktop or laptop screens.


##Admin Page
- The "active" checkbox on the study management pane needs to be able to prevent the running of studies that are inactive
- The admin password box should be obfuscated
- controls need to be put on the inputs to prevent things like duplicate studies and duplicate shares
- when an item in a row's table is clicked it should set that field into edit mode. Change the new/delete button to a save button.

##Study Run Page
###Calibration phase
- The participant number input could probably use some highlighting to indicate that it must be done.
  - maybe grey out the calibration phase until the participant has entered and submitted a valid participant number for the study

###Survey phase
- need larger text input field.
- a limiter for the length of the text that can be entered. Does not need a char counter but it might be nice.
- might need to add a feature to the Study Management pane so that an experminter can choose what the final survey question will be and maybe add a second question.

##Compatibility
- Browser priority: Chrome, Firefox, IE, Edge?
- Chrome works, Firefox needs a little work. IE is probably not worth it because it will require flash for the A/V
- Need to check the user's browser type and inform them that the app will not work with their browser.

##Security
- AWS files are open access. Could result in unwarranted access => charges

##Unexpected User Behaviour Handling
- prevent user from restarting app once they have begun
thankyou
    redirect option
