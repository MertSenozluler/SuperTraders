const pool = require('../db');
const queries = require('./queries');
const ps = require("prompt-sync");
const { use } = require('express/lib/application');
const prompt = ps();



const buySell = async (req , res) =>  {

    let buySell = prompt("Enter the process type (buy-sell): ");

    

    if (buySell === "buy") {

        let buyID =await prompt("Enter the id number of the user who will process: ");
        
        let userBalance =await pool.query("SELECT * FROM balance WHERE id="+buyID); 
        userBalance=userBalance.rows[0].balance
        console.log("user's money  = " + userBalance);

        let xyzLotPrice =await pool.query("SELECT * FROM stock");
        xyzLotPrice = xyzLotPrice.rows[0].lot_price

        let xyz = await pool.query("SELECT * FROM stock")
        xyz = parseInt(xyz.rows[0].stock_price)
        console.log(`The value of XYZ: ${xyz} `)
        console.log("One lot value: " + xyzLotPrice)

        

        let NumberOfLot =await pool.query("SELECT * FROM balance WHERE id="+buyID);
        NumberOfLot = NumberOfLot.rows[0].lot
        console.log("the number of lots owned by the user: " + NumberOfLot)

        let buyLot =await prompt("How many lots will be traded? ");
        

        

        if ((xyzLotPrice*buyLot)<userBalance) {


            userBalance = userBalance-(xyzLotPrice*buyLot)
            await pool.query("UPDATE balance SET balance="+userBalance+" WHERE id="+buyID)
            await pool.query("UPDATE balance SET lot="+NumberOfLot+"WHERE id="+buyID)

            let xyz = await pool.query("SELECT * FROM stock")
            xyz = parseInt(xyz.rows[0].stock_price)
            console.log(`The value of XYZ: ${xyz} `)
            console.log("One lot value: " + xyzLotPrice)

            console.log(`user's new balance= ${userBalance}`)
            
            xyzLotPrice = xyzLotPrice + (buyLot/xyz)
            await pool.query("UPDATE stock SET lot_price="+xyzLotPrice)
            console.log(`New lot value of XYZ: ${xyzLotPrice}`)

            xyz =parseInt (xyz) + parseInt(buyLot)
            console.log(`The new value of XYZ= ${xyz}`)
            await pool.query("UPDATE stock SET stock_price="+xyz+" WHERE id=1")

            res.sendStatus(200)

        } 
        
        else {console.log("the user has insufficient balance")
            return res.sendStatus(400); }
    
    }else if (buySell === "sell") {
        let sellID =await prompt("Enter the id number of the user who will process: ");
        let userLot =await pool.query("SELECT * FROM balance WHERE id="+sellID);
        userLot=userLot.rows[0].lot
        console.log(`Number of lots owned by the user you selected: ${userLot}`)

        let userBalance =await pool.query("SELECT * FROM balance WHERE id="+sellID);
        userBalance=userBalance.rows[0].balance
        console.log("user balance: " + userBalance);

        let xyz = await pool.query("SELECT * FROM stock")
        xyz = parseInt(xyz.rows[0].stock_price)
        console.log(`The value of XYZ: ${xyz} `)

        let xyzLotPrice =await pool.query("SELECT * FROM stock");
        xyzLotPrice = xyzLotPrice.rows[0].lot_price
        console.log("One lot value: " + xyzLotPrice)
        
        let sellLot = await prompt("How many lots do you want to sell:");


        if (sellLot < userLot) {
            
            res.sendStatus(200)

            let newBalance = xyzLotPrice*sellLot


            let userBalance =await pool.query("SELECT * FROM balance WHERE id="+sellID);
            userBalance=userBalance.rows[0].balance
            userBalance = userBalance + newBalance
            console.log("kullanıcının yeni parası= "+userBalance)

            userLot = userLot - sellLot

            console.log("User's new balance: " + userLot)
            await pool.query("UPDATE balance SET lot="+userLot+" WHERE id="+sellID)


            xyzLotPrice = xyzLotPrice - (sellLot/xyz)
            await pool.query("UPDATE stock SET lot_price="+xyzLotPrice)
            console.log(`New lot value of XYZ: ${xyzLotPrice}`)

            xyz =parseInt (xyz) - parseInt(sellLot)
            console.log(`The new value of XYZ = ${xyz}`)
            await pool.query("UPDATE stock SET stock_price="+xyz+" WHERE id=1")

            res.sendStatus(200)

        }else  {console.log("Insufficient number of lots owned by the user")
            return res.sendStatus(400);}



    } else {console.log("You entered an incorrect value.")
            return res.sendStatus(400); }

};



const getPersons = (req,res) => {
    pool.query(queries.getPersons, (error , results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};


const getBalance = (req,res) => {
    pool.query(queries.getBalance, (error , results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};





const getAdresses = (req,res) => {
    pool.query(queries.getAdresses, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};


const getPersonsById = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPersonsById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};


const getAdressById = (req,res) => {
    const adress_id = parseInt(req.params.adress_id);
    pool.query(queries.getAdressById, [adress_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};


const getBalanceById = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBalanceById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};


const addPerson = (req , res) => {
    const {id , name , surname} = req.body;
    pool.query(queries.addPerson, [id , name, surname] , (error,results) => {
        if (error) throw error;
        res.status(201).send("Person Created Successfully!");
    }
)
};

const addAdress = (req , res) => {
    const {adress_id, id , country , city, ditrict} = req.body;
    pool.query(queries.addAdress, [adress_id, id , country , city, ditrict] , (error,results) => {
        if (error) throw error;
        res.status(201).send("Adress Created Successfully!");
    }
)
};


const addBalance = (req , res) => {
    const {id , balance , lot} = req.body;
    pool.query(queries.addBalance, [id , balance, lot] , (error,results) => {
        if (error) throw error;
        res.status(201).send("Balance Created Successfully!");
    }
)
};

const removePerson = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getPersonsById, [id], (error,results) => {
        const noPersonFound = !results.rows.length;
        if (noPersonFound) {
            res.send("Person does not exist in the database");
        }
    pool.query(queries.removePerson,[id],(error,results) => {
        if (error) throw error;
        res.status(200).send("Person removed successfully!");
    }
        )
    
    });
};

const removeBalance = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getBalanceById, [id], (error,results) => {
        const noBalanceFound = !results.rows.length;
        if (noBalanceFound) {
            res.send("Balance does not exist in the database");
        }
    pool.query(queries.removeBalance,[id],(error,results) => {
        if (error) throw error;
        res.status(200).send("Balance removed successfully!");
    }
        )
    
    });
};

const removeAdress = (req,res) => {
    const adress_id = parseInt(req.params.adress_id);

    pool.query(queries.getAdressById, [adress_id], (error,results) => {
        const noAdressFound = !results.rows.length;
        if (noAdressFound) {
            res.send("Adress does not exist in the database");
        }
    pool.query(queries.removeAdress,[adress_id],(error,results) => {
        if (error) throw error;
        res.status(200).send("Adress removed successfully!");
    }
    )
    
    });
};

const updatePerson = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, surname } = req.body; 

    pool.query(queries.getPersonsById, [id], (error,results) => {
        const noPersonFound = !results.rows.length;
        if (noPersonFound) { 
            res.send("Person does not exist in the database");
        }

    pool.query(queries.updatePerson, [ name, surname, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Person updated successfully");
    });
    });
};

const updateBalance = (req, res) => {
    const id = parseInt(req.params.id);
    const { balance, lot } = req.body; 

    pool.query(queries.getBalanceById, [id], (error,results) => {
        const noBalanceFound = !results.rows.length;
        if (noBalanceFound) { 
            res.send("Balance does not exist in the database");
        }

    pool.query(queries.updateBalance, [ balance, lot, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Balance updated successfully");
    });
    });
};

const updateAdress = (req, res) => {
    const adress_id = parseInt(req.params.adress_id);
    const {  id,country,city,district } = req.body; 

    pool.query(queries.getAdressById, [adress_id], (error,results) => {
        const noAdressFound = !results.rows.length;
        if (noAdressFound) { 
            res.send("Adress does not exist in the database");
        }

    pool.query(queries.updateAdress, [ id,country,city,district, adress_id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Adress updated successfully");
    });
    });
};

module.exports = {
    getPersons, 
    getPersonsById,
    addPerson,
    removePerson,
    updatePerson,
    getBalance,
    getAdresses,
    buySell,
    removeAdress,
    addAdress,
    getAdressById,
    updateAdress,
    getBalanceById,
    addBalance,
    removeBalance,
    updateBalance,
}