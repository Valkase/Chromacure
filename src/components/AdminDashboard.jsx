import { useState, useEffect, useRef } from "react"
import { getAuth, signOut } from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    getDocs,
} from "firebase/firestore"
import {
    Users,
    MessageCircle,
    Send,
    LogOut,
    ArrowLeft,
    Search,
    Calendar,
    Star,
    Heart,
    User,
    Mail,
    Clock,
} from "lucide-react"

import ThemeToggle from "./ThemeToggle.jsx"
import "../styles/AdminDashboard.css"

const auth = getAuth()
const db = getFirestore()

// Admin Chat Component
const AdminChat = ({ selectedPatient, onBack, adminUser }) => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (!selectedPatient?.uid) return

        const chatQuery = query(
            collection(db, "chats"),
            where("patientId", "==", selectedPatient.uid),
            orderBy("timestamp", "asc")
        )

        const unsubscribe = onSnapshot(
            chatQuery,
            (snapshot) => {
                const messageData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate(),
                }))
                setMessages(messageData)
                setIsLoading(false)
            },
            (error) => {
                console.error("Error listening to chat messages:", error)
                setIsLoading(false)
            }
        )

        return unsubscribe
    }, [selectedPatient?.uid])

    const sendMessage = async () => {
        if (!newMessage.trim()) return

        try {
            await addDoc(collection(db, "chats"), {
                patientId: selectedPatient.uid,
                message: newMessage.trim(),
                senderType: "doctor",
                adminId: adminUser.uid,
                timestamp: serverTimestamp(),
            })
            setNewMessage("")
        } catch (error) {
            console.error("Error sending message:", error)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    if (isLoading) {
        return (
            <div className="chat-container">
                <div className="chat-header">
                    <button onClick={onBack} className="chat-back-btn">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="chat-header-info">
                        <h3 className="chat-header-title">Loading chat...</h3>
                    </div>
                </div>
                <div className="chat-messages-area">
                    <div className="chat-empty-state">Loading messages...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button onClick={onBack} className="chat-back-btn">
                    <ArrowLeft size={20} />
                </button>
                <div className="chat-header-info">
                    <h3 className="chat-header-title">
                        Chat with {selectedPatient.firstName} {selectedPatient.lastName}
                    </h3>
                    <p className="chat-header-email">
                        {selectedPatient.email}
                    </p>
                </div>
            </div>

            <div className="chat-messages-area">
                {messages.length === 0 ? (
                    <div className="chat-empty-state">
                        <MessageCircle size={48} className="chat-empty-icon" />
                        <p className="chat-empty-text">No messages yet. Start a conversation with {selectedPatient.firstName}!</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat-message ${message.senderType}`}
                        >
                            <div className="chat-message-bubble">
                                <p className="chat-message-text">
                                    {message.message}
                                </p>
                                <span className="chat-message-time">
                                    {message.timestamp?.toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="chat-input"
                    maxLength={500}
                />
                <button
                    type="button"
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="chat-send-btn"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    )
}

// Patient Card Component
const PatientCard = ({ patient, onChatClick, onViewDetails }) => {
    return (
        <div className="patient-card">
            <div className="patient-card-header">
                <div className="patient-avatar">
                    <User size={24} />
                </div>
                <div className="patient-info">
                    <h4 className="patient-name">
                        {patient.firstName} {patient.lastName}
                    </h4>
                    <p className="patient-email">
                        <Mail size={14} />
                        {patient.email}
                    </p>
                    <p className="patient-age">
                        Age: {patient.age}
                    </p>
                </div>
            </div>

            <div className="patient-card-divider">
                <p className="patient-joined">
                    <Clock size={14} />
                    Joined: {patient.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                </p>
            </div>

            <div className="patient-card-actions">
                <button onClick={() => onChatClick(patient)} className="patient-chat-btn">
                    <MessageCircle size={16} />
                    Chat
                </button>
                <button onClick={() => onViewDetails(patient)} className="patient-view-btn">
                    <Calendar size={16} />
                    View Entries
                </button>
            </div>
        </div>
    )
}

// Patient Details Modal
const PatientDetailsModal = ({ patient, onClose }) => {
    const [dailyEntries, setDailyEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!patient?.uid) return

        const fetchEntries = async () => {
            try {
                const entriesQuery = query(
                    collection(db, "users", patient.uid, "dailyEntries"),
                    orderBy("date", "desc")
                )
                const snapshot = await getDocs(entriesQuery)
                const entries = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date?.toDate?.()
                }))
                setDailyEntries(entries)
            } catch (error) {
                console.error("Error fetching daily entries:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchEntries()
    }, [patient?.uid])

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">
                        {patient.firstName} {patient.lastName} - Daily Entries
                    </h3>
                    <button onClick={onClose} className="modal-close-btn">×</button>
                </div>

                <div className="modal-body">
                    {isLoading ? (
                        <div className="modal-loading">Loading entries...</div>
                    ) : dailyEntries.length === 0 ? (
                        <div className="modal-empty-state">
                            <Calendar size={48} className="modal-empty-icon" />
                            <p>No daily entries yet</p>
                        </div>
                    ) : (
                        <div className="entries-list">
                            {dailyEntries.map((entry) => (
                                <div key={entry.id} className="entry-card">
                                    <div className="entry-date">
                                        {entry.date?.toLocaleDateString() || 'Invalid Date'}
                                    </div>
                                    <div className="entry-rating">
                                        <div className="stars-container">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={`star-icon ${i < entry.rating ? '' : 'empty'}`}
                                                    fill={i < entry.rating ? 'currentColor' : 'none'}
                                                />
                                            ))}
                                        </div>
                                        <span className="rating-text">({entry.rating}/5)</span>
                                    </div>
                                    {entry.summary && (
                                        <div className="entry-summary">
                                            <p className="entry-summary-text">"{entry.summary}"</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Main Admin Dashboard Component
const AdminDashboard = ({ user }) => {
    const [patients, setPatients] = useState([])
    const [filteredPatients, setFilteredPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [showPatientDetails, setShowPatientDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [activeView, setActiveView] = useState("patients") // "patients" or "chat"

    useEffect(() => {
        fetchPatients()
    }, [])

    useEffect(() => {
        // Filter patients based on search term
        const filtered = patients.filter(patient =>
            patient.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPatients(filtered)
    }, [patients, searchTerm])

    const fetchPatients = async () => {
        try {
            const usersQuery = query(
                collection(db, "users"),
                where("role", "==", "patient")
            )
            const snapshot = await getDocs(usersQuery)
            const patientsData = snapshot.docs.map(doc => ({
                id: doc.id,
                uid: doc.id,
                ...doc.data()
            }))
            setPatients(patientsData)
        } catch (error) {
            console.error("Error fetching patients:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    const handleChatClick = (patient) => {
        setSelectedPatient(patient)
        setActiveView("chat")
    }

    const handleBackToPatients = () => {
        setSelectedPatient(null)
        setActiveView("patients")
    }

    const handleViewDetails = (patient) => {
        setShowPatientDetails(patient)
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading admin dashboard...</p>
            </div>
        )
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="admin-header-content">
                    <div className="admin-header-left">
                        <Heart size={24} className="admin-header-icon" />
                        <div>
                            <h1 className="admin-header-title">VitaCure Admin Dashboard</h1>
                            <p className="admin-header-subtitle">Welcome, {user?.displayName || user?.email}</p>
                        </div>
                    </div>
                    {/*<ThemeToggle />*/}
                    <button onClick={handleSignOut} className="admin-sign-out-btn">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </header>

            <div className="admin-main-content">
                {activeView === "patients" ? (
                    <div>
                        <div className="patients-view-header">
                            <div className="patients-view-title-section">
                                <Users size={24} className="patients-view-icon" />
                                <h2 className="patients-view-title">
                                    Patients ({filteredPatients.length})
                                </h2>
                            </div>
                            <div className="search-container">
                                <Search size={20} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                        </div>

                        <div className="patients-grid">
                            {filteredPatients.length === 0 ? (
                                <div className="empty-state">
                                    <Users size={48} className="empty-state-icon" />
                                    <p className="empty-state-text">
                                        {searchTerm ? "No patients found matching your search" : "No patients registered yet"}
                                    </p>
                                </div>
                            ) : (
                                filteredPatients.map((patient) => (
                                    <PatientCard
                                        key={patient.uid}
                                        patient={patient}
                                        onChatClick={handleChatClick}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <AdminChat
                        selectedPatient={selectedPatient}
                        onBack={handleBackToPatients}
                        adminUser={user}
                    />
                )}
            </div>

            {showPatientDetails && (
                <PatientDetailsModal
                    patient={showPatientDetails}
                    onClose={() => setShowPatientDetails(null)}
                />
            )}
        </div>
    )
}   

export default AdminDashboard