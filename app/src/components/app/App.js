import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';

import UIkit from 'uikit';

import Header from '../header/Header';
import MainInfo from '../mainInfo/MainInfo';
import Filters from '../filters/Filters';
import OrderList from '../orderList/OrderList';
import Button from '../button/Button';
import Footer from '../footer/Footer';
import ConfirmModal from '../confirmModal/ConfirmModal';
import Add from '../add/Add';
import Confirm from '../confirm/Confirm';
import Edit from '../edit/Edit';
import Login from '../login/Login';
import Spinner from '../spinner/Spinner';

import axios from 'axios';


const App = () => {

    const [login, setlogin] = useState({auth:false, loginError: false});
    const [loading, setLoading] = useState(true);
    const [init, setInit] = useState(false);
    const [error, setError] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [deleteid, setDeleteId] = useState(null);
    const [search, setSearch] = useState({status:'все'});
    const [editElem, setEditElem] = useState(null);
    // console.log(orderList);
    const logOut = () => {
            axios
                .get('./api/logOut.php')
                .then(response => window.location.replace('/'))
    }

const checkAuth = async() => {
    
    await  axios 
            .get('./api/checkAuth.php')
            .then(response => setlogin({...login, auth:response.data.auth })) //меняем state ,  начало рендеринга 2
            .catch(e=>console.log(e));

            setInit(true);
}

const onLogin = (login, password) => {
        axios
            .post('./api/login.php', {login, password})
            .then(response => setlogin({auth: response.data.auth, loginError: !response.data.auth})   )
            .catch(e=>console.log(e))
}

    const onUpdateFilters = (param, e) => {
        setSearch(param);
    }
  
    //ручное обновление
    const onUpdate = () => {
            if(loading === false){
                setLoading(true);
                updateOrderList();
            }
    }

    //Получение списка заказов
    const updateOrderList = () => {
        axios
                .get('./api/loadOrderList.php')
                .then(response => orderListUpdate(response.data)) //начало рендеринга 3
                //.then(response => console.log(response.data)) //начало рендера 4
                .then(orderLoaded) //начало рендера 4
                .catch(onError)    
    }

        // Обновление списка заказов в State
        const orderListUpdate = (orderList) => {
            if(orderList.length > 0) setOrderList(orderList);
            
        }
    
    //Получение списка при 1 загрузке
    useEffect( () => {  
        checkAuth(); // запуск после 1 рендера   
        
    }, []);

    useEffect( () => {
        //setViewLogin(false); 
        if (login.auth){  updateOrderList(); }   
    }, [login]);
    
    // загрузка заказов завершена и отмена статуса "Loading"
    const orderLoaded = () => {
      
          setLoading(false);   
    }
    
    //Ошибка загрузки, отмена статуса "Loading" и формирование статуса "Error"
    const onError = () => {
          setLoading(false);
          setError(true);
    }
    
//ФОРМИРОВАНИЕ СПИСКА ПО ФИЛЬТРУ
const filterOrderList = (orderList, filters) => {

//фильтруем по дате
const filterData = (orderList, dataStart, dataEnd) => {
            const dateToMs = (data) => {
                return Date.parse(data.split(' ')[0]);
            }
            if(dataStart === '' && dataEnd === '') return orderList;
            if(dataStart === '') dataStart = '2000-01-01';
            if(dataEnd === '') dataEnd = new Date().toISOString().replace('T', ' ');
    return orderList.filter(element =>  dateToMs(element.date)  >= dateToMs(dataStart) && dateToMs( element.date)  <= dateToMs(dataEnd) );
}
//фильтруем по статусу
const filterStatus = (orderList, status) => {
    if (status === 'все') return orderList;
    return orderList.filter(element => element.status === status);
}
//фильтруем по поиску
const filterSearch = (orderList, search) => {
    if (search === '') return orderList;
    search = search.toLowerCase();
return orderList.filter(element => element.phone.indexOf(search) > -1 || element.name.toLowerCase().indexOf(search) > -1 || element.email.indexOf(search) > -1);
}
    if (filters.status === 'все' && !filters.search && !filters.dateStart && !filters.dateEnd) return orderList; 
    return  filterSearch( filterStatus( filterData(orderList, filters.dateStart, filters.dateEnd), filters.status), filters.search);
}
const viewList = filterOrderList(orderList, search); //формирование списка для отображения(через фильтры)

// УДАЛЕНИЕ
//удаление персонажа
const deleteOrder = () => {

    const deleteId = (id) => {
            setOrderList((state) => state.filter(elem => elem.id !== id));
            notification({timeout: 3000, message: `Заказ №${id} успешно удален!`, status: 'success'});
    }

    UIkit.modal('#modal-confirm').hide();
            axios 
                .post('./api/orderDelete.php', {id:deleteid})
                .then(response => deleteId(response.data))
                .catch(e => notification({timeout: 3000, message: `Ошибка ${e}`, status: 'danger'}));
}

    // Окно - подтверждение удаления. Установка state с номером удаляемого заказа
    const confirmDelete = (id) => {
            setDeleteId(()=>id);
            UIkit.modal('#modal-confirm').show();
}

// РЕДАКТИРОВАНИЕ ЗАКАЗА

//Окно с редактированием 
const editOrder = (id) => {
    const elemEdit = orderList.filter(elem => elem.id === id); // Получили редактируемый элемент(обьект)
    setEditElem(elemEdit); // установили в State редактируемый обьект
    UIkit.modal('#modal-edit').show(); //Открыли модалаьное окно
}

//Само редактирование заказа
const editing = (value, valueProduct, e) => {
    e.preventDefault();
    UIkit.modal('#modal-edit').hide();

// Уведомление об успешном удалении и обновление списка заказов
    const updatingConfirm = (id) => {
        updateOrderList();
        notification({timeout: 3000, message: `Заказ № ${id} успешно изменен!`, status: 'success'});
    }
console.log({...value, products:{...valueProduct} });
    //Запрос на редактирование
    axios 
    .post('./api/updateOrder.php', {...value, products:{...valueProduct } })
    .then(response=> updatingConfirm(response.data)) // получаем id удаленного заказа
    .catch(e => notification({timeout: 3000, message: `Ошибка ${e}`, status: 'danger'}));
}

//ДОБАВЛЕНИЕ НОВОГО ЗАКАЗА

//добавить новый заказ
const addNewOrder = (value, valueProduct, e) => {
    e.preventDefault();
    const confirmNewOrder = () => {
            updateOrderList();
            notification({timeout: 3000, message: 'Новый заказ успешно создан', status: 'success'})
    }
    console.log({...value, products:{...valueProduct} });
        axios 
            .post('./api/addNewOrder.php', {...value, products:{...valueProduct} })
            .then(UIkit.modal('#modal-editing').hide())
            .then(() => confirmNewOrder() ) 
            .catch(e => notification({timeout: 3000, message: `Ошибка ${e}`, status: 'danger'}))
    };


// Уведомления
const notification = (param) => {
    UIkit.notification( param );
}

  if (!init) return <Spinner/>;
  if(!login.auth) return   <Login login={onLogin} loginError={login.loginError} />;

 return  (
  <>
      <Button/>
        <Header totalOrders={viewList} onLogOut={logOut} onUpdateList={onUpdate}/>
            <div className="content">
                    <MainInfo totalOrders={viewList}/>
                    <Filters method={onUpdateFilters}/>
                    <OrderList
                        orderList={viewList}
                        filters={search}
                        loading={loading}
                        error={error}
                        onEdit={editOrder}
                        onDelete={confirmDelete}
                       
                    />
            </div>
            <Footer/>
            <ConfirmModal
                target={'modal-confirm'}
                title={`Удалить заказ № ${deleteid}`}
                method={deleteOrder}
                text={'Заказ удалится без возможности восстановления!'}
                render={(method)=>(
                    <Confirm method={method}/>
            )} /> 

            <ConfirmModal
                target={'modal-editing'}
                title={'Добавить новый заказ'}
                method={addNewOrder}
                render={(method)=>(
                    <Add method={method}/>
            )} />

            <ConfirmModal
                target={'modal-edit'}
                title={'Редактирование заказа'}
                method={editing}
                text={editElem}
                render={(method, elem)=>(
                    <Edit  method={method} text={elem}/>
            )} />
   
   </>
);

}

export default App;



