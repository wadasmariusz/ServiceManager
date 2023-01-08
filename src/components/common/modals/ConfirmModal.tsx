import { Modal } from './Modal'
import { useModalStyles } from './styles'
import { CustomModalProps } from './CustomModal'

import { Title } from 'components/common/mantine/Title'
import { Button } from 'components/common/mantine/Button'

export type ConfirmModalProps = Omit<CustomModalProps, 'type'>

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  opened,
  onClose,
  icon: Icon,
  title,
  message,
  onConfirm,
  onCancel,
  confirmBtnText = 'Okej',
  cancelBtnText = 'Anuluj',
  ...props
}) => {
  const { classes } = useModalStyles()

  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false} {...props}>
      <div className={classes.body}>
        <div className={classes.bodyContent}>
          {Icon && (
            <div className={classes.iconWrapper}>
              <Icon size={40} className={classes.icon} />
            </div>
          )}

          <div>
            <Title order={3}>{title}</Title>
            <p className="mt-2 text-base">{message}</p>
          </div>
        </div>

        <div className={classes.bodyButtons}>
          <Button
            text={cancelBtnText}
            onClick={
              onCancel
                ? () => {
                    onCancel()
                    onClose()
                  }
                : onClose
            }
            variant="outline"
          />

          <Button
            text={confirmBtnText}
            onClick={
              onConfirm
                ? () => {
                    onConfirm()
                    onClose()
                  }
                : onClose
            }
            variant="filled"
          />
        </div>
      </div>
    </Modal>
  )
}

//import { CustomModal, CustomModalProps } from "./CustomModal";
// type ConfirmModalProps = Omit<CustomModalProps, "type">
// export const ConfirmModal = ({...props}: ConfirmModalProps) => {
//   return (
//     <CustomModal
//       type='confirm'
//       {...props}
//     />
//   )
// }
