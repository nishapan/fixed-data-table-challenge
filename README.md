## To use

The React frontend is hosted on Node.js HTTP server. 
The project is hosted on Heroku: https://cryptic-cliffs-56169.herokuapp.com

The html entry point is: public/index.html

The logic for fixed-data-table is in: public/scripts/fdt.js

the code makes two "api" calls to retrieve ads and ads_metrics data from json files during intialization, it then creates a composite data joining ads[i].name to ads_metrics.rows[i], and finally displays the content using React's fixed-data-table.

