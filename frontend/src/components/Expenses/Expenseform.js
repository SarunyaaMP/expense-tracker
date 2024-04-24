import { useState, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchExpenseById , AddExpense, UpdateExpense } from "../../services/api";

const Expenseform = ({operation}) => {

    const params=useParams();
    console.log("Expense id", params)
















    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [amount,setAmount] = useState(0);
    const [date,setDate] = useState("");
    const [type,setType] = useState("");

    const updatetitle=(event)=>{
        setTitle(event.target.value);
    }

    const updatedescription=(event)=>{
        setDescription(event.target.value);
    }

    const updateamount=(event)=>{
        setAmount(event.target.value);
    }

    const updatedate=(event)=>{
        setDate(event.target.value);
    }

    const updatetype=(event)=>{
        setType(event.target.value);
    }

    const handleSubmission=async (event)=>{
        event.preventDefault();

        console.log({
            title,
            description,
            amount,
            date,
            type
        })

        try{
            let payload={
                title,
                description,
                amount,
                type,
                date
            };
            if(params && params.id){
                let response = await UpdateExpense(params.id,payload);
                console.log("Updated expense: ",response,payload);
            }
            else{
                let response = await AddExpense(payload);
                console.log("Added Expense: ", response, payload);
            }
        }
        catch(error){
            console.log("Error in AddExpense");
        }
        // alert("Your form has been submitted!!!");
    }

    const handleReset=()=>{
        setTitle("");
        setDescription("");
        setType("");
        setAmount(0);
        setDate("");
        // alert("Add expense form has been reset!!")
        console.log("Add expense form has been reset!!")
    }

    //pre filling data to edit
    
    useEffect(() => {
        if (params && params.id) {
            console.log(`MAKE AN API CALL TO FETCH THE DATA FOR EXPENSE ID: ${params.id}`);
            fetchExpenseById(params.id)
                .then(data => {
                    console.log(data);
                    const { title, description, date, amount, type, id} = data;
                    setTitle(title);
                    setDescription(description);
                    setDate(date);
                    setAmount(amount);
                    setType(type);
                })
                .catch(error => {
                    console.log(error);
                    window.alert("Some error occurred!")
                })
        }

        return () => {
            console.log("Cleanup of Expense Form Component");
            setTitle("");
            setDescription("");
            setAmount(0);
            setDate("");
            setType("");
        }
    }, [params]);

    // useEffect(() => {
    //     if (params && params.id) {
    //         console.log(`MAKE AN API CALL TO FETCH THE DATA FOR EXPENSE ID: ${params.id}`);
    //         fetchExpenseById(params.id)
    //             .then(data => {
    //                 console.log(data);
    //                 const { title, description, date, amount, type, id } = data;
    //                 setTitle(title);
    //                 setDescription(description);
    //                 setDate(date);
    //                 setAmount(amount);
    //                 setType(type);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //                 window.alert("Some error occurred!")
    //             })
    //     }

    //      return () => {
    //         console.log("Cleanup of Expense Form Component");
    //         setTitle("");
    //         setDescription("");
    //         setAmount(0);
    //         setDate("");
    //         setType("");
    //     }
    // }, [params]);



    return (
        <div className="layout-container__wrapper">
            <div className="heading">
                <h3>{operation} Expense Log</h3>
            </div>
            <hr />
            <form autoComplete="off" onSubmit={handleSubmission} onReset={handleReset}>
            {/* <form autoComplete="off" onSubmit={handleSubmission}> */}
                <div className="form-wrap">
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter title"
                        name="title" className="form-input" required="" value={title} onChange={updatetitle}/>
                </div>
                <div className="form-wrap">
                    <label htmlFor="description">Description</label>
                    <textarea name="description"
                        className="form-textarea" placeholder="Enter Description" rows="4" value={description} onChange={updatedescription}></textarea>
                </div>
                <div className="form-wrap">
                    <label htmlFor="amount">Amount</label>
                    <input type="number"
                        placeholder="Enter Amount" name="amount" className="form-input" min="0" required="" value={amount} onChange={updateamount}/>
                </div>
                <div className="flexbox">
                    <div className="form-wrap flexbox-child__fb50 pr-5">
                        <label htmlFor="date">Date</label>
                        <input type="date"
                            className="form-input" name="date" placeholder="Enter date" value={date} onChange={updatedate}/>
                    </div>
                    <div className="form-wrap flexbox-child__fb50 pl-5">
                        <label htmlFor="type">Select Type</label>
                        <select
                            className="form-select" name="type" required="" value={type} onChange={updatetype}>
                            <option value="">Select type</option>
                            <option value="1">Credit</option>
                            <option value="2">Debit</option>
                        </select>
                    </div>
                </div>
                <div className="flexbox flexbox-reverse">
                    <button className="btn" type="submit"><span>{operation} Expense</span></button>
                    <button className="btn mr-5" type="reset"><span>Clear</span></button>
                </div>
            </form>
        </div>
    );
}

export default Expenseform;