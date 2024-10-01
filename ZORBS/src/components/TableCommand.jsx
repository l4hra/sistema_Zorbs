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

const itemsData = [
  { id: 1, name: "Coca cola 600ml", price: 10, quantity: 2 },
  { id: 2, name: "Água c/ gás 300ml", price: 5, quantity: 2 },
  { id: 3, name: "Sorvete #1", price: 15, quantity: 1 },
  { id: 4, name: "Açaí #1", price: 20, quantity: 1 },
];

export default function TableComponent() {
  const [items, setItems] = useState(itemsData);

  const handleQuantityChange = (id, delta) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta); // Não permite quantidade negativa
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItems(newItems);
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
                style={{ padding: "10px", color: "#fff", fontWeight: "bold" }}
              >
                Items
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.name} | R${item.price},00
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
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
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
                R${total.toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
