'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';
import Image from 'next/image';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  edit?: boolean;
  isLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  edit,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    document.body.style.overflowY = 'auto';
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    if (onSubmit) {
      onSubmit();
    }
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          fixed
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          inset-0 
          w-full
          h-full
          z-50
          modal
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        {isLoading && (
          <div className="w-[100%] z-[60] bg-neutral-800/40 absolute h-[100%] top-0 left-0 flex items-center justify-center">
            <Image
              src="/images/loading.gif"
              className="w-[100px] z-[60] h-[100px]"
              alt="loading"
              width="100"
              height="100"
            />
          </div>
        )}

        <div className="w-full h-full">
          <div
            className={`
          relative
          w-[90%]
          ${edit && 'md:w-5/6 lg:w-5/6 xl:w-4/5'}
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-[30px]
          mx-auto 
          h-auto 
          `}
          >
            {/*content*/}
            <div
              className={`
            translate
            duration-150
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
            >
              <div
                className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
              >
                {/*header*/}
                <div
                  className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
                >
                  <button
                    className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                    onClick={handleClose}
                  >
                    <IoMdClose size={18} />
                  </button>
                  <div className="text-lg font-semibold">{title}</div>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{body}</div>
                {/*footer*/}
                <div className="flex flex-col gap-2 p-6">
                  <div
                    className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                  >
                    {actionLabel && (
                      <Button
                        disabled={disabled}
                        label={actionLabel}
                        onClick={handleSubmit}
                      />
                    )}
                  </div>
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
