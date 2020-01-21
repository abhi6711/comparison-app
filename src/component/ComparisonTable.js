import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants';
import "../styles/comparisonTable.scss";

class ComparisonTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comparisonCondition: [],
      tempComparisonCondition: [],
      allConditions: [],
      searchText: '',
      showModal: false,
      isAllOptionsSelected: true
    };

    this.getClassForCondition = this.getClassForCondition.bind(this);
    this.isOpenAddAtrributModal = this.isOpenAddAtrributModal.bind(this);
    this.filterOnSearch = this.filterOnSearch.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    this.checkAndUncheckedOption = this.checkAndUncheckedOption.bind(this);
    this.applyAttributes = this.applyAttributes.bind(this);
    this.selectUnSelectAllOptions = this.selectUnSelectAllOptions.bind(this);
  }

  componentDidMount() {
    this.setComparisonCondition();
  }

  /**
   * This function is used to setting the initialStates
   */
  setComparisonCondition() {
    this.setState({
      comparisonCondition: JSON.parse(JSON.stringify(constants.ALL_COMPARISON_CONDITIONS)),
      tempComparisonCondition: JSON.parse(JSON.stringify(constants.ALL_COMPARISON_CONDITIONS)),
      allConditions: JSON.parse(JSON.stringify(constants.ALL_COMPARISON_CONDITIONS))
    });
  }

  getClassForCondition(fruitCondition) {
    switch (fruitCondition) {
      case constants.CONDITION_FROZEN:
        return ' bg-red white border-right';
      case constants.CONDITION_FRESH:
        return ' bg-green white border-right';
      default:
        return '';
    }
  }

  isOpenAddAtrributModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  /**
   * This function will be triggered when user enters input int search box and it gives all the matching results
   * @param {*} e 
   */
  filterOnSearch(e) {
    e.stopPropagation();
    let searchText = e.target.value, stateObj = Object.assign({}, this.state);
    stateObj.searchText = searchText;
    stateObj.allConditions = constants.ALL_COMPARISON_CONDITIONS.filter((item) => {
      return item.includes(searchText);
    });
    this.setState(stateObj);
  }

  capitalizeFirstLetter(inputString) {
    if (typeof inputString !== 'string') return '';
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  /**
   * This function will add/remove option from the tempComparisonCondition array based on checking and un-checking 
   * @param {*} option : option on which action should be taken
   */
  checkAndUncheckedOption(option) {
    return (evt) => {
      let optionIndex, temp = JSON.parse(JSON.stringify(this.state.tempComparisonCondition)) || [];
      optionIndex = temp.indexOf(option);
      optionIndex == -1 ? temp.push(option) : temp.splice(optionIndex, 1);
      this.setState({
        tempComparisonCondition: temp,
        isAllOptionsSelected: (temp.length !== constants.ALL_COMPARISON_CONDITIONS.length) ? false : true
      });
    };
  }

  /**
   * This function will be triggered when user clicks on select all button and perform selection/de-selection
   * over the options
   */
  selectUnSelectAllOptions() {
    let stateObj = Object.assign({}, this.state);
    stateObj.isAllOptionsSelected = !stateObj.isAllOptionsSelected;
    if (stateObj.isAllOptionsSelected) {
      stateObj.tempComparisonCondition = [...constants.ALL_COMPARISON_CONDITIONS];
    } else {
      stateObj.tempComparisonCondition = [];
    }
    this.setState(stateObj);
  }

  /**
   * This function will be triggered when user clicks on the apply cta and it will save the changes made by the user on modal
   */
  applyAttributes() {
    this.setState({
      comparisonCondition: this.state.tempComparisonCondition,
      showModal: false
    });
  }

  render() {
    const { compareList } = this.props,
      translation = {
        addAttributeCtaText: 'Add attributes',
        modalHeader: 'Add/Remove Attributes',
        cancelCta: 'Cancel',
        applyCta: 'Apply',
        searchPlaceholder: 'Search Attributes..',
        selectAllText: 'Select All',
        noAttributesText: 'No Atrributes to compare. Please add some attributes'
      };
    return (
      <div className="comparison-table-container">
        <div className="blue add-atribut-cta" onClick={this.isOpenAddAtrributModal}>{translation.addAttributeCtaText}</div>
        <div className="dfc">
          {
            this.state.comparisonCondition.length ? (
              this.state.comparisonCondition.map((condition, index) => (
                <div className="dfr table-row" key={index}>
                  <div className="table-column font-dark comparison-parameter">{this.capitalizeFirstLetter(condition)}</div>
                  {
                    compareList.map((item, index) => (
                      <div className={"product-column font-dark-light " + this.getClassForCondition(item[condition.toLowerCase()])} key={item.id}>
                        {condition === constants.COLORS ? (
                          <div className="dfr colors">
                            {
                              item[condition.toLowerCase()].length > 0 && item[condition.toLowerCase()].map((color, index) => (
                                <div className={"color-box " + color} key={index}></div>
                              ))
                            }
                          </div>
                        ) : (condition === constants.VENDORS ? item[condition.toLowerCase()].join(',') : item[condition.toLowerCase()])
                        }
                      </div>
                    ))
                  }
                </div>
              ))
            ) : ('')
          }
          {
            !this.state.comparisonCondition.length && (
              <div className="dfr no-attribute font-dark">{translation.noAttributesText}</div>
            )
          }
        </div>
        {
          this.state.showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header font-dark">{translation.modalHeader}</div>
                <div className="body-content">
                  <div className="search-input-field">
                    <input type="text"
                      className="font-dark-light drop-input-text"
                      onChange={this.filterOnSearch}
                      value={this.state.searchText}
                    />
                    {
                      !this.state.searchText && (
                        <span className="font-dark-light placeholder-text">{translation.searchPlaceholder}</span>
                      )
                    }
                  </div>

                  <div className="font-dark dfr">
                    <input className="check-box" type="checkbox" name="" value="" checked={this.state.isAllOptionsSelected ? true : false} onChange={this.selectUnSelectAllOptions}></input>
                    <span>{translation.selectAllText}</span>
                  </div>
                  <div className="divider"></div>
                  {
                    this.state.allConditions.map((item, index) => (
                      <div className="font-dark-light dfr options" key={index}>
                        <input className={"check-box "} type="checkbox" name="" value="" checked={this.state.tempComparisonCondition.includes(item) ? true : false}
                          onChange={this.checkAndUncheckedOption(item)}></input>
                        <span>{this.capitalizeFirstLetter(item)}</span>
                      </div>
                    ))
                  }
                </div>
                <div className="modal-footer">
                  <div className="cancel-cta font-dark" onClick={this.isOpenAddAtrributModal}>{translation.cancelCta}</div>
                  <div className="apply-cta font-dark white bg-blue" onClick={this.applyAttributes}>{translation.applyCta}</div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
};

ComparisonTable.propTypes = {
  compareList: PropTypes.array.isRequired
};
export default ComparisonTable;
