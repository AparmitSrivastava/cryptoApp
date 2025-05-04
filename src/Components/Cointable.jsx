import React from 'react'
import axios from 'axios'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { useState, useEffect } from 'react'
import { Container, createTheme, LinearProgress, TableContainer, TextField, ThemeProvider, Typography, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Pagination from "@material-ui/lab/Pagination";



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Cointable = () => {
    const [coins, setcoins] = useState([])
    const [loading, setloading] = useState(false)
    const [search, setsearch] = useState("")
    const [pageNO, setpageNO] = useState(1) //pagignation
    const history = useHistory()
    const { currency, symbol } = CryptoState()

    const fetchCoinTable = async () => {
        setloading(true)
        const { data } = await axios.get(CoinList(currency))
        setcoins(data)
        setloading(false)
    }
    console.log(coins);

    useEffect(() => {
        fetchCoinTable()
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    })

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    });
    const classes = useStyles()


    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    CryptoCurrency prices by Market Cap
                </Typography>

                <TextField label="Search for a Crypto Currency..." variant='outlined' style={{ marginBottom: 10, width: "100%" }} onChange={e => { setsearch(e.target.value) }} />

                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "left" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {handleSearch()
                                        .slice((pageNO - 1) * 10, (pageNO - 1) * 10 + 10)
                                        .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            console.log("row is" + row);

                                            return (
                                                <TableRow
                                                    onClick={() => history.push(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}>

                                                    <TableCell
                                                        component="th"
                                                        scope='row'
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}>
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            width={50}
                                                            style={{ marginBottom: 10 }} />
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column" }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey" }}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>

                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>

                <Pagination
                    count={Number((handleSearch()?.length / 10).toFixed(0))} //ques mark is to check if lenght >0
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setpageNO(value)
                        window.scroll(0, 550)
                    }}
                />
                {/* The onChange function receives two arguments:
                    1.event: The actual event object (e.g., click event).
                    2.value: The page number selected (e.g., 2, 3, 4...).
                    You're not using the first argument (event), so instead of naming it event, people often use _ to signal:
                    “Yes, this argument exists, but I’m not using it.” */}
            </Container>
        </ThemeProvider>
    )
}

export default Cointable
