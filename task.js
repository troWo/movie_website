

// let name = 'boss'
// let owner = 'boss1'

// function greeting(name, owner) {
//   if(name === owner){
//     console.log(`Hello boss`);
//   }else{
//     console.log(`Hello guest`);
//   }
// }
// greeting(name, owner)


// switch ('Feb') {
//   case 'Feb' || 'Jan' || 'Dec':
//     console.log(`is part of the first quarter`);
//     break;
// case 'Mar' || 'Apr' ||  'May':
//   console.log(`is part of the second quarter`)
//     break;

//     case 'Jun' || 'Jul' ||  'Aug':
//       console.log(`is part of the third quarter`)
//         break;
//         case 'Sep' || 'Oct' ||  'Nov':
//   console.log(`is part of the fourth quarter`)
//     break;
// }


// const numbers = [0, 5, 1, 3, 2, 9, 7, 6, 4]

// for (let index = 0; index < numbers.length; index++) {
//   if (numbers.includes(index)){
//     continue
//   }else{
//     console.log(index)
//   } 
// }
// // This time no story, no theory. The examples below show you how to write function accum:

// // Examples:
// // accum("abcd") -> "A-Bb-Ccc-Dddd"
// // accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
// // accum("cwAt") -> "C-Ww-Aaa-Tttt"
// // The parameter of accum is a string which includes only letters from a..z and A..Z.

// const letters = 'abcd'


// for (var i = 0; i < letters.length; i++) {
//     console.log(letters);
// }

// Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string).

// [1, 1, 2] -> [1, 2]
// [1, 2, 1, 1, 3, 2] -> [1, 2, 3]


// const numbers = [1, 1, 2];
// let removedDuplicate = [];
// let sum = null;

// numbers.forEach((el) => {
//   if (el !== sum) {
//     removedDuplicate.push(el); 
//     sum = el; 
//   }
// });
// console.log(removedDuplicate);

// Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 positive integers. No floats or non-positive integers will be passed.

// For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.

// [10, 343445353, 3453445, 3453545353453] should return 3453455.


// const number = [10, 343445353, 3453445, 3453545353453]
// let min1 = number[0]
// let min2 = number[1]
// let sum2 = null
// for (let i = 0; i < number.length; i++) {
//   if(number[i] < min1){
//     min2 = min1
//     min1 = number[i]
//   }else if(min1 < number[i] & min2 > number[i]){
// return sum2 = min1 + min2
//   }
// }


// let arr = ["a", "a", "a", "b", "b"] 
// let sum = 0
// for (let i = 1; i < arr.length; i++) {
//   if(arr.includes(i)){
//     sum +=i
//   }
// }
// console.log(sum);


// function count(letters) {
//   arr.forEach((str, i) => {
//     if (arr.includes(str)){
//       arr2.push(i++)
//     }
//   })
// }
// console.log(arr2);
// count(arr)

function lovefunc(num1, num2){
  if(num1%2 === 0 && num2%2 === 0 ){
    return false
  }else{
    return true
  }
}
console.log(lovefunc(1,4));

// In this simple assignment you are given a number and have to make it negative. But maybe the number is already negative?

let num = 6
function makeNegative(num) {
  if(num>0){
    console.log(`-${num}`);
  }else{
    console.log(`${num}`);
  }
}
makeNegative(num)


// Complete the function power_of_two/powerOfTwo (or equivalent, depending on your language) that determines if a given non-negative integer is a power of two. From the corresponding Wikipedia entry:

// a power of two is a number of the form 2n where n is an integer, i.e. the result of exponentiation with number two as the base and integer n as the exponent.

// You may assume the input is always valid.

let n = 1
function isPowerOfTwo(n) {
  if((Math.log(n)/Math.log(2)) % 1 === 0){
    console.log(true);
  }else{
    console.log(false);
  }
}

isPowerOfTwo(n)