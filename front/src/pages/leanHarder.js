import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';

import { fetchLeanAction } from '../store/actions/actions';

const mapStateToProps = (state) => ({
  items: state.items,
  loading: state.loading,
});

const mapDispatchToProps = {
  getItems: fetchLeanAction,
};

const LeanHarderPage = (props) => {

  const [itemsList, setItemsList] = useState([]);
  const [word, setWord] = useState(null);
  const [history, setHistory] = useState([]);
  const [lang, setLang] = useState('eng')
  const [fetched, setFetched] = useState(false);
  const [inputWord, setInputWord] = useState('');

  function getWord(items) {
    const number = Math.floor(Math.random() * Math.floor(items.length));
    return items[number];
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
  }

  function check() {
    const field = lang === 'eng' ? 'rus' : 'eng';
    let result = inputWord === word[field];
    const newHistory = [{word, result}, ...history];
    setHistory(newHistory);
    startLeaning(itemsList);
    setInputWord('');
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
      <Input
        value={inputWord}
        onInput={(e) => setInputWord(e.target.value)}
      />
      <Button variant="contained" onClick={() => check()}>Check</Button>
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
          )}
        </ul>
      </div>)}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeanHarderPage);
