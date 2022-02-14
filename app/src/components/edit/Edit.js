import React, { useEffect } from "react";
import {useState} from "react";

import {IconEdit, MobilePhone, Email, Bag, Credit} from "../icons/Icons";

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

<div className="input-wrap" key={i}>


        <div className="input-wrap__item input-wrap__item-full">
                        <div className="full">
                                <div className="">Нименование</div>
                                    <div className="uk-inline uk-width-1-1 full">
                                        <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                        <Bag/>
                                        </span>
                                        <input onChange={e=>onSetProductsValue(e,i)}  name="product_name" value={valueName.product_name} className="full uk-input uk-form-small" type="text"/>
                                    </div>
                        </div>
        </div>

        <div className="input-wrap__item input-wrap__item-full">
                <div className="input-wrap__item input-wrap__item-column input-wrap__item-50">
                        <div className="">
                                        <div className="">Кол-во:</div>
                                            <div className="uk-inline uk-width-1-1">
                                                        <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                                                <Bag/>
                                                        </span>
                                                    <input onChange={e=>onSetProductsValue(e,i)}   name="product_count" value={valueName.product_count} className="uk-input uk-form-small" type="text" placeholder="Кол-во"/> 
                                            </div>
                        </div>
                </div>  

                <div className="input-wrap__item input-wrap__item-column input-wrap__item-50">
                    <div className="">
                                    <div className="">Цена:</div>
                                                <div className="uk-inline uk-width-1-1">
                                                    <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                                    <Bag/>
                                                    </span>
                                                <input onChange={e=>onSetProductsValue(e,i)}  name="product_price" value={valueName.product_price}  className="uk-input uk-form-small" type="text" placeholder="Цена"/>
                                        </div>
                    </div>
                </div> 

                <div className="icon-flex">
                        <div className="" onClick={()=>onDeleteProduct(i)}>
                                        <span className="uk-icon" uk-icon="trash">
                                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"></polyline><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"></polyline><rect x="8" y="7" width="1" height="9"></rect><rect x="11" y="7" width="1" height="9"></rect><rect x="2" y="3" width="16" height="1"></rect>
                                            </svg>
                                        </span>
                        </div>
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

<form>    
    
<span className="uk-margin-small-right" uk-icon="check"></span>

<div className="uk-margin">
    <span className="uk-margin-right">Статус заказа</span>

        <select onChange={e => setValueInput(e) } value={value['status']} name="status" className="uk-select uk-form-small">
                    <option value="новый">Новый</option>
                    <option value="ожидает">Ожидает</option>
                    <option value="оплачен">Оплачен</option>
                    <option value="отправлен">Отправлен</option>
                    <option value="проблемный">Проблемный</option>
                    <option value="отменен">Отменен</option>
        </select>
</div>
<div className="uk-margin">
    <div className="uk-margin-right">ФИО</div>
    <div className="uk-inline uk-width-1-1">
    <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <IconEdit/>
    </span>
   
    <input onChange={e => setValueInput(e) } value={value['name']} name="name" className="uk-input uk-form-small"  type="text" placeholder="ФИО"/>
    </div>
</div>
<div className="uk-margin">
    <div className="uk-margin-right">Телефон</div>
    <div className="uk-inline uk-width-1-1">
    <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <MobilePhone/>
    </span>
    <input onChange={e => setValueInput(e) } value={value['phone']} name="phone" className="uk-input uk-form-small" type="text" placeholder="Телефон"/>
    </div>
</div>
<div className="uk-margin">
    <div className="uk-margin-right">email</div>
    <div className="uk-inline uk-width-1-1">
    <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <Email/>
    </span>
    <input onChange={e => setValueInput(e) } value={value['email']} name="email" className="uk-input uk-form-small" type="text" placeholder="email"/>
    </div>
</div>

<div className="uk-margin">
        <span className="uk-margin-right">Доставка:</span>
        <input onChange={e => setValueInput(e) } value={value['delivery_price']}   name="delivery_price" className="uk-input uk-form-small" type="text"  placeholder="Доставка"/>
</div>

{productInputElements}

<button onClick={e=>onAddProducts(e)} className="uk-button uk-button-default uk-button-small uk-first-column">Добавить позицию</button>

<div className="input-wrap">

        <div className="input-wrap__item input-wrap__item-full">

                <div className="full">

                <div className="uk-margin-right">Сумма:</div>

                <div className="uk-inline full">
                            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                <Credit/>
                            </span>
                    <input onChange={e => setValueInput(e) } value={value['price']} name="price" className="full uk-input uk-form-width-small uk-form-small" type="text" placeholder="Цена"/>
                </div>

                </div>

        </div>

        <div className="input-wrap__item input-wrap__item-full">



                <div className="input-wrap__item input-wrap__item-column input-wrap__item-50">
                        <div className="uk-margin-right">Оплачено:</div>
                    <div className="uk-inline full">
                    <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                    <Credit/>
                    </span>
                    <input onChange={e => setValueInput(e) } value={value['payment_price']} name="payment_price" className="full uk-input uk-form-width-small uk-form-small" type="text" placeholder="Оплачено"/>
                    </div>
                </div>


                <div className="input-wrap__item input-wrap__item-column input-wrap__item-50">
                        <div className="uk-margin-right">Закупка</div>
                            <div className="uk-inline full">
                            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                            <Credit/>
                            </span>
                            <input onChange={e => setValueInput(e) } value={value['cost_price']} name="cost_price" className="full uk-input uk-form-width-small uk-form-small" type="text" placeholder="руб"/>
                            </div>
                </div>
        </div>



</div>

<div className="uk-margin">
    <span className="uk-margin-right">Адрес</span>
    <input onChange={e => setValueInput(e) } value={value['address']} name="address" className="uk-input uk-form-small" type="text" placeholder="Адрес"/>
</div>
<div className="uk-margin">
    <span className="uk-margin-right">Накладная</span>
    <input onChange={e => setValueInput(e) } value={value['track']} name="track" className="uk-input uk-form-small" type="text" placeholder="Накладная"/>
</div>
<div className="uk-margin">
    <span className="uk-margin-right">Примечание администратора</span>
    <textarea onChange={e => setValueInput(e) } value={value['admin_comment']} name="admin_comment" rows="5" className="uk-input uk-form-small" type="text" placeholder="Товар"/>
</div>
<div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input className="uk-checkbox" type="checkbox" name="check" onChange={e => onChangeCheck(e) } />Уведомить клиента об изменениях в заказе</label>
    </div>
<div className="uk-flex uk-flex-center">
        <button onClick={(e)=>method(value, productsValue, e)} className="uk-button uk-button-primary">Сохранить изменения</button>
</div>

</form>

    )
}
export default Edit;