import React from 'react';
import { Grid, Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, withStyles } from '@material-ui/core';
import {
    BookmarkBorder as BookmarkBorderIcon,
    DateRange as DateRangeIcon,
    InfoOutlined as InfoOutlinedIcon,
    VerifiedUserOutlined as VerifiedUserOutlinedIcon,
    ChevronRight as ChevronRightIcon
} from '@material-ui/icons';
import shoppingCart from './shopping-online.png';
import dummyBarcode from './dummy-barcode.png';

import AppIcon from '../AppIcon';

import Rate0 from './sad-0.svg';
import Rate1 from './sad-1.svg';
import Rate2 from './sad-2.svg';
import Rate3 from './sad-3.svg';
import Rate4 from './sad-4.svg';

import RewardIcon from './Reward.svg';

const Rate = [ Rate0, Rate1, Rate2, Rate3, Rate4 ]

const useStyles = makeStyles({
    root: {},
    center: {
        textAlign: 'center'
    },
    header: {
        display: 'block',
        fontSize: '25px',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        lineHeight: '33px',
        marginTop: '23px',
        marginBottom: '17px',
        '& img': {
            display: 'inline-block',
            width: '41px',
            height: '41px',
            verticalAlign: 'middle'
        },
        '& span': {
            padding: '15px 4px',
            color: '#555C6E',
            verticalAlign: 'middle'
        }
    },
    subheader: {
        fontSize: '12px',
        color: '#908F8B',
        font: 'normal normal normal 12px/16px Nunito',
        marginBottom: '8px'
    },
    amountHeader: {
        font: 'normal normal normal 20px/24px Rubik',
        fontWeight: 'bolder',
        color: '#35332B',
        lineHeight: '24px',
        marginTop: '13.5px'
    },
    amount: {
        font: 'normal normal normal 20px/26px Nunito',
        fontSize: '20px',
        fontWeight: 'bolder',
        lineHeight: '26px',
        color: '#419168',
        marginTop: '10px',
        marginBottom: '13.5px'
    },
    rightIcon: {
        float: 'right'
    },
    tableSummary: {
        fontFamily: 'Nunito',
        paddingLeft: '85px',
        lineHeight: '19px',
        marginBottom: '10px'
    },
    iconLabel: {
        fontSize: '14px',
        lineHeight: '18px',
        marginTop: '21.5px',
        marginBottom: '16px',
        '& > *': {
            verticalAlign: 'middle'
        },
        '& > span': {
            paddingLeft: '10.38px'
        }
    },
    barcode: {
        marginTop: '14px',
        marginBottom: '14px',
        fontFamily: 'Nunito'
    },
    barcodeImage: {
        width: '100%',
        maxWidth: '115px',
        height: 'auto'
    },
    page: {
        textAlign: 'left',
        padding: '17px 13px',
        '& > *': {
            verticalAlign: 'middle'
        },
        '& > span': {
            paddingLeft: '10px'
        }
    },
    ratingHeader: {
        marginTop: '24px',
        fontSize: '16px',
        fontFamily: 'Rubik',
        color: '#35332B',
        fontWeight: 'bolder'
    },
    ratingSubheader: {
        marginTop: '14px',
        marginBottom: '14px',
        fontSize: '12px',
        fontFamily: 'Nunito',
        color: '#35332B'
    },
    rating: {
        width: '100%',
        maxWidth: '60px',
        height: 'auto'
    },
    rewardContainer: {
        backgroundColor: '#F8DA9E',
        padding: '20px 49px 0px 49px'
    },
    rewardIcon: {
        width: '100%',
        maxWidth: '92px',
        height: 'auto'
    },
    rewardTitle: {
        marginTop: '19.5px',
        marginBottom: '8px',
        fontFamily: 'Rubik',
        fontWeight: 'bolder',
        fontSize: '16px',
        lineHeight: '19px',
        color: '#35332B'
    },
    rewardDescription: {
        fontSize: '12px',
        lineHeight: '16px',
        fontFamily: 'Nunito',
        color: '#35332B',
        padding: '0px 10px 15px 10px'
    },
    joinButton: {
        background: '#35332B',
        color: '#FFFFFF',
        fontSize: '17px',
        boxShadow: '0px 2px 4px #00000029',
        padding: '15px 67px',
        marginBottom: '23px'
    },
    tableSummary: {
        paddingLeft: '85px',
        paddingRight: '19px',
        paddingTop: '18px',
        '& > *:nth-child(odd)': {
            textAlign: 'left',
            paddingBottom: '10px'
        },
        '& > *:nth-child(even)': {
            textAlign: 'right'
        }
    },
    grandTotalContainer: {
        backgroundColor: '#EFEFEC',
        paddingTop: '12px',
        paddingBottom: '12px',
        fontFamily: 'Nunito',
        fontSize: '20px'
    },
    grandTotalLabel: {
        lineHeight: '27px',
        fontWeight: 'bolder'
    },
    grandTotalAmount: {
        color: '#419168',
        lineHeight: '26px'
    },
    cashier: {
        paddingTop: '13px',
        paddingBottom: '15px',
        paddingLeft: '21px',
        paddingRight: '17px',
        fontFamily: 'Nunito'
    },
    itemNumber: {
        display: 'block',
        fontSize: '12px',
        lineHeight: '16px',
        color: '#35332B'
    },
    itemName: {
        display: 'block',
        fontSize: '14px',
        fontWeight: 'bolder'
    },
    poweredBy: {
        backgroundColor: '#F0F0F0',
        color: '#35332B',
        paddingTop: '8px',
        paddingBottom: '8px',
        lineHeight: '16px',
        fontFamily: 'Roboto',
        fontWeight: 'bolder',
        verticalAlign: 'middle'
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#EFEFEC',
      color: '#35332B',
      fontFamily: 'Nunito',
      fontWeight: 'bolder'
    },
    body: {
      fontSize: '14px',
      fontFamily: 'Nunito'
    },
}))(TableCell);

function createData(number, item, qty, tax, offer, amount) {
    return { number, item, qty, tax, offer, amount };
}

export default function ReceiptView() {
    
    const classes = useStyles();

    const [items, setItems] = React.useState([
        createData('156455845', 'Brown Bread', '1 P', '4.00', '-2.00', '40.00'),
        createData('156455845', 'Baby diapers (L)', '1 P', '10.00', '-15.00', '450.00'),
        createData('156455845', 'Steam Iron', '1 U', '120.00', '-150.00', '1120.00')
    ]);

    return (
        <div className={classes.root}>
            <Grid container className={classes.center} style={{ marginBottom: '15.5px' }}>
                <Grid item xs={12} className={classes.header}>
                    <img src={shoppingCart} alt="Cart" />
                    <span>ABC Store</span>
                </Grid>
                <Grid item xs={12} className={classes.subheader}>
                    New Thippasandra Main Rd, opp. to XYZ shop
                </Grid>
                <Grid item xs={12} className={classes.subheader} style={{ marginBottom: '0px' }}>
                    +1 1800 658 5256
                </Grid>
            </Grid>
            <Divider light />
            <Grid container className={classes.center}>
                <Grid item xs={12} className={classes.amountHeader}>
                    Retail Invoice
                </Grid>
                <Grid item xs={12} className={classes.amount}>
                    &#8377; 4500.00
                </Grid>
            </Grid>
            <Divider light />
            <Grid container>
                <Grid item xs={6} className={classes.iconLabel}>
                    <BookmarkBorderIcon />
                    <span>11565485465</span>
                </Grid>
                <Grid item xs={6} className={classes.iconLabel}>
                    <DateRangeIcon />
                    <span>Nov 20th 2019</span>
                </Grid>
            </Grid>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Item</StyledTableCell>
                        <StyledTableCell align="right">Qty</StyledTableCell>
                        <StyledTableCell>Tax</StyledTableCell>
                        <StyledTableCell>Offer</StyledTableCell>
                        <StyledTableCell>Amount</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <StyledTableCell>
                                        <span className={classes.itemNumber}>{row.number}</span>
                                        <span className={classes.itemName}>{row.item}</span>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.qty}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.tax}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.offer}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.amount}
                                    </StyledTableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <Grid container className={classes.tableSummary}>
                <Grid item xs={6}>
                    Total Amount
                </Grid>
                <Grid item xs={6}>
                    4610.00
                </Grid>
                <Grid item xs={6}>
                    Total Tax
                </Grid>
                <Grid item xs={6}>
                    190.00
                </Grid>
                <Grid item xs={6}>
                    Total Discount
                </Grid>
                <Grid item xs={6}>
                    -300.00
                </Grid>
            </Grid>
            <Grid container className={classes.grandTotalContainer}>
                <Grid item xs={6} className={classes.grandTotalLabel}>
                    Grand Total
                </Grid>
                <Grid item xs={6} className={classes.grandTotalAmount}>
                    &#8377; 4500.00
                </Grid>
            </Grid>
            <Divider light />
            <Grid container className={classes.cashier}>
                <Grid item xs={6}>
                    Cashier: Abhishek Kumar
                </Grid>
                <Grid item xs={6}>
                    CA45458
                </Grid>
            </Grid>
            <Divider light />
            <Grid container className={classes.barcode}>
                <Grid item xs={12} className={classes.center}>
                    Bar code
                </Grid>
                <Grid item xs={12} className={classes.center}>
                    <img src={dummyBarcode} alt="Dummy Barcode" className={classes.barcodeImage}></img>
                </Grid>
            </Grid>
            <Divider light />
            <Grid container>
                <Grid item xs={12} className={classes.page}>
                    <InfoOutlinedIcon />
                    <span>Terms &amp; Conditions</span>
                    <ChevronRightIcon className={classes.rightIcon} />
                </Grid>
            </Grid>
            <Divider light />
            <Grid container>
                <Grid item xs={12} className={classes.page}>
                    <VerifiedUserOutlinedIcon />
                    <span>Exchange &amp; Warranty</span>
                    <ChevronRightIcon className={classes.rightIcon} />
                </Grid>
            </Grid>
            <Divider light />
            <Grid container className={classes.center} justify="space-around" style={{ marginBottom: '37px' }}>
                <Grid item xs={12} className={classes.ratingHeader}>
                    Rate your shopping experience
                </Grid>
                <Grid item xs={12} className={classes.ratingSubheader}>
                    Click on expression to rate
                </Grid>
                {
                    Rate.map((rate, index) => {
                        return (
                            <Grid item xs={2}>
                                <img src={rate} className={classes.rating} alt={"Rating " + index}></img>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Divider light />
            <Grid container className={classes.rewardContainer}>
                <Grid item xs={12}>
                    <img src={RewardIcon} className={classes.rewardIcon} alt="Reward Icon"></img>
                </Grid>
                <Grid item xs={12} className={classes.rewardTitle}>
                    Loyalty management program
                </Grid>
                <Grid item xs={12} className={classes.rewardDescription}>
                    "Get rewarded for each purchase, join our award winning loyalty management program "
                </Grid>
                <Grid item xs={12}>
                <Button variant="contained" color="primary" className={classes.joinButton} disableElevation>
                    Join Now
                </Button>
                </Grid>
            </Grid>
            <Grid container className={classes.poweredBy}>
                <Grid item xs={12}>
                    Powered by <AppIcon width={54.03} />
                </Grid>
            </Grid>
        </div>
    );
}