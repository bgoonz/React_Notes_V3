class Member extends React.Component {

    render() {
        return <div className={(this.props.selected) ? "member selected" : "member"}>
            <img src={this.props.picture.thumbnail} alt=""/>

            <h1>{this.props.name.first} {this.props.name.last}</h1>

            <p><a href={"mailto:" + this.props.email}>{this.props.email}</a></p>

            <p>{this.props.location.city}, {this.props.location.state}</p>
        </div>
    }

}

Member.defaultProps = {
    selected: false,
    name: {},
    picture: {},
    location: {}
};

//
//  TODO: Build a Member Details Component
//
//        Display Member's first and last name
//        Display Member's email address
//        Display Large Member Picture
//

class Members extends React.Component {

    constructor() {
        super();
        this.state = {
            members: []
        }
    }

    render() {
        return (
            <div id="members">
                {this.props.members.map(function (data, i) {
                    return <Member key={i} {...data} />
                })}
            </div>
        );
    }

}

Members.propTypes = {
    members: React.PropTypes.array
};


//
//  TODO: Build <App /> Component
//
//    @demo: http://output.jsbin.com/sixucaw/1/quiet
//
//    @requirements:
//
//    - Load users from: http://api.randomuser.me/?nat=US&results=5
//    - Save all members to state
//    - Selete First Member By Default
//    - Highlight Selected Member in List
//    - Display Selected Member's details
//    - Click a Member in the list to change the selected member
//    - Add a count property to load a specific count of members
//
//    @example:
//
//    <APP count={5}/>
//
//

$.getJSON('http://api.randomuser.me/?nat=US&results=5', function (data) {});

//
//  TODO: Render App Component
//

