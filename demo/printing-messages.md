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

// print to the html some fibonacci numbers
for (var i = 1; i < 5; i++)
    print(fib(i))
```

and now for something completely different

```js
// a complex var is [real, imaginary]
// complex fibonacci goes f(i) = f(i-2) + f(i-1) * i
// (this isn't a "thing", i just made it up)
var complexFib = function(i) {
    if (i <= 1) {
        return [1, 1];
    } else if (i == 2) {
        return [1, 1];
    } else {
        var f1 = complexFib(i - 2)
        var f2 = complexFib(i - 1)
        return [
            f1[0] - f2[1],
            f1[1] + f2[0]
        ]
    }
}

print('calculating complex fibonacci numbers')

for (var i = 1; i < 24; i++) {
    var f = complexFib(i);
    print(i + ': R + I i'.replace('R', f[0]).replace('I', f[1]))
}
```
