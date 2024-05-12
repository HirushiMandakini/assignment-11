export default class CustomerModel {
    constructor(customer_id, customer_name, customer_address, mobile) {
        this._customer_id = customer_id;
        this._customer_name = customer_name;
        this._customer_address = customer_address;
        this._mobile = mobile;
    }

    get customer_id() { return this._customer_id; }
    set customer_id(customer_id) { this._customer_id = customer_id; }

    get customer_name() { return this._customer_name; }
    set customer_name(customer_name) { this._customer_name = customer_name; }

    get customer_address() { return this._customer_address; }
    set customer_address(customer_address) { this._customer_address = customer_address; }

    get mobile() { return this._mobile; }
    set mobile(mobile) { this._mobile = mobile; }
}
