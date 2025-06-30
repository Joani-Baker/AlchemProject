import * as React from "react";
import { Button,Field, Textarea, tokens, makeStyles,  } from "@fluentui/react-components";
import WordSelection from "./WordSelection";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

});



const WordScanner = ({onCustomPropertySaved}) => {

const styles = useStyles(); 

const handleTextChange = async (event) => {
    setText(event.target.value);
  };

  const handleClick = async () => {
    await WordSelection(onCustomPropertySaved);
  };

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field className={styles.instructions}> scan the document 
      </Field>
      <Button appearance="primary" size="large" onClick={handleClick}>
        Scan
      </Button>
    </div>


  );
};

WordScanner.propTypes = {
  onCustomPropertySaved: PropTypes.func.isRequired,
};

export default WordScanner;
