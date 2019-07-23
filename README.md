# Mobile Flashcards App

This is my solution for the Mobile Flashcards App for Udacity's React Native course. 
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).


## How to start App

To get started the application:

* install all project dependencies with `yarn install`
* start the development server with `yarn start`


## Redux : State managed by Store

This app uses Redux.
Following state is managed by store:

### questions
Questions with answeres categoriezed in Decks

### questions
Question info.
```
let questions = {
    
    deckTitle: {
        title: deckTitle,
        questions: [{
            question: questionText,
            answer: answerText,
        },],
    },
}
```

## Folder Structure and Components

```bash
|-- actions
|   `-- index.js
|-- assets
|   `-- images
|       `-- logo.svg
|-- components
|   |-- App.js          # XXX
|   |-- XXXXX.js        # XXXXX
|   `-- XXXXX.js        # XXXXX
|-- index.js
|-- reducers
|   `-- index.js
`-- utils
    |-- _DATA.js
    |-- api.js
    `-- helpers.js

```
