import React, { useEffect } from "react";
import {useState} from "react";

import {IconEdit, MobilePhone, Email, Bag, Credit, Address, Code, Info, List, Plus, Comment } from "../icons/Icons";

const Edit = ({method, text}) => {


//первоначальное значение
const [value, setName] = useState({
        id:'',
        name:'',
        phone:'',
        email:'',
        status: 'новый',
        address:'',
        track:'',
        admin_comment:'',
        price:0,
        payment_price:0, 
        cost_price: 0,
        delivery_price:0,  
        check: false
});

//изменение состояние при вызове формы
useEffect(()=>{
    if(text){

        initialProductsValue();

       const propValues = text[0];
        
        setName(state=>({...state, 
                        id:propValues['id'],
                        name:propValues['name'],
                        phone:propValues['phone'],
                        email:propValues['email'],
                        status:propValues['status'],
                        admin_comment:propValues['admin_comment'],
                        track:propValues['track'],
                        address:propValues['address'],
                        price:propValues['price'],
                        payment_price:propValues['payment_price'],
                        cost_price:propValues['cost_price'],
                        delivery_price:propValues['delivery_price'],
                        check:propValues['check'],
                }));             
            
    }

},[text]);

const setValueInput = (e) => {
    setName({
        ...value,
        [e.target.name]: e.target.value,
    });
}

//products
//начальное состояние
const [productsValue, setProductsValue] = useState({});

//инициализация начальнонго состояния
const initialProductsValue = () => {

    const {products} = text[0];
    let obj = {}
    for(let i = 0; i < Object.keys(products).length; i++){
            obj={
                ...obj,
                ['product'+i] : products[i]
            }
    }

    setProductsValue({
            ...obj
    });

}

const onChangeCheck = (e) => {
    const check = e.target.checked;
    setName({
            ...value,
            'check': check
    });
}

//контролирумемое состояние
const onSetProductsValue = (e, i) => {

    setProductsValue({
        ...productsValue,
        ['product' + i]: {
            ...productsValue['product' + i],
            [e.target.name]: e.target.value
        }
    });

}

const maxKeys = (keys) => {

    let maxKeys = 0;
    keys.forEach(key => key[key.length - 1] > maxKeys ? maxKeys = key[key.length - 1] : '');
    return +maxKeys + 1;

}

const summPrice = () => {

    let sumAll = 0;
    for (let key in productsValue) {
        const sumOne = productsValue[key].product_count * productsValue[key].product_price;
        sumAll += sumOne;
    }
    setName({
        ...value,
        'price': sumAll

    });

}

const onDeleteProduct = (i) => {
    let obj = {
        ...productsValue
    };
    delete obj['product' + i];
    setProductsValue(obj);
}

const onAddProducts = (e) => {

    e.preventDefault();
    const keys = Object.keys(productsValue);
    const maxKey = maxKeys(keys);
    setProductsValue({
        ...productsValue,
        ['product' + maxKey]: {
            'product_name': 'Название продукта',
            'product_count': 1,
            'product_price': 0
        }
    });

}

useEffect(()=>{

    summPrice();

},[productsValue]);

const renderProductInput = () => {

let arr = [];
for( let i = 0; i <  maxKeys(Object.keys(productsValue)); i++){
    const valueName = productsValue['product' + i];
    if(!valueName) continue;
    const elem =

    <div key={i} className="uk-grid uk-grid-small">

            <div className="uk-width-1-1 uk-grid-margin uk-first-column">
                    <div className="uk-width-1-1 uk-inline">
                            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                <Bag/>
                            </span>
                            <input onChange={e=>onSetProductsValue(e,i)}  name="product_name" value={valueName.product_name} className="uk-input" type="text" placeholder="Наименование" />
                    </div>
            </div>
            <div className="uk-width-1-3 uk-grid-margin">
                    <div className="uk-width-1-1 uk-inline">
                            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                <List/>
                            </span>
                            <input onChange={e=>onSetProductsValue(e,i)} name="product_count" value={valueName.product_count} className="uk-input" type="text" placeholder="Кол-во" />
                    </div>
            </div>
            <div className="uk-width-1-2 uk-grid-margin">
                    <div className="uk-width-1-1 uk-inline">
                            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                <Credit/>
                            </span>
                            <input  onChange={e=>onSetProductsValue(e,i)}  name="product_price" value={valueName.product_price}  className="uk-input" type="text" placeholder="Цена" />
                    </div>
            </div>
            <div className="uk-flex-auto uk-grid-margin">
                <div uk-tooltip="Удалить позицию" className="icon-button" onClick={()=>onDeleteProduct(i)}>
                            <span className="uk-icon">
                                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"></polyline><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"></polyline><rect x="8" y="7" width="1" height="9"></rect><rect x="11" y="7" width="1" height="9"></rect><rect x="2" y="3" width="16" height="1"></rect> </svg>
                            </span>
                </div>               
            </div>

    </div>

        arr.push(elem);

    }

    return arr;
}
//end products

const productInputElements = Object.keys(productsValue) ? renderProductInput()  : null;

    return (

<form className="uk-grid uk-grid-small">    

    <div className="uk-width-1-1 uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
                <select onChange={e => setValueInput(e) } value={value['status']} name="status" className="uk-select">
                    <option value="новый">Новый</option>
                    <option value="ожидает">Ожидает</option>
                    <option value="оплачен">Оплачен</option>
                    <option value="отправлен">Отправлен</option>
                    <option value="проблемный">Проблемный</option>
                    <option value="отменен">Отменен</option>
                </select>
        </div>
    </div>
    <div className="uk-width-1-1 uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <IconEdit/>
                </span>
                <input onChange={e => setValueInput(e) } value={value['name']} name="name" className="uk-input" type="text" placeholder="ФИО" />
        </div>
    </div>
    <div className="uk-width-1-2@s uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                        <MobilePhone/>
                </span>
                <input onChange={e => setValueInput(e) } value={value['phone']} name="phone" className="uk-input" type="text" placeholder="Телефон" />
        </div>
    </div>
    <div className="uk-width-1-2@s uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <Email/>
                </span>
                <input onChange={e => setValueInput(e) } value={value['email']} name="email" className="uk-input" type="text" placeholder="email" />
        </div>
    </div>

    <div className="uk-width-1-1 uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                   <Address/>
                </span>
                <input  onChange={e => setValueInput(e) } value={value['address']} name="address" className="uk-input" type="text" placeholder="Адрес" />
        </div>
    </div>
    <div className="uk-width-1-1 uk-grid-margin uk-first-column">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <Info/>
                </span>
                <input onChange={e => setValueInput(e) } value={value['track']} name="track" className="uk-input" type="text" placeholder="трэк-номер" />
        </div>
    </div>
    <div className="uk-width-1-1 uk-grid-margin uk-first-column">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <Comment/>
                </span>
                <textarea onChange={e => setValueInput(e) } value={value['admin_comment']} name="admin_comment"  rows="30" className="uk-input uk-form-small" type="text" placeholder="Примечание администратора"/>
        </div>
    </div>

    {productInputElements}

    <div className="uk-width-1-1 uk-grid-margin uk-first-column">
                <div className="uk-flex-auto uk-grid-margin">
                    <div uk-tooltip="Добавить позицию" className="icon-button" onClick={e=>onAddProducts(e)}>
                                <span className="uk-icon">
                                       <Plus />
                                </span>
                    </div>               
                </div>
    </div>

    <div className="uk-width-1-2 uk-grid-margin">
        <div className="uk-width-1-1">
               <label>Сумма, руб:</label>
        </div>
    </div>

    <div className="uk-width-1-2 uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                   <Credit/>
                </span>
                <input onChange={e => setValueInput(e) } value={value['price']} name="price" className="uk-input" type="text" placeholder="Сумма" />
        </div>
    </div>

    <div className="uk-width-1-2 uk-grid-margin uk-first-column">
        <div className="uk-width-1-1">
               <label>Закупка, руб:</label>
        </div>
    </div>

    <div className="uk-width-1-2 uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <Credit/>
            </span>
            <input onChange={e => setValueInput(e) } value={value['cost_price']} name="cost_price" className="uk-input" type="text" placeholder="Закупка" />
        </div>
    </div>

    <div className="uk-width-1-2 uk-grid-margin uk-first-column">
        <div className="uk-width-1-1">
               <label>Оплачено, руб:</label>
        </div>
    </div>
    <div className="uk-width-1-2 uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <Credit/>
                </span>
                <input onChange={e => setValueInput(e) } value={value['payment_price']} name="payment_price" className="uk-input" type="text" placeholder="Оплачено" />
        </div>
    </div> 

    <div className="uk-width-1-2 uk-grid-margin">
        <div className="uk-width-1-1">
            <label>Доставка, руб:</label>
        </div>
    </div>
    <div className="uk-width-1-2 uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
        <span className="uk-form-icon uk-icon" uk-icon="icon: user">
            <Credit/>
        </span>
            <input onChange={e => setValueInput(e) } value={value['delivery_price']}  name="delivery_price" className="uk-input" type="text" placeholder="Доставка" />
        </div>
    </div>

    <div className="uk-width-1-1 uk-grid-margin uk-first-column">
        <div className="uk-flex uk-flex-center">
            <label><input className="uk-checkbox" type="checkbox" name="check" onChange={e => onChangeCheck(e) } />Уведомить клиента об изменениях в заказе</label>
        </div>
    </div>

    <div className="uk-width-1-1 uk-grid-margin uk-first-column">
        <div className="uk-flex uk-flex-center">
            <button onClick={(e)=>method(value, productsValue, e)} className="uk-button uk-button-primary">Сохранить изменения</button>
        </div>
    </div>

</form>

    )
}
export default Edit;