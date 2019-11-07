import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addWordAction } from '../store/actions/actions'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    addWordAction,
};

function AddPage(props) {

    const [eng, setEng] = useState('');
    const [rus, setRus] = useState('');

    function addWord() {
        if (!eng.length || !rus.length) {
            return;
        }
        props.addWordAction({ eng, rus });
        props.addWord({eng, rus});
        setEng('');
        setRus('');
    }

    function handleChangeEng(value) {
        setEng(value);
    }

    function handleChangeRus(value) {
        setRus(value);
    }

    return(
        <div className="add-item">
            <h2>Add word</h2>
            <label>
                <span>English</span>
                <input name="eng" onChange={(event) => handleChangeEng(event.target.value)} value={eng}/>
            </label>
            <label>
                <span>Russian</span>
                <input name="eng" onChange={(event) => handleChangeRus(event.target.value)} value={rus}/>
            </label>
            <button onClick={() => addWord()}>Add</button>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPage);