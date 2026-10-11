import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
export default function Modal({ open, onClose, title, description, children, busy = false }) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !busy) onClose();
      }}
    >
      <DialogContent className="app-modal" showCloseButton={!busy}>
        <DialogTitle className="modal-title">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
