import React from "react";
import { useState } from "react";

const Filters = ({method}) => {

const [value, setValue] = useState({
        search: '',
        status: 'все',
        dateStart: '',
        dateEnd: '',
});

const setValueInput = (e) => {
    setValue({
        ...value,
        [e.target.name]:  e.target.value
    })
}

return (

<div className="uk-section">

<ul uk-accordion="multiple: true">
    <li className="">
        <a className="uk-accordion-title" href="#">Фильтры</a>
        <div className="uk-accordion-content">
          
                    <div className="uk-flex uk-flex-custom">

                                    <div className="uk-flex__item">
                                            <nav className="uk-navbar-container uk-navbar" uk-navbar="">
                                                        <div className="uk-navbar-left">
                                                                <form className="uk-search uk-search-default">

                                                                    <span uk-search-icon="" className="uk-icon uk-search-icon">
                                                                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <circle fill="none" stroke="#000" strokeWidth="1.1" cx="9" cy="9" r="7"></circle>
                                                                            <path fill="none" stroke="#000" strokeWidth="1.1" d="M14,14 L18,18 L14,14 Z"></path>
                                                                        </svg>
                                                                    </span>

                                                                    <input name='search' onChange={e=>setValueInput(e)} value={value.search} className="uk-search-input" type="search" placeholder="Search"/>

                                                                </form> 
                                                        </div>
                                            </nav>
                                    </div>


                                    <div className="uk-flex__item">
                                            <div className="uk-margin-right uk-margin-left">Статус заказа: </div>
                                                    <form>
                                                            <div uk-form-custom="target: > * > span:first-child" className="uk-form-custom">
                                                                <select name='status' onChange={e=>setValueInput(e)} value={value.status}>
                                                                    <option value="все">Все</option>
                                                                    <option value="новый">Новый</option>
                                                                    <option value="ожидает">Ожидает</option>
                                                                    <option value="оплачен">Оплачен</option>
                                                                    <option value="отправлен">Отправлен</option>
                                                                    <option value="проблемный">Проблемный</option>
                                                                    <option value="отменен">Отменен</option>
                                                                </select>
                                                                <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                                                                    <span></span>
                                                                    <span uk-icon="icon: chevron-down" className="uk-icon"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" strokeWidth="1.03" points="16 7 10 13 4 7"></polyline></svg></span>
                                                                </button>
                                                            </div>
                                                    </form>
                                    </div>

                                    <div className="uk-flex__item">
                                            <div className="uk-margin-left">Дата заказа</div>
                                                    <div className="uk-margin-right uk-margin-left">
                                                                <div className="uk-inline uk-inline-padding">
                                                                            <span className="uk-form-icon uk-icon" uk-icon="icon: calendar"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"></path><rect width="1" height="3" x="6" y="2"></rect><rect width="1" height="3" x="13" y="2"></rect></svg></span>
                                                                            <input name='dateStart' onChange={e=>setValueInput(e)} value={value.dateStart}  className="uk-input" type="date"/>
                                                                </div>
                                                                <div className="uk-inline uk-inline-custom"> - </div>
                                                    
                                                                <div className="uk-inline uk-inline-padding">
                                                                            <span className="uk-form-icon uk-icon" uk-icon="icon: calendar"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"></path><rect width="1" height="3" x="6" y="2"></rect><rect width="1" height="3" x="13" y="2"></rect></svg></span>
                                                                            <input name='dateEnd' onChange={e=>setValueInput(e)} value={value.dateEnd} className="uk-input" type="date"/>
                                                                </div>
                                            </div>
                                    </div>


                                    <div className="uk-flex__item">
                                        
                                                        <button onClick={(e)=>method(value,e)} className="uk-button uk-button-primary uk-button-custom">Найти</button>
                                        
                                    </div>


                </div>
        </div>
    </li>

</ul>




</div>

)


}

export default Filters;