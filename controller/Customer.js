import CustomerModel from "../model/CustomerModel.js";
import {customer_db} from "../db/db.js";

let CustomerId = $("#CustomerId");
let CustomerName = $("#CustomerName");
let CustomerAddress = $("#CustomerAddress");
let CustomerMobile = $("#CustomerMobile");

let submit = $("#customer_btn").eq(0);

var recordIndex;



let search = $("#search");
let searchField = $("#searchField");

const mobilePattern = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");

searchField.on('input', function () {
    let search_term = searchField.val();

    let results = customer_db.filter((item) =>

        item.customer_id.toLowerCase().startsWith(search_term.toLowerCase()) || item.customer_name.toLowerCase().startsWith(search_term.toLowerCase()) || item.customer_address.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.mobile.toLowerCase().startsWith(search_term.toLowerCase())

    );

    $('#table-Customer').eq(0).empty();
    results.map((item, index) => {
        let tbl_row = `<tr>
            <th scope="row">${item.customer_id}</th>
            <td>${item.customer_name}</td>
            <td>${item.customer_address}</td>
            <td>${item.mobile}</td>
        </tr>`;
        $('#table-Customer').eq(0).append(tbl_row);
    });

});
// --------------- clear inputs
const cleanInputs = () => {
    $('#CustomerId').val(generateCustomerId());
    $('#CustomerName').val('');
    $('#CustomerAddress').val('');
    $('#CustomerMobile').val('');
};

function generateCustomerId(){
    let highestCustId = 0;

    for (let i = 0; i < customer_db.length; i++) {
        // Extract the numeric part of the item code
        const numericPart = parseInt(customer_db[i].customer_id.split('-')[1]);

        // Check if the numeric part is greater than the current highest
        if (!isNaN(numericPart) && numericPart > highestCustId) {
            highestCustId = numericPart;
        }
    }

    // Increment the highest numeric part and format as "item-XXX"
    return `C-${String(highestCustId + 1).padStart(3, '0')}`;

}

submit.on('click', () => {
    let idValue = CustomerId.val();
    let nameValue = CustomerName.val();
    let addressValue = CustomerAddress.val();
    let mobileValue = CustomerMobile.val();

    if (
        validation(nameValue, "customer name", null) &&
        validation(addressValue, "Address", null) &&
        validation(mobileValue, "Contact", mobilePattern.test(mobileValue))
    ) {
        let customerDetails = new CustomerModel(
            idValue,
            nameValue,
            addressValue, 
            mobileValue
        );

        customer_db.push(customerDetails);
        populateCustomerTbl();
        cleanInputs();

        // Show success alert
        Swal.fire({
            icon: 'success',
            title: 'Customer Saved!',
            text: 'The customer details have been successfully saved.',
            showConfirmButton: false,
            timer: 1500 // Close alert after 1.5 seconds
        });
    }
});


function populateCustomerTbl(){
    $("#table-Customer").eq(0).empty();
    customer_db.map((customer) =>{
        $("#table-Customer").eq(0).append(
            `<tr>
                <th scope="row">${customer.customer_id}</th>
                <td>${customer.customer_name}</td>
                <td>${customer.customer_address}</td>
                <td>${customer.mobile}</td>
            </tr>`
        );
    });
}


function showValidationError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

function validation(value,message,test) {
    if(!value){
        showValidationError('Null Input','Input '+message);
        return false;
    }
    if(test===null){
        return true;
    }
    if(!test){
        showValidationError('Invalid Input','Invalid Input '+message);
        return false;
    }
    return true;
}
$("#Customer-section").on('click', function (){
    CustomerId.val(generateCustomerId());
    populateCustomerTbl();
})




$("#customer-update").on("click", function() {
    var customerId = $('#CustomerID').val().trim();
    var customerName = $('#CustomerName').val().trim();
    var customerAddress = $('#CustomerAddress').val().trim();
    var customerContact = $('#CustomerMobile').val().trim();
 
    // Validation patterns
    var idPattern = /^[a-zA-Z0-9]{4,}$/;
    var namePattern = /^[a-zA-Z\s]{5,}$/;
    var addressPattern = /.+/;
    var contactPattern = /^\d{10}$/;
 
    // Validate fields
    if (!validateField(customerId, idPattern, 'Please enter a valid customer ID '))
       return;
    if (!validateField(customerName, namePattern, 'Please enter a valid name '))
       return;
    if (!validateField(customerAddress, addressPattern, 'Please enter a valid address.'))
       return;
    if (!validateField(customerContact, contactPattern, 'Please enter a valid contact number.'))
       return;
 
 
    $("#table-Customer tr").eq(recordIndex).find(".customer-id-value").text(customerId);
    $("#table-Customer tr").eq(recordIndex).find(".customer-name-value").text(customerName);
    $("#table-Customer tr").eq(recordIndex).find(".customer-address-value").text(customerAddress);
    $("#table-Customer tr").eq(recordIndex).find(".customer-contact-value").text(customerContact);
 
    let customerUpdate = new CustomerModel(
        customerId,customerName,customerAddress,customerContact
    );
    customers[recordIndex] = customerUpdate;
 
    loadTable();
    inputClear();
 
    $("#newCustomerModal").modal("hide");
 });
 
 $("#table-Customer").on("click", "tr", function() {
    // Get the index of the clicked row
    recordIndex = $(this).index();
 
    let id = $(this).find(".customer-id-value").text();
    let name = $(this).find(".customer-name-value").text();
    let address = $(this).find(".customer-address-value").text();
    let contact = $(this).find(".customer-contact-value").text();
 
    $("#customerID").val(id);
    $("#customerName").val(name);
    $("#customerAddress").val(address);
    $("#customerPhone").val(contact);
 
    $("#newCustomerModal").modal("show");
 });