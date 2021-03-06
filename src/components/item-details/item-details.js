import React, { Component } from 'react';
import PokemonApiService from '../../services/pokemon-api-service';

import './item-details.css';

export default class ItemDetails extends Component {

  pokemonApiService = new PokemonApiService();

  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          image: getImageUrl(item)
         });
    });
  }

  render() {
    const { item, image } = this.state;
    
    if (!item) {
      return <span>Select a pokemon from a list</span>;
    }

    const {  name, types, height, weight } = item;

    let pokemonTypes = [];
    types.forEach(type => {
        pokemonTypes.push(`${type.type.name} `)     
    })

    return (
      <div className="person-details card">
        <img className="person-image"
          src={image} 
          alt={name}/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">{pokemonTypes.length > 1 ? 'types:' : 'type:'}</span>
              <span>{pokemonTypes}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Height</span>
              <span>{height}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Weight</span>
              <span>{weight}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}