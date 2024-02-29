import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry,setSelectedCountry] = useState('');
  const [selectedState,setSelectedState] = useState('');
  const [selectedCity,setSelectedCity] = useState('');

  useEffect(()=>{
    axios.get("https://crio-location-selector.onrender.com/countries")
    .then((res)=>setCountry(res.data))
    .catch((err)=>{
      console.log(err);
    })
  },[]);
  // console.log(country);

  useEffect(()=>{
    if(selectedCountry){
    axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
    .then((res)=>{
        
        setState(res.data);
        setCity([]);
        setSelectedCity('');
        setSelectedState('');
    }
    )
    .catch((err)=>{
      console.log(err);
    })
  }
  },[selectedCountry]);
  // console.log(state);

  useEffect(()=>{
    if(selectedState && selectedCountry){
    axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
    .then((res)=>{
      setCity(res.data);
      setSelectedCity("");   
    })
    .catch((err)=>{
      console.log(err);
    })
    // console.log(selectedState);
  }
  },[selectedCountry,selectedState]);
  // console.log(city);
  return (
    <div className='wraper'>
      <h1>Select Location</h1>
      <div className='dropdown'>
          <select value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)}>
            <option value={""} disabled>
              Select Country
            </option>
            {country.map((el)=>{
              return (
                <option value={el} key={el} >
                {el}
                </option>
              )
            })}
          </select>

          <select value={selectedState} onChange={(e)=>setSelectedState(e.target.value)}>
            <option value={""} disabled>
              Select State
            </option>
            {state.map((el)=>{
              return (
                <option value={el} key={el} >
                {el}
                </option>
              )
            })}
          </select>

          <select value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
            <option value={""} disabled>
              Select City
            </option>
            {city.map((el)=>{
              return (
                <option value={el} key={el} >
                {el}
                </option>
              )
            })}
          </select>
      </div>
      <div className='res'>
      {selectedCity&&(<p className='result'>You selected <span className='bold'>{selectedCity},</span>
      <span className='highlight'>{" "} {selectedState},{selectedCountry}</span>
      </p>)}
      </div>
    </div>
  )
}

export default App
