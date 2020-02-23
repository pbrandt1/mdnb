# Inline javascript

With `mdnb` you can include a javascript code block, and mdnb will find it and execute it in the browser for you. Behold:

```js
var a = 10
var b = 20
print(a + b)
```

Notice the output of `print` is shown directly below the executing code block.

This wouldn't be a good demo if we didn't make a fibonacci generator!

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

This wouldn't be the BEST demo if we didn't make a fibonacci generator for the COMPLEX domain of numbers! Wow!

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
    var real = f[0]
    var imaginary = ''
    if (f[1] > 0) {
        imaginary = `+${f[1]}i`
    } else if (f[1] < 0) {
        imaginary = `${f[1]}i`
    }
    print(`${i}: ${real}${imaginary}`)
}
```
