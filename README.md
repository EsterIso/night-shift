# Night Shift - Darkmode Extension for FireFox

I am creating this darkmode extension because I want a customized solution for adding darkmode or a custom filter on various sites while using Firefox. The main motivation came from dealing with multiple extensions having a free trial or their free solution not being as useful, so I am creating something that meets my needs and wants for a darkmode extension. 

## Project Structure
```
└── 📁night-shift
    └── 📁icons
        ├── nightshift-logo.svg
    └── 📁popup
        ├── settings.css
        ├── settings.html
        ├── settings.js
    ├── darkmode.css
    ├── manifest.json
    ├── nightshift.js
    └── README.md
```

## Current Solution
### ./popup/settings.js 
    - Retrieves buttons container in popup and adds an eventListener waiting for user to interact with one of the options. 
    - User's click sends event.target.id to activateNightShift with the type as parameter.
    - activateNightShift retrieves the current active tab, then checks if tab exist
    - activateNightShift uses switch case to send proper response to nightshift.js

### ./nightshift.js
    - 