const getPersons = "SELECT * FROM persons" ;
const getPersonsById = "SELECT * FROM persons WHERE id=$1" ;
const addPerson = "INSERT INTO persons (id, name, surname) VALUES ($1, $2 , $3)";
const removePerson = "DELETE FROM persons WHERE id = $1";
const updatePerson = "UPDATE persons SET name = $1, surname = $2 WHERE id = $3";

const getAdresses = "SELECT * FROM adresses" ;
const getAdressById = "SELECT * FROM adresses WHERE adress_id=$1" ;
const addAdress = "INSERT INTO adresses (adress_id, id , country , city, district) VALUES ($1, $2 , $3, $4, $5)";
const removeAdress = "DELETE FROM adresses WHERE adress_id = $1";
const updateAdress = "UPDATE adresses SET id = $1, country = $2, city = $3, district=$4 WHERE id = $5";

const getBalance = "SELECT * FROM balance" ;
const getBalanceById = "SELECT * FROM balance WHERE id=$1" ;
const addBalance = "INSERT INTO balance (id, balance, lot) VALUES ($1, $2 , $3)";
const removeBalance = "DELETE FROM balance WHERE id = $1";
const updateBalance = "UPDATE balance SET balance = $1, lot = $2 WHERE id = $3";


module.exports = {
    getPersons,
    getPersonsById,
    addPerson,
    removePerson,
    updatePerson,
    getBalance,
    getAdresses,
    removeAdress,
    getAdressById,
    addAdress,
    updateAdress,
    getBalanceById,
    addBalance,
    removeBalance,
    updateBalance,
}