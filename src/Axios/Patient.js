import axios from 'axios'

const patientRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiGetPatients = () => patientRequest.get('/patient')
export const apiCreatePatient = patient => patientRequest.post('/patient', patient)
export const apiUpdatePatient = (id, body) => patientRequest.patch(`/patient/${id}`, body)
export const apiDeletePatient = id => patientRequest.delete(`/patient/${id}`)
