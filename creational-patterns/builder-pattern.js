class Address{
  constructor(zip, street){
    this.zip = zip;
    this.street = street;
  }
}

// 1st Implementation - Normal Use
class UserFirst{
  constructor(name, age, phone, address){
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

const userFirst = new UserFirst("Bob", undefined, undefined, new Address("400075", "Mumbai"));
console.log(userFirst);


// 2nd Implementation -Traditional Builder
class UserSecond{
  constructor(name){
    this.name = name;
  }
}

class UserBuilder{
  constructor(name){
    this.user = new UserSecond(name);
  }

  setAge(age){
    this.user.age = age;
    return this;
  }

  setPhone(phone){
    this.user.phone = phone;
    return this;
  }

  setAddress(address){
    this.user.address = address;
    return this;
  }

  build(){
    return this.user;
  }
}

const builder = new UserBuilder("Bob").setAge(30).setAddress(new Address("68778", "Mum")).build();
console.log(builder); 


// 3rd Implementation - New JavaScript Approach
class User{
  constructor(name, {age, phone = '1234567', address}){
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

const user = new User("Bob", {address: new Address("8678", "Mum")});
console.log(user);