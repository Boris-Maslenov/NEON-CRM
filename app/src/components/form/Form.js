import React from "react";
import {useState, useEffect} from "react";

import {IconEdit, MobilePhone, Email, Bag, Credit} from "../icons/Icons";

const Form = ({method}) => {

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
    product0:{productName:'', count:1, price:0}
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
     
                        <div key={i} className="uk-margin">
                                <div className="uk-flex">

                                    <div className="">
                                        <div className="">Наименование:</div>
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                                <Bag/>
                                                </span>
                                                <input onChange={e => setProductInput(e , i)}  value = {valueProduct['product' + i].productName} name="productName" className="uk-input uk-form-small" type="text" placeholder={`Товар ${i+1}`}/>
                                            </div>
                                    </div>

                                    <div className="">
                                        <div className="">Кол-во:</div>
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                                <Bag/>
                                                </span>
                                            <input onChange={e => setProductInput(e , i)}  name="count" value = {valueProduct['product' + i].count} className="uk-input uk-form-small" type="text" placeholder="Кол-во"/> 
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="">Цена:</div>
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                                                <Bag/>
                                                </span>
                                            <input onChange={e => setProductInput(e , i)}  name="price" value = {valueProduct['product' + i].price} className="uk-input uk-form-small" type="text" placeholder="Цена"/>
                                            </div>
                                    </div>
                                    
                                </div>
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

 {renderProductsInput()}

{/* <button onClick={(e)=>onSetProductCount(e)} className="uk-button uk-button-default uk-button-small uk-first-column">Добавить позицию</button>
<button onClick={(e)=>onDeleteProductCount(e)} className="uk-button uk-button-default uk-button-small uk-first-column">Удалить позицию</button> */}

<div className="uk-flex">

<div className="">
    <span className="uk-margin-small-right" uk-icon="plus" onClick={(e)=>onSetProductCount(e)}>
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="1" width="1" height="17"></rect><rect x="1" y="9" width="17" height="1"></rect></svg>
    </span>
</div>
<div className="">
    <span className="uk-margin-small-right" uk-icon="minus" onClick={(e)=>onDeleteProductCount(e)} >

        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect height="1" width="18" y="9" x="1"></rect></svg>


    </span>
</div>

</div>

    <div className="uk-flex">
        <div className="">
            <div className="">Цена</div>
            <div className="uk-inline uk-width-1-1">
            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                            <Credit/>
            </span>
            <input onChange={e => setValueInput(e) } value={value['price']} name="price" className="uk-input uk-form-small" type="text" placeholder="руб"/>
            </div>
        </div>

        <div className="">
         <div className="">Опл-но</div>
            <div className="uk-inline uk-width-1-1">
            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                            <Credit/>
            </span>
            <input onChange={e => setValueInput(e) } value={value['payment_price']} name="payment_price" className="uk-input uk-form-small" type="text" placeholder="руб"/>
            </div>
        </div>
        <div>
        <div className="">Закупка</div>
            <div className="uk-inline uk-width-1-1">
            <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                            <Credit/>
            </span>
            <input onChange={e => setValueInput(e) } value={value['cost_price']} name="cost_price" className="uk-input uk-form-small" type="text" placeholder="руб"/>
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
        <span className="uk-margin-right">Примечание</span>
        <textarea onChange={e => setValueInput(e) } value={value['admin_comment']} name="admin_comment" rows="5" className="uk-input uk-form-small" type="text" placeholder="Товар"/>
    </div>

    <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input className="uk-checkbox" type="checkbox" name="check" onChange={e => onChangeCheck(e) } />Уведомить клиента об изменениях в заказе</label>
    </div>

    <div className="uk-flex uk-flex-center">
            <button onClick={(e)=>method(value, valueProduct, e)} className="uk-button uk-button-primary">Создать заказ</button>
    </div>

</form>

    )
}
export default Form;