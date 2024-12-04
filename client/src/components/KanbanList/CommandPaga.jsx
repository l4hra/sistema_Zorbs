import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function ModalPagamento({ open, handleClose }) {
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          style={{
            width: "auto",

            borderRadius: "5px",
            boxShadow: 20,
            p: 4,
          }}
        >
          <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
          Defina a forma de pagmento
          </DialogTitle>
          <DialogContent>
            <p>É importante que as comandas sejam salvas com a forma de pagamento correta.</p>
          </DialogContent>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button>-</Button>
            <Button>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
