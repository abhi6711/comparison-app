import React, { Component } from 'react';

import * as constants from "../constants";
import CardComponent from "./CardComponent";
import ComparisonTable from "./ComparisonTable";

import "../styles/comparisonComponent.scss";

class ComparisonCompoent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compareItemList: [],
    }
    this.addToCompareList = this.addToCompareList.bind(this);
    this.removeItemFromCompareList = this.removeItemFromCompareList.bind(this);
  }

  /**
   * This function add item to compare list for comparison
   * @param {*} fruitItem 
   */
  addToCompareList(fruitItem) {
    let stateObj = Object.assign({}, this.state);
    stateObj.compareItemList.push(fruitItem);
    this.setState(stateObj);
  }

  /**
   * This function removes item from compare list
   * @param {*} fruitItem 
   */
  removeItemFromCompareList(itemId = '') {
    let newCompareList = [];
    newCompareList = this.state.compareItemList.filter((fruitItem, index) => {
      return fruitItem.id !== itemId;
    });
    this.setState({
      compareItemList: newCompareList
    });
  }

  render() {
    const translations = {
      comparisonHeading: 'Compare Products',
      comparisonOfItemsText: 'Item Comparison'
    }
    return (
      <div className="comparision-main-container">
        <div className="font-dark compariosn-heading">{translations.comparisonHeading}</div>
        <div className="fruit-data-card">
          {
            constants.FRUIT_DATA.length ? (
              constants.FRUIT_DATA.map((fruit, fruitIndex) => (
                <div className="cards" key={fruit.id + '_' + fruitIndex}>
                  <CardComponent
                    singleFruitData={fruit}
                    addToCompareList={this.addToCompareList}
                    removeItemFromCompareList={this.removeItemFromCompareList}>
                  </CardComponent>
                </div>
              ))
            ) : ('')
          }
        </div>
        {
          !!this.state.compareItemList.length  && (
            <div className="comparison-table-data">
              <div className="font-dark compariosn-heading">{translations.comparisonOfItemsText}</div>
              <ComparisonTable
                compareList={this.state.compareItemList}
              ></ComparisonTable>
            </div>
          )
        }
      </div>
    )
  }
};

export default ComparisonCompoent;
