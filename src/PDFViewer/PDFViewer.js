import React from 'react';
import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { Fab } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

export default function PDFViewer() {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
            <Viewer fileUrl="./dummy.pdf" />
            <Fab aria-label="download" color="primary">
                <CloudDownload />
            </Fab>
        </Worker>
    );
}