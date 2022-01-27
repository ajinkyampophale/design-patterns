const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout
});

class HotDrink{
  consume() {}
}

class Tea extends HotDrink{
  consume(){
    console.log('This tea is nice with lemons!'); 
  }
}

class Coffee extends HotDrink{
  consume(){
    console.log('This coffee is delicious!'); 
  }
}

class HotDrinkFactory{
  prepare(){};
}

class TeaFactory extends HotDrinkFactory{
  prepare(amount){
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory{
  prepare(amount){
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

const AvailableDrinks = Object.freeze({
  tea: TeaFactory,
  coffee: CoffeeFactory
}); 

class HotDrinkMachine{
  constructor(){
    this.factories = {};
    for(let drinks in AvailableDrinks){
      this.factories[drinks] = new AvailableDrinks[drinks]();
    }
  }

  interact(consumer){
    rl.question('Please specify drink and amount (eg: tea 50)', answer => {

      let [drinkName, amount] = answer.split(' ');
      amount = parseInt(amount);

      let d = this.factories[drinkName].prepare(amount);
      rl.close();
      consumer(d);
    });
  }
  
  // OR
  makeDrink(type){
    switch(type){
      case 'tea': 
        return new TeaFactory().prepare(100);
      case 'coffee':
        return new CoffeeFactory().prepare(50);
      default:
        break;
    }
  }
}

const machine = new HotDrinkMachine();
// machine.makeDrink('tea');
// machine.makeDrink('coffee');
// rl.question('Which drink?', (answer) => {
//   let drink = machine.makeDrink(answer);
//   drink.consume();

//   rl.close();
// });
machine.interact(
  (drink) => drink.consume()
)