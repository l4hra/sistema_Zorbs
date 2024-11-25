import React from "react";
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

export default function TableComponent({
  allSelectedProducts,
  handleQuantityChange,
  total,
}) {
  return (
    <TableContainer component={Paper} style={{ maxHeight: "300px" }}>
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
                Itens
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Corpo da tabela com rolagem */}
        <TableBody
        
        >
          {allSelectedProducts &&
            allSelectedProducts.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.name} | R${item.preco_venda ?? item.price}
                </TableCell>
                {!item.weight ? (
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      style={{
                        backgroundColor: "#f2f2f2",
                        border: "1px solid gray",
                        color: "black",
                      }}
                      onClick={() => handleQuantityChange(item.id, "-")}
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
                      onClick={() => handleQuantityChange(item.id, "+")}
                    >
                      +
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell align="right">
                    Peso do sorvete {item.weight}kg
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      
      <Table>
        <TableBody>
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
