export default class CustomerModel {
    constructor(id, name, address, contact) {
        this._id = id;
        this._name = name;
        this._address=address;
        this._contact;
    }

    get id() { return this._id; }
    set id(id) { this._id = id; }

    get name() { return this._name; }
    set name(name) { this._name = name; }

    get address() { return this._address; }
    set address(address) { this._address = address; }

    get contact() { return this._contact; }
    set contact(contact) { this._contact = contact; }
}
