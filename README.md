# Nibs & iBeacon

![iBeacon](logo_ibeacon.png?raw=true) ![Nibs](logo_nibs.png?raw=true)

This README outlines the details of collaborating on this application.
A short introduction of this app could easily go here.
It's based on [Nibs](http://heroku.github.io/nibs/) and it was modified to communicate with iBeacon. 

This project is an example of what you can do with your iBeacon : geolocate your users in an enclosed space and send them messages automatically.
This application manages two iBeacons: one send a notification "Welcome to your store !" when you are connected or not; the second send the notification "You've got 1000 points. Discover our fidelity offers !" only when you are connected.

![Nibs screenshot](screenshot2.png?raw=true) ![Notification](screenshot.png?raw=true)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Python](https://www.python.org/) 

## Installation

* `git clone https://github.com/Sylpheo/nibs-ibeacon.git`
* Change into the new directory
* `npm install`

## Running / Development

* Make a note of the UUID, Minor, Major and the identifier of your iBeacon and change it into the `client/js/app.js` file.
* Change into the client directory
* `python -m SimpleHTTPServer 8000`
* Visit your app at [http://localhost:8000](http://localhost:8000).
* The database used is on an online heroku application. It is configured on the `client/js/config.js` file. You can use your own database or use a local database.

## Building the Cordova Shell

#### For Android users

* Make sure you have the Android SDK installed in your computer and its location set to the path.

#### For iOS users

* Make sure you have Xcode installed in your computer.

#### Install Cordova:
* `npm install -g cordova`

#### Create the Cordova application:
* `cordova create nibsibeacon-shell com.nibsibeacon.loyalty Nibs`

#### Adjust the contents of the www folder:
* `cd nibs-shell`
* `rm -rf www`
* `ln -s [path-to-nibs-ibeacon]/client www`

#### Install the Cordova plugins:
* `cordova plugins add org.apache.cordova.device`
* `cordova plugins add org.apache.cordova.console`
* `cordova plugins add org.apache.cordova.statusbar`
* `cordova plugins add org.apache.cordova.geolocation`
* `cordova plugins add org.apache.cordova.dialogs`
* `cordova plugins add org.apache.cordova.inappbrowser`
* `cordova plugins add org.apache.cordova.camera`
* `cordova plugins add org.apache.cordova.file-transfer`
* `cordova plugins add https://github.com/petermetz/cordova-plugin-ibeacon.git`
* `cordova plugins add https://github.com/katzer/cordova-plugin-local-notifications.git`

#### Add a platform:
* Android users: `cordova platforms add android`
* iOS users: `cordova platforms add ios`

#### Build the project:
* Android users: `cordova build android`
* iOS users: `cordova build ios`

Install the built app in a mobile device, start it and enjoy!
Make sure your iBeacon is turned on!
