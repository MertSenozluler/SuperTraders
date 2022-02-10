const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get("/balance", controller.getBalance);
router.get("/balance/:id", controller.getBalanceById);
router.post("/balance", controller.addBalance);
router.put("/balance/:id", controller.updateBalance);
router.delete("/balance/:id", controller.removeBalance);



router.get("/adresses", controller.getAdresses);
router.get("/adresses/:adress_id", controller.getAdressById);
router.post("/adresses", controller.addAdress);
router.put("/adresses/:adress_id", controller.updateAdress);
router.delete("/adresses/:adress_id", controller.removeAdress);


router.get("/persons",  controller.getPersons);
router.get("/persons/:id", controller.getPersonsById);
router.post("/persons", controller.addPerson);
router.put("/persons/:id", controller.updatePerson);
router.delete("/persons/:id", controller.removePerson);


router.get("/buySell", controller.buySell);


module.exports = router;