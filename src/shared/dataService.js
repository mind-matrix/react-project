import { API_ENDPOINT, RECEIPT, ADMIN, CUSTOMER, USER, MERCHANT_ID } from './constant';

const headers = {
    'Authorization': 'Basic c2VydmljZXMtcGFyY2hpLWFwaTpwYXJjaGktc2VydmljZXMtYXBpMjAyMA==',
    'Content-Type': 'application/json'
}

export const getMerchant = (freechargeId) => {
    const response = fetch(`${API_ENDPOINT}/${ADMIN}/getmerdtls`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            freechargeId: freechargeId
        })
    })

    return response;
}

export const getMer = (merchantId) => {
    const response = fetch(`${API_ENDPOINT}/${ADMIN}/getmer`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            merchantId: merchantId
        })
    })

    return response;
}

export const getLedgerBalance = (merchantId, ledgerType = 'B') => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/getldgbal`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            merchantId: merchantId,
            ledgerType: ledgerType
        })
    })

    return response;
}

export const getCity = (name) => {
    const response = fetch(`${API_ENDPOINT}/${ADMIN}/getcty?name=${name}`, {
        method: 'GET',
        headers: headers,
    })

    return response;
}

export const checkCustomerPhone = (number) => {
    const response = fetch(`${API_ENDPOINT}/${CUSTOMER}/chkphno/${number}`, {
        method: 'GET',
        headers: headers
    })

    return response;
}

export const getCustomerDetail = (id) => {
    const response = fetch(`${API_ENDPOINT}/${CUSTOMER}/${id}`, {
        method: 'GET',
        headers: headers
    })

    return response;
}

export const getInvoiceNo = (merchantId, type) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/getno`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            merchantId: merchantId,
            invoiceType: type
        })
    })

    return response;
}

export const createUser = (phone, type) => {
    const response = fetch(`${API_ENDPOINT}/${USER}/create`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            userName: phone,
            userType: type
        })
    })

    return response;
}

export const saveCustomer = (customerCode, name, city) => {
    const response = fetch(`${API_ENDPOINT}/${CUSTOMER}/save`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            customerId: customerCode,
            firstName: name,
            city: city
        })
    })

    return response;
}

export const getAllCustomerLedger = (merchantId) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/getcustldgbal`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            merchantId: merchantId
        })
    })

    return response;
}

export const getFilteredCustomerLedger = (merchantId, phone, dateFrom, dateTo, amountFrom, amountTo, status) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/getcustldgbal`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            merchantId: merchantId,
            mobileNumber: phone,
            dateFrom: dateFrom,
            dateTo: dateTo,
            amountTo: amountTo,
            amountFrom: amountFrom,
            paymentStatus: status
        })
    })

    return response;
}

export const createInvoice = (data) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/save`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    return response;
}

export const showUrl = (id) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/scan/shwurl`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            invoiceId: id
        })
    })

    return response;
}

export const paymentHistory = (data) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/pyhstry`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    return response;
}

export const cancelInvoice = (ref, canId, message) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/can`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            invoiceRefId: ref,
            merchantCanId: canId,
            canReason: message
        })
    })

    return response;
}

export const refundInvoice = (ref, refundId, amount, type, message) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/ref`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            invoiceRefId: ref,
            merchantRefId: refundId,
            refundAmount: amount,
            refundType: type,
            refundReason: message
        })
    })

    return response;
}

export const saveMerchant = (data) => {
    const response = fetch(`${API_ENDPOINT}/${ADMIN}/savemer`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    return response;
}

export const uploadFile = (merchant, location, file) => {    
    const formData = new FormData();
    formData.append('merchantId', merchant);
    formData.append('location', location);
    formData.append('file', file, file.name);
    const response = fetch(`${API_ENDPOINT}/${USER}/uplds3bkt`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic c2VydmljZXMtcGFyY2hpLWFwaTpwYXJjaGktc2VydmljZXMtYXBpMjAyMA=='
        },
        body: formData,
        redirect: 'follow'
    })
    return response;
}

export const getInvoice = (id) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/get`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            merchantId: sessionStorage.getItem(MERCHANT_ID),
            invoiceRefId: id
        })
    })
    return response;
}