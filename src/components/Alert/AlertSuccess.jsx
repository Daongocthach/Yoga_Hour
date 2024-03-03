import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'

function AlertSuccess({ content, open }) {
    const [showAlert, setShowAlert] = useState(open || false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={showAlert} onClose={() => setShowAlert(false)}>
            <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
                {content}
            </Alert>
        </Snackbar>
    )
}

export default AlertSuccess