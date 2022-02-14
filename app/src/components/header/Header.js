import React from "react";

const Header = (props) => {

const {totalOrders, onLogOut, onUpdateList} = props;
const newOrders = totalOrders.filter(elem => elem.status === 'новый').length;

return(

    <header className="uk-background-secondary uk-light uk-padding-small">
 
               <div className="uk-container">
 
                   <div className="uk-flex uk-flex-between">
 
                       <div className="">NEON Admin v1.0</div>
 
                                    <div className="free">

                                                {newOrders > 0 ? <span uk-tooltip={`Новых заказов ${newOrders}`} className="uk-badge bg-red">{newOrders}</span> : null}

                                                <span  className="uk-margin-small-right uk-icon" uk-icon="bell"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z"></path><path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16"></path></svg></span>

                                                <span onClick={onUpdateList}  uk-tooltip={'Обновить список заказов'}  className="uk-margin-small-right uk-icon" uk-icon="refresh"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5"></path><polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9"></polyline></svg></span>

                                                <span onClick={onLogOut} uk-tooltip="Выход из интерфейса" className="uk-margin-small-right uk-icon" uk-icon="sign-out"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5"></polygon><polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3"></polygon></svg></span>

                                    </div>
 
                   </div>   
 
 
               </div>
     </header>


);


}

export default Header;