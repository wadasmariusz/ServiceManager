import { createStyles } from '@mantine/core'

import { Modal, ModalProps } from './Modal'

import { Title } from 'components/common/mantine/Title'
import { Button } from 'components/common/mantine/Button'

import { IconType } from 'react-icons/lib'

type ModalType = 'confirm' | 'delete' | 'info'

const useStyles = createStyles((theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1.5rem',
    maxWidth: '36rem',
  },

  bodyContent: {
    display: 'flex',
    columnGap: '1.5rem', //1rem = 16px
    alignItems: 'center',
  },

  bodyButtons: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '1rem',
    marginTop: '1.25rem',
  },

  iconWrapper: {
    width: '75px',
    height: '75px',
    display: 'felx',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
  },

  icon: {
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
      .color,
  },
}))

export type BasicModalProps = {
  opened: boolean
  onClose(): void
  onConfirm?: () => void
  onCancel?: () => void
}

export type CustomModalProps = {
  icon?: IconType
  title: React.ReactNode | string
  message: React.ReactNode | string
  type: ModalType
  onConfirm: () => void
  onCancel?: () => void
  confirmBtnText?: string
  cancelBtnText?: string
  isLoading?: boolean
} & ModalProps

export const CustomModal = ({
  opened,
  onClose,
  type,
  icon: Icon,
  title,
  message,
  onConfirm,
  onCancel,
  confirmBtnText = 'Okej',
  cancelBtnText = 'Anuluj',
  ...props
}: CustomModalProps) => {
  const { classes } = useStyles()

  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false} {...props}>
      {/* modal body */}
      <div className={classes.body}>
        <div className={classes.bodyContent}>
          {Icon && (
            <div className={classes.iconWrapper}>
              <Icon size={40} className={classes.icon} />
            </div>
          )}

          <div>
            <Title order={3}>{title}</Title>
            <p className="mt-1 text-base">{message}</p>
          </div>
        </div>

        {/* modal buttons */}
        <div className={classes.bodyButtons}>
          {type === 'delete' && (
            <>
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
                variant="default"
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
                color={'red'}
              />
            </>
          )}

          {type === 'confirm' && (
            <>
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
                variant="outline"
              />
            </>
          )}

          {type === 'info' && (
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
          )}
        </div>
      </div>
    </Modal>
  )
}
