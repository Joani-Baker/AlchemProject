import * as React from "react";
import {useState, useEffect} from "react";
import WordDeletion from "./WordDeletion";
import {CounterBadge, Card, Dropdown, Option, Text, Label,Input,Button,makeStyles,shorthands} from "@fluentui/react-components";
import {Spinner} from "@fluentui/react/lib/Spinner";
import "./styles.css"; 
import HeaderInsertion from "./HeaderInsertion";

const useStyles = makeStyles({
  button:{
    backgroundColor: "rgba(252, 210, 58, 1)",
    
  },
  container:{
    display:"flex",
    justifyContent:"center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    padding:("16px"),
    
},
  metadataForm:{
    display:"flex",
    flexDirection: "column",
    width: "100%",
    maxWidth:"400px",
    ...shorthands.borderWidth("16px", "8px"),
    backgroundColor: "rgb(4,62,99)"
},
  text:{
    textAlign: "center",
    color:"white",
},
  text2:{
    textAlign: "center",
    color:"dark blue",
  }
});

export default function MetadataForm({metadata, onSave, avaliableTags, wordCount, wordFrequency}){
  const[category, setCategory] = useState(metadata.category|| "");
  const[tags, setTags] = useState(metadata.tags|| "");
  const[selectedItems, setSelectedItems] = useState([]);

  useEffect(() =>{
    setCategory(metadata.category || "");
    setTags(metadata.tags || "");
  },[metadata] );

  const handleChange = (field, value) =>{
    if (field === "category") setCategory(value);
    if (field == "tags") setTags(value);
  };

  const handleSave = () =>{
        onSave({category, tags})
  };

  const handleInsertion = async() => {
    console.log("func has been called")
    try{
      console.log("try bracket");
      await HeaderInsertion();
      console.log("func completed");
    }catch(error){
      console.error("Error inserting header", error);
    }
  };

  const handleDropDown = (option) =>{
    console.log(option);
    let selectedItems = [... selectedItems];
    if (option.selected){
      selectedItems.push(option.key);
    }else{
        selectedItems=selectedItems.filter(key => key !== option.key);
    }
    setSelectedItems(selectedItems);
    WordDeletion(selectedItems);    
};

const styles = useStyles();

return(
  <div className={styles.container}>
    <Card className={styles.metadataForm}>
      <Text className = {styles.text}> Detecting Metadata</Text>
      <Label className = {styles.text} htmlFor="catTextarea">Category</Label>
      <Input
        id="catTextarea"
        value={category}
        onChange={(e) => handleChange("category", e.target.value)}
        placeholder="Category Input"
        />
      <label className = {styles.text}>Tag</label>
      <Dropdown 
        placeholder="Tag document"
        selectedOptions={[tags]}
        onOptionSelect={(event, data) => {
          handleChange("tags", data.optionValue);
        }}
        >
          {avaliableTags.map(tag => (
            <Option key={tag} value={tag}>
              {tag}
            </Option>
          ))}
          {wordFrequency.map((item, index) => (
            <Option key={index}>
              {item.word}
              </Option>
          ))}
        </Dropdown>
      <Button
        className={styles.button}
        onClick={handleSave}>
          Save Metadata
        </Button>
      <Text className={styles.text}>Sensitivities</Text>
      <CounterBadge count={wordCount} shape="circular" side="small" />
      {!wordCount && <Spinner label="Finding Sensitivies ..."/>}
      <label className = {styles.text}> Phrases flagged</label>
      <Dropdown
        multiSelect={true}
        placeholder="delete from document"
        selectedOptions={selectedItems}
        onOptionSelect={(event, data) => {
          const key = data.optionValue;
          const isSelected = selectedItems.includes(key);
          if(key === "deleteAll"){
            const allKeys = avaliableTags.map(tag=>tag);
            setSelectedItems(allKeys);
            WordDeletion(allKeys);     
          } else{
            const updated = isSelected
            ? selectedItems.filter(k =>k !== key):[...selectedItems,key];
            setSelectedItems(updated);
            WordDeletion(updated);
          }
        }}
      >
      <Option value="deleteAll">Delete All</Option>
        {avaliableTags.map(tag => (
        <Option key={tag} value={tag}>
          {tag}
        </Option>
        ))}
      </Dropdown>
      <Card>
      <Text className={styles.text2}>Most frequent</Text>
      {wordFrequency.map((item, index) => (
      <Text className={styles.text2} key={index}>
        {item.word}: {item.count}</Text>
      ))}
      </Card>
      <Button appearance="primary" disabled={false} onClick={handleInsertion}>
          Insert CUI Marking
          </Button>
    </Card>
  </div>
);
}
