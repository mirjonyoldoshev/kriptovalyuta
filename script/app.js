

async function fetchTopCryptos() {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    const topCryptos = response.data.data.slice(0, 10);

    
    topCryptos.forEach((crypto, index) => {
      const cryptoElement = document.createElement("div");
      cryptoElement.textContent = `${index + 1}. ${crypto.name} (${
        crypto.symbol
      })`;
      document.getElementById("charts-container").appendChild(cryptoElement);
      fetchCryptoHistory(crypto.id);
    });
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

async function fetchCryptoHistory(cryptoId) {
  try {
    const response = await axios.get(
      `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=d1`
    );
    const cryptoData = response.data.data;

    const labels = cryptoData.map((item) => item.date);
    const prices = cryptoData.map((item) => item.priceUsd);

    
    createChart(labels, prices, cryptoId);
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

function createChart(labels, prices, cryptoId) {
  
  const ctx = document.createElement("canvas").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: cryptoId,
          data: prices,
          backgroundColor: "rgba(7, 12, 12, 2)",
          borderColor: "rgba(710, 12, 0, 100)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const chartContainer = document.createElement("div");
  chartContainer.appendChild(ctx.canvas);
  document.getElementById("charts-container").appendChild(chartContainer);
}

fetchTopCryptos();
