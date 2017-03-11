# HeathAssist
This is a simple web app implementation of a health and wellness app that lets you track the weight, fat percent, diet notes and exercise notes
in an easy form and view the historic data in a line graph.

* Yet to Come
Sparate sections for nutirtion and exercise.

### Prerequisites
* Node.js version 4.x or later

### Installation
* Install Node.js dependencies by running `npm install` from the project's root folder
* Install Postgresql by running `npm install postgresql`
* Install nodemon by running `npm install -g nodemon`

### Setup database
* Make sure you have psql installed by typing `psql` in the terminal.
* Run `createDB health_assist` in your terminal to create a new database.
* Run 'export PGDATABASE=health_assist` to set the default database. You can add this env variable to the .bashrc ro .zshrc.
* Run `psql -f database.sql` to setup the tables.

### Starting
* Navigate to the projects's root folder: run `npm start` or `DEBUG=express* npm start`
* Go to (localhost:3000) in your browser
