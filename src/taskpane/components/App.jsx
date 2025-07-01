import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import WordScanner from "./WordScanner";
import "./styles.css";
import  PopUp  from "./PopUp";



const App = (props) => {
  const { title } = props;
  
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.

  const [documentChanged, setDocumentChanged] = useState(false);

  const handleDocumentChange = () => {
    setDocumentChanged(true);
  };

  const handleClosePopup = () =>{
    setDocumentChanged(false);
  };

  return (
    <div>
      {documentChanged && <PopUp onClose={handleClosePopup} />}   
      <WordScanner onCustomPropertySaved= {handleDocumentChange}/>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
