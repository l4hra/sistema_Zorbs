import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

// const itemsData = [
//   { id: 1, name: "Coca cola 600ml", price: 10, quantity: 2 },
//   { id: 2, name: "Água c/ gás 300ml", price: 5, quantity: 2 },
//   { id: 3, name: "Sorvete #1", price: 15, quantity: 1 },
//   { id: 4, name: "Açaí #1", price: 20, quantity: 1 },
// ];

export default function TableComponent({
  allSelectedProducts,
  handleQuantityChange,
  total,
}) {
  // const [items, setItems] = useState(itemsData);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={3}
              style={{ backgroundColor: "pink", borderRadius: "5px" }}
            >
              <Typography
                variant="h6"
                component="div"
                style={{ color: "#fff", fontWeight: "bold" }}
              >
                Items
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allSelectedProducts &&
            allSelectedProducts.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.name} | R${item.preco_venda}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      backgroundColor: "#f2f2f2",
                      border: "1px solid gray",
                      color: "black",
                    }}
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </Button>
                  <span style={{ margin: "0 10px" }}>{1}</span>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      backgroundColor: "#f2f2f2",
                      border: "1px solid gray",
                      color: "black",
                    }}
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={1} align="right">
              <Typography variant="h6" component="div" align="left">
                Total:
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="div">
                R${total}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
