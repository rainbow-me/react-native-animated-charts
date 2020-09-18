#!/bin/bash

if [ $1 == "from" ]
then
  cp -R ../../r/src/react-native-animated-charts/src/* src
  cp -R ../../r/src/react-native-animated-charts/Example/src/* Example/src
fi

if [ $1 == "to" ]
then 
  cp -R src/* ../../r/src/react-native-animated-charts/src
  cp -R Example/src/* ../../r/src/react-native-animated-charts/Example/src
fi 
