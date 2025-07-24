import * as React from "react";
import { useState, useEffect} from "react";
import {useBoolean} from '@fluentui/react-hooks';
import "./styles.css";
import  PopUp  from "./PopUp";
import MetadataForm from "./MetadataForm";
import WordSelection from "./WordSelection";
import {Spinner} from "@fluentui/react/lib/Spinner";
import WordAccum from "./WordAccum";
import TextInsertion from "./TextInsertion";

export default function App(){
  
  // The list items are static and won't change at runtime
  const [documentChanged, setDocumentChanged] = useState(false);
  const[metadata, setMetadata] = useState({category:"", tags:""});
  const[metadataChanged, setMetadataChanged] = useState(false);
  const[isloading, setIsLoading ] = useState(true);
  const[isPopupVisible, {setTrue: showPopup, setFalse: hidePopup}] = useBoolean(false);
  const[avaliableTags, setAvaliableTags] = useState([]);
  const[wordCount, setWordCount] = useState(0);
  const[wordFrequency, setWordFrequency] = useState([]);


  useEffect(() => {
    Office.onReady(() => {
      setIsLoading(false);
      const timeInterval = setInterval (() => {
        handleDocumentChange()
      },15000)
      return () => clearInterval(timeInterval);
      })
    },[]);
    


  const handleDocumentChange = async () => {
    WordSelection(handleCustomPropertySaved);
    try{
      const frequencyW = await WordAccum();
      const formatted = frequencyW.map(([word, count]) => ({word,count}));
      console.log(formatted);
      setWordFrequency(formatted);
      console.log(wordFrequency);
    }catch(error){
      console.log("not reached wordaccum", error);
    }
    setDocumentChanged(true);
  };

  const handleClosePopup = () =>{
    setDocumentChanged(true);
    hidePopup();
  };

    const handleCustomPropertySaved =(foundWords, counter)=> {
      const uniqueTags = [...new Set(foundWords)];
      const newWord = counter;
      setAvaliableTags(uniqueTags);
      setWordCount(newWord);
      
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
      {isPopupVisible && <PopUp onClose={handleClosePopup} conditionMet={saveMetadata}/>}   
      <MetadataForm metadata={metadata} onSave={saveMetadata} avaliableTags={avaliableTags} wordCount={wordCount} wordFrequency={wordFrequency}/>
      
    </div>
  );
}

