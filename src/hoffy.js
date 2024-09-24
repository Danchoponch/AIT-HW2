// hoffy.js
import * as fs from 'fs';

function getEvenParam(s1, s2, ...s3){

    if (s1 === undefined){
        return [];
    }

    if (s2 === undefined){
        s3.unshift(s1);
    }
    else{
        s3.unshift(s1,s2);
    }

    const newArr = s3.filter(elem => s3.indexOf(elem)%2 === 0);

    return newArr;
}

function myFlatten (arr2d){ 
    return arr2d.reduce((acc, subArray) => acc.concat(subArray), []);
  }


function maybe(fn){
    return (...args) => {
        const check = args.filter((elem) => elem !== undefined && elem !== null);

        if(args.length === check.length){
            return fn(...args);
        }
        else{
            return undefined;
        }
    };
}


function filterWith(fn){
    return (arg) => {
        return arg.filter((elem) => fn(elem));
    };
}

function repeatCall(fn, n, arg){
    if(n===0){
        return;
    }
    fn(arg);
    repeatCall(fn, n-1, arg);
}

function limitCallsDecorator(fn, n){
    let cnt = n;
    return (...args) => {
        if(cnt === 0){
            return undefined;
        }
        else{
            cnt--;
            return fn(...args);
        }
    };
}

function myReadFile(fileName, successFn, errorFn){
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            errorFn(err);
        }
        else{
            successFn(data);
        }
    });
}

function stringFieldToList(data, key){
    const arr = data[key].split(',').map(s => s.trim());

    data[key] = arr;

    return data;
}

function rowsToObjects(data){
    const headers = data['headers'];
    const rows = data['rows'];
    return rows.map(row => 
        headers.reduce((acc, header, index) => {
            acc[header] = row[index]; 
            return acc;
        }, {})
    );
}

export {filterWith, getEvenParam, myFlatten, maybe, repeatCall, limitCallsDecorator, myReadFile, stringFieldToList, rowsToObjects};