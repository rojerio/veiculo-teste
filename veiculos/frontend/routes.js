const express = require('express'); 
const router = express.Router(); 

const controller = require('./controller'); 
router.get('/veiculos', controller.getVeiculos); 
router.get('/veiculos/:placa', controller.getVeiculosByPlaca); 
router.post('/veiculos', controller.createVeiculos); 
router.put('/veiculos/:placa', controller.updateVeiculos); 
router.delete('/veiculos/:placa', controller.deleteVeiculos); 

module.exports = router;
