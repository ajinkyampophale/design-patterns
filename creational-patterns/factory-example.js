class Person
{
  constructor(id, name)
  {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory
{
  createPerson(name)
  {
    if(!PersonFactory.id) PersonFactory.id = 0;
    return new Person(PersonFactory.id++, name);
  }
}

// OR
// PersonFactory.id = 0;

const pf1 = new PersonFactory();
const p1 = pf1.createPerson("Bob");
console.log(p1);

const pf2 = new PersonFactory();
const p2 = pf2.createPerson("Alex");
console.log(p2);

const pf3 = new PersonFactory();
const p3 = pf3.createPerson("Mary");
console.log(p3);