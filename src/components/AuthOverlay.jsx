"use client"

import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
// Note: useNavigate would be imported from react-router-dom in actual implementation
import { Eye, EyeOff, X, User, Mail, Lock, Calendar, UserCheck } from "lucide-react"
import "../styles/AuthOverlay.css"

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmMMzrSolqcqy0W-BZ5nSUZTrcxjNxSX8",
    authDomain: "chromacure-4aac2.firebaseapp.com",
    projectId: "chromacure-4aac2",
    storageBucket: "chromacure-4aac2.firebasestorage.app",
    messagingSenderId: "659675138326",
    appId: "1:659675138326:web:70317441370a6d682ee837",
    measurementId: "G-LK4JQB238F",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const AuthOverlay = ({ isOpen, onClose, onAuthSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        parentEmail: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [generalError, setGeneralError] = useState("")

    // const navigate = useNavigate(); // Uncomment when using with react-router-dom

    

    // Clear form when switching modes
    useEffect(() => {
        setFormData({
            firstName: "",
            lastName: "",
            age: "",
            email: "",
            parentEmail: "",
            password: "",
        })
        setErrors({})
        setGeneralError("")
    }, [isSignUp])

    // Validation functions
    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]+$/
        return nameRegex.test(name) && name.trim().length >= 2
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password) => {
        return password.length >= 8
    }

    const validateAge = (age) => {
        const numAge = Number.parseInt(age)
        return !isNaN(numAge) && numAge >= 0 && numAge <= 150
    }

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear field-specific errors when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
        setGeneralError("")
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {}

        if (isSignUp) {
            if (!validateName(formData.firstName)) {
                newErrors.firstName = "First name must contain only letters and be at least 2 characters"
            }
            if (!validateName(formData.lastName)) {
                newErrors.lastName = "Last name must contain only letters and be at least 2 characters"
            }
            if (!validateAge(formData.age)) {
                newErrors.age = "Please enter a valid age"
            }
            if (Number.parseInt(formData.age) < 18 && !validateEmail(formData.parentEmail)) {
                newErrors.parentEmail = "Please enter a valid parent email address"
            }
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)
        setGeneralError("")

        try {
            if (isSignUp) {
                // Create user account
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                const user = userCredential.user

                // Save additional user data to Firestore
                const userData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    age: Number.parseInt(formData.age),
                    email: formData.email,
                    password: formData.password,
                    role: "patient", // Default role for new users
                    createdAt: new Date(),
                    uid: user.uid,
                }

                // Add parent email if user is under 18
                if (Number.parseInt(formData.age) < 18) {
                    userData.parentEmail = formData.parentEmail
                }

                await setDoc(doc(db, "users", user.uid), userData)

                console.log("Sign up successful:", userData)
                console.log("User created with UID:", user.uid)

                // Call onAuthSuccess callback if provided
                if (onAuthSuccess) {
                    onAuthSuccess({
                        user: user,
                        userData: userData,
                        isNewUser: true
                    })
                }

                onClose()
            } else {
                // Sign in user
                const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
                const user = userCredential.user

                // Fetch user data from Firestore
                let userData = null
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid))
                    if (userDoc.exists()) {
                        userData = userDoc.data()
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error)
                }

                console.log("Sign in successful:", user)
                console.log("User signed in with UID:", user.uid)

                // Call onAuthSuccess callback if provided
                if (onAuthSuccess) {
                    onAuthSuccess({
                        user: user,
                        userData: userData,
                        isNewUser: false
                    })
                }

                onClose()
            }
        } catch (error) {
            console.error("Authentication error:", error)

            // Handle specific Firebase errors
            switch (error.code) {
                case "auth/email-already-in-use":
                    setGeneralError("An account with this email already exists. Please sign in instead.")
                    break
                case "auth/weak-password":
                    setGeneralError("Password is too weak. Please choose a stronger password.")
                    break
                case "auth/user-not-found":
                    setGeneralError("No account found with this email. Please sign up first.")
                    break
                case "auth/wrong-password":
                    setGeneralError("Incorrect password. Please try again.")
                    break
                case "auth/invalid-email":
                    setGeneralError("Invalid email address. Please check and try again.")
                    break
                case "auth/too-many-requests":
                    setGeneralError("Too many failed attempts. Please try again later.")
                    break
                default:
                    setGeneralError("An error occurred. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="auth-overlay" onClick={handleOverlayClick}>
            <div className="auth-modal">
                {/* Header */}
                <div className="auth-header">
                    <button onClick={onClose} className="close-button">
                        <X size={24} />
                    </button>

                    <div className="auth-title-section">
                        <h1 className="auth-title">Vitacure</h1>
                        <p className="auth-subtitle">Your vitiligo treatment companion</p>
                    </div>

                    {/* Creative Toggle */}
                    <div className="auth-toggle-container">
                        <div
                            className={`auth-toggle-slider ${isSignUp ? "sign-up" : "sign-in"}`}
                        />
                        <div className="auth-toggle-buttons">
                            <button
                                onClick={() => setIsSignUp(true)}
                                className={`auth-toggle-button ${isSignUp ? "active" : "inactive"}`}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => setIsSignUp(false)}
                                className={`auth-toggle-button ${!isSignUp ? "active" : "inactive"}`}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="auth-form">
                    {generalError && (
                        <div className="auth-error-message">
                            {generalError}
                        </div>
                    )}

                    <div className="auth-form-fields">
                        {isSignUp && (
                            <>
                                {/* First Name */}
                                <div className="auth-form-field">
                                    <div className="auth-input-container">
                                        <User className="auth-input-icon" />
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First Name"
                                            className="auth-input"
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <p className="auth-field-error">{errors.firstName}</p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className="auth-form-field">
                                    <div className="auth-input-container">
                                        <User className="auth-input-icon" />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                            className="auth-input"
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <p className="auth-field-error">{errors.lastName}</p>
                                    )}
                                </div>

                                {/* Age */}
                                <div className="auth-form-field">
                                    <div className="auth-input-container">
                                        <Calendar className="auth-input-icon" />
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="Age"
                                            min="0"
                                            className="auth-input"
                                        />
                                    </div>
                                    {errors.age && (
                                        <p className="auth-field-error">{errors.age}</p>
                                    )}
                                </div>

                                {/* Parent Email (conditionally shown) */}
                                {Number.parseInt(formData.age) < 18 && formData.age && (
                                    <div className="auth-form-field auth-parent-email-field">
                                        <div className="auth-input-container">
                                            <UserCheck className="auth-input-icon" />
                                            <input
                                                type="email"
                                                name="parentEmail"
                                                value={formData.parentEmail}
                                                onChange={handleChange}
                                                placeholder="Parent's Email"
                                                className="auth-input"
                                            />
                                        </div>
                                        {errors.parentEmail && (
                                            <p className="auth-field-error">{errors.parentEmail}</p>
                                        )}
                                        <p className="auth-field-help">Required for users under 18</p>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Email */}
                        <div className="auth-form-field">
                            <div className="auth-input-container">
                                <Mail className="auth-input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="auth-input"
                                />
                            </div>
                            {errors.email && (
                                <p className="auth-field-error">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="auth-form-field">
                            <div className="auth-input-container">
                                <Lock className="auth-input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="auth-input password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="auth-password-toggle"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="auth-field-error">{errors.password}</p>
                            )}
                            {isSignUp && (
                                <p className="auth-field-help">Minimum 8 characters</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="auth-submit-button"
                    >
                        {isLoading ? (
                            <div className="auth-loading-container">
                                <div className="auth-loading-spinner"></div>
                                {isSignUp ? "Creating Account..." : "Signing In..."}
                            </div>
                        ) : isSignUp ? (
                            "Start Your Journey"
                        ) : (
                            "Welcome Back"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthOverlay