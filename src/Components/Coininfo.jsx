import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import {CryptoState} from '../CryptoContext'
import { HistoricalChart } from '../config/api'
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Coininfo = ({ coin }) => {
  const [HistoricData, setHistoricData] = useState()
  const [days, setdays] = useState(1)
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setHistoricData(data.prices); // we only want the historic values 
  }

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  })

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const classes = useStyles()

  return (
   <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
        !HistoricData ? (
          <CircularProgress
          style={{color:"gold"}}
          size={250}
          thickness={1}/>
         ) : (
          <>
          <Line
          data={{
            labels: HistoricData.map((coin)=>{
              let date = new Date(coin[0])
              let time = date.getHours() > 12 ?
              `${date.getHours() - 12} : ${date.getMinutes()} PM`
              :
              `${date.getHours()} : ${date.getMinutes()} AM`

              return days===1 ? time : date.toLocaleDateString()

            }), // this gives labeling to x nd y axis

            datasets:[
              {data:HistoricData.map((coin)=>coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "rgb(14 , 129 , 253)",
              }
            ]
          }}
          />
          </>
         )
        
        }

      {/* chart */}




      {/* buttons */}


      </div>
   </ThemeProvider>
  )
}

export default Coininfo
