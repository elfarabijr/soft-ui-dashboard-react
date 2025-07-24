import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Tooltip,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShareButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);

    const url = window.location.href;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setSnackOpen(true);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        handleClose();
    };

    const handleShareWhatsApp = () => {
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
        window.open(waUrl, '_blank');
        handleClose();
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackOpen(false);
    };

    return (
        <>
            <Tooltip title="Bagikan">
                <IconButton
                    aria-label="share"
                    onClick={handleClick}
                    color="primary"
                    aria-controls={anchorEl ? 'share-menu' : undefined}
                    aria-haspopup="true"
                >
                    <ShareIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="share-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: { minWidth: 180 },
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleCopyLink}>
                    <ListItemIcon>
                        <ContentCopyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy Link</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleShareWhatsApp}>
                    <ListItemIcon>
                        <WhatsAppIcon fontSize="small" sx={{ color: '#25D366' }} />
                    </ListItemIcon>
                    <ListItemText>Share via WhatsApp</ListItemText>
                </MenuItem>
            </Menu>

            <Snackbar
                open={snackOpen}
                autoHideDuration={2000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                    Link copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShareButton;