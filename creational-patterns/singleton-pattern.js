// 1st implementation
class Singleton{
  constructor(){
    const instance = this.constructor.instance;

    if(instance){
      return instance;
    }
    
    this.constructor.instance = this;
  }
}

const s1 = new Singleton();
const s2 = new Singleton();
console.log("Are they identical => ", s1 === s2);

// 2nd Implementation - Monostate
class ChiefExecutiveOfficer{

  get name(){ 
    return ChiefExecutiveOfficer._name;
  };

  set name(value){
    ChiefExecutiveOfficer._name = value;
  }

  get age(){ 
    return ChiefExecutiveOfficer._age;
  }

  set age(value){
    ChiefExecutiveOfficer._age = value;
  }

  toString(){
    return `CEO's name is ${this.name} and he is ${this.age} years old`;
  }
}

ChiefExecutiveOfficer._name = undefined;
ChiefExecutiveOfficer._age = undefined;

let ceo = new ChiefExecutiveOfficer();
ceo.name = "John Doe";
ceo.age = 55;

let ceo2 = new ChiefExecutiveOfficer();
ceo2.name = "Adam Gold";
ceo2.age = 66;

console.log(ceo.toString());
console.log(ceo2.toString());