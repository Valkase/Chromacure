import { useState, useEffect, useCallback, useRef } from "react"
import { getAuth, signOut } from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import {
  MessageCircle,
  Calendar as CalendarIcon,
  Star,
  Send,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Save,
  X,
  User,
  Heart,
} from "lucide-react"


import "../styles/PatientDashboard.css"
import ThemeToggle from "../components/ThemeToggle"

const auth = getAuth()
const db = getFirestore()

// Chat Component
const Chat = ({ user }) => {
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
    if (!user?.uid) return

    const chatQuery = query(
      collection(db, "chats"),
      where("patientId", "==", user.uid),
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
  }, [user?.uid])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      await addDoc(collection(db, "chats"), {
        patientId: user.uid,
        message: newMessage.trim(),
        senderType: "patient",
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
          <MessageCircle size={24} />
          <h2>Chat with Doctor</h2>
        </div>
        <div className="chat-loading">Loading chat...</div>
      </div>
    )
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <MessageCircle size={24} />
        <h2>Chat with Doctor</h2>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <MessageCircle size={48} />
            <p>No messages yet. Start a conversation with your doctor!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.senderType === "patient" ? "message-patient" : "message-doctor"}`}
            >
              <div className="message-content">
                <p>{message.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div onSubmit={sendMessage} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
          maxLength={500}
        />
        <button type="button" onClick={sendMessage} className="chat-send-btn" disabled={!newMessage.trim()}>
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

// Star Rating Component
const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const [hoveredStar, setHoveredStar] = useState(0)

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= (hoveredStar || rating) ? "star-filled" : "star-empty"}`}
          onClick={() => !readonly && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoveredStar(star)}
          onMouseLeave={() => !readonly && setHoveredStar(0)}
          disabled={readonly}
        >
          <Star size={24} fill="currentColor" />
        </button>
      ))}
    </div>
  )
}

// Daily Entry Component
const DailyEntry = ({ user, selectedDate, onClose }) => {
  const [rating, setRating] = useState(0)
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [existingEntry, setExistingEntry] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const dateString = selectedDate.toISOString().split("T")[0]

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const entryDoc = await getDoc(doc(db, "users", user.uid, "dailyEntries", dateString))
        if (entryDoc.exists()) {
          const data = entryDoc.data()
          setExistingEntry(data)
          setRating(data.rating)
          setSummary(data.summary || "")
        } else {
          setIsEditing(true)
        }
      } catch (error) {
        console.error("Error fetching daily entry:", error)
      }
    }

    fetchEntry()
  }, [user.uid, dateString])

  const handleSave = async () => {
    if (rating === 0) return

    setIsLoading(true)
    try {
      await setDoc(doc(db, "users", user.uid, "dailyEntries", dateString), {
        rating,
        summary: summary.trim(),
        date: selectedDate,
        updatedAt: serverTimestamp(),
      })
      setExistingEntry({ rating, summary: summary.trim(), date: selectedDate })
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving daily entry:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="daily-entry-overlay">
      <div className="daily-entry-modal">
        <div className="daily-entry-header">
          <h3>Daily Entry - {selectedDate.toLocaleDateString()}</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="daily-entry-content">
          <div className="rating-section">
            <label>How are you feeling today?</label>
            <StarRating rating={rating} onRatingChange={setRating} readonly={!isEditing && existingEntry} />
          </div>

          <div className="summary-section">
            <label htmlFor="summary">Daily Summary (optional)</label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write about your day, symptoms, or anything you'd like to remember..."
              className="summary-textarea"
              maxLength={500}
              readOnly={!isEditing && existingEntry}
            />
            <div className="char-count">{summary.length}/500</div>
          </div>

          <div className="daily-entry-actions">
            {existingEntry && !isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                <Edit2 size={18} />
                Edit Entry
              </button>
            ) : (
              <button onClick={handleSave} disabled={rating === 0 || isLoading} className="save-btn">
                <Save size={18} />
                {isLoading ? "Saving..." : "Save Entry"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Daily Calendar Component
const DailyCalendar = ({ user, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dailyEntries, setDailyEntries] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return

    const entriesQuery = query(collection(db, "users", user.uid, "dailyEntries"), orderBy("date", "desc"))

    const unsubscribe = onSnapshot(
      entriesQuery,
      (snapshot) => {
        const entries = {}
        snapshot.docs.forEach((doc) => {
          const data = doc.data()
          const dateString = data.date?.toDate?.()?.toISOString().split("T")[0] || doc.id
          entries[dateString] = data
        })
        setDailyEntries(entries)
        setIsLoading(false)
      },
      (error) => {
        console.error("Error listening to daily entries:", error)
        setIsLoading(false)
      }
    )

    return unsubscribe
  }, [user?.uid])

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const days = getDaysInMonth(currentDate)
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)} className="nav-btn">
          <ChevronLeft size={20} />
        </button>
        <h3>
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <button onClick={() => navigateMonth(1)} className="nav-btn">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((date, index) => {
          if (!date) return <div key={index} className="calendar-day empty"></div>

          const dateString = date.toISOString().split("T")[0]
          const entry = dailyEntries[dateString]
          const isToday = dateString === today
          const isFuture = date > new Date()

          return (
            <button
              key={dateString}
              onClick={() => !isFuture && onDateSelect(date)}
              disabled={isFuture}
              className={`calendar-day ${isToday ? "today" : ""} ${entry ? "has-entry" : ""} ${isFuture ? "future" : ""}`}
            >
              <span className="day-number">{date.getDate()}</span>
              {entry && (
                <div className="entry-indicator">
                  <div className="rating-dots">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`rating-dot ${i < entry.rating ? "filled" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Main Dashboard Component
const PatientDashboard = ({ user }) => {
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState("chat")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    if (user?.uid) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        setUserData(userDoc.data())
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
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

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="sec-header-content">
          <div className="header-left">
            <Heart size={24} />
            <div>
              <h1>VitaCure Dashboard</h1>
              <p>Welcome back, {userData?.firstName}!</p>
            </div>
          </div>
          <ThemeToggle />
          <button onClick={handleSignOut} className="sign-out-btn">
            <LogOut size={18} />
            Sign Out
          </button>
          
        </div>
      </header>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="content-header">
            <div className="content-tabs">
              <button
                onClick={() => setActiveTab("chat")}
                className={`content-tab ${activeTab === "chat" ? "active" : ""}`}
              >
                <MessageCircle size={20} />
                Chat with Doctor
              </button>
              <button
                onClick={() => setActiveTab("daily")}
                className={`content-tab ${activeTab === "daily" ? "active" : ""}`}
              >
                <CalendarIcon size={20} />
                Daily Tracking
              </button>
            </div>
          </div>
          
          <div className="content-body">
            {activeTab === "chat" && <Chat user={user} />}
            {activeTab === "daily" && <DailyCalendar user={user} onDateSelect={handleDateSelect} />}
          </div>
        </div>
      </div>

      {selectedDate && (
        <DailyEntry
          user={user}
          selectedDate={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}

export default PatientDashboard