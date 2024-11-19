import React, { useState, useEffect } from 'react'; // Importa React e hooks useState e useEffect
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import './App.css'; // Importa o arquivo de estilos CSS

const App = () => {
  const [veiculos, setVeiculos] = useState([]); // Declara um estado para a lista de veículos
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    custo: ''
  }); // Declara um estado para os dados do formulário
  const [isEditing, setIsEditing] = useState(false); // Declara um estado para controlar se estamos editando ou criando

  useEffect(() => {
    // Carrega os veículos ao montar o componente
    fetchVeiculos();
  }, []); // Array vazio indica que este efeito roda apenas uma vez após o componente ser montado

  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/veiculos'); // Faz uma requisição GET para obter a lista de veículos
      setVeiculos(response.data); // Atualiza o estado veiculos com os dados recebidos da API
    } catch (error) {
      console.error(error); // Lida com erros na requisição
    }
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Atualiza o estado formData com os valores dos campos do formulário
  };

  const handleCreateVeiculos = async e => {
    e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página
    try {
      await axios.post('http://localhost:3000/veiculos', formData); // Faz uma requisição POST para criar um novo veículo
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        ano: '',
        custo: ''
      }); // Reseta os campos do formulário
      fetchVeiculos(); // Recarrega a lista de veículos
    } catch (error) {
      console.error(error); // Lida com erros na requisição
    }
  };

  const handleUpdateVeiculos = async e => {
    e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página
    try {
      await axios.put(`http://localhost:3000/veiculos/${formData.placa}`, formData); // Faz uma requisição PUT para atualizar um veículo existente
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        ano: '',
        custo: ''
      }); // Reseta os campos do formulário
      setIsEditing(false); // Define que não estamos mais editando
      fetchVeiculos(); // Recarrega a lista de veículos
    } catch (error) {
      console.error(error); // Lida com erros na requisição
    }
  };

  const handleDeleteVeiculos = async placa => {
    try {
      await axios.delete(`http://localhost:3000/veiculos/${placa}`); // Faz uma requisição DELETE para excluir um veículo
      fetchVeiculos(); // Recarrega a lista de veículos
    } catch (error) {
      console.error(error); // Lida com erros na requisição
    }
  };

  const handleEditVeiculo = veiculo => {
    setFormData({
      placa: veiculo.placa,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      custo: veiculo.custo
    }); // Preenche o formulário com os dados do veículo a ser editado
    setIsEditing(true); // Define que estamos editando
  };

  return (
    <div>
      <h1>Veículos</h1>
      <form onSubmit={isEditing ? handleUpdateVeiculos : handleCreateVeiculos}>
        <label>
          Placa:
          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleInputChange}
            disabled={isEditing} // Desabilita a placa durante a edição
          />
        </label>
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ano:
          <input
            type="text"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
          />
        </label>
        <label>
          custo:
          <input
            type="text"
            name="custo"
            value={formData.custo}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button> {/* Botão de envio do formulário */}
      </form>

      <ul>
        {veiculos.map(veiculo => (
          <li key={veiculo.placa}>
            {veiculo.placa} - {veiculo.marca} - {veiculo.modelo} - {veiculo.ano} - {veiculo.custo}
            <button onClick={() => handleEditVeiculo(veiculo)}>Editar</button> {/* Botão para editar veículo */}
            <button onClick={() => handleDeleteVeiculos(veiculo.placa)}>Excluir</button> {/* Botão para excluir veículo */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
