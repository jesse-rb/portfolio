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

cd ./React

# Update dependencies
npm install
handle_error 'React -> Depencencies'

# Build
npm run build
handle_error 'React -> Compilation'

# Run
serve -s build
handle_error 'React -> Runtime'

cd ../

exit 0