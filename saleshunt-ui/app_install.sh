#!/bin/bash

brew unlink node
brew install node012
sudo npm install -g cordova ionic bower gulp
npm install
bower install
sudo ionic build ios
cd ..
sudo chmod -R 770 saleshunt-ui/
