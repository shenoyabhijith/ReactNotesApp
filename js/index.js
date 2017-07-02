"use strict";

var Comment = React.createClass({
  displayName: "Comment",

  getInitialState: function getInitialState() {
    return { editing: false };
  },
  edit: function edit() {
    this.setState({ editing: true });
  },
  remove: function remove() {
    console.log("removing comments");
    this.props.deleteFromBoard(this.props.index);
  },
  save: function save() {
    var val = this.refs.newtext.value;
    this.props.updateCommentText(val, this.props.index);
    this.setState({ editing: false });
  },
  renderNormal: function renderNormal() {
    return React.createElement(
      "div",
      { className: "commentContainer" },
      React.createElement(
        "center",
        null,
        React.createElement(
          "div",
          { className: "commentText" },
          " ",
          this.props.children
        ),
        React.createElement(
          "button",
          { onClick: this.edit, className: "waves-effect waves-light btn red darken-4" },
          " edit"
        ),
        React.createElement(
          "button",
          { onClick: this.remove, className: "waves-effect waves-light btn cyan lighten-2" },
          " Remove"
        )
      )
    );
  },
  renderForm: function renderForm() {
    return React.createElement(
      "div",
      { className: "commentContainer" },
      React.createElement(
        "center",
        null,
        React.createElement(
          "div",
          { className: "commentText" },
          React.createElement("textarea", { ref: "newtext", defaultValue: this.props.children })
        ),
        React.createElement(
          "button",
          { onClick: this.save, className: "waves-effect waves-light btn" },
          "Save"
        )
      )
    );
  },
  render: function render() {
    if (this.state.editing) return this.renderForm();else return this.renderNormal();
  }
});
var Board = React.createClass({
  displayName: "Board",

  getInitialState: function getInitialState() {
    return {
      comments: []

    };
  },
  add: function add(text) {
    var arr = this.state.comments;
    arr.push(text);
    this.setState({ comments: arr });
  },
  //deleting comments
  removeComment: function removeComment(i) {
    console.log("removing comment: " + i);
    var arr = this.state.comments;
    arr.splice(i, 1);
    this.setState({ comments: arr });
  },
  //updating comments when edit button is clicked
  updateComment: function updateComment(newtext, i) {
    console.log("updating comment");
    var arr = this.state.comments;
    arr[i] = newtext;
    this.setState({ comments: arr });
  },
  //Keeping the index of each comment
  eachComment: function eachComment(text, i) {
    return React.createElement(
      Comment,
      { key: i, index: i, updateCommentText: this.updateComment, deleteFromBoard: this.removeComment },
      text
    );
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "center",
        null,
        React.createElement(
          "button",
          { onClick: this.add.bind(null, 'Edit Note'), className: "btn" },
          "Add Notes"
        )
      ),
      React.createElement(
        "div",
        { className: "board" },
        this.state.comments.map(this.eachComment)
      )
    );
  }
});

ReactDOM.render(React.createElement(Board, null), document.getElementById('content'));