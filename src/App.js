import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedOption, setSelectedOption] = useState('Facebook');
  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [resetDisplay, setResetDisplay] = useState('none');
  const [errorMessage, setErrorMessage] = useState('');

  const socials = ['Facebook'];

  const handleSocialChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleURLChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (selectedOption === 'Facebook') {
      const username = inputValue.replace('@', '');
      const apiUrl = `https://graph.facebook.com/${username}/picture?type=large`;

      fetch(apiUrl)
        .then((data) => {
          if (data.status === 400) {
            resetState();
            setErrorMessage('Please enter a valid username.');
            setTimeout(()=>{setErrorMessage('')}, 3000)
          } else {
            setImgSrc(data.url);
            setErrorMessage('');
          }
        });

      setResetDisplay('flex');
    }
  };

  const resetState = () => {
    setImgSrc('');
    setInputValue('');
    setResetDisplay('none');
    setErrorMessage('');
  };

  return (
    <div className="container">
      <h1>Profile Picture Downloader</h1>
      <div className="form-container">
        <select
          onChange={handleSocialChange}
          value={selectedOption}
          className="select-dropdown"
        >
          {socials.map((social) => (
            <option key={social} value={social}>
              {social}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter username"
          value={inputValue}
          onChange={handleURLChange}
          className="input-field"
        />

        <button onClick={handleButtonClick}>Get Profile Picture</button>
      </div>
      <p>{errorMessage}</p>

      <img src={imgSrc} />

      <div style={{ display: resetDisplay }} className="form-container">
        <button onClick={resetState}>Reset Image</button>
      </div>
    </div>
  );
};

export default App;
