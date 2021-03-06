import React, { useState } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';

import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
    appBar: {
        bottom: 0,
        top: 'auto',
        backgroundColor: '#000'
    },
    inputContainer: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
        marginLeft: theme.spacing(1),
        position: 'relative',
        width: '100%',
    },
    icon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: '#fff'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        width: '100%',
        color: '#fff'
    },
}));

export default function BottomBar(props) {
    const classes = useStyles();
    const [content, setContent] = useState('');

    const submitHandler = (event) => {
        // Prevent the form to reload the current page.
        event.preventDefault();
        setContent('');
        props.handleSubmit(content)
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <div className={classes.inputContainer} style={{ maxWidth: '200px' }}>
                    <div className={classes.icon}>
                        <FaceIcon />
                    </div>
                    <InputBase
                        disabled={true}
                        value={props.name}
                        placeholder="Name"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'name' }}
                    />
                </div>
                <div className={classes.inputContainer}>
                    <form onSubmit={submitHandler}>
                        <div className={classes.icon}>
                            <ChatIcon />
                        </div>
                        <InputBase
                            onChange={(event) => {
                                setContent(
                                    event.target.value,
                                );
                            }}
                            value={content}
                            placeholder="Type your message..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'content' }}
                        />
                    </form>
                </div>
            </Toolbar>
        </AppBar>
    );
}