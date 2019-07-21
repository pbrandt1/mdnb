# HTML in markdown

<style>
.parallelogram {
	width: 100px;
	height: 50px;
	transform: skew(20deg);
	background: #555;
}
</style>
</head>
<body>

<h2>Parallelogram CSS</h2>
<div class="parallelogram"></div>

---

The html rendered above is repeated below for reference. This isn't like the javascript blocks which execute. You don't need the backticks, you literally just write html into your markdown file and it works (see the source of this markdown file if this isn't clear).

```html
<style>
.parallelogram {
	width: 100px;
	height: 50px;
	transform: skew(20deg);
	background: #555;
}
</style>
</head>
<body>

<h2>Parallelogram CSS</h2>
<div class="parallelogram"></div>
```