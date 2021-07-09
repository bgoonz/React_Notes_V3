Members List Challenge
======================
We challenge you to build a member's list with fake member data from [http://randomuser.me/](http://randomuser.me/).


1 - Build a <Member /> Component
----------------------
First construct a component for a single member.  You can do this on JSBin or locally. 

* [Demo of <Member /> Component](http://output.jsbin.com/quwara/1/quiet)
* [Start JSBin for <Member /> Component](http://jsbin.com/vajiwo/3/edit?js,output)


#### requirements:

* display first and last name
* display thumbnail image
* display email address with a mailto: link
* display city and state
* render component

#### Dataset

```javascript
    {
        "name": {
            "first": "julie",
            "last": "hamilton"
        },
        "location": {
            "city": "el cajon",
            "state": "kansas"
        },
        "email": "julie.hamilton94@example.com",
        "picture": {
            "thumbnail": "http://api.randomuser.me/portraits/thumb/women/12.jpg"
        }
    }
```

#### DOM

```html
<div class="member">
    <img src="http://api.randomuser.me/portraits/thumb/women/12.jpg" alt="">
    <h1>julie hamilton</h1>
    <p><a href="mailto:julie.hamilton94@example.com">julie.hamilton94@example.com</a></p>
    <p>el cajon, kansas</p>
</div>
```

#### Usage

```javascript
    <Member user={data} />
```
-or-

```javascript
    <Member {...data} />
```


2 - Build a <Members /> Component
----------------------
Now build a __<Members />__ component that uses the __<Member />__ to list multiple members.

* [demo of <Members /> Component](http://output.jsbin.com/gigapa/1/quiet)
* [start JSBin for <Members /> Component](http://jsbin.com/bobili/4/edit?js,output)

#### Requirements

* use the data array that is created on line one
* create members array as property
* render one <Member /> Component for each record in the data

#### Dataset

```javascript
[
    {
      "name": {
        "first": "julie",
        "last": "hamilton"
      },
      "location": {
        "city": "el cajon",
        "state": "kansas"
      },
      "email": "julie.hamilton94@example.com",
      "picture": {
        "thumbnail": "http://api.randomuser.me/portraits/thumb/women/12.jpg"
      }
    },
    {
      "name": {
        "first": "leonard",
        "last": "mccoy"
      },
      "location": {
        "city": "norfolk",
        "state": "idaho"
      },
      "email": "leonard.mccoy14@example.com",
      "picture": {
        "thumbnail": "http://api.randomuser.me/portraits/thumb/men/46.jpg"
      }
    },
    {
      "name": {
        "first": "dylan",
        "last": "coleman"
      },
      "location": {
        "city": "frisco",
        "state": "massachusetts"
      },
      "email": "dylan.coleman13@example.com",
      "picture": {
        "thumbnail": "http://api.randomuser.me/portraits/thumb/men/80.jpg"
      }
    },
    {
      "name": {
        "first": "kelly",
        "last": "ward"
      },
      "location": {
        "city": "montgomery",
        "state": "montana"
      },
      "email": "kelly.ward64@example.com",
      "picture": {
        "thumbnail": "http://api.randomuser.me/portraits/thumb/women/57.jpg"
      }
    },
    {
      "name": {
        "first": "alicia",
        "last": "marshall"
      },
      "location": {
        "city": "fremont",
        "state": "wisconsin"
      },
      "email": "alicia.marshall33@example.com",
      "picture": {
        "thumbnail": "http://api.randomuser.me/portraits/thumb/women/59.jpg"
      }
    }
]
```

#### DOM

```html
<div id="members">
   <Member />
   <Member />
   <Member />
</div>
```

#### Usage

```javascript
   <Members members={data} />
```


3 - Build a <App /> Component
----------------------
Now tie it all together with an __<App />__ component.  This component will connect to [http://randomuser.me/](http://randomuser.me/) and save state.  It should
pass state to child components as properties.  

* [Demo <App /> Component](http://output.jsbin.com/sixucaw/1/quiet)
* [Start <App /> Component on JSBin](http://jsbin.com/karadi/4/edit?js,output)

#### Build <MemberDetails /> Component

* Display Member's first and last name
* Display Member's email address
* Display Large Member Picture

#### Requirements

* Load users from: http://api.randomuser.me/?nat=US&results=5
* Save all members to state
* Select First Member By Default
* Highlight Selected Member in List
* Display Selected Member's details
* Click a Member in the list to change the selected member
* Add a count property to load a specific count of members

#### Data
Data will be loaded from [Random User API](http://api.randomuser.me/?nat=US&results=5).

__Loading Data__
Don't forget to import jquery or your favorite framework for loading JSON.

```javascript
    $.getJSON('http://api.randomuser.me/?nat=US&results=5', function (results) {
    
    });
```

__Sample Results__
Take a look at the sample data, it is slightly different from the previous samples... __HINT: results[0].user__

```javascript
{
  "results": [
    {
      "user": {
        "gender": "female",
        "name": {
          "title": "mrs",
          "first": "janice",
          "last": "hale"
        },
        "location": {
          "street": "5396 paddock way",
          "city": "daly city",
          "state": "washington",
          "zip": "71570"
        },
        "email": "janice.hale66@example.com",
        "username": "whitegorilla813",
        "password": "asdfgh",
        "salt": "rZPWFmS2",
        "md5": "26967334961a1fb3c26169ffdb4cfaf6",
        "sha1": "fecf25d14f1c5bc88eaea570a888b75666317812",
        "sha256": "7dd9190656449cce10fa1b4b45c292570bcb05ef43472a1b93425f61c12ae3ee",
        "registered": "1293518690",
        "dob": "997113410",
        "phone": "(455)-225-7233",
        "cell": "(527)-182-8284",
        "SSN": "371-94-1398",
        "picture": {
          "large": "http://api.randomuser.me/portraits/women/32.jpg",
          "medium": "http://api.randomuser.me/portraits/med/women/32.jpg",
          "thumbnail": "http://api.randomuser.me/portraits/thumb/women/32.jpg"
        },
        "version": "0.6",
        "nationality": "US"
      },
      "seed": "bb42e2186d8be63a07"
    },
    {
      "user": {
        "gender": "female",
        "name": {
          "title": "ms",
          "first": "gloria",
          "last": "andrews"
        },
        "location": {
          "street": "1444 shady ln dr",
          "city": "dumas",
          "state": "new hampshire",
          "zip": "21113"
        },
        "email": "gloria.andrews96@example.com",
        "username": "bluebear740",
        "password": "cola",
        "salt": "miiRD1LF",
        "md5": "39958894ef512ae46400569ba3c2b954",
        "sha1": "e89bbe826071584612c808d5e284ca38d2a66075",
        "sha256": "088c82c2defc2fd4f3d30ede8cc6035568e81202665df52020156eefced95b81",
        "registered": "994926759",
        "dob": "1300516566",
        "phone": "(597)-884-6371",
        "cell": "(987)-709-4775",
        "SSN": "853-46-3372",
        "picture": {
          "large": "http://api.randomuser.me/portraits/women/40.jpg",
          "medium": "http://api.randomuser.me/portraits/med/women/40.jpg",
          "thumbnail": "http://api.randomuser.me/portraits/thumb/women/40.jpg"
        },
        "version": "0.6",
        "nationality": "US"
      }
    }
  ]
}
```

#### Usage

```javascript
    <APP count={5}/>
```
  
4 - Add Webpack Configuration
----------------------
Finally pull everything offline and run locally.  Place your code in the components folder and setup a webpack build.

#### Installing Dependencies
All current required dependencies are listed in the package.json file

```
    $ npm install 
```    

#### Starting Server !Requires __webpack.config.js__
There is already an express app in __app.js__ you can start it with npm start.

```
    $ npm start
```