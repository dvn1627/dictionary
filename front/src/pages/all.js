import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Add from './add';

import { fetchAllAction, deleteWordAction } from '../store/actions/actions';

const mapStateToProps = (state) => ({
  items: state.items,
  loading: state.loading,
});

const mapDispatchToProps = {
  getItems: fetchAllAction,
  deleteItem: deleteWordAction,
};

function AllPage(props) {

  const [itemsList, setItemsList] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      setFetched(true);
      props.getItems();
    }
  });

  function deleteWord(item) {
    props.deleteItem({_id: item._id});
  }

  function handleAddWord(word) {
    setItemsList([word, ...itemsList]);
  }
  

  return(
    <div>
      <Add addWord={(word) => handleAddWord(word)}/>
      <h2>All words</h2>
      <div className="all-words-list">
        <ul>
          { props.items.map( item => (<li key={item.eng} >
            <span>
              <strong>{ item.eng }</strong>
              <i>{ item.rus }</i>
            </span>
            <button onClick={() => deleteWord(item)}>del</button>
          </li>)) }
        </ul>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPage);
