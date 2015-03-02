# Nibs & iBeacon

This README outlines the details of collaborating on this application.
A short introduction of this app could easily go here.

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

* Change into the client directory
* `python -m SimpleHTTPServer 8000`
* Visit your app at [http://localhost:8000](http://localhost:8000). 

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

Install the built app in a mobile device, start it and enjoy !
Make sure your iBeacon is turned on !
