import React, { Component } from 'react'
import './checkout.css'
import Order from '../goods/Order'
import ReactSelect from 'react-select';
import image from '../Assets/image.png'
import { IoWalletOutline } from "react-icons/io5";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(localStorage.getItem('orders')) || [],
      regions: [],
      area: [],
      cities: [],
      warehouses: [],
      selectedRegion: '',
      selectedCity: '',
      selectedArea: '',
      selectedWarehouse: ''
    };
  }

  componentDidMount() {
    this.fetchRegions();
  }

  fetchRegions = () => {
    fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: '', // replace with your API key
        modelName: "AddressGeneral",
        calledMethod: 'getSettlementAreas',
        methodProperties: {
        }
      }),
    })
    .then(response => response.json())
    .then(data => {
      const filteredRegions = data.data.filter(region => region.Description !== 'АРК');
      this.setState({ regions: filteredRegions });
      const AD = data.data.Ref; // Access Ref on the first element of the array
      this.fetchCities(AD);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  fetchCities = async (AD) => {
    let page = 1;
    let cities = [];
  
    while (true) {
      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: '', // replace with your API key
          modelName: 'AddressGeneral',
          calledMethod: 'getSettlements',
          methodProperties: {
            AreaRef: AD,
            Warehouse: 1,
            Page: page
          }
        }),
      });
  
      const data = await response.json();
  
      if (data.data.length === 0) {
        // No more data, break the loop
        break;
      }
  
      cities = [...cities, ...data.data];
      page++;
    }
  
    this.setState({ cities: cities });
  }

  fetchWarehouses = () => {
    fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: '', // replace with your API key
        modelName: "AddressGeneral",
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityName: this.state.selectedCity,
        }
      }),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ warehouses: data.data });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  handleRegionChange = (selectedOption) => {
    const selectedRegion = selectedOption ? selectedOption.value : '';
    this.setState({ 
      selectedRegion: selectedRegion,
      cities: [], // reset cities
      area: [], // reset cities
      selectedCity: '', // reset selected city
      selectedArea: '', // reset selected city
      warehouses: [], // reset warehouses
      selectedWarehouse: '' // reset selected warehouse
    }, () => {
      if (selectedOption) {
        const AD = this.state.regions.find(region => region.Description === selectedRegion).Ref;
        this.fetchCities(AD);
      }
    });
  }

  handleCityChange = (selectedOption) => {
    const selectedCity = selectedOption ? selectedOption.value : '';
    this.setState({ 
      selectedCity: selectedCity,
    }, () => {
      if (selectedOption) {
        const DD = this.state.cities.find(city => city.Description === selectedCity).Ref;
        this.fetchWarehouses(DD);
      }
    });
  }

  
  handleWarehouseChange = (selectedOption) => {
    this.setState({ selectedWarehouse: selectedOption ? selectedOption.value : '' });
  }


  handleRemoveFromCart = (itemToRemove) => {
    const newCart = this.state.cart.filter(item => item.id !== itemToRemove.id);
    this.setState({ cart: newCart }, () => {
      localStorage.setItem('orders', JSON.stringify(newCart));
    });
    window.location.reload();
  };

  getTotal = () => {
    return this.state.cart.reduce((sum, item) => sum + Number(item.price), 0);
  }

  render() {
    const { regions, cities, area, warehouses, selectedRegion,selectedArea, selectedCity, selectedWarehouse } = this.state;
    const options = regions.map(region => ({ value: region.Description, label: region.Description + " область" }));
    const options2 = cities.map(cities => ({ value: cities.Description, label: cities.Description }));
    const options4 = warehouses.map(warehouses => ({ value: warehouses.Description, label: warehouses.Description }));
    return (
      <div className='container'>
        <div className='delivery'>
        <h2><img className='NP' src={image} /></h2> 

      <div className="region-select">
        Region:
        <ReactSelect 
        value={options.find(option => option.value === selectedRegion)} 
        onChange={this.handleRegionChange} 
        options={options} 
      />
      </div>

      <div className="settlement-select">
      Settlement:
       <ReactSelect 
        value={options2.find(option => option.value === selectedCity)} 
        onChange={this.handleCityChange} 
        options={options2} 
        isDisabled={!selectedRegion}
      />
      </div>

      <div className="warehouse-select">
      Warehouse:
       <ReactSelect 
       value={options4.find(option => option.value === selectedWarehouse)} 
       onChange={this.handleWarehouseChange} 
       options={options4} 
       isDisabled={!selectedCity}
       />
      </div>
      Payment:
      <div className="payment"><input className='radio' type="radio" checked></input>
      <IoWalletOutline className='icon'/> Payment on delivery</div>
      <div className='inputRecipient'>
      Recipient
        <input
              type="text"
              placeholder={(localStorage.getItem('userName') === 'null' || localStorage.getItem('userName') === null) ? "User" : localStorage.getItem('userName')}
              className="input" 
        />
      </div>
      <div className='inputNumberRecipient'>
      Recipient's phone number
        <input
              type="text"
              placeholder={(localStorage.getItem('userPhoneNumber') === 'null' || localStorage.getItem('userPhoneNumber') === null) ? "380" : localStorage.getItem('userPhoneNumber')}
              className="input" 
        />
      </div>
        </div>

        <div className='check'>
          <div className='shop-cart'>
            {this.state.cart.map((item, index) => (
              <Order key={index} item={item} onRemove={this.handleRemoveFromCart} />
            ))}
            <p className="total">Total: {this.getTotal().toFixed(2)}$</p>
            <button className="check-button">Confirm the order</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;