Star and Start Rating Components
==========================
Let's build a __<Star />__ component that we can use in a __<StarRating />__ component.  

1 - Building the <Star /> component
--------------------------
Build a Star component to display a single star.

* [Demo working <Star />](http://output.jsbin.com/moyiha/5/quiet)
* [Start <Star /> on JSBin](http://jsbin.com/depihus/edit?html,js)

#### Properties
* color: The color of the star, default to 'grey'

### Usage

__Displaying a Red Star__

```javascript
    <Star color="red" />
```

#### Style and DOM

__css__
```css
    .star {
      cursor: pointer;
      height: 25px;
      width: 25px;
      margin: 2px;
      float: left;
      background-color: grey;
      -webkit-clip-path: polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0% 38%, 37% 38%);
      clip-path: polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0% 38%, 37% 38%);
    }
```

__html__
```html
    <div class="star" style="background-color: red"><div>
```

2 - Building the <StarRating /> component
--------------------------
Use your star component to construct a star rating component.

* [Demo working <StarRating /> component](http://output.jsbin.com/moyiha/3/quiet)
* [Start <StarRating /> on JSBin](http://jsbin.com/dayeyot/edit?html,js)

#### Properties
* stars: the number of stars that the rating should show
* val: the selected value

#### Usage
```javascript
    <StarRating stars={5} val={2} />
```
