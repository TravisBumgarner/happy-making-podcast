import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { GiHamburgerMenu } from 'react-icons/gi'

import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import { useCallback, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from '../consts'
import { BORDER_RADIUS } from '../styles/consts'

const DROPDOWN_ROUTES: Array<keyof typeof ROUTES | 'divider'> = [
  'feed',
  'recommend',
  'about',
  'aboutAuthor',
  'contact'
]

const DropdownLinks = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      {DROPDOWN_ROUTES.map((key, index) =>
        key === 'divider' ? (
          <Divider key={key + index} />
        ) : (
          <Link
            target={ROUTES[key].target}
            component={RouterLink}
            key={key}
            to={ROUTES[key].href()}
          >
            <MenuItem onClick={onClose}>{ROUTES[key].label}</MenuItem>
          </Link>
        )
      )}
    </>
  )
}

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <Tooltip title="Menu">
        <IconButton
          aria-label="menu"
          aria-controls={open ? 'navigation-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <GiHamburgerMenu />
        </IconButton>
      </Tooltip>
      <Menu
        slotProps={{ paper: { sx: { borderRadius: BORDER_RADIUS.ZERO.PX } } }}
        id="navigation-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <DropdownLinks onClose={handleClose} />
      </Menu>
    </>
  )
}

export default Navigation
