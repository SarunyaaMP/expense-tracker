const BASE_URL = "http://localhost:8000/";

export const fetchExpense = async () => {
    try {
        const response = await fetch(`${BASE_URL}expenses`);

        if (!response.ok) {
            console.log(`Request failed with status: ${response.status}`);
            throw new Error("Some error occured");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw new Error("Some error occured");
    }
}

export const fetchExpenseById = async (id) => {
    try {

        console.log(`${id}`);
        const response = await fetch(`${BASE_URL}expenses/${id}`);

        if (!response.ok) {
            console.log(`Request Failed with status: ${response.status}`);
            throw new Error("Some error occurred");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Some error occurred");
    }
}

export const AddExpense = async (payload) => {
    const response = await fetch("http://localhost:8000/expenses", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': "application/json"
        }
    });
    if (!response.ok) {
        console.log("Error occured in addexpense api");
        throw new Error("Error occured in addexpense api");
    }
    const data = await response.json();
    return data;
}

export const DeleteExpense = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}expenses/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            console.log(`Request failed with status: ${response.status}`);
            throw new Error("Some error occured");
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw new Error("Some error occured");
    }
}

export const UpdateExpense = async (id,payload) =>{
    try{
        const response = await fetch(`${BASE_URL}expenses/${id}`,{
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type' : "application/json"
            }
        });

        if(!response.ok){
            console.log(`Request failed with status: ${response.status}`);
            throw new Error("Some error occured");
        }
        const data = await response.json();
        return(data);
    }
    catch(error){
        throw new Error("Some error occured");
    }
}