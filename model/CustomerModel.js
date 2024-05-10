export default class CustomerModel {
    constructor(name, age, address, salary) {
        this._name = name;
        this._age = age;
        this._address = address;
        this._salary = salary;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

        get age() {
        return this._age;
    }

    set age(age) {
        this._age = age;
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;
    }
}
