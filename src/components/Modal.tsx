import React, { useState, useEffect, ReactNode, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export interface ModalOptions extends PropsWithChildren {
  visible: boolean
  header: ReactNode
  onOk?(): void
  onCancle?(): void
  footer?: ReactNode
  className?: string
  bodyClass?: string
  width?: number
}

const Modal: React.FC<ModalOptions> = ({
  visible,
  header,
  footer,
  children,
  onOk,
  onCancle,
  ...props
}: ModalOptions) => {
  const handleOk = () => {
    onOk?.()
  }
  const handleCancle = () => {
    onCancle?.()
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancle()
      }
    }
    if (visible) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
    // document.body.style.overflow = visible ? 'hidden' : ''
  }, [visible, onCancle])

  const defualtFooter = (
    <React.Fragment>
      <button onClick={handleOk}>Ok</button>
      <button onClick={handleCancle}>Cancle</button>
    </React.Fragment>
  )

  const modal = (
    <div className={`modal is-active ${props?.className ?? ''}`}>
      <div className="modal-background" onClick={handleCancle}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{header}</p>
          <button className="delete" aria-label="close" onClick={handleCancle}></button>
        </header>
        <section className={`modal-card-body ${props?.bodyClass ?? ''}`}>{children}</section>
        {footer !== null && <footer className="modal-card-foot">{footer ? footer : defualtFooter}</footer>}
      </div>
    </div>
  )

  return visible && createPortal(modal, document.body)
}

export default Modal
