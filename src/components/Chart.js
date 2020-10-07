import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function Chart({ d }) {
  // const [globalData, setGlobalData] = useState();
  // const [dataLoading, setDataLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchGlobalData() {
  //     // setDataLoading(true);
  //     const apiResponse = await fetch(
  //       "https://api.thevirustracker.com/free-api?global=stats"
  //     );
  //     const apiData = await apiResponse.json();
  //     setGlobalData(apiData);
  //     // setDataLoading(false);
  //   }
  //   fetchGlobalData();
  // }, []);

  const data = {
    labels: ["Total", "Recovered", "Deaths"],
    datasets: [
      {
        data: [
          d && d.confirmed && d.confirmed.value,
          d && d.recovered && d.recovered.value,
          d && d.deaths && d.deaths.value,
        ],
        backgroundColor: ["black", "green", "#d90429"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFC56"],
      },
    ],
  };

  return (
    <div>
      <Doughnut
        data={data}
        width={100}
        height={145}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}
