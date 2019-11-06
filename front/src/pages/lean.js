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

const LeanPage = (props) => {

    const [itemsList, setItemsList] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [word, setWord] = useState(null);
    const [history, setHistory] = useState([]);
    const [lang, setLang] = useState('eng')
    const [fetched, setFetched] = useState(false);

    function getWord(items) {
        const number = Math.floor(Math.random() * Math.floor(items.length));
        return items[number];
    }

    function getAnswers(word, AllItems){
        let items = [];
        const maxAnswers = 3;
        const correctPosition = Math.floor(Math.random() * Math.floor(maxAnswers - 1));
        let answersCount = 0;
        if (AllItems.length <= maxAnswers) {
            return AllItems;
        }
        do {
            const number = Math.floor(Math.random() * Math.floor(AllItems.length));
            const item = AllItems[number];
            if (item.eng !== word.eng && correctPosition !== answersCount && !items.includes(item)) {
                items.push(item)
                answersCount++;
            }
            if (correctPosition === answersCount) {
                items.push(word)
                answersCount++;
            }
        } while (answersCount < maxAnswers);
        return items;
    }

    useEffect(() => {
        if (!fetched) {
            setFetched(true);
            props.getItems();
        } else if (!itemsList.length && props.items.length) {
            setItemsList(props.items);
            startLeaning(props.items);
        }
    });

    function startLeaning(items) {
        const newWord = getWord(items);
        setWord(newWord);
        setAnswers(getAnswers(newWord, items));
    }

    function check(item) {
        const field = lang === 'eng' ? 'rus' : 'eng';
        let result = item[field] === word[field];
        const newHistory = [{word, result}, ...history];
        setHistory(newHistory);
        startLeaning(itemsList);
    }

    function switchLang() {
        const newLang = lang === 'eng' ? 'rus' : 'eng';
        setLang(newLang);
    }

    const otherLang = lang === 'eng' ? 'rus' : 'eng';

    return (
        <div>
            <h2>
                Leaning
            </h2>
            <Button onClick={() => switchLang()} variant="contained" color="primary">{lang}</Button>
            <h2>{ word && word[lang] }</h2>
            <ul className="options-list">
                {
                    answers.map(item => (<li onClick={() => check(item)} key={item[otherLang]}> {item[otherLang]} </li>))
                }
            </ul>
            { props.loading ? (<CircularProgress />)
            : (<div className="history-list">
                <ul>
                    { history.map( (h, index) => (
                        <li key={index}>
                            <strong style={{color: h.result ? 'green' : 'red'}}>
                                {h.word[lang]}
                                {h.result ? '' : ' - ' + h.word[otherLang]}
                            </strong>
                        </li>)
                    ) }
                </ul>
            </div>)}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeanPage);