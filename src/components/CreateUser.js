import React, { Component } from 'react';
import axios from 'axios'
export default class CreateUser extends Component {
    state = {
        username: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const user = this.state
        console.log(user);

        // send the date to backend
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))


        this.setState({
            username: ''
        })
    }
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            id='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}