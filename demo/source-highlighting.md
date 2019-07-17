

```js
// says hello in javascript
function sayHello(name) {
    console.log(`hello, ${name}.`)
}

var numbers = [0, 1, 3.14, 6.1e12]
```

```js
// this block will demonstrate a run-time error
numbers.map(n => {
    // this is an intentional error so you can see how errors look
    consolelog(n)
})
```

```python
# says hello in python
def sayHello(name):
    print('hello, ' + name)

numbers = [0, 1, 3.14, 6.1e12]
```

```c
// says hello in C
void sayHello(char* name) {
    printf("hello, %s\n", name);
}

typedef struct keplerianOrbit {
    double a; // semi-major axis
    double e; // eccentricity
    double i; // inclination
    double lon; // longitude of the ascending node
    double periapsis; // argument of periapsis
    double anomaly; // true anomaly
} keplerianOrbit;

int i = 10;
double d = 3.14;
double e = 6.1e10;

```

```c++
// says hello in C++... note that this is satire
class HelloSayerBase {
    public:
    private:
        bool validate();
        void flushToConsole();
        string buffer;
};
bool HelloSayerBase::validate() {
    // console does not support wide-character utf codes
    // TODO figure this out
    return true; // for now
}
void HelloSayerBase::flushToConsole() {
    printf("%s\n", buffer.c_str());
}

class HelloSayer : HelloSayerBase {
    public:
        void setName(string name);
        void sayHello();
};
HelloSayer::setName(string name) {
    buffer = "hello, " + string;
}
HelloSayer::sayHello() {
    // TODO should validation be done during setName??? Ask geoff when he gets back.
    if (validate()) {
        flushToConsole();
    } else {
        buffer = "Failed validation";
        flushToConsole();
    }
}
```


```css
/* says hello in CSS */
body::before {
    content: 'hello';
}
```