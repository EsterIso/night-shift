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
    - darkmode() enable/disables darkmode, if filter is on then it gets turned off in darkmode
    - filter() enable/disables filter, if darkmode is on then it gets turned off in filter
    - reset() disables all changes and returns site to original style
    - save() saves current settings, {url : {darkmode : boolean, filter : boolean}}
    - autoset() checks if current site has saved settings, if so it will enable which ever mode is default
    - actively waits for popup response(button click) then will call necessary function

## Future Improvements
    - Code quality, remove redundancy, and seperation of concern
    - Make popup UI more modern
    - Add more filter settings(contrast, change color temp, brightness)
    - Add manage saved sites to allow users to edit and remove 