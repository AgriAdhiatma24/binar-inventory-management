import { X } from 'lucide-react';

const Modal = ({ isOpen, onConfirm, onClose }) => {
  return (
    <div
      className={`${
        isOpen ? 'flex' : 'hidden'
      } fixed z-[999] top-0 left-0 h-screen w-screen bg-black/50 justify-center items-start pt-32`}>
      <div className='relative bg-white rounded-lg'>
        <div className='p-8 pt-12'>
          <h3 className='text-lg'>Are you sure want to delete this data?</h3>
          {/* {deleteId && <div>{deleteId}</div>} */}
        </div>
        <div className='flex items-center justify-end gap-x-2 p-4'>
          <button
            onClick={onClose}
            className='bg-[var(--color-danger)] px-4 py-2 text-white rounded-lg'>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='bg-[var(--color-success)] px-4 py-2 text-white rounded-lg'>
            Yes
          </button>
        </div>
        <button onClick={onClose} className='absolute top-4 right-4'>
          <X className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

export default Modal;
