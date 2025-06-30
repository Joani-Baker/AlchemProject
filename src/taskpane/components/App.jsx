import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import HeroList from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";
  import WordSelection from "./WordSelection";
import { useState, useEffect } from "react";
import WordScanner from "./WordScanner";


const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { title } = props;
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.

  const [documentChanged, setDocumentChanged] = useState(false);
  const listItems = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration",
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro",
    },
  ];

  const handleDocumentChange = () => {
    setDocumentChanged(true);
  };

  return (
    <div className={styles.root}>

      {documentChanged && (
        <div className="notification-banner">
          properties have been added to this document!
          </div>
      )}
      
      <WordScanner onCustomPropertySaved= {handleDocumentChange}/>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
