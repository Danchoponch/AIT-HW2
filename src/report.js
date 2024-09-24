// report.js
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as hoffy from '../src/hoffy.js';

let records;
fs.readFile('data/spotify-2023.csv', 'utf8', (err, data) => {
    if(err){
        console.log(err);
    }
    else{
        parse(data, {}, (err, parsedData) => {
            if (err){
                console.log(err);
            }
            else{
                // console.log(parsedData);

                const dataObj = {
                    'headers': parsedData[0],
                    'rows': parsedData.slice(1)
                };

                records = hoffy.rowsToObjects(dataObj);
                
                records = records.map((elem) => {
                    return hoffy.stringFieldToList(elem, 'artist(s)_name');
                });

                console.log(records);
                
            }
        });
    }
});

