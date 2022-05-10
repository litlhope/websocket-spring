#!/bin/bash

PROJECT_ROOT=$(pwd)
echo "$PROJECT_ROOT"

echo "===== Build front"
cd ./websocket-fe
rm -Rf build
npm run build

echo "===== Delete old front(in backend)"
cd $PROJECT_ROOT
rm -Rf websocket-be/src/main/resources/static/*

echo "===== Copy new front(in backend)"
cd $PROJECT_ROOT
cp -Rf websocket-fe/build/* websocket-be/src/main/resources/static/

echo "===== Build backend"
cd $PROJECT_ROOT
cd ./websocket-be
./gradlew clean bootJar

echo "===== Build result"
ls -al build/libs/

cd $PROJECT_ROOT
echo "Please run 'docker-compose build' and 'docker-compose up -d'"
