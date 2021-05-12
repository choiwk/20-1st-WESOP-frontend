import React from 'react';
import Gift from './Gift/Gift';
import './GiftList.scss';

class GiftList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }
  getInfo = () => {
    fetch('/data/mockdata.json', {
      method: 'GET',
    })
      .then(products => products.json())
      .then(products =>
        this.setState({
          product: products,
        })
      );
  };
  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { product } = this.state;
    return (
      <div className="GiftList">
        {product.map(gift => {
          return (
            <Gift
              key={gift.id}
              id={gift.id}
              productName={gift.productName}
              img={gift.img}
              price={gift.price}
              size={gift.size}
              desc={gift.desc}
              contents={gift.contents}
            />
          );
        })}
      </div>
    );
  }
}

export default GiftList;