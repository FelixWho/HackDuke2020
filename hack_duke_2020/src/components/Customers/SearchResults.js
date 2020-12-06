import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  initializeBox = () => {
    let search_results = this.props.search_results.map((request_data) => {
      return <ListGroup></ListGroup>
    }
    )

    return search_results;
  }

  render() {
    let search_results = this.initializeBox();
  }
}