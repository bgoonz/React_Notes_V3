var data = {
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
};

//
//  TODO: Create a <Member /> Component
//
//    @demo: http://output.jsbin.com/quwara/1/quiet
//
//    @requirements:
//
//      - display first and last name
//      - display thumbnail image
//      - display email address with a mailto: link
//      - display city and state
//      - render component
//
//    @dom:
//
//      <div class="member">
//        <img src="http://api.randomuser.me/portraits/thumb/women/12.jpg" alt="">
//        <h1>julie hamilton</h1>
//        <p><a href="mailto:julie.hamilton94@example.com">julie.hamilton94@example.com</a></p>
//        <p>el cajon, kansas</p>
//      </div>
//
//    @example:
//
//       <Member user={data} />
//
//       -or-
//
//       <Member {...data} />
//
