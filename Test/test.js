console.clear();

// let brand = 'Nokia';
// const phone = {
//     brand,
//     pin: 5000,
//     camera: 'Good',
//     flash: true,
//     guarantee: new Date()
// }

// const { ...x } = phone;

// const myName = (age) => {
//     return {
//         firstName: 'Thanh',
//         lastName: 'Nguyen',
//         myAge: age
//     }
// }
// const { ...getMyName } = myName(16);

// let printName = ({ guarantee }) => {
//     console.log(guarantee);
//     console.log(1);
// }

// let printName2 = (value) => {
//     console.log(value.guarantee);
//     console.log(2)
// }
// // printName2(phone);
// // printName(phone);
// const numbers = [3, 8, 5, 6, 100, -5, 0];
// const setSum = (pre, nex) => pre + nex;
// const [first, ...others] = numbers;
// const result = setSum(first, others);
// // console.log(result)
// // console.log(numbers.reduce((a, b) => a + b))

// class Human {
//     constructor(name, age) {
//         this.Name = name;
//         this.Age = age;
//     }
//     printName = () => console.log(`Hello I'm ${this.Name}. I'm ${this.Age} years old !`);
// }
// const h1 = new Human('a', 5);
// class People extends Human {
//     constructor(age, name) {
//         super(age, name);
//     }
// }
// const p1 = new People('Thanh', 25);
// // p1.printName();

// const num1 = [3, 8, 5, 6, 100, -5, 0];
// const num2 = num1.map(val => val);
// num1[0] = null;
// // console.log(num2)

const promise = async () => {
    new Promise((res, rej) => {
        res('Thanh kute 1');
    });
}


promise()


