import CancelIcon from '@mui/icons-material/Cancel';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const IconType = {
  favorite: "favorite",
  favoriteOutline: "favorite-outline",
  edit: "edit",
  delete: "delete",
  cancel: "cancel",
  shoppingBag: "shopping-outline",
}

function renderIcon(icon, classes) {
  switch (icon) {
    case IconType.favorite:
      return <FavoriteIcon className={classes.extendedIcon} />
    case IconType.favoriteOutline:
      return <FavoriteBorderIcon className={classes.extendedIcon} />
    case IconType.edit:
      return <EditIcon className={classes.extendedIcon} />
    case IconType.delete:
      return <DeleteOutlineIcon className={classes.extendedIcon} />
    case IconType.cancel:
      return <CancelIcon className={classes.extendedIcon} />
    case IconType.shoppingBag:
      return <ShoppingBagIcon className={classes.extendedIcon} />
    default:
      break;
  }
}

export default function ReserveButtonExtended({
  buttonText, color, onClick, icon = IconType.favorite, variant = "extended", disabled, data_bs_toggle, data_bs_target, className
}) {

  const { classes } = useStyles();
  return (
    disabled ? (
      <Fab variant={variant} style={{ background: '#999999', color: '#fff', height: '36px' }} disabled>
        {renderIcon(icon, classes)}
        {buttonText}
      </Fab>
    ) : (
      <Fab variant={variant} className={className} style={{ background: color, color: '#fff', height: '36px' }} data-bs-toggle={data_bs_toggle} data-bs-target={data_bs_target} onClick={onClick}>
        {renderIcon(icon, classes)}
        {buttonText}
      </Fab>
    )
  );

}
