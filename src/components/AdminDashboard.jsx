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
            <div style={{
                background: 'white',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0',
                height: '600px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <button onClick={onBack} style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        color: '#64748b'
                    }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h3 style={{ margin: '0 0 0.25rem 0', color: '#1e293b' }}>Loading chat...</h3>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    color: '#64748b'
                }}>Loading messages...</div>
            </div>
        )
    }

    return (
        <div style={{
            background: 'white',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            height: '600px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #e2e8f0'
            }}>
                <button onClick={onBack} style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.25rem',
                    color: '#64748b'
                }}>
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', color: '#1e293b' }}>
                        Chat with {selectedPatient.firstName} {selectedPatient.lastName}
                    </h3>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
                        {selectedPatient.email}
                    </p>
                </div>
            </div>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                {messages.length === 0 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px',
                        color: '#64748b',
                        textAlign: 'center'
                    }}>
                        <MessageCircle size={48} style={{ marginBottom: '1rem', color: '#cbd5e1' }} />
                        <p>No messages yet. Start a conversation with {selectedPatient.firstName}!</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            style={{
                                display: 'flex',
                                maxWidth: '70%',
                                alignSelf: message.senderType === "patient" ? 'flex-start' : 'flex-end'
                            }}
                        >
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '1rem',
                                position: 'relative',
                                background: message.senderType === "patient" ? '#f1f5f9' : '#3b82f6',
                                color: message.senderType === "patient" ? '#1e293b' : 'white'
                            }}>
                                <p style={{ margin: '0 0 0.25rem 0', wordWrap: 'break-word' }}>
                                    {message.message}
                                </p>
                                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                                    {message.timestamp?.toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div style={{
                display: 'flex',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                borderTop: '1px solid #e2e8f0'
            }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                    }}
                    maxLength={500}
                />
                <button
                    type="button"
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    style={{
                        background: newMessage.trim() ? '#3b82f6' : '#9ca3af',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
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
        <div style={{
            background: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b'
                }}>
                    <User size={24} />
                </div>
                <div>
                    <h4 style={{
                        margin: '0 0 0.25rem 0',
                        color: '#1e293b',
                        fontSize: '1.125rem'
                    }}>
                        {patient.firstName} {patient.lastName}
                    </h4>
                    <p style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        margin: '0.25rem 0',
                        color: '#64748b',
                        fontSize: '0.875rem'
                    }}>
                        <Mail size={14} />
                        {patient.email}
                    </p>
                    <p style={{
                        margin: '0.25rem 0',
                        color: '#64748b',
                        fontSize: '0.875rem'
                    }}>
                        Age: {patient.age}
                    </p>
                </div>
            </div>

            <div style={{
                marginBottom: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #f1f5f9'
            }}>
                <p style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: 0,
                    color: '#64748b',
                    fontSize: '0.875rem'
                }}>
                    <Clock size={14} />
                    Joined: {patient.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => onChatClick(patient)} style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: '#3b82f6',
                    color: 'white',
                    border: '1px solid #3b82f6',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                }}>
                    <MessageCircle size={16} />
                    Chat
                </button>
                <button onClick={() => onViewDetails(patient)} style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    background: 'white',
                    fontSize: '0.875rem',
                    color: '#374151'
                }}>
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
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div style={{
                background: 'white',
                borderRadius: '0.75rem',
                width: '90%',
                maxWidth: '600px',
                maxHeight: '80vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    borderBottom: '1px solid #e2e8f0'
                }}>
                    <h3 style={{ margin: 0, color: '#1e293b' }}>
                        {patient.firstName} {patient.lastName} - Daily Entries
                    </h3>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#64748b',
                        padding: '0.25rem'
                    }}>×</button>
                </div>

                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.5rem'
                }}>
                    {isLoading ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            color: '#64748b'
                        }}>Loading entries...</div>
                    ) : dailyEntries.length === 0 ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            color: '#64748b'
                        }}>
                            <Calendar size={48} style={{ marginBottom: '1rem', color: '#cbd5e1' }} />
                            <p>No daily entries yet</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            {dailyEntries.map((entry) => (
                                <div key={entry.id} style={{
                                    background: '#f8fafc',
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <div style={{
                                        fontWeight: 600,
                                        color: '#1e293b',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {entry.date?.toLocaleDateString() || 'Invalid Date'}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <div style={{ display: 'flex', gap: '0.125rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    style={{ color: i < entry.rating ? '#fbbf24' : '#d1d5db' }}
                                                    fill={i < entry.rating ? 'currentColor' : 'none'}
                                                />
                                            ))}
                                        </div>
                                        <span>({entry.rating}/5)</span>
                                    </div>
                                    {entry.summary && (
                                        <div style={{
                                            marginTop: '0.5rem',
                                            padding: '0.75rem',
                                            background: 'white',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <p style={{
                                                margin: 0,
                                                color: '#374151',
                                                fontStyle: 'italic'
                                            }}>"{entry.summary}"</p>
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
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                color: '#64748b'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #e2e8f0',
                    borderTopColor: '#3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '1rem'
                }}></div>
                <p>Loading admin dashboard...</p>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <header style={{
                background: 'white',
                borderBottom: '1px solid #e2e8f0',
                padding: '1rem 2rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <Heart size={24} />
                        <div>
                            <h1 style={{
                                margin: 0,
                                fontSize: '1.5rem',
                                color: '#1e293b'
                            }}>VitaCure Admin Dashboard</h1>
                            <p style={{
                                margin: 0,
                                color: '#64748b',
                                fontSize: '0.875rem'
                            }}>Welcome, {user?.displayName || user?.email}</p>
                        </div>
                    </div>
                    {/*<ThemeToggle />*/}
                    <button onClick={handleSignOut} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer'
                    }}>
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </header>

            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2rem'
            }}>
                {activeView === "patients" ? (
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <Users size={24} />
                                <h2 style={{ margin: 0, color: '#1e293b' }}>
                                    Patients ({filteredPatients.length})
                                </h2>
                            </div>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Search size={20} style={{
                                    position: 'absolute',
                                    left: '0.75rem',
                                    color: '#64748b'
                                }} />
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        width: '300px',
                                        fontSize: '0.875rem'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {filteredPatients.length === 0 ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gridColumn: '1 / -1',
                                    height: '200px',
                                    color: '#64748b',
                                    textAlign: 'center'
                                }}>
                                    <Users size={48} style={{ marginBottom: '1rem', color: '#cbd5e1' }} />
                                    <p>
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

            <style>
                {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    )
}   

export default AdminDashboard