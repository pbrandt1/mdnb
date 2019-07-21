# Binding input elements

You can do stuff like the following:

<label>Quantity</label>
<input type="number" class="quantity" value="1">

Quantity is: <div class="quantity-display"></div>

```js
var $quantity = document.querySelector('.quantity-display')
mdnb.bind('.quantity', (q) => {
    $quantity.innerText = q;
})
```
