# Web Dev Starter Code

Wylie Hansen  
CS 408 - Week 11
October 31, 2024

## Overview

This webpage is a simple interface for a data table hosted on AWS that provides
basic put, get, and delete functionality, made as an exercise in full-stack
development.

## Running

This program can be run on a local server through VSCode's preview function.
Note that the preview function is only available with the Live Preview extension
installed.

With the extension installed, open a preview of index.html with the "Show
Preview" button, which should be in the upper right corner of the editor
workspace. You can then copy the url into your browser of choice.

## Usage

This webpage can display and update a data table running on AWS. The "Load
Data" button will fetch the table's current data and load it into an HTML
table when it's ready. At the end of each row in the table, there's a button
that you can click to delete that row's data entry. You can also add new
data entries with the form just under the Load Data button. Note that the ID
and Price values must be numbers.

In order to see any changes you've made to the data reflected in the display,
you'll have to reolad the table with the "Refresh Data" button.

## Sources and Credits

- Help with Javascript, HTML, and CSS syntax: https://developer.mozilla.org/en-US/
- Help with a button error: https://stackoverflow.com/questions/30603981/onclick-event-triggering-onload-for-button
- Accessing html forms in javascript: https://www.learnwithjason.dev/blog/get-form-values-as-json/
- Using qunit with an async function: https://qunitjs.com/api/assert/async/
- Starter Code: https://github.com/shanep/cs408-lab-11

