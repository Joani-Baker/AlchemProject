import * as React from "react";
import { DefaultButton, TextField, Dropdown, IDropdownStyles } from "@fluentui/react";
import WordDeletion from "./WordDeletion";
import {CounterBadge, Text, Card, CardHeader, Option} from "@fluentui/react-components";

export default class MetadataForm extends React.Component{
     constructor(props) {
        super(props);
        this.state = {
            category: props.metadata.category || "",
            tags: props.metadata.tags || "",
            selectedItems: []
                       
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.metadata !== this.props.metadata) {
      this.setState({
        category: this.props.metadata.category || "",
        tags: this.props.metadata.tags || ""
      });
    }
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  }

  handleSave = () => {
    this.props.onSave({
      category: this.state.category,
      tags: this.state.tags
    });
  }

  handleDropDown = (option) =>{
    console.log(this.state.selectedItems);
    let selectedItems = [...this.state.selectedItems];
    if (option.selected){
        selectedItems.push(option.key);
    }else{
        selectedItems=selectedItems.filter(key => key !== option.key);
    }
    this.setState({selectedItems});
    WordDeletion(selectedItems);
  };
  render(){

  return(
    <div className="textPromptAndInsertion">
        <div className="metadata-form">
            <TextField 
                label= "Category:"
                value={this.state.category}
                onChange={(e, value) => this.handleChange("category",value)}
                placeholder= "write a category"
            />

            <Dropdown
                label="Tag"
                selectedKey={this.state.tags}
                onChange={(e, option)=> this.handleChange("tags", option.text)}
                placeholder="metadata-found"
                options={this.props.avaliableTags.map(word => ({ key: word, text: word }))}
            />
            <DefaultButton
                className="ms-welcome__action"
                iconProps={{ iconName: "Save" }}
                onClick={this.handleSave}
                >
                Save Metadata
                </DefaultButton>
            <Card className = "card">
                <CardHeader header={<Text>Secure-Content</Text>}/>
                <CounterBadge className = "wordCounter" count = {this.props.wordCount} appearance="filled" shape= "circular" side ="small"/>
                <Dropdown 
                    label="phrases flagged"
                    multiSelect
                    placeholder="delete from document"
                    options={this.props.avaliableTags.map(tag => ({ key: tag, text: tag}))}
                    selectedKeys = {this.state.selectedItems}
                    onChange = {(event,option)=>this.handleDropDown(option)}
                    >
                    </Dropdown>
            </Card>   
        </div>
      </div>
  )
}
}