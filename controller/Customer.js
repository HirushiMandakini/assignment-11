import CustomerModel from "../model/CustomerModel.js";
import {customers} from "../db/db.js";

var recordIndex;
function loadTable(){
    $("#table-Customer").empty();
    customers.map((item) =>{
        console.log(item);
        let record = `<tr>
            <td class="name">${item.name}</td>
            <td class="age">${item.age}</td>
            <td class="address">${item.address}</td>
            <td class="salary">${item.salary}</td>
            </tr>`;
//add
            console.log(item);

        $("#table-Customer").append(record);
    });
}
    function inputClear(){
        $("#customerName").val('');
        $("#customerAge").val('');
        $("#customerAddress").val('');
        $("#customerSalary").val('');
        
     }

     $("#customer-save").on('click', function() {
        var name =  $("#CustomerName").val();
        var age = $('#CustomerAge').val();
        var address = $('#CustomerAddress').val();
        var salary = $('#CustomerSalary').val(); 

        console.log(name, age, address, salary);

    console.log(name, age, address, salary);
        // If all fields are valid, proceed with saving
        var customer = new CustomerModel(
            name,
            age,
            address,
            salary
        );
     
        customers.push(customer);
        console.log(customer);
        loadTable();
        inputClear();
        $("#addCustomerModal").modal("hide");
    });
loadTable();
