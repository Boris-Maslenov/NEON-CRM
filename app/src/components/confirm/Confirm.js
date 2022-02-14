import React from "react";

const Confirm = ({method}) => {

    return(

            <p uk-margin={true.toString()}>
                <button className="uk-button uk-button-default uk-button-small uk-modal-close">Отмена</button>
                <button onClick={method} className="uk-button uk-button-primary uk-button-small">Подтвердить</button>
            </p>
        
    )

}


export default Confirm;