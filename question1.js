
// Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20],
// make a function that organizes these into individual array that is ordered.
// For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2],4,5,10,[20,20],391,392,591].
// Bonus: Make it so it organizes strings differently from number types.
// i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

//I also solved the bonus one above. 
//So the solution below can cover 3 cases.
//1st case : only numbers
//2nd case : only strings
//3rd case : numbers & strings


const input = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20,"1","2","1","20"];

let dividedInput = divideIntoNumAndStr(input);
console.log(dividedInput);

if(Array.isArray(dividedInput[0])) {
    //if there are 2 types of arrays(only numbers and only strings) in dividedInput array

    let finalRes = dividedInput.map(finalSolution);
    console.log(finalRes);
} else {
    let finalRes = finalSolution(dividedInput);
    console.log(finalRes);
}





function finalSolution (array) {
    let arr =[];

    for(let i = 0; i < array.length; i++) {
        
        let count = 0;

        for(let j = 0; j < array.length; j++) {

            //Count the numbers that have same value.
            if(array[i] === array[j]) {
                count++;
            }
        }
        // console.log(`count : ${count}`);
        //if count equals to 1, it means there is no other nums that have same value.
        if(count === 1) {

            arr.push(array[i]);
        } else {
            if(arr.length) {
                //arr에서 직전 요소가 배열인 경우
                if(Array.isArray(arr[arr.length-1])) {
                    
                    if(arr[arr.length-1][0]!==array[i]) {
                        const newArr = createNewArrOfSameNums(array[i], count);
                        arr.push(newArr);
                    }
                //arr에서 직전 요소가 배열이 아닌 경우    
                } else {
                    if(arr[arr.length-1]!==array[i]) {
                        const newArr = createNewArrOfSameNums(array[i], count);
                        arr.push(newArr);
                    }
                }

            } else {
                const newArr = createNewArrOfSameNums(array[i], count);
                arr.push(newArr); 
            }
            
            
        }
        // console.log(arr);
    }
    //Create new array and put same numbers into it.
    function createNewArrOfSameNums (num, count) {
        let newArr = [];

        for(let k = 0; k < count; k++) {
            newArr.push(num);
        }
        return newArr;
    }

    return arr;
}



//If there are 2 types(string, number) in the input array, make two arrays.
//Put numbers into one array and put strings to another one.
//Sort two arrays in ascending order.
//and put those two arrays into new array.

//If the elements in the input array are only one type, just sort it and return the inpuy array.
function divideIntoNumAndStr(array) {

    let arrForStr = [];
    let arrForNum = [];

    for(let i = 0; i < array.length; i++) {


        if(typeof(array[i])==='string') {
            arrForStr.push(array[i]);
           
        } else if(typeof(array[i])==='number') {
            arrForNum.push(array[i]);
        }
    }

    if(arrForStr.length && arrForNum.length) {
        let finalArr = [];

        arrForNum.sort((a,b) => a - b);
        arrForStr.sort((a,b) => a - b);

        finalArr.push(arrForNum);
        finalArr.push(arrForStr);
        
        return finalArr;
    } 
    else if(!arrForNum.length) return arrForStr.sort((a,b) => a - b);
    else if(!arrForStr.length) return arrForNum.sort((a,b) => a - b);
}