{/* 
  HIERARCHY


  -PeopleApp (will get data from /api/people and set the state of people)
    -PeopleList
      -Person
*/}

var PeopleApp = React.createClass({
  getInitialState: function() {
    return {
      persons: [];
      keyword: 'bears'
    }
  },
  loadPeopleFromServer: function() {
    $.ajax({
      url: this.props.url + this.state.keyword,
      method: 'GET'
    }).done(function(data){
      self.setState ({
        persons: data
      })
    })
  },
  componentDidMount: function() {
    this.loadPeopleFromServer();
  },
  render: function() {
    return (
      <div>
        <PeopleList/>
      </div>
      )
  }
});

var PeopleList = React.createClass({
  render: function() {
    var person = "You will need to map through your data [this.props.people] here and create a <Person/> for each object";
    return (
      <div>
        { person }
      </div>
      )
  }
});


{/*
  Have this component render actual data.
  BONUS: Create a function which will take a persons birth_date
  and calculate their age. Use this function to render the persons age.
*/}
var Person = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div classname="panel-body">
          Persons name, age, etc...
        </div>
      </div>
      )
  }
})




React.render(<PeopleApp url="" />, document.getElementById('react-container'));
