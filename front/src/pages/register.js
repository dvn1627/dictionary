import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchAllAction } from '../store/actions/actions';

const mapStateToProps = (state) => ({
    items: state.items,
    loading: state.loading,
});

const mapDispatchToProps = {
    getItems: fetchAllAction,
};

const RegisterPage = (props) => {

}