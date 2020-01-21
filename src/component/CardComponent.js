import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import "../styles/cardComponent.scss";

class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompareCta: true,
    }
    // creating the function bindings here
    this.onCompareCtaClick = this.onCompareCtaClick.bind(this);
    this.onRemoveCtaClick = this.onRemoveCtaClick.bind(this);
  }

  /**
   * This function will add item to the compare list 
   * @param {*} fruitItem : item to be added in the compare list
   */
  onCompareCtaClick(fruitItem) {
    return (evt) => {
      this.setState({
        showCompareCta: false
      })
      this.props.addToCompareList(fruitItem);
    }
  }

  /**
   * This function will remove item to the compare list 
   * @param {*} itemId : item id to be removed
   */
  onRemoveCtaClick(itemId) {
    return (evt) => {
      this.setState({
        showCompareCta: true
      })
      this.props.removeItemFromCompareList(itemId);
    }
  }

  render() {
    const { singleFruitData } = this.props,
      translation = {
        compareCta: 'COMPARE',
        removeCta: 'REMOVE',
      };
    return (
      <div className={"main-card-container " + (!this.state.showCompareCta ? ' selected': '')}>
        <div className="card-columns">
          <div className="column-1 fruit-image-container">
            <img src={logo} className="fruit-logo" alt="logo" />
          </div>
          <div className="column-2 dfr">
            <div className="dfc fruit-detail">
              <div className="fruit-name font-dark">{singleFruitData.name}</div>
              <div className="fruit-desc font-light">{singleFruitData.description}</div>
            </div>
            <div className="price green font-dark">{singleFruitData.price}</div>
          </div>
          <div className="cta-container">
            {
              this.state.showCompareCta && (
                <div className="compare-cta cta green" onClick={this.onCompareCtaClick(singleFruitData)}>{translation.compareCta}</div>
              )
            }
            {
              !this.state.showCompareCta && (
                <div className="remove-cta cta green" onClick={this.onRemoveCtaClick(singleFruitData.id)}>{translation.removeCta}</div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
};

CardComponent.propTypes = {
  singleFruitData: PropTypes.object.isRequired
};
export default CardComponent;
