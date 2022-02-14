import React from "react";
const ConfirmModal = ({title, target, method, render, content, text}) => {

    return (

 <div id={target} container="false" uk-modal={true.toString()}>
    <div className="uk-modal-dialog">
    
        <div className="uk-modal-header">

        <button className="uk-modal-close-default" type="button" uk-close="true">
                <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <line fill="none" stroke="#000" strokeWidth="1.1" x1="1" y1="1" x2="13" y2="13"></line>
                    <line fill="none" stroke="#000" strokeWidth="1.1" x1="13" y1="1" x2="1" y2="13"></line>
                </svg>
        </button>

            <h2 className="uk-modal-title">{title}</h2>
        </div>

        <div className="uk-modal-body">
            { render ? render(method, typeof text === 'object' ? text : '') : content}
        </div>
        <div className="uk-modal-footer">
            <span>{typeof text === 'string' ? text : ''}</span>
        </div>
    </div>
</div> 

    )
}

export default ConfirmModal;