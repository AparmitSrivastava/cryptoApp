import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousal from './Carousal';



const useStyles=makeStyles(()=>({
    banner: {
        position: "relative",
        backgroundImage: "url(./banner.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "55vh",
        display: "flex",
        // alignItems: "center",
        paddingTop:10,  
        justifyContent: "center",
        // "&::before": {
        //   content: '""',
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   width: "100%",
        //   height: "100%",
        //   backgroundColor: "rgba(0, 0, 0, 0.43)", // darkness overlay
        //   zIndex: 1,
        // },
      },

    bannerContent:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        // paddingTop:15,
    },

    tagline:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
        height:"40%"
    }
}))

const Banner = () => {
 const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant='h2'
                style={{
                    fontWeight:"bold",
                    fontFamily:"Montserrat",    
                }}>
                    Crypto App
                </Typography>

                <Typography
                variant='subtitle2'
                style={{
                    color:"darkgray",
                    textTransform:"capitalize",
                    fontFamily:"Montserrat"
                }}>
                    Get all info regarding your favourite and trending Crypto currency
                </Typography>
            </div>
            <Carousal/>
        </Container>
      
    </div>
  )
}

export default Banner
