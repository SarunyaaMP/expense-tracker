import {useState} from 'react';
import SidebarListItem from './SidebarListItem';

const Sidebar = ({
    activeListItem,
    updateActiveListitem=()=>{}}
) => {

    const [activeItem,setActiveItem]=useState(0);

    const data = [
        {
            id: 1,
            title: "Expenses",
            icon: "insights",
            path: "/"
        },
        {
            id: 2,
            title: "Add Expense",
            icon: "note_add",
            path: "/add-expense"
        },
        {
            id: 3,
            title: "Analytics",
            icon: "analytics",
            path: "/analytics"
        }
    ];

    const handleActiveItem=(e,index=1)=>{
        // setActiveItem(index);
        updateActiveListitem(index);
    }

    // console.log(activeItem);

    return (
        <div className="sidebar-container">
            <div className="sidebar-container__brand">
                Expense Tracker
            </div>
            <div className="sidebar-container__list">
                <ul>
                    {/* <li onClick={(e)=>{handleActiveItem(e,1)}}>
                        <a className="active" href="/">
                        <a className={activeItem === 1 ? "active" : ""} href="javascript:void(0)">
                            <span className="material-icons">insights</span>
                            <span>Expenses</span>
                        </a>
                    </li> */}
                    {/* <li onClick={(e)=>{handleActiveItem(e,2)}}> 
                        <a href="/add">
                        <a className={activeItem === 2 ? "active" : ""} href="javascript:void(0)">
                            <span className="material-icons">note_add</span>
                            <span>Add Expense</span>
                        </a>
                    </li> */}
                    {/* <li onClick={(e)=>{handleActiveItem(e,3)}}>
                        <a href="/analytics">
                        <a className={activeItem === 3 ? "active" : ""} href="javascript:void(0)">
                            <span className="material-icons">analytics</span>
                            <span>Analytics</span>
                        </a>
                    </li> */}
                    {
                        data.map((item, index) => {
                            return (
                                <SidebarListItem
                                    key={item.id}
                                    data={item}
                                    activeListItem={activeListItem}
                                    handleActiveItem={handleActiveItem}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
        
    );
}

export default Sidebar;