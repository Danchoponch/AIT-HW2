// hoffy.js

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

    let newArr = s3.filter(elem => s3.indexOf(elem)%2 == 0)

    return newArr
}

function myFlatten (arr2d){ 
    return arr2d.reduce((acc, subArray) => acc.concat(subArray), []);
  }


function maybe(fn){
    return (...args) => {
        let check = args.filter((elem) => elem !== undefined && elem !== null);

        if(args.length == check.length){
            return fn(...args);
        }
        else{
            return undefined;
        }
    }
}


function filterWith(fn){
    return (arg) => {
        return arg.filter((elem) => fn(elem))
    }
}

function repeatCall(fn, n, arg){
    if(n===0){
        return;
    }
    fn(arg);
    repeatCall(fn, n-1, arg)
}

export {filterWith, getEvenParam, myFlatten, maybe, repeatCall}