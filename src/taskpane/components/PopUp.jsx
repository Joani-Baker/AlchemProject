import * as React from 'react';
import { DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import{makeStyles,useId,Button,Popover,PopoverTrigger,PopoverSurface} from "@fluentui/react-components";
import "./styles.css"

const PopUp = ({onClose, conditionMet, open}) => {
  return(
  <Popover 
    open = {conditionMet}
    
    trapFocus
    >
      <PopoverTrigger disableButtonEnhancement></PopoverTrigger>
      <PopoverSurface aria-label = "Alert">
        <h2>Alert</h2>
        <p>custom properties have been added</p>
        <Button onClick={onClose}>Close</Button>
      </PopoverSurface>
    
  </Popover>
  )
};

export default PopUp; 