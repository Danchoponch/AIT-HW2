// report.js
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as hoffy from '../src/hoffy.js';
import * as sp from '../src/spotify.js';
import * as svg from '../src/drawing.js';

const configFile = process.argv[2]; //works if run from root directory and provide data/spotify-2023.csv


function readAndParseCSV(configFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(configFile, 'utf8', (err, data) => {
            if (err) {return reject(err);}
            
            parse(data, {}, (err, parsedData) => {
                if (err) {return reject(err);}

                const dataObj = {
                    'headers': parsedData[0],
                    'rows': parsedData.slice(1)
                };

                let records = hoffy.rowsToObjects(dataObj);

                records = records.map((elem) => {
                    return hoffy.stringFieldToList(elem, 'artist(s)_name');
                });

                resolve(records);
            });
        });
    });
}


(async () => {
    try {
        const records = await readAndParseCSV(configFile);
        console.log(sp.mostStreamed(records));
        console.log(sp.getSongsByKey(records, "D#"));
        const artistCount = sp.artistCounts(records);

        const entries = Object.entries(artistCount);
        const freqArr = entries.map(elem => {
            return elem[1];
        });

        freqArr.sort((a,b)=> b - a);

        const topThree = freqArr.slice(0,3);

        const topArtists = entries
        .filter(entry => topThree.includes(entry[1])) // Use entry[1] to access freq directly
        .reduce((obj, entry) => {
            obj[entry[0]] = entry[1]; // entry[0] is the artist
            return obj;
        }, {});

        console.log(topArtists);

        const root = new svg.RootElement();
        const taylor = new svg.RectangleElement(0, 0, 70, 5*topArtists['Taylor Swift'], 'blue');
        const badBunny = new svg.RectangleElement(100, 0, 70, 5*topArtists['Bad Bunny'], 'red');
        const weekend = new svg.RectangleElement(200, 0, 70, 5*topArtists['The Weeknd'], 'green');

        const taylorLbl = new svg.TextElement(0, 5*topArtists['Taylor Swift'] + 20, 14, 'black', 'Taylor Swift');
        const badBunnyLbl = new svg.TextElement(100, 5*topArtists['Bad Bunny'] + 20, 14, 'black', 'Bad Bunny');
        const weekendLbl = new svg.TextElement(200, 5*topArtists['The Weeknd'] + 20, 14, 'black', 'The Weeknd');

        root.addChild(weekend);
        root.addChild(taylor);
        root.addChild(badBunny);
        root.addChild(taylorLbl);
        root.addChild(badBunnyLbl);
        root.addChild(weekendLbl);
        console.log(root.toString());
        root.write('artists.svg', () => console.log('done writing!'));


    } catch (err) {
        console.error(err);
    }
})();

