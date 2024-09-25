import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAddress } from 'viem'
import { axiosInstance } from '../../api/apiConfig'

export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        wallet_address: ''
    })

    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const password = useRef()
    const password2 = useRef()
    const walletAddress = useRef()

    const validateForm = () => {
        let isValid = true
        const newErrors = { ...errors }

        // First Name validation
        if (!first_name.current.value.trim()) {
            newErrors.first_name = 'First name is required'
            isValid = false
        } else {
            newErrors.first_name = ''
        }

        // Last Name validation
        if (!last_name.current.value.trim()) {
            newErrors.last_name = 'Last name is required'
            isValid = false
        } else {
            newErrors.last_name = ''
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.current.value.trim() || !emailRegex.test(email.current.value)) {
            newErrors.email = 'Valid email is required'
            isValid = false
        } else {
            newErrors.email = ''
        }

        // Password validation
        if (password.current.value.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long'
            isValid = false
        } else {
            newErrors.password = ''
        }

        // Password confirmation validation
        if (password.current.value !== password2.current.value) {
            newErrors.password2 = 'Passwords do not match'
            isValid = false
        } else {
            newErrors.password2 = ''
        }

        // Wallet address validation
        if (!isAddress(walletAddress.current.value)) {
            newErrors.wallet_address = 'Invalid Ethereum wallet address'
            isValid = false
        } else {
            newErrors.wallet_address = ''
        }

        setErrors(newErrors)
        return isValid
    }

    async function onSubmitForm(event) {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            email: email.current.value,
            password: password.current.value,
            password2: password2.current.value,
            wallet_address: walletAddress.current.value
        }

        setLoading(true)

        try {
            const response = await axiosInstance.post('auth/register', JSON.stringify(data))
            setLoading(false)
            navigate('/auth/login')
        } catch (error) {
            setLoading(false)
            // TODO: handle errors from the server
        }
    }

    return (
        <div className='container'>
            <h2>Register</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input type="text" placeholder='First Name' autoComplete='off' className='form-control' id='first_name' ref={first_name} />
                    {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='Last Name' autoComplete='off' className='form-control' id='last_name' ref={last_name} />
                    {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                </div>
                <div className="mb-3">
                    <input type="email" placeholder='Email' autoComplete='off' className='form-control' id="email" ref={email} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' autoComplete='off' className='form-control' id="password" ref={password} />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Confirm Password' autoComplete='off' className='form-control' id="passwordConfirmation" ref={password2} />
                    {errors.password2 && <div className="text-danger">{errors.password2}</div>}
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='Ethereum Wallet Address' autoComplete='off' className='form-control' id="walletAddress" ref={walletAddress} />
                    {errors.wallet_address && <div className="text-danger">{errors.wallet_address}</div>}
                </div>
                <div className="mb-3">
                    <button disabled={loading} className='btn btn-success' type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}