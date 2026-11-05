import { useMediaQuery } from '../../hooks/useMediaQuery'
import Dialog from './Dialog'
import BottomSheet from './BottomSheet'

export default function ResponsiveOverlay({
  open,
  onClose,
  title,
  children,
  className = '',
  maxWidth = 'max-w-md',
}) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        title={title}
        maxWidth={maxWidth}
        className={className}
      >
        {children}
      </Dialog>
    )
  }

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={title}
      className={className}
    >
      {children}
    </BottomSheet>
  )
}
