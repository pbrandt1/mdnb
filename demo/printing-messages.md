# Printing messages from javascript

Sometimes you'll want to print out some information.

```js
// prints the ith fibonacci number, starting at 1
var fib = function(i) {
    if (i <= 2) {
        return 1;
    } else {
        return fib(i-1) + fib(i-2)
    }
}

// console.log the 3rd fibonacci number
console.log(fib(3));

// print to the html the 3rd fibonacci number
for (var i = 0; i < 5; i++)
    print(fib(i))
```
