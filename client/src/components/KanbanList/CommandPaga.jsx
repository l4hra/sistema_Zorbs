import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
            Confirme o pagamento
          </DialogTitle>
          <DialogContent>
            <p>Tem certeza que essa comanda foi paga?</p>
          </DialogContent>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button>Confirmar</Button>
            <Button>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
