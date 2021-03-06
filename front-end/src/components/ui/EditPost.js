import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';

export default class EditPost extends Component {
  componentDidMount() {
    if (this.props.post) {
      this.setState({
        id: this.props.post.id,
        title: this.props.post.title,
        body: this.props.post.body
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.updatePost(this.state);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    if (!this.props.post || !this.state) return <div />;
    const { author, category } = this.props.post;
    return (
      <div className="edit-post">
        <form onSubmit={this.onSubmit}>
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
              margin="normal"
            />
          </FormControl>

          <TextField
            className="author"
            label="Author"
            value={author}
            disabled
            margin="normal"
          />

          <TextField
            className="select-category"
            label="Category"
            value={category}
            disabled
            margin="normal"
          />

          <Button
            type="Submit"
            variant="raised"
            size="small"
            color="primary"
            style={{
              marginRight: '2%'
            }}>
            Update
          </Button>
          <Button color="secondary" onClick={() => this.props.cancelEdit()}>
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}
