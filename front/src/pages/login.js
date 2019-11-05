import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { loginAction } from '../store/actions/actions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  login: loginAction,
};

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    setEmail('');
    setPassword('');
    props.login({email, password});
  }

  return (
    <div>
        <h2>Login</h2>
        <div>
            <FormControl>
              <InputLabel htmlFor="email-field">
                  Email
              </InputLabel>
              <Input id="email-field" value={email} onInput={(e)=>setEmail(e.target.value)} type="email"/>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password-field">Password</InputLabel>
              <Input id="password-field" value={password} onInput={(e)=>setPassword(e.target.value)} type="password"/>
            </FormControl>
            <FormControl>
              <Button color="primary" variant="contained" onClick={()=>handleClick()}>Login</Button>
            </FormControl>
        </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);