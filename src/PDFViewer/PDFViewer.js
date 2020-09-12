import React, { useEffect, useState } from 'react';
import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { withRouter } from 'react-router-dom';
import { showUrl } from '../shared/dataService';

const queryString = require('query-string');

function PDFViewer(props) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (props.location.pathname == '/inv') {
            let params = queryString.parse(props.location.search);
            let { invoice } = params;
            console.log(invoice);
            showUrl(invoice)
                .then(res => res.json())
                .then(data => setUrl(data.invoice_location));
        } else {
            setUrl(props.location.state.url);
        }
    }, [])

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
            {url ? <Viewer fileUrl={url} /> : null}
        </Worker>
    );
}

export default withRouter(PDFViewer);