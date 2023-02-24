let form = document.getElementById('form');
let itemList = document.getElementById('users');
let flag = false;

window.addEventListener('DOMContentLoaded', () => {
    axios.get("http://localhost:3000/expense")
        .then((response) => {
           
            response.data.allUsers.forEach((ele) => {
                showNewUseronScreen(ele);
               
            })
        })
        .catch((err) => {
            console.log(err);
        })
})

form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();
    let id = document.getElementById('id').value;
    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    let obj = {
        id,
        amount,
        description,
        category
    };
    postRequest = async () => {
        try {

            if(flag==false){
           
            const response = await axios.post("http://localhost:3000/expense", obj);
            console.log(response);
            console.log(response.data.newExpenseDetail);
            location.reload();
            //showNewUseronScreen(response.data.newExpenseDetail);
            return;
            }
            else
            {
                console.log(obj.id);
                const response = await axios.post(`http://localhost:3000/expense/${obj.id}`, obj);
                console.log(response.data);
                flag = false;
                location.reload();
            }
        } catch (err) {
            document.body.innerHTML += "<h4>Something went wrong !</h4>";
            console.log(err);
        }
    }
    postRequest();
}
deleteUserfromapi = async (id) => {
    try {
        const users = await axios.delete(`http://localhost:3000/expense/${id}`);
        deleteUser(id);
    } catch (err) {
        document.body.innerHTML += "<h4>Something went wrong !</h4>";
        console.log(err);
    }
}

function showNewUseronScreen(userDetails){
    const d=document.getElementById('users')
    console.log(userDetails.id);
    let li= `<li id="${userDetails.id}"> '${userDetails.amount}','${userDetails.description}','${userDetails.category}'
     <button onclick = editUser('${ userDetails.id}','${ userDetails.amount}','${userDetails.description}','${userDetails.category}')> Edit </button> 
     <button onclick = deleteUser('${userDetails.id}')> Delete </button> 
      </li>`
   d.innerHTML=d.innerHTML + li
   }
   function deleteUser(id) {
    let child = document.getElementById(id)
    let parent=document.getElementById('users')
    parent.removeChild(child)
    
}

function editUser(id,amount,description,category) {
    flag = true;
    document.getElementById('id').value=id;
    document.getElementById('amount').value=amount;
document.getElementById('category').value=category;
document.getElementById('description').value=description;

    }
