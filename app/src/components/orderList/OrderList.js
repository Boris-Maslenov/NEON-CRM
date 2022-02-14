import React from 'react';
import { useMemo } from 'react';
import Spinner from '../spinner/Spinner';

const OrderList = ({orderList, error, loading, onDelete, onEdit, search}) => {

//определение класса карточки заказа
const setOrderStatus = (status) => {
    switch(status){
        case 'новый':
            return 'status-new'
        case 'ожидает':
            return 'status-processing'
        case 'оплачен':
            return 'status-confirmed'
        case 'отправлен':
            return 'status-success'
        case 'проблемный':
                return 'status-bed'
        case 'отменен':
            return 'status-error'
        default:
            return 'status-new'
    }
}

//рендер карточек товаров
const renderItems = (orderList) => {

    const items = orderList.map(item => {

    const date = item.date.split(' ');

            return(
                
                <tr tabIndex={-1} key={item.id} className={setOrderStatus(item.status)}>
                <td>{item.id}</td>
                <td className="uk-table-link uk-text-nowrap"><div>{date[0]}</div><div>{date[1]}</div></td>
                <td>{item.name}</td>

                <td className="uk-table-link uk-text-nowrap">

         {item.products[0].product_name ? item.products.map((elem, i) => <div key={i}> <div  className="uk-link-reset">{elem.product_name}</div> <span>{elem.product_price}</span> <span> x </span> <span>{elem.product_count}</span><span> = </span><span>{`${elem.product_price * elem.product_count} р.`}</span> </div> )  : 'Товар куда то пропал(('}

                </td>

                <td className="uk-text-nowrap">
                    <p>{`${item.price} р.`}</p>
                   { item.payment_price > 0 ? `Оплачено: ${item.payment_price} р.` : null} 
                </td>

                <td className="uk-table-link uk-text-nowrap">
                    <a className="uk-link-reset" href={ `tel:${item.phone}` }>{item.phone}</a>
                </td>
                <td className="uk-table-link uk-text-nowrap">
                    <a className="uk-link-reset" target="_blank" href={`mailto:${item.email}`}>{item.email}</a>
                </td>
                <td className="uk-text-nowrap"><div>{item.ip}</div>{item.location_ip}</td>
                <td className="">{item.status}</td>
                <td className=""><span className="table-address">{item.address}</span></td>
                <td className="uk-table-link">
                    {/* <a className="uk-link-reset" target="_blank" href={item.track ? item.track : ''}><div>{item.track}</div></a> */}
                    <div>{item.track}</div>
                </td>
                <td className="">{item.admin_comment}</td>
                <td className="uk-text-nowrap">
                    <span onClick={()=>onEdit(item.id)} className="uk-margin-small-right uk-icon" uk-tooltip="Редактировать" uk-icon="pencil"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"></path><path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"></path></svg></span>
                    <span onClick={()=>onDelete(item.id)} className="uk-margin-small-right uk-icon" uk-tooltip="Удалить" uk-icon="close"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" strokeWidth="1.06" d="M16,4 L4,16"></path></svg></span>
                </td>
            </tr>

            )  
            
    });

    return items;

}

const items = useMemo(()=>{
        return  orderList.length > 0 ? renderItems(orderList) : null;
},[orderList]);
   
const errorMessage = error ? 'Возникла ошибка. Обновите страницу или обратитесь к администратору' : null;
const spinner = loading ? <Spinner/> : null;
const content = !(error && spinner) ? items : null;
const info = orderList.length === 0 && !spinner ? 'Заказы не найдены' : null;

return(
  
        <section className="main">
                <div className="uk-overflow-auto">
                    <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                        <thead>
                            <tr>
                                <th className="uk-table-shrink">id</th>
                                <th className="uk-table-shrink">дата</th>
                                <th className="uk-table-shrink">ФИО</th>
                                <th className="uk-table-shrink">товар</th>
                                <th className="uk-table-shrink">сумма/ оплата</th>
                                <th className="uk-table-shrink">телефон</th>
                                <th className="uk-table-shrink">email</th>
                                <th className="uk-table-shrink">ip</th>
                                <th className="uk-table-shrink">статус</th>
                                <th className="uk-table-shrink">адрес</th>
                                <th className="uk-table-shrink">накладная</th>
                                <th className="uk-table-shrink">примечание</th>
                                <th className="uk-table-shrink">действие</th>
                            </tr>
                        </thead>
                        <tbody>
                                {content}
                        </tbody>
                    </table>
                    {errorMessage}
                    {spinner}
                    {info}
                </div>
        </section>

)

}

export default OrderList;