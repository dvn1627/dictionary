import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import { exitAction } from '../store/actions/actions';

const mapStateToProps = (state) => ({
  isLogin: !!state.token,
});

const mapDispatchToProps = {
  exitAction: exitAction,
}

const cabinetRoutes = [
  '/dictionary',
  '/lean',
  '/lean-2',
]

const Navigation = (props) => {

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (cabinetRoutes.includes(location.pathname) && !props.isLogin) {
      history.replace('/login');
    }
    if (!cabinetRoutes.includes(location.pathname) && props.isLogin) {
      history.replace('/lean');
    }
  });

  function handleExit(e) {
    e.preventDefault();
    props.exitAction();
  }

  return (
    <div>
        {
          props.isLogin ? (
            <nav className="main-navigation">
              <Link to='/lean'>Lean</Link>
              <Link to='/lean-2'>Lean-2</Link>
              <Link to='/dictionary'>Dictionary</Link>
              <Link to='/' onClick={(e) => handleExit(e)}>exit</Link>
            </nav>
          ) : (
            <nav className="main-navigation">
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </nav>
          )
        }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);