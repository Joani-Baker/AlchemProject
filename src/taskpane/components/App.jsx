import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect} from "react";
import {useBoolean} from '@fluentui/react-hooks';
import WordScanner from "./WordScanner";
import "./styles.css";
import  PopUp  from "./PopUp";
import MetadataForm from "./MetadataForm";
import WordSelection from "./WordSelection";



export default function App(){
  
  // The list items are static and won't change at runtime
  const [documentChanged, setDocumentChanged] = useState(false);
  const[metadata, setMetadata] = useState({category:"", tags:""});
  const[metadataChanged, setMetadataChanged] = useState(false);
  const[isloading, setIsLoading ] = useState(true);
  const[isPopupVisible, {setTrue: showPopup, setFalse: hidePopup}] = useBoolean(false);
  const[avaliableTags, setAvaliableTags] = useState([]);

  useEffect(() => {

    Office.onReady(() => {
      setIsLoading(false);
      

      Office.context.document.addHandlerAsync(
        Office.EventType.DocumentSelectionChanged,
        handleDocumentChange
      );

      Office.context.document.addHandlerAsync(
        "contentControlSelectionChanged",
        handleDocumentChange
      );


    })
  },[]);
  const handleDocumentChange = () => {
    WordSelection(handleCustomPropertySaved);
    setDocumentChanged(true);
  };

  const handleClosePopup = () =>{
    setDocumentChanged(true);
    hidePopup();
  };

    const handleCustomPropertySaved =(foundWords)=> {
      const uniqueTags = [...new Set(foundWords)];
      setAvaliableTags(uniqueTags);
      
    };
  const saveMetadata = async (newMetadata) => {
    try {
      await Word.run(async (context) => {
        // Delete existing properties if they exist
        const properties = context.document.properties.customProperties;
        properties.load();
        await context.sync();
        
        for (let i = 0; i < properties.items.length; i++) {
          if (properties.items[i].key === "DocumentCategory" || 
              properties.items[i].key === "DocumentTags") {
            properties.items[i].delete();
          }
        }
        
        // Add new values
        properties.add(newMetadata.category, newMetadata.tags);
        
        await context.sync();
        
        setMetadata(newMetadata);
        setDocumentChanged(false);
        console.log("Saved metadata:", newMetadata);
        setMetadataChanged(true);
        showPopup();
        // Show success message
        alert("Metadata saved successfully!");
      });
    } catch (error) {
      console.error("Error saving metadata:", error);
      alert("Error saving metadata: " + error.message);
    }
  };

  return (
    <div className="App"> 
      {isPopupVisible && <PopUp onClose={handleClosePopup} />}   
      <WordScanner onCustomPropertySaved= {handleDocumentChange}/>
      <MetadataForm metadata={metadata} onSave={saveMetadata} avaliableTags={avaliableTags} />
    </div>
  );
}

