import React from 'react';
import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import pdf from './dummy.pdf';

export default function PDFViewer() {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
            <Viewer fileUrl={pdf} />
        </Worker>
    );
}