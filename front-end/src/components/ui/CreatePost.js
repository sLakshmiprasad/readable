import React, { Component } from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { uuid, capitalize } from '../../utils';

export default class CreatePost extends Component {
  postCreate = false;
  initialState = {
    title: '',
    body: '',
    author: '',
    category: ''
  };

  state = this.initialState;

  componentWillMount() {
    if (this.props.categories.length === 0) {
      this.props.getCategories();
    } else if (this.props.categories.length > 0) {
      this.setState({ category: this.props.categories[0].name });
    }
  }

  componentWillReceiveProps() {
    if (this.props.categories.length > 0) {
      this.setState({ category: this.props.categories[0].name });
    }
  }

  componentDidUpdate() {
    //redirect user to home once the form is submitted successfully
    if (this.postCreate && this.props.ajax) this.props.history.push('/');
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  reset = () => {
    this.setState(this.initialState);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.createPost({
      id: uuid(),
      timestamp: Date.now(),
      ...this.state
    });
    this.postCreate = true;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="create-post-form">
          <FormControl fullWidth>
            <TextField
              id="title"
              label="Title"
              onChange={this.handleChange('title')}
              value={this.state.title}
              required
              margin="normal"
            />
            <TextField
              id="body"
              label="Body"
              placeholder="Body"
              value={this.state.body}
              onChange={this.handleChange('body')}
              multiline
              required
              margin="normal"
            />
          </FormControl>

          <TextField
            className="author"
            label="Author"
            placeholder="Author"
            required
            value={this.state.author}
            onChange={this.handleChange('author')}
          />
          <TextField
            className="select-category"
            select
            label="Category"
            value={this.state.category}
            onChange={this.handleChange('category')}
            helperText="Please select your category">
            {this.props.categories.map(option => (
              <MenuItem key={option.name} value={option.name}>
                {capitalize(option.name)}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="raised"
            size="small"
            color="primary"
            onClick={this.onReset}
            style={{
              marginRight: '2%'
            }}>
            Reset
          </Button>
          <Button type="Submit" variant="raised" size="small" color="primary">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
