import React, { useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.orderName}
          </TableCell>
          <TableCell align="right">{row.orderStatus}</TableCell>
          <TableCell align="right">{row.orderDate}</TableCell>
          <TableCell align="right">{row.total}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell className="order-table-heading">Product Name</TableCell>
                      <TableCell className="order-table-heading">Quantity</TableCell>
                      <TableCell className="order-table-heading" align="right">Amount</TableCell>
                      <TableCell className="order-table-heading" align="right">Total price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.products.map((product) => (
                      <TableRow key={product.product.id}>
                        <TableCell component="th" scope="row">
                          {product.product.productName}
                        </TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell align="right">{product.product.price}</TableCell>
                        <TableCell align="right">
                          {product.totalPrice}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }