import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, teal, deepOrange, orange } from '@mui/material/colors'

const APP_BAR_HEIGHT = '70px'
const BOARD_CONTENT_HEIGHT = '600px'
const BOARD_BAR_HEIGHT = '51px'
const PROMOTION_BANNER_HEIGHT = '650px'

const theme = extendTheme({
  webCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    promotionBannerHeight: PROMOTION_BANNER_HEIGHT
  },
  colors: {
    primary: teal,
    secondary: deepOrange,
    tertiary: cyan,
    quaternary: orange,
    menuItemDark: 'white',
    menuItemLight: 'black'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          fontFamily:'sans-serif',
          '&:hover': { borderWidth: '0.5px' },
          '&.MuiButtonBase-root': {
            fontSize: '17px',
            '&:hover': { borderWidth: '0.5px' }
          }
        }
      }
    },
  }

})
export default theme