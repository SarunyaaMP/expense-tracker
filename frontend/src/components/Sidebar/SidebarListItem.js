import { Link , NavLink } from "react-router-dom";


const SidebarListItem = ({
    data,
    handleActiveItem,
    activeListItem
}) => {
    return (
        // <li onClick={e => handleActiveItem(e, data.id)}>
        //     <a className={activeListItem === data.id ? "active" : ""} href="javascript:void(0)">
        //         <span className="material-icons">{data.icon}</span>
        //         <span>{data.title}</span>
        //     </a>
        // </li>

        <li onClick={e => handleActiveItem(e,data.id)}>
            <NavLink to={data.path} className={({isActive, isPending, isTransitioning })=> isActive ? "active" : "" }>
                <span className="material-icons">{data.icon}</span>
                <span>{data.title}</span>
            </NavLink>
        </li>
    )
}

export default SidebarListItem;