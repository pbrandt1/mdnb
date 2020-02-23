# HTML in markdown

In markdown, you can just write html and it's fine.

	<style>
	.parallelogram {
		width: 100px;
		height: 50px;
		transform: skew(20deg);
		background: #555;
	}
	</style>

	<h2>Parallelogram CSS</h2>
	<div class="parallelogram"></div>

	above you should see a parallelogram
	
---

<style>
.parallelogram {
	width: 100px;
	height: 50px;
	transform: skew(20deg);
	background: #555;
}
</style>

<h2>Parallelogram CSS</h2>
<div class="parallelogram"></div>

above you should see a parallelogram

---

# Binding input elements

Write your input elements in html in your markdown files and then you'll have access to them in your javascript code blocks.


    <label>Quantity</label>
    <input type="number" class="quantity" value="1">

    Quantity is: <div class="quantity-display"></div>

    ```js
    var $quantity = document.querySelector('.quantity-display')
    mdnb.bind('.quantity', (q) => {
        $quantity.innerText = q;
    })
    ```
    

---

<label>Quantity</label>
<input type="number" class="quantity" value="1">

Quantity is: <div class="quantity-display"></div>

```js
var $quantity = document.querySelector('.quantity-display')
mdnb.bind('.quantity', (q) => {
    $quantity.innerText = q;
})
```

