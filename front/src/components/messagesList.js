import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const MessagesList = (props) => {
  return (
    <div>
      {props.messages.map( (message, index) => (<p key={index}>{message}</p>))}
    </div>
  );
}

export default connect(mapStateToProps, null)(MessagesList);