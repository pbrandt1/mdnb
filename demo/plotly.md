## Government job ratings

```js
// data from https://bestplacestowork.org/rankings/overall/large
var nasa = [81.2, 80.9, 78.6, 76.1, 74.6, 74.0, 72.8, 72.5, 74.2, 71.7, 69.7, 69.9, 71.6];
var hhs = [70.9, 70.4, 66.4, 63.9, 61.8, 61.9, 63.3, 62.7, 64.8, 62.3, 61.3, 62.1, 61.9];
var commerce = [70.3, 69.2, 67.9, 66.2, 68.7, 67.6, 67.9, 67.5, 68.3, 66.5, 63.5, 64.0, 62.4];
var transportation = [67.7, 67.6, 63.4, 63.1, 60.4, 60.9, 63.6, 59.5, 60.4, 52.2, 52.9, 59.8, 60.9];
var intelligence = [66.3, 66.6, 67.0, 67.1, 67.9, 67.3, 70.8, 69.5, 69.0, 70.9, null, null, null];
var VA = [56.1, 56.7, 55.1, 54.6, 57.3, 56.7, 63.8, 63.6, 66.0, 61.9, 66.2, 61.8];
var homelandSecurity = [53.1, 52.0, 45.8, 43.1, 44.0, 46.8, 52.9, 56.6, 58.6, 56.2, 49.8, 49.1, null];
var airforce = [60.4, 60.7, 59.3, 60.0, 56.8, 57.2, 61.5, 62.9, 64.8, 63.6, 63.8, 62.6, 62.3];
var state = [60.7, 64.0, 66.8, 66.3, 68.2, 65.6, 68.2, 70.0, 70.8, 69.1, 67.9, 66.6, 59.0];
var agriculture = [59.0, 65.9, 63.1, 59.4, 57.3, 56.1, 57.4, 61.8, 62.0, 60.6, 61.6, 62.7, 60.8];

var years = [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2007, 2005, 2003];
plot(years, [nasa, hhs, commerce, transportation, airforce, state, agriculture, homelandSecurity], 'Government agency scores', ['NASA', 'Health & Human Services', 'Commerce', 'Transportation', 'Air Force', 'State Department', 'Agriculture', 'Homeland Security'])
```

Data from the [best places to work in the government](https://bestplacestowork.org/rankings/overall/large) compiled by the [partnership for public service](https://ourpublicservice.org/)

## Daily sunlight on Mars

**Definitions**

`L_s` : heliocentric longitude. `L_s` is 0 at Mars' vernal equinox. Therefore, in the northern hemisphere, `L_s = 90` is summer, 180 is fall, and 270 is winter.

maximum power one can create during the worst case scenario, which is a dust storm in the middle of winter, as a function of base latitude.


```js
var mars_e = 0.0934 // eccentricity
var mars_a = 1.524 // semi-major axis

// get mars's distance from the sun based on the heliocentric longitude in degrees
// r = a(1-e*e)/(1+e cos(θ)), where θ = 0 where L_s = 250, the periapsis of the orbit
var distance_from_sun = function(L_s) {
    r = mars_a * (1 - mars_e * mars_e) / (1 + mars_e * Math.cos( (L_s - 250)*Math.PI/180 ) )
    return r
}
```

Solar intensity is 1,367 W/m2 at 1 AU, so at Mars we can calculate it if we know `L_s`. This is just the base amount of irradiation that makes it to Mars orbit. Later we will take into account the effects of latitude and atmosphere conditions.

```js
// surface area of sphere is 4 pi r2
// 1367 * 1^2 = x * r2
// x = math.sqrt(1367 / r2)
function base_solar_irradiation(L_s) {
    r = distance_from_sun(L_s)
    return 1367 / r / r
}
```

Let's see how much it changes over a year.

```js
var L_s = [0]
var irradiation_L0 = base_solar_irradiation(0)
var irradiation = [0] // percent
var dsun = [distance_from_sun(0)]
for (var i = 1; i < 360; i++) {
    L_s.push(i)
    irradiation.push(base_solar_irradiation(i) / irradiation_L0 * 100 - 100)
    dsun.push(distance_from_sun(i))
}
plot(L_s, dsun, 'Distance from sun (AU) vs L_s') // AU
plot(L_s, irradiation, 'Percent change of solar irradiation vs L_s') // percent change
```

Looks like the change is pretty significant. Mars is in a much more elliptical orbit than earth.

Calculating irradiation based on latitude is like taking into account the elevation of the sun above the horizon, where 90 is straight overhead locally, so you would have no shadow. To calculate the elevation of the sun, you need to know the latitude of where you are, the time of day, and the declination of Mars. 

```js
// L_s is heliocentric longitude
// latitude is mars latitude
// t is seconds counted from midnight in a mars day
var mars_seconds_in_day = 88643
var mars_hours_in_day = mars_seconds_in_day / 60 / 60
var elevation = function(L_s, latitude, t) {
    const declination = asind(sind(25.2) * sind(L_s)) // degrees declination
    const hourAngle = 360 * (t / mars_seconds_in_day - 0.5) // degrees

    var zenith = acosd(
        sind(declination) * sind(latitude)
        + cosd(declination) * cosd(latitude) * cosd(hourAngle)
    );

    return 90 - zenith;
}
```

as a sanity check, let's plot the elevation on a day for some places

```js
var L_s = 0
var lat = 0
function plot_elevation(L_s, latitude) {
    var time = []
    var el = []
    for (var i = 0; i < mars_seconds_in_day; i = i + 100) {
        time.push(i / 60 / 60)
        el.push(elevation(L_s, latitude, i))
    }
    plot(time, el, `Sun elevation (deg) vs time (h) at ${latitude} deg latitude and L_s=${L_s}`)
}
// spring at equator
plot_elevation(0, 0)
// summer at 40
plot_elevation(90, 40)
```

Then the projection of the sun onto a flat surface and integrate over time for each day to see how much you actually get.

```js
var L_s = []
var plots = []
var legend = []
for (lat = 60; lat >= -60; lat = lat - 20) {
    var data = []
    for (i = 0; i < 360; i++) {
        var sum = 0
        var base_i = base_solar_irradiation(i)
        var dt = .5 // hours
        for (var t = 0; t < mars_seconds_in_day; t = t + 60 * 60 * dt) {
            var e = elevation(i, lat, t);
            if (e > 0) {
                sum += base_i * sind(e) * dt
            }
        }
        L_s.push(i)
        data.push(sum)
    }
    plots.push(data)
    legend.push(lat)
}

plot(L_s, plots, `Cumulative solar irradiation per day (W-h/m2) vs L_s for 60 to -60 deg latitude`, legend)

```
These plots show us that there is a huge difference in the minimum solar irradiation depending on latitude, though the maximums are about the same. Clearly, if you were to depend only on solar for energy, the lower the latitude you can manage to set up base, the better.

other topics:
- dust
- angle of solar arrays if they can be angled


## References

- [Google answers: Equation to know where the Sun is at a given place at a given date-time](http://answers.google.com/answers/threadview/id/782886.html)
- [Donald Rapp - Human Missions to Mars, 2008](https://www.amazon.com/Human-Missions-Mars-Technologies-Exploring/dp/3319222481)