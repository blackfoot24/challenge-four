{/* 
  HIERARCHY
  -PeopleApp (will get data from /api/people and set the state of people)
    -PeopleList
      -Person
*/}

var PeopleApp = React.createClass({
  propTypes:{
    url: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      people: []
    }
  },
  loadPeopleFromServer: function() {
    var self = this;
    $.ajax({
      url: this.props.url,
      method: 'GET',
    }).done(function(data){
      self.setState({people: data})
    })
  },
  componentDidMount: function() {//when mounting to page execute this data
    this.loadPeopleFromServer();
  },
  render: function() {
    return (
      <div>
        <PeopleList peopleArray={this.state.people}/>
      </div>
      )
  }
});

var PeopleList = React.createClass({
  
  render: function() {

    var person = this.props.peopleArray.map(function(p){
      return <Person username={p.username} img={p.img} country={p.country} 
      birth_date={p.birth_date}/>
    });
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
  getAge: function(age){
    return new Date().getYear() - new Date(age).getYear()
  },
  render: function() {
    return (
      <div className="row">
        <div className="panel panel-default col-md-4">
          <div classname="panel-body">
          <img src={this.props.img} className="img-thumbnail" />
            <h2>{this.props.username}</h2>
            <h3>{this.props.country}</h3>
            <h4>{this.getAge(this.props.birth_date)}</h4>
            
          </div>
        </div>
      </div>  
      )
  }
})




React.render(<PeopleApp url="/api/people" />, 
  document.getElementById('react-container'));