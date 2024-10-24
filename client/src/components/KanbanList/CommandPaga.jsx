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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Como a comanda foi paga?</DialogTitle>
          <DialogContent>
            <p>Escolha a forma de pagamento:</p>
            {/* Aqui você pode adicionar inputs ou opções como RadioButtons para escolher o método */}
          </DialogContent>
          <DialogActions>
            <Button>Cancelar</Button>
            <Button>Confirmar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
