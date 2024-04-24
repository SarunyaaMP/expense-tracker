import { useState } from 'react';
import Expenselist from '../components/Expenses/Expenselist';
import Sidebar from '../components/Sidebar/Sidebar';
import Expenseform from '../components/Expenses/Expenseform';
import { Outlet } from 'react-router-dom';

const ExpenseComponent = () => {

    const [activeItem, setActiveItem] = useState(0);

    const handleActiveListItem = (index) => {
        setActiveItem(index);
    }
    return (
        <div className="flexbox">
            <Sidebar
                activeListItem={activeItem}
                updateActiveListitem={(params) => {
                    handleActiveListItem(params);
                }}
            />
            <div className="layout-container">
                {/* {
                    activeItem === 1 ?
                        <Expenselist />
                        : (
                            activeItem === 2
                                ?
                                <Expenseform/>
                                :
                                (
                                    activeItem === 3 ?
                                        "Analytics Page" :
                                        ""
                                )
                        )
                } */}

                <Outlet/>
            </div>
        </div>
    );
}

export default ExpenseComponent;