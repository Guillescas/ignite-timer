type ButtonVariants = 'primery' | 'secondary' | 'danger' | 'success'

export interface IContainerProps {
  variant: ButtonVariants
}

export interface IButtonProps {
  variant?: ButtonVariants
}
