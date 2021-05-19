import React from 'react';
import './ProductList.scss';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      slideRight: 0,
      barLeft: 0,
    };
  }

  componentDidMount() {
    fetch('/data/category_id=1.json')
      .then(productData => productData.json())
      .then(productData => {
        this.setState({
          products: productData['result'],
        });
      });
  }

  clickPrev = () => {
    const { slideRight, barLeft } = this.state;
    barLeft > 0 &&
      this.setState({
        barLeft: barLeft - 16.4,
        slideRight: slideRight - 20,
      });
  };

  clickNext = () => {
    const { slideRight, barLeft } = this.state;
    barLeft < 80 &&
      this.setState({
        barLeft: barLeft + 16.4,
        slideRight: slideRight + 20,
      });
  };

  render() {
    const { products, slideRight, barLeft } = this.state;
    const { clickPrev, clickNext, slider } = this;

    return (
      <div className="productList">
        <div style={{ right: `${slideRight}%` }} ref={slider}>
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img
                alt="individualProduct"
                src={product[0].product_selections[0].image_url}
              />
              <p>{product[0].product_name}</p>
              <p>{product[0].product_ingredients.join(', ')}</p>
            </div>
          ))}
        </div>
        <button
          className="prev"
          onClick={clickPrev}
          style={{ left: barLeft <= 0 && -90 }}
        >
          <i className="fas fa-chevron-left" />
        </button>
        <button
          className="next"
          onClick={clickNext}
          style={{ right: barLeft > 80 && -90 }}
        >
          <i className="fas fa-chevron-right" />
        </button>
        <div className="staticBar">
          <div className="movingBar" style={{ left: `${barLeft}%` }}></div>
        </div>
      </div>
    );
  }
}

export default ProductList;
