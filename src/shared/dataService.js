import { API_ENDPOINT, RECEIPT, ADMIN, CUSTOMER, USER } from './constant';

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
            merchantId: merchantId,
            dateFrom: new Date(Date.now() - 2592e6).toISOString().substring(0, 10),
            dateTo: new Date().toISOString().substring(0, 10)
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

export const paymentHistory = (id, phone, status) => {
    const response = fetch(`${API_ENDPOINT}/${RECEIPT}/invoice/pyhstry`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            merchantId: id,
            customerPhone: phone,
            paymentStatus: status
        })
    })

    return response;
}