import React, { useEffect } from 'react';
import Chart from 'chart.js';

import { Container } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function Analysis() {
  const chartRef = React.createRef();

  useEffect(() => {
    let ctx = document.getElementsByClassName("line-chart");

    //type, data e options
    let chartGraph = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez"
        ],
        datasets: [
          {
            label: "Vendas mensais 2019",
            data: [2, 6, 4, 11, 20, 10, 7, 22, 19, 11, 10, 10, 8],
            borderWidth: 6,
            borderColor: "rgba(6, 204, 90, 0.85)",
            backgroundColor: "transparent"
          },
          {
            label: "Vendas mensais 2020",
            data: [5, 10, 20, 30, 40, 46, 20, 11, 29, 22, 10, 12, 18],
            borderWidth: 6,
            borderColor: "rgba(77, 166, 253, 0.85)",
            backgroundColor: "transparent"
          }
        ]
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

  }, [])
  return (
    <>
      <MenuAdmin />
      <Container>

        <canvas className="line-chart"></canvas>

      </Container>
    </>
  );
}
