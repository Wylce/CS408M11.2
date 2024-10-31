window.onload = loaded;

/**
 * Simple Function that will be run when the browser is finished loading.
 */
function loaded() {
    // Assign to a variable so we can set a breakpoint in the debugger!
    //const hello = sayHello();
    //console.log(hello);
}

/**
 * This function returns the string 'hello'
 * @return {string} the string hello
 */
/*export function sayHello() {
    return 'hello';
}*/

document.getElementById("load-data").onclick = function () {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", function () {
        fillTable(xhr.response);
        document.getElementById("data-table").style.visibility = 'visible';
        document.getElementById("load-data").textContent = "Refresh Data"
    });
    xhr.open("GET", "https://67yk566zoe.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
}

function fillTable(data){
    console.log(data);
    let table = document.getElementById("data-table");
    let currentBody = document.getElementById("table-body")
    let tableBody = document.createElement("tbody");
    tableBody.id = "table-body";
    data.forEach((element => {
        console.log(element['id']);
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
    console.log(table.tBodies);
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

        //document.getElementById("send-data").onclick = sendData;
        
        function sendData(data) {

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


        //document.getElementById("delete-data").addEventListener('click', deleteData);
        
        function deleteData (id) {
            console.log("deleted " + id);
            let xhr = new XMLHttpRequest();
            xhr.open("DELETE", "https://67yk566zoe.execute-api.us-east-2.amazonaws.com/items/" + id);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
        }