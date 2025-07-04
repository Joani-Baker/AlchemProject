import * as React from "react";
import { DefaultButton, TextField, Dropdown, IDropdownStyles } from "@fluentui/react";
import PropTypes from "prop-types";
import WordSelection from "./WordSelection";

export default class MetadataForm extends React.Component{
     constructor(props) {
        super(props);
        this.state = {
            category: props.metadata.category || "",
            tags: props.metadata.tags || "",
            availableTags:[]
    };
  }

  componentDidMount(){
    WordSelection().then((words) => {
        this.setState({availableTags: words.foundWords});}).catch((error)=> {console.error("no doc words", error);
        })
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
                options={this.state.availableTags.map(word => ({ key: word, text: word }))}
            />
                <DefaultButton
                className="ms-welcome__action"
                iconProps={{ iconName: "Save" }}
                onClick={this.handleSave}
                >
                Save Metadata
                </DefaultButton>
        </div>
      </div>
  )
}
}