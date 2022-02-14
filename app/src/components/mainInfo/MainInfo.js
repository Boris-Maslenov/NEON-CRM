import React from "react";

const MainInfo = (props) => {

    const {totalOrders} = props;
    const countOrders = totalOrders.length;
    const paymentOrders = totalOrders.filter(item => item.status === 'оплачен' || item.status === 'отправлен');
    let paymentMoney = 0;
    let earned = 0;
        paymentOrders.forEach(item => {
        paymentMoney  += +item.payment_price;
        if(item.status === 'отправлен') earned += item.price - item.cost_price - item.delivery_price;
    });

    return (

        <div className="uk-section uk-section-muted">
            
                <div>
                    <h1>Учет заказов на оборудование NEON</h1>
                    <div>Показано заказов: {countOrders}</div>
                    <div>Оплачено заказов: {paymentOrders.length} </div>
                    <div>{`Оплачено на сумму: ${paymentMoney} руб.` }</div>
                    <div>{`Заработано: ${earned} руб.` }</div>
                </div>
            
        </div>

    )

}

export default MainInfo;