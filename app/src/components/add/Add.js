import React from "react";
import {useState, useEffect} from "react";

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

<div key={i} className="uk-grid uk-grid-small">


        <div className="uk-width-1-1 uk-grid-margin uk-first-column">
            <div className="uk-width-1-1 uk-inline">
                    <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                        <Bag/>
                    </span>
                    <input onChange={e => setProductInput(e , i)}  value = {valueProduct['product' + i].productName} name="productName"  className="uk-input" type="text" placeholder={`Товар ${i+1}`} />
            </div>
        </div>
        <div className="uk-width-1-2 uk-grid-margin">
                <div className="uk-width-1-1 uk-inline">
                        <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                            <List/>
                        </span>
                        <input onChange={e => setProductInput(e , i)}  name="count" value = {valueProduct['product' + i].count}  className="uk-input" type="text" placeholder="Количество" />
                </div>
        </div>
        <div className="uk-width-1-2 uk-grid-margin">
                <div className="uk-width-1-1 uk-inline">
                        <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                            <Credit/>
                        </span>
                        <input onChange={e => setProductInput(e , i)}  name="price" value = {valueProduct['product' + i].price}  className="uk-input" type="text" placeholder="Цена" />
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

 {renderProductsInput()}

 <div className="uk-width-1-2 uk-grid-margin uk-first-column">
                <div className="uk-flex-auto uk-grid-margin">
                    <div uk-tooltip="Добавить позицию" className="icon-button" onClick={(e)=>onSetProductCount(e)}>
                                <span className="uk-icon">
                                       <Plus />
                                </span>
                    </div>               
                </div>
</div>

<div className="uk-width-1-2 uk-grid-margin">
                <div className="uk-flex-auto uk-grid-margin">
                    <div uk-tooltip="Удалить позицию" className="icon-button" onClick={(e)=>onDeleteProductCount(e)}>
                                <span className="uk-icon">
                                       <Minus />
                                </span>
                    </div>               
                </div>
</div>


 <div className="uk-width-1-1 uk-grid-margin">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                   <Address/>
                </span>
                <input  onChange={e => setValueInput(e) } value={value['address']} name="address"  className="uk-input" type="text" placeholder="Адрес" />
        </div>
    </div>
    <div className="uk-width-1-1 uk-grid-margin uk-first-column">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <Info/>
                </span>
                <input onChange={e => setValueInput(e) } value={value['track']} name="track"  className="uk-input" type="text" placeholder="трэк-номер" />
        </div>
    </div>
    <div className="uk-width-1-1 uk-grid-margin uk-first-column">
        <div className="uk-width-1-1 uk-inline">
                <span className="uk-form-icon uk-icon" uk-icon="icon: user">
                    <Comment/>
                </span>
                <textarea onChange={e => setValueInput(e) } value={value['admin_comment']} name="admin_comment" rows="30" className="uk-input uk-form-small" type="text" placeholder="Примечание администратора"/>
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
            <input onChange={e => setValueInput(e) } value={value['delivery_price']}   name="delivery_price"  name="delivery_price" className="uk-input" type="text" placeholder="Доставка" />
        </div>
    </div>

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