import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Container, Filtro } from './styles';
import api from '../../../services/api-node';
import MenuAdmin from '../../../components/MenuAdmin';

export default function Analysis() {
  const chartRef = React.createRef();
  const [startDate, setStartDate] = useState(new Date(2020, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2021, 0, 1));

  const [statusGraph, setStatusGraph] = useState(false);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [meses, setMeses] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.post('/analise', {
        startDate: '2020-01-01 00:00:05.003+00',
        endDate: '2021-01-01 00:00:05.003+00'
      });

      setListaFiltrada(res.data.arrayProdutos);
      setMeses(res.data.labels);
      setStatusGraph(!statusGraph);
    }

    load();
  }, [])

  async function filtrar() {
    const res = await api.post('/analise', {
      startDate,
      endDate
    });

    setListaFiltrada(res.data.arrayProdutos);
    setMeses(res.data.labels);
    setStatusGraph(!statusGraph);
  }

  useEffect(() => {
    let ctx = document.getElementsByClassName("line-chart");

    const labels = [];
    listaFiltrada.map(item => {
      labels.push(item.nome)
    })

    const colors = [
      "rgba(6, 204, 90, 0.85)",
      "rgba(77, 166, 253, 0.85)",
      "rgba(255, 204, 0, 0.85)",
      "rgba(204, 0, 255, 0.85)",
      "rgba(255, 102, 0, 0.85)",
      "rgba(0, 255, 255, 0.85)",
      "rgba(102, 102, 51, 0.85)"

    ]

    const datasets = []
    listaFiltrada.map((item, i) => {
      if (item.quantidade.length > 0) {
        const data = {
          label: item.nome,
          borderWidth: 6,
          data: item.quantidade,
          borderColor: colors[i],
          // backgroundColor: colors[i]
        }
        datasets.push(data);
      }
    });

    if(datasets.length> 0){
      datasets.map((item, index) => {
        for (let i = 0; i < item.data.length; i++) {
          if(item.data[i] == null){
            datasets[index].data[i] = 0;
          }
        }
      });
    }


    console.log(datasets)
    //type, data e options
    let chartGraph = new Chart(ctx, {
      type: "line",
      data: {
        labels: meses,
        datasets,
      },
      options: {
        title: {
          display: true,
          fontSize: 24,
          text: "RELATÓRIO DE VENDAS"
        },
        labels: {
          fontStyle: "bold",
        }
      }
    });

  }, [statusGraph]);

  return (
    <>
      <MenuAdmin />
      <Container>
        <Filtro>
          <DatePicker id="input-inicio" selected={startDate} onChange={date => setStartDate(date)} dateFormat="MM/yyyy" showMonthYearPicker />
          <label><strong>Entre</strong></label>
          <DatePicker id="input-fim" selected={endDate} onChange={date => setEndDate(date)} dateFormat="MM/yyyy" showMonthYearPicker />
          <button type="button" onClick={() => filtrar()}>Filtrar</button>
        </Filtro>

        <canvas className="line-chart"></canvas>

      </Container>
    </>
  );
}
