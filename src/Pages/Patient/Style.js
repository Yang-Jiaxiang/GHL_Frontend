import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1rem',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,
        transition: 'all .3s ease-in',
        // height: '100%',
    },
    accordion: {
        backgroundColor: theme.palette.secondary.main,
        width: '100%',
    },
    status: {
        backgroundColor: theme.palette.status.yet,
        padding: '7px',
        borderRadius: '10rem',
        '&.processing': {
            backgroundColor: theme.palette.status.processing,
        },
    },
    statusBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

export default useStyles
