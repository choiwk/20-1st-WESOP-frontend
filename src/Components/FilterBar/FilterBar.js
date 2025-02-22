import React from 'react';
import FilterBarExtend from '../FilterBarExtend/FilterBarExtend';
import FilterBtnOpen from '../FilterBtn/FilterBtnOpen';
import FilterBtnClose from '../FilterBtn/FilterBtnClose';
import { BrowserRouter, Link } from 'react-router-dom';
import './FilterBar.scss';
import { PRODUCTS_BASE_URL } from '../../config';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBtnOpen: true,
      filterBtnClose: false,
      hide: false,
      offsetTop: false,
      category: [],
    };
  }

  componentDidMount() {
    window.addEventListener('wheel', this.handle);

    fetch(
      PRODUCTS_BASE_URL
        ? `${PRODUCTS_BASE_URL}/products?category_id=1`
        : `/data/category_id=1.json`
    )
      .then(categorys => categorys.json())
      .then(categorys => {
        const categories = {};
        categorys.result.forEach(category => {
          categories[category[0].category_id] = categories[
            category[0].category_id
          ] || {
            menu_id: category[0].menu_id,
            menu_name: category[0].menu_name,
            category_id: category[0].category_id,
            category_name: category[0].category_name,
            feature_category_name:
              category[0].product_features[0].feature_category_name,
            features: category[0].product_features[0].features,
            features_use: category[0].product_features[1].features,
            product_ingredients: category[0].product_ingredients,
          };
        });
        this.setState({
          category: Object.values(categories),
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handle);
  }

  handle = () => {
    this.filterBar.current.getBoundingClientRect().top <= 0
      ? this.setState({ offsetTop: true })
      : this.setState({ offsetTop: false });
  };

  filterBtn = () => {
    if (this.state.filterBtnOpen)
      this.setState({
        filterBtnOpen: false,
        filterBtnClose: true,
      });
    else {
      this.setState({ filterBtnOpen: true, filterBtnClose: false });
    }
  };
  filterBar = React.createRef();

  render() {
    const { filterBtnOpen, filterBtnClose, category } = this.state;
    const categoryList = category.map(categorys => (
      <Link to="/giftpage">
        <li>{categorys.category_name}</li>
      </Link>
    ));
    return (
      <>
        {category && (
          <div className="filterBar">
            <div className="filterBarBefore">
              <div className="filterBarNav" ref={this.filterBar}>
                <ul className="filterList">
                  <li>모든상품</li>
                  <li>|</li>
                  {categoryList}
                </ul>
                <div className="filterCategory" onClick={this.filterBtn}>
                  {filterBtnOpen && <FilterBtnOpen />}
                  {filterBtnClose && <FilterBtnClose />}
                </div>
              </div>
            </div>

            {this.state.offsetTop && (
              <div className="filterBarAfter">
                <Link to="/">
                  <img
                    className="logo"
                    alt="위솝로고"
                    src="/images/wesop.png"
                  />
                </Link>
                <div className="filterCategory" onClick={this.filterBtn}>
                  {filterBtnOpen && <FilterBtnOpen />}
                  {filterBtnClose && <FilterBtnClose />}
                </div>
              </div>
            )}
          </div>
        )}
        {filterBtnClose && (
          <FilterBarExtend
            category={category}
            filterBtnClose={filterBtnClose}
            styleChange={this.state.offsetTop}
          />
        )}
      </>
    );
  }
}
export default FilterBar;
