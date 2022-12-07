function ExampleConstructor() {

}

console.log('value of ExampleConstructor.prototype ', ExampleConstructor.prototype);
console.log('typeof ExampleConstructor.prototype ', typeof ExampleConstructor.prototype);

var constructor = new ExampleConstructor();

console.log('value of constructor ', constructor);

console.log('is constructor and instance of ExampleConstructor? ', constructor instanceof ExampleConstructor);
