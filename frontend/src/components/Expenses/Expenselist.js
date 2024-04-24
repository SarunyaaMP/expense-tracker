import Expenselistitem from "./Expenselistitem";
import { fetchExpense , DeleteExpense} from "../../services/api";
import { useEffect, useState } from "react";

const Expenselist = () => {

    const [data,setData] = useState([]);
    const [total,setTotal] = useState(0);
    // const data=[
    //     {
    //         id:1,
    //         month:"January",
    //         date:5,
    //         title:"Expense 1",
    //         type:"Credit",
    //         amt:5000
    //     },
    //     {
    //         id:2,
    //         month:"January",
    //         date:3,
    //         title:"Expense 2",
    //         type:"Debit",
    //         amt:200
    //     }
    // ];
    
    useEffect(()=>{
        fetchExpense()
        .then((response)=>{
            setData(response);
            computeTotal(response);
        })
        .catch((err)=>{
            console.log("Error occured while fetching expense");
            console.error(err);
        })
    },[]);

    const computeTotal = (list=[]) =>{
        let initialvalue = 0;
        let expense = list.reduce((value, current, index, arr)=>{
            if(current.type === 1){
                value = value + parseInt(current.amount);
            }
            else{
                value-=parseInt(current.amount);
            }
            return value;
        },initialvalue);
        setTotal(expense);
    }

    const handleDeleteOperation = async(id) =>{
        console.log("DELETE THIS ITEM: ",id);
        try{
            const response = await DeleteExpense(id);
            console.log("Item deleted: ", response, id);

            let expense = [...data];
            let list = expense.filter(e => e._id !== id);
            setData(list);
            //computing total after deleting
            computeTotal(list);
        }
        catch(error){
            console.log(error);
        }
    }

    return (

        <div className="layout-container__wrapper">
            <div className="flexbox flexbox-justify-between flexbox-align-baseline">
                <h3>Expenses</h3>
                <span className="pill info">INR {total || "NA"}</span>
            </div>
            <hr />
            <div className="layout-container__expenses">
                <ul>
                    {/* <Expenselistitem data={data[0]}/>
                    <Expenselistitem data={data[1]}/> */}
                    {
                        data.map((item,index)=>{
                            return (
                                <Expenselistitem
                                key={item.id} 
                                data={item} 
                                handleDeleteOperation={handleDeleteOperation}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Expenselist;