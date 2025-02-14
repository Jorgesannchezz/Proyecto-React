import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Para leer el archivo CSV
import { jsPDF } from 'jspdf'; // Para generar el PDF
import { Bar, Pie } from 'react-chartjs-2'; // Para los gráficos
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Informe.css'; // Importar el archivo CSS

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Informes = () => {
  const [difficulty, setDifficulty] = useState('');
  const [heroType, setHeroType] = useState('');
  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [message, setMessage] = useState('');

  // Leer el archivo CSV cuando el componente se monta
  useEffect(() => {
    Papa.parse("src/components/200125_LoL_champion_data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setChampions(result.data);
      },
    });
  }, []);

  // Filtrar los campeones basados en los valores seleccionados
  const filterChampions = () => {
    const filtered = champions.filter(champion => {
      return (
        (difficulty ? champion.difficulty === difficulty : true) &&
        (heroType ? champion.herotype === heroType : true)
      );
    });

    setFilteredChampions(filtered);

    if (filtered.length === 0) {
      setMessage('No hay campeones que coincidan con los filtros seleccionados.');
    } else {
      setMessage('');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Título del informe
    doc.setFontSize(18);
    doc.text('Informe de Campeones', 105, 20, { align: 'center' });

    // Encabezado
    doc.setFontSize(12);
    doc.text(
      'Este informe muestra información detallada sobre los campeones filtrados por dificultad y tipo de héroe.',
      10,
      30
    );

    // Cabecera de columna
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 255); // Color azul
    doc.text('Nombre', 10, 40);
    doc.text('Dificultad', 70, 40);
    doc.text('Tipo de Héroe', 110, 40);
    doc.text('Estadísticas', 150, 40);

    // Detalles de los campeones
    doc.setTextColor(0, 0, 0); // Color negro para el contenido
    filteredChampions.forEach((champion, index) => {
      const y = 50 + index * 10;

      // Ajusta las propiedades según los nombres reales de las columnas
      doc.text(champion.apiname || 'Desconocido', 10, y);
      doc.text(champion.difficulty || 'N/A', 70, y);
      doc.text(champion.herotype || 'N/A', 110, y);
      doc.text(champion.stats || 'N/A', 150, y);
    });

    // Pie de columnas
    doc.setTextColor(0, 0, 255);
    doc.text('Fin de la página', 10, 280);

    // Resumen al final
    const totalChampions = filteredChampions.length;
    doc.setTextColor(128, 0, 128); // Color morado para el resumen
    doc.text(
      `Resumen: Total de campeones filtrados: ${totalChampions} con la dificultad: ${difficulty} y el tipo de heroe: ${heroType}` ,
      10,
      290
    );

    // Guardar el PDF
    doc.save('informe_campeones.pdf');
  };

  // Datos para el gráfico de barras
  const barData = {
    labels: ['Fighter', 'Mage', 'Assassin', 'Tank', 'Support', 'Marksman'],
    datasets: [
      {
        label: 'Cantidad de Campeones',
        data: [
          champions.filter(champion => champion.herotype === 'Fighter').length,
          champions.filter(champion => champion.herotype === 'Mage').length,
          champions.filter(champion => champion.herotype === 'Assassin').length,
          champions.filter(champion => champion.herotype === 'Tank').length,
          champions.filter(champion => champion.herotype === 'Support').length,
          champions.filter(champion => champion.herotype === 'Marksman').length,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Datos para el gráfico circular
  const pieData = {
    labels: ['Top', 'Middle', 'Bottom', 'Support', 'Jungle'],
    datasets: [
      {
        label: 'Cantidad de Campeones',
        data: [
          champions.filter(champion => champion.client_positions && champion.client_positions.includes('Top')).length,
          champions.filter(champion => champion.client_positions && champion.client_positions.includes('Middle')).length,
          champions.filter(champion => champion.client_positions && champion.client_positions.includes('Bottom')).length,
          champions.filter(champion => champion.client_positions && champion.client_positions.includes('Support')).length,
          champions.filter(champion => champion.client_positions && champion.client_positions.includes('Jungle')).length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="informes-container">
      <h2>Generar Informe de Campeones</h2>
      <div className="buttons-container">
        <button type="button" onClick={generatePDF} className="btn-generate">Imprimir Informe</button>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="difficulty">Seleccionar Dificultad</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="1">Fácil</option>
            <option value="2">Media</option>
            <option value="3">Difícil</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="heroType">Seleccionar Tipo de Héroe</label>
          <select id="heroType" value={heroType} onChange={(e) => setHeroType(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="Fighter">Guerrero</option>
            <option value="Mage">Mago</option>
            <option value="Assassin">Asesino</option>
            <option value="Tank">Tanque</option>
            <option value="Support">Soporte</option>
            <option value="Marksman">Tirador</option>
          </select>
        </div>

        <button type="button" onClick={filterChampions}>Filtrar</button>
      </form>

      {message && <p>{message}</p>}

      <div>
        <h3>Campeones Filtrados:</h3>
        <ul>
          {filteredChampions.map((champion, index) => (
            <li key={index}>
              <strong>{champion.apiname}</strong> - {champion.difficulty} - {champion.herotype}
            </li>
          ))}
        </ul>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h3>Gráfico de Barras: Cantidad de Campeones por Tipo de Héroe</h3>
          <div style={{ width: '600px', height: '600px' }}>
            <Bar data={barData} />
          </div>
        </div>

        <div className="chart">
          <h3>Gráfico Circular: Cantidad de Campeones por Posición</h3>
          <div style={{ width: '300px', height: '600px' }}>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informes;