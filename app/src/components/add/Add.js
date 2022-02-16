import React from "react";
import {useState, useEffect} from "react";

import FormInput from "../formInput/FormInput";

import {IconEdit, MobilePhone, Email, Bag, Credit, List, Address, Info, Comment, Plus, Minus} from "../icons/Icons";

const Add = ({method}) => {

const [value, setName] = useState({
        name:'',
        phone:'',
        email:'',
        status: 'новый',
        price:'',
        payment_price:0,
        cost_price: 0,
        delivery_price:0,
        address:'',
        track:'',
        admin_comment:'',
        check:''
});

//начальное значение для контролируемого состояния
const [valueProduct, setValueProduct] = useState( {
    product0:{productName:'авыаываыва', count:1, price:0}
} );

//контролируемое состояние
const setProductInput = (e, number) => {

        setValueProduct(
            {
                ...valueProduct,
                ['product' + number]:{ ...valueProduct['product' + number], [e.target.name]:e.target.value}

            } 
        );
};

//инициализация 
const initialProductInput = () => {
    let obj = valueProduct;
    for (let i = Object.keys(valueProduct).length; i < Object.keys(valueProduct).length + 1 ; i++){
            obj = {
                ...obj,
                ['product' + i]:{productName:'', count:1, price:0}
            }
    }

    setValueProduct(obj);
};


const onSetProductCount = (e) => {
    e.preventDefault();
    initialProductInput();
}

const onDeleteProductCount = (e) => {
     e.preventDefault();

     let obj = {
         ...valueProduct
     }

     const index = Object.keys(obj).length - 1;

            delete  obj['product' + index];

            setValueProduct({
                ...obj
            });
}


const setValueInput = (e) => {
    setName({
        ...value,
        [e.target.name]: e.target.value
    });

    console.log(value);
}
//const value = target.type === 'checkbox' ? target.checked : target.value;

//подсчет суммы всех позиций и обновление состояния 
const summPrice = () => {

        let sumAll = 0; 

            for(let key in valueProduct){
                const sumOne = valueProduct[key].count * valueProduct[key].price;
                sumAll += sumOne; 
            }

           setName({
            ...value,
            'price' : +sumAll
           });

        }


const renderProductsInput = () => {
    const children = [];
    for (let i = 0; i < Object.keys(valueProduct).length; i++) {

        children.push( 

                        <div key={i} className="uk-grid uk-grid-small">
                                < FormInput count={i} clazz={'uk-width-1-1 uk-grid-margin uk-first-column'} name={'productName'} value={valueProduct['product' + i].productName} placeholder={`Товар ${i+1}`} method={setProductInput} icon={<Bag/>}/>
                                < FormInput count={i} clazz={'uk-width-1-2 uk-grid-margin'} name={'count'} value={valueProduct['product' + i].count} placeholder={`Количество`} method={setProductInput} icon={<List/>}/>
                                < FormInput count={i} clazz={'uk-width-1-2 uk-grid-margin'} name={'price'} value={valueProduct['product' + i].price} placeholder={`Цена`} method={setProductInput} icon={<Credit/>}/>
                        </div>

        );                
    }
    
return children;
};

useEffect(()=>{

    summPrice();

},[valueProduct]);

const onChangeCheck = (e) => {
    const check = e.target.checked;
    setName({
            ...value,
            'check': check
    });
}

return (

<form className="uk-grid uk-grid-small">

    < FormInput type={'select'} clazz={'uk-width-1-1 uk-grid-margin'} value={value['status']} name="status"  method={setValueInput} />

    < FormInput clazz={'uk-width-1-1 uk-grid-margin'} name={'name'} value={value['name']} placeholder={'ФИО'} method={setValueInput} icon={<IconEdit/>}/>
    < FormInput clazz={'uk-width-1-2@s uk-grid-margin'} name={'phone'} value={value['phone']} placeholder={'Телефон'} method={setValueInput} icon={<MobilePhone/>}/>
    < FormInput clazz={'uk-width-1-2@s uk-grid-margin'} name={'email'} value={value['email']} placeholder={'email'} method={setValueInput} icon={<Email/>}/>

    {renderProductsInput()}

    < FormInput  type={'iconButton'} method={onSetProductCount} icon={<Plus />} value={'Добавить позицию'}/>
    < FormInput  type={'iconButton'} method={onDeleteProductCount} icon={<Minus />} value={'Удалить позицию'}/>


    < FormInput clazz={'uk-width-1-1 uk-grid-margin'} name={'address'} value={value['address']} placeholder={'Адрес'} method={setValueInput} icon={<Address/>}/>

    < FormInput clazz={'uk-width-1-1 uk-grid-margin uk-first-column'} name={'track'} value={value['track']} placeholder={'трэк-номер'} method={setValueInput} icon={<Info/>}/>

    < FormInput type={'textArea'} clazz={'uk-width-1-1 uk-grid-margin uk-first-column'} name={'admin_comment'} value={value['admin_comment']} placeholder={'Примечание администратора'} method={setValueInput} icon={<Comment/>}/>

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
            <button onClick={(e)=>method(value, valueProduct, e)} className="uk-button uk-button-primary">Сохранить изменения</button>
        </div>
    </div>

</form>

    )
}
export default Add;