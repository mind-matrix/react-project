import React from 'react';
import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { withRouter } from 'react-router-dom';

function PDFViewer(props) {
    console.log(props.location.state);
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
            <Viewer fileUrl={props.location.state.url} />
        </Worker>
    );
}

export default withRouter(PDFViewer);