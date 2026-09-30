import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map(({ id, message, type = 'success' }) => (
        <div key={id} className={`toast toast-${type}`}>
          <span className="toast-icon">
            {type === 'success' && <CheckCircle2 size={18} />}
            {type === 'error' && <AlertCircle size={18} />}
            {type === 'info' && <Info size={18} />}
          </span>
          <span className="toast-message">{message}</span>
          <button
            className="toast-close"
            onClick={() => onDismiss(id)}
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}
