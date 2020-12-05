import React from 'react';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import firebase from '../Firebase/firebase.js';
// import RequestBox from '../components/RequestBox';
// import MyResponses from '../components/MyResponses';

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home',
            redirect: null,
            description: "",
            requests: [],
            responses: []
        };
        
    }

    componentDidMount = () => {

    }

    handleSubmission = () => {

    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }

        const { activeItem } = this.state

        return (
            <div>
                <Menu pointing>
                {/* <Menu.Item>
                    <Image src={require('../images/logo.png')}></Image>
                </Menu.Item> */}
                
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='friends'
                    active={activeItem === 'friends'}
                    onClick={this.handleItemClick}
                />
                
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Form>
                            <Button color='blue' fluid size='small' type='button' onClick={this.handleSubmission}>
                                    Logout
                            </Button>
                        </Form>
                    </Menu.Item>
                </Menu.Menu>
                </Menu>

                <div className="d-flex">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </div>

                
            </div>
            
            
        )
    }
}

export default MainPage;
