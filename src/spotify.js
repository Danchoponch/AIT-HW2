// spotify.js

function mostStreamed(records){
    const result = records.reduce((acc, elem) => {
        const accStreams = Number(acc['streams']);
        const elemStreams = Number(elem['streams']);

        if (isNaN(accStreams)) {
            return elem;
        }
        if (!isNaN(elemStreams) && elemStreams > accStreams) {
            return elem;
        }

        return acc;  
    });

    result['streams'] = Number(result['streams']);
    return result;
}

function getSongsByKey(records, key){
    const filtered = records.filter(elem => elem['key'] === key);

    return filtered.map(elem => {
        return elem['track_name'].toUpperCase() + ' ' + '('+ key + ')';
    });

}

function artistCounts(records){
    const filtered = records.filter(elem => Array.isArray(elem['artist(s)_name']) && elem['artist(s)_name'].length > 0);

    return filtered.reduce((acc1, elem) => {
       return elem['artist(s)_name'].reduce((acc2, artist) => {
            if(Object.prototype.hasOwnProperty.call(acc2,artist)){
                acc2[artist] += 1;
            }
            else{
                acc2[artist] = 1;
            }
            return acc2;
        }, acc1);

    }, {});

}

export{mostStreamed, getSongsByKey, artistCounts};