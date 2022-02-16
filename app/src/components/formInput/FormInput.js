import React from "react";
//import {IconEdit} from '../icons/Icons';

const FormInput = ( {type, icon, method, value, name, clazz, placeholder, count, label} ) => {

const i = typeof count !== 'undefined' ? count : null;
const classStyle = 'uk-width-1-2 uk-grid-margin uk-first-column';

if(type && type === 'iconButton')  return(
        <div className={clazz ? clazz : classStyle}>
            <div className="uk-flex-auto uk-grid-margin uk-flex-auto_h100">
                <div uk-tooltip={value} className="icon-button">
                            <span className="uk-icon" onClick={(e)=>method(e,i)}>
                                {icon}
                            </span>
                </div>               
            </div>
        </div>

)

if(type && type === 'textArea')  return(
    <div className={clazz}>
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon">
                    {icon}
                </span>
                <textarea onChange={e => method(e) } value={value} name={name} className="uk-input" type="text" placeholder={placeholder} />
        </div>
    </div>

)

if(type && type === 'priceName')  return(

        <div className="uk-width-1-2 uk-grid-margin">
            <div className="uk-width-1-1">
                <label>{label}</label>
            </div>
        </div>

)

if(type && type === 'select')  return(

        <div className="uk-width-1-1 uk-grid-margin">
            <div className="uk-width-1-1 uk-inline">
                    <select onChange={e => method(e) } value={value} name={name} className="uk-select">
                        <option value="новый">Новый</option>
                        <option value="ожидает">Ожидает</option>
                        <option value="оплачен">Оплачен</option>
                        <option value="отправлен">Отправлен</option>
                        <option value="проблемный">Проблемный</option>
                        <option value="отменен">Отменен</option>
                    </select>
            </div>
        </div>

)

return(

    <div className={clazz}>
            <div className="uk-width-1-1 uk-inline">
                    <span className="uk-form-icon uk-icon">
                        {icon}
                    </span>
                    <input onChange={e => method(e, i) } value={value} name={name} className="uk-input" type="text" placeholder={placeholder} />
            </div>
    </div>

)

}

export default FormInput;