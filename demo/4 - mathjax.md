# Mathjax

You can use mathjax to put in cool stuff. For example, here is a a big fancy equation that has a name.

```
A2PDG - Augented Apollo Powered Descent Guidance - Ping Lu - 2018

where $a_T$ is a the thrust vector as a function of time-to-go, $t_{go}$ and the current state.

$$ a_T = \frac{2}{t_{go}}\left(1 - \frac{1}{3}k_r\right)\left[v_f - v\right] + \frac{k_r}{t_{go}^2}\left[r_f -r - vt_{go}\right] + \left(\frac{1}{6}k_r - 1\right)a_f + \left(\frac{1}{6}k_r - 2\right)g $$
```

A2PDG - Augented Apollo Powered Descent Guidance - Ping Lu - 2018

where $a_T$ is a the thrust vector as a function of time-to-go, $t_{go}$ and the current state.

$$ a_T = \frac{2}{t_{go}}\left(1 - \frac{1}{3}k_r\right)\left[v_f - v\right] + \frac{k_r}{t_{go}^2}\left[r_f -r - vt_{go}\right] + \left(\frac{1}{6}k_r - 1\right)a_f + \left(\frac{1}{6}k_r - 2\right)g $$

## configuration

You can configure what to use for the inline mathjax delimiters in your `mdnb.json` configuration file. this is the default in `mdnb.json`:

``` 
  "MathJax": {
    "tex2jax": {
      "inlineMath": [["$","$"], ["\\(","\\)"]]
    }
  },
```


## References

2018 Lu - Augmented Apollo Powered Descent Guidance


```css
@font-face {
  font-family: MJXc-TeX-math-I;
  src: local("MathJax_Math Italic"), local("MathJax_Math-Italic");
}
```