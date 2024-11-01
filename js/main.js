//This event is here cause I moved the XMLHttpRequest to its own
//function for testing, so now that function needs its own event to fire
//when the data is finished loading and can be put into the table
export const dataEvent = new Event('dataReady');

document.getElementById("load-data").onclick = async function () {
    //The holder is used to assign data to one of its properties when the data loads
    //I feel like there's gotta be a better way to do that but idk what it is
    const holder = new Object();
    getData(holder);
    document.addEventListener('dataReady', function () {
        fillTable(holder.data);
        document.getElementById("data-table").style.visibility = 'visible';
        document.getElementById("load-data").textContent = "Refresh Data";
    })  
}

/**
 * Loads data from the table storied in AWS and stores it as a property
 * of a holder object, passed in from the calling function.
 * 
 * @param {*} holder an empty object used to make the data accessible to the calling function
 */
export function getData(holder){
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function () {
        holder.data = xhr.response;
        document.dispatchEvent(dataEvent);
    });
    xhr.open("GET", "https://67yk566zoe.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
}

/**
 * Creates a new HTML table body out of data it's been passed and replaces
 * the current body of the table in index.html
 * 
 * @param {*} data 
 */
function fillTable(data){
    let table = document.getElementById("data-table");
    let currentBody = document.getElementById("table-body")
    let tableBody = document.createElement("tbody");
    tableBody.id = "table-body";
    data.forEach((element => {
        const row = document.createElement("tr");
        
        const idCell = document.createElement("td");
        idCell.innerHTML = element['id'];
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.innerHTML = element['name'];
        row.appendChild(nameCell);

        const priceCell = document.createElement("td");
        priceCell.innerHTML = element['price'];
        row.appendChild(priceCell);

        const buttonCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.id = element.id;
        deleteButton.addEventListener('click', deleteData.bind(deleteButton, element.id));

        buttonCell.appendChild(deleteButton);
        row.appendChild(buttonCell);
        tableBody.appendChild(row);
        
    }))
    table.replaceChild(tableBody, currentBody);   
}

const entryForm = document.getElementById("entry-form");
    entryForm.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("hi");
            
        sendData(new FormData(entryForm));
        entryForm.reset();
    }      
);

/**
 * Takes in one data object and creates a PUT request with it to send to
 * the AWS table
 * 
 * @param {*} data 
 */
export function sendData(data) {

    console.log(data);
    console.log("id: " + data.get('id'));
    console.log(JSON.stringify(data));

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://67yk566zoe.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "id": data.get('id'),
        "price": data.get('price'),
        "name": data.get('name')
    }));
}


/**
 * Takes an id number and makes a DELETE request from it to send to the AWS table
 * 
 * @param {*} id 
 */        
export function deleteData (id) {
    console.log("deleted " + id);
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://67yk566zoe.execute-api.us-east-2.amazonaws.com/items/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}