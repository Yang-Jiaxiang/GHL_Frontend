import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '.5rem',
        // boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,
    },
    accordion: {
        backgroundColor: theme.palette.secondary.main,
        width: '90%',
    },
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formHeader: {
        fontSize: '3rem',
    },
}))

export default useStyles
