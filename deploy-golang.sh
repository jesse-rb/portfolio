#!/bin/bash
# Pipeline build and run locally

# Subrotine to handle errors
function handle_error {
    if [ $? -ne 0 ] # Check if previous command status code is not 0
    then
        echo 'pipeline -> fail ->' $1 # Outout an error message
        cd ../
        exit 1 # Exit pipeline with status 1
    fi
}

cd ./Golang

# Build
go build -o ./main.exe ./main.go
handle_error 'Golang -> Compilation'

# Run
./main.exe
handle_error 'Golang -> Runtime'

cd ../

exit 0