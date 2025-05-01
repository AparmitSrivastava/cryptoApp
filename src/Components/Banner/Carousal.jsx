import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { TrendingCoins } from '../../config/api'
import { useState,useEffect } from 'react'
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
    carousal: {
        height: "50%",
        display: "flex",
        alignItems: "center"
    }
}))

const Carousal = () => {

    const [trending, settrending] = useState([])
    const classes = useStyles()
    const {currency} = CryptoState()

    const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency))
        settrending(data)
        // const data = await axios.get(TrendingCoins)
        // This approach assigns the entire response object from Axios to the data variable.
        // In this case, data will hold the entire response object.

        // const response = await axios.get(TrendingCoins);
        // const data = response.data;  // Here, you access the 'data' property of the full response.


        // const { data } = await axios.get(TrendingCoins)
        // This approach uses destructuring to directly extract the data property from the Axios response.

        // With this syntax, you are directly accessing the data property of the response object and assigning it to a variable called data.
    }
    console.log(trending);
    

    // now we r going to call the above first when the page is opened for the first time so that the data loads andn in the dependency we set that - every time the currecny chanegs then we again run the fetch function
    useEffect(() => {
        fetchTrendingCoins()
    }, [currency])
    

    return (
        <div className={classes.carousal}>

        </div>
    )
}

export default Carousal
