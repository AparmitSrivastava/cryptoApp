import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { TrendingCoins } from '../../config/api'
import { useState, useEffect } from 'react'
import { CryptoState } from "../../CryptoContext";
import AliceCarousel, { Link } from 'react-alice-carousel'

const useStyles = makeStyles((theme) => ({
    carousal: {
        height: "50%",
        display: "flex",
        alignItems: "center",
        paddingTop: 5
    },
    carousalItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        fontSize: 18
    },
}))


export function numberWithCommas(x){
    return x.toString().replace(/B(?=(d{3})+(?!\d))/g, ",")
}

const Carousal = () => {

    const [trending, settrending] = useState([])
    const classes = useStyles()
    const { currency , symbol } = CryptoState()

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
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


    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    }

    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0
        return (
            <Link
                className={classes.carousalItem}
                to={`/coins/${coin.id}`}
            >
                <img src={coin?.image} alt={coin.name} width={120} style={{ marginBottom: 10 }} />

                <span>{coin?.symbol}
                    &nbsp;
                    <span
                    style={{
                        color:profit>0? "rgb(14 ,203 ,129)" : "red",
                        fontWeight:500
                    }}
                    >{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                </span>

                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    return (
        <div className={classes.carousal}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
                disableButtonsControls />
            {/* responsove means how many items i want to see on the screen at one time */}

        </div>
    )
}

export default Carousal
