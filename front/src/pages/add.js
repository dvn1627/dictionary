import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddPage(props) {

    const [eng, setEng] = useState('');
    const [rus, setRus] = useState('');

    function addWord() {
        if (!eng.length || !rus.length) {
            return;
        }
        const options = {
            headers: {
                'x-api-key' : 'yybTDPxOF96jzOQa0bm4g6LM8kd9FDjw2z1hRg7q'
            }
        }
        const url = 'https://et489h5atg.execute-api.us-west-2.amazonaws.com/default/Dictionary';
        const data = {
            eng,
            rus
        };
        axios.post(url, data, options).then( res => {
            setEng('');
            setRus('');
        }).catch( err => {
        })
        props.addWord({eng, rus});
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