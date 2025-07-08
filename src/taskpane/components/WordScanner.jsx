import * as React from "react";
import { useState} from "react";
import { Button,Field} from "@fluentui/react-components";
import WordSelection from "./WordSelection";
import PropTypes from "prop-types";
import "./styles.css"



const WordScanner = ({onCustomPropertySaved}) => {
  const[to, setTo] = useState("");
  const[text, setText]= useState("");

const handleTextChange = async (event) => {
    setText(event.target.value);
  };

  const handleClick = async () => {
    await WordSelection(onCustomPropertySaved);
  };



  return (
    <div className= "textPromptAndInsertion">
      <Field className="instructions"> Scan the document for metadata </Field>
      <Button appearance="primary" size="large" className="scanButton" onClick={handleClick}>
        Scan
      </Button>
    </div>


  );
};

WordScanner.propTypes = {
  onCustomPropertySaved: PropTypes.func.isRequired,
};

export default WordScanner;