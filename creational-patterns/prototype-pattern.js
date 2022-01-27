class Address{
  constructor(streetAddress, city, country){
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }

  deepCopy(){
    return new Address(this.streetAddress, this.city, this.country);
  }
}

class Person{
  constructor(name, address){
    this.name = name;
    this.address = address;
  }

  deepCopy(){
    return new Person(this.name, this.address.deepCopy());
  }

  greet(){
    console.log("Hi from greet");
  }
}

// 1st implementation - Using deepCopy method
// In this john is the prototype who's copy we make to use them
let john = new Person('John', new Address('Ghatkopar', 'Mumbai', 'India'));

jane = john.deepCopy();
jane.name = 'Jane';
jane.address.streetAddress = 'Chembur';

// console.log(john);
// console.log(jane);

// Limitation of 1st method - If we have more nested or multiple objects we will have to implement deepCopy method for all of them

// 2nd implementation using json parse and stringify
let janeSecond = JSON.parse(JSON.stringify(john));
janeSecond.name = 'Jane';
janeSecond.address.streetAddress = 'Chembur';
// console.log(janeSecond);
// janeSecond.greet();

// Limitation of 2nd method - We will not able able to use other objects on the class eg: greet method


// 3rd implementation using serializing
class Serializer{
  constructor(types){
    this.types = types;
  }

  makeRecursive(object){
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name;
    });
    if(idx !== -1){
      object['typeIndex'] = idx;

      for(let key in object){
        this.makeRecursive(object[key]);
      }
    }
  }

  reconstructRecursive(object){
    if(object.hasOwnProperty('typeIndex')){
      let type = this.types[object.typeIndex];
      let obj = new type();

      for(let key in object){
        obj[key] = this.reconstructRecursive(object[key]);
      }

      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object){
    this.makeRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

let s = new Serializer([Person, Address]);
let janeThird = s.clone(john);
janeThird.name = 'Jane';
janeThird.address.streetAddress = 'Chembur';
console.log(janeThird);