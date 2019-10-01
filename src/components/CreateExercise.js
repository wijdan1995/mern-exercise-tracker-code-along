import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

export default class CreateExercise extends Component {
    state = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    }

    componentDidMount() {
        // this.setState({
        //     users: ['test user'],
        //     username: 'test user'
        // })
        axios.get('http://localhost:5000/users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            })
    }

    // onChangeUsername = (e) => {
    //     username: e.target.value
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const exercise = this.state

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
        // to go to home page
        window.location = '/'

    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleChange}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            id="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            id="duration"
                            value={this.state.duration}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}