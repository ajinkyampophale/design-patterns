class Address{
  constructor(suite, streetAddress, city){
    this.suite = suite;
    this.streetAddress = streetAddress;
    this.city = city;
  }
}

class Employee{
  constructor(name, address){
    this.name = name;
    this.address = address;
  }
}

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
        if(object[key] !== null){
          this.makeRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object){
    if(object.hasOwnProperty('typeIndex')){
      let type = this.types[object.typeIndex];
      let obj = new type();

      for(let key in object){
        if(object[key] !== null){
          obj[key] = this.reconstructRecursive(object[key]);
        }
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

// Combining Prototype and Factory Patterns for clean usage
class EmployeeFactory{
  static _newEmployee(proto, name, suite){
    let copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name, suite){
    return this._newEmployee(
      EmployeeFactory.main, name, suite
    )
  }

  static newAuxOfficeEmployee(name, suite){
    return this._newEmployee(
      EmployeeFactory.aux, name, suite
    )
  }
}

// defined as static variables
EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(null, new Address(null, 'Ghatkopar', 'Mumbai'));
EmployeeFactory.aux = new Employee(null, new Address(null, 'Chembur', 'Mumbai'));

let john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 8765);

console.log(john);
console.log(jane);