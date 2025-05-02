import React from 'react'
import axios from 'axios'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { useState,useEffect } from 'react'
import { Container, createTheme, TextField, ThemeProvider, Typography } from '@material-ui/core'

const Cointable = () => {

    const [coins, setcoins] = useState([])
    const [loading, setloading] = useState(false)

    const {currency} = CryptoState()

    const fetchCoinTable = async ()=>{
        setloading(true)
        const {data} =  await axios.get(CoinList(currency))
        setcoins(data)
        setloading(false)
    }

    console.log(coins);
    

    useEffect(() => {
      fetchCoinTable()  
    }, [currency])

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    })
    

  return (
   <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:"center"}}>
        <Typography
        variant='h4'
        style={{margin:18 , fontFamily:"Montserrat"}}
        >
            CryptoCurrency prices by Market Cap
        </Typography>

        <TextField label="Search for a Crypto Currency..." variant='outlined' style={{marginBottom:20 , width:"100%"}}></TextField>
    </Container>
   </ThemeProvider>
  )
}

export default Cointable
