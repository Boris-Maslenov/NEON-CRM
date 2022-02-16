import React, { useEffect } from "react";
import {useState} from "react";

import FormInput from "../formInput/FormInput";

import {IconEdit, MobilePhone, Email, Bag, Credit, Address, Code, Info, List, Plus, Comment, Minus, Delete } from "../icons/Icons";

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

const onDeleteProduct = (e,i) => {
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
        <div key={i} className="uk-grid uk-grid-margin uk-grid-small grid-color_grey">
            <FormInput count={i} clazz={'uk-width-1-1 uk-grid-margin uk-first-column'} name={'product_name'} value={valueName.product_name} placeholder={`Наименование`} method={onSetProductsValue} icon={<Bag/>}/>
            <FormInput count={i} clazz={'uk-width-1-3 uk-grid-margin'} name={'product_count'} value={valueName.product_count} placeholder={`Количество`} method={onSetProductsValue} icon={<List/>}/>
            <FormInput count={i} clazz={'uk-width-1-2 uk-grid-margin'} name={'product_price'} value={valueName.product_price} placeholder={`Цена`} method={onSetProductsValue} icon={<Credit/>}/>
            <FormInput count={i} type={'iconButton'} clazz={'uk-flex-auto uk-grid-margin'} method={onDeleteProduct} icon={<Delete />} value={'Удалить позицию'}/>
        </div>
            arr.push(elem);
        }
        return arr;
}
//end products

const productInputElements = Object.keys(productsValue) ? renderProductInput()  : null;

    return (

<form className="uk-grid uk-grid-small">  

< FormInput type={'select'} clazz={'uk-width-1-1 uk-grid-margin'} value={value['status']} name="status"  method={setValueInput} />
< FormInput clazz={'uk-width-1-1 uk-grid-margin'} name={'name'} value={value['name']} placeholder={'ФИО'} method={setValueInput} icon={<IconEdit/>}/>
< FormInput clazz={'uk-width-1-2@s uk-grid-margin'} name={'phone'} value={value['phone']} placeholder={'Телефон'} method={setValueInput} icon={<MobilePhone/>}/>
< FormInput clazz={'uk-width-1-2@s uk-grid-margin'} name={'email'} value={value['email']} placeholder={'email'} method={setValueInput} icon={<Email/>}/>
< FormInput clazz={'uk-width-1-1 uk-grid-margin'} name={'address'} value={value['address']} placeholder={'Адрес'} method={setValueInput} icon={<Address/>}/>
< FormInput clazz={'uk-width-1-1 uk-grid-margin uk-first-column'} name={'track'} value={value['track']} placeholder={'трэк-номер'} method={setValueInput} icon={<Info/>}/>
< FormInput type={'textArea'} clazz={'uk-width-1-1 uk-grid-margin uk-first-column'} name={'admin_comment'} value={value['admin_comment']} placeholder={'Примечание администратора'} method={setValueInput} icon={<Comment/>}/>
    {productInputElements}
< FormInput clazz={'uk-width-1-1 uk-grid-margin'}  type={'iconButton'} method={onAddProducts} icon={<Plus />} value={'Добавить позицию'}/>
< FormInput type={'priceName'} label={'Сумма, руб:'}/>
< FormInput clazz={'uk-width-1-2 uk-grid-margin'} name={'price'} value={value['price']} placeholder={'Сумма'} method={setValueInput} icon={<Credit/>}/>
< FormInput type={'priceName'} label={'Закупка, руб:'}/>
< FormInput clazz={'uk-width-1-2 uk-grid-margin'} name={'cost_price'} value={value['cost_price']} placeholder={'Закупка'} method={setValueInput} icon={<Credit/>}/>
< FormInput type={'priceName'} label={'Оплачено, руб:'}/>
< FormInput clazz={'uk-width-1-2 uk-grid-margin'} name={'payment_price'} value={value['payment_price']} placeholder={'Оплачено'} method={setValueInput} icon={<Credit/>}/>
< FormInput type={'priceName'} label={'Доставка, руб:'}/>
< FormInput clazz={'uk-width-1-2 uk-grid-margin'} name={'delivery_price'} value={value['delivery_price']} placeholder={'Доставка'} method={setValueInput} icon={<Credit/>}/>

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