import * as React from 'react';
import { DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import "./styles.css"

const PopUp = ({onClose}) => {
    return(
        <Layer>
          <Popup
            className= "root"
            role="dialog"
            aria-modal="true"
            onDismiss={onClose}
            enableAriaHiddenSiblings={true}
          >
            <Overlay onClick={onClose} />
            <FocusTrapZone>
              <div role="document" className= "content">
                <h2>Alert</h2>
                <p>
                    Custom Properties have been added to this document.
                </p>
                <DefaultButton onClick={onClose}>Close Popup</DefaultButton>
              </div>
            </FocusTrapZone>
          </Popup>
        </Layer>
        )
    };
    
export default PopUp;