const veiculos = []; 
function getVeiculos(req, res) { 
res.json(veiculos); 
} 
function getVeiculosByPlaca(req, res) {
const { placa } = req.params; 
const veiculos = veiculos.find(v => v.placa === placa);
    if (veiculos) { 
    res.json(veiculos); 
    } else {
    res.status(404).json({ message: 'Veículo não encontrado.' });
    } 
} 
function createVeiculos(req, res) { 
const { placa, marca, modelo, ano } = req.body; 

const veiculos = { placa, marca, modelo, ano };
    veiculos.push(veiculos); 
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' }); 
} 

function updateVeiculos(req, res) { const { placa } = req.params; 
    const { marca, modelo, ano } = req.body; 
    const veiculos = veiculos.find(v => v.placa === placa); 
    if (veiculos) { 
        veiculos.marca = marca || veiculos.marca; 
        veiculos.modelo = modelo || veiculos.modelo; 
        veiculos.ano = ano || veiculos.ano; 
        res.json({ message: 'Informações do veículo atualizadas com sucesso.' }); 
        } else { 
        res.status(404).json({ message: 'Veículo não encontrado.' }); 
        } 
} 

function deleteVeiculos(req, res) { 
    const { placa } = req.params; 
    const veiculosIndex = veiculos.findIndex(v => v.placa === placa); 
        if (veiculosIndex !== -1) { 
            veiculos.splice(veiculosIndex, 1); 
        res.json({ message: 'Veículo excluído com sucesso.' }); 
        } else { 
        res.status(404).json({ message: 'Veículo não encontrado.' }); 
} 
} 

module.exports = { getVeiculos, getVeiculosByPlaca, createVeiculos, updateVeiculos, deleteVeiculos};
