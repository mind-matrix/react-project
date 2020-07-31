import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import PlaceHolderImage from './placeholder-image.png';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'block',
      textAlign: 'left'
    },
    previewContainer: {
        display: 'inline-block',
        position: 'relative',
        "&:hover div": {
            display: 'block'
        }
    },
    preview: {
        backgroundColor: '#F8F5E8',
        maxWidth: 250,
        borderRadius: 8,
        "&:hover": {
            backgroundColor: 'rgba(0,0,0,0.6)',
            backgroundBlendMode: 'screen multiply'
        }
    },
    hoverBox: {
        display: 'none',
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
    }
}));

function readURL(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = function (e) {
            resolve(e.target.result);
        };

        reader.onerror = function (e) {
            reject(e);
        };

        reader.readAsDataURL(file);
    });
}

export default function ImageUpload(props) {

    const classes = useStyles();

    const [state, setState] = React.useState({
        file: null,
        preview: PlaceHolderImage
    });
    

    let input = document.createElement('input')
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function () {
        if (input.files.length) {
            readURL(input.files[0]).then((preview) => {
                if (preview) {
                    setState({ preview, file: input.files[0] });
                }
            });
        }
    };

    const uploadHandler = () => {
        input.click();
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.previewContainer}>
                <img className={classes.preview} onClick={uploadHandler} src={state.preview} alt={props.altText || 'Image Preview'} />
                <div className={classes.hoverBox}>
                    Upload
                </div>
            </div>
        </div>
    );
}