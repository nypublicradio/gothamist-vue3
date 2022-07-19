#!/bin/sh
echo "@nypublicradio:registry=https://npm.pkg.github.com" > .npmrc
echo "//npm.pkg.github.com/:_authToken=$PAT" >> .npmrc
