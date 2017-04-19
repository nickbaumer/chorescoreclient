import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

  const buttonsInstance = (
    <ButtonToolbar>
      <Button bsStyle="success">Add chore</Button>
    </ButtonToolbar>
    );

class ListChores extends Component {

    constructor(props) {

      super(props);
		
      this.state = {
         data: 'Chore here...',
         when: (new Date).getTime()
      }

      this.updateState = this.updateState.bind(this);

   };

   updateState(e) {
      this.setState({data: e.target.value});
   }
   
    handleSubmit(e) {
        this.setState({data: 'you pressed it'});
    }

   
     render() {
      return (
         <div>
            <form action="https://chorescore-pljhll.c9users.io/api/chores" method="post" onSubmit={this.handleSubmit}>
            <input type="text" name="name" value={this.state.data} 
               onChange={this.updateState} /> 
            <input type="text" name="who" />
            <input type="hidden" name="when" value={this.state.when} />
            <button>Submit</button>
            </form>
            <h4>{this.state.data}</h4>
         </div>
      );
   }
    
}

export default ListChores;