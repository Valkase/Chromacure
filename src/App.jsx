import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import Header from "./components/Header"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Nutrition from "./pages/Nutrition"
import About from "./pages/About"
import Research from "./pages/Research"
import ExploreResearch from "./pages/ExploreResearch"
import JoinCommunity from "./pages/JoinCommunity"
import SupportResearch from "./pages/SupportResearch"
import AccessSupport from "./pages/AccessSupport"
import ResearchCollaboration from "./pages/ResearchCollaboration"
import SupportMission from "./pages/SupportMission"
import AuthOverlay from "./components/AuthOverlay"
import UserDashboard from "./pages/PatientDashboard"
import Chat from "./components/Chat"
import Loader from "./components/Loader"
import "./App.css"

const auth = getAuth()
const db = getFirestore()



// Protected Route component
const ProtectedRoute = ({ children, user, isLoading }) => {
  if (isLoading) {
    return <Loader />
  }
  
  if (!user) {
    return <Navigate to="/" replace />
  }
  
  return children
}

function App() {
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [showAuthOverlay, setShowAuthOverlay] = useState(false)
  const [userData, setUserData] = useState(null)

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // Fetch additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          if (userDoc.exists()) {
            setUserData(userDoc.data())
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      } else {
        setUser(null)
        setUserData(null)
      }
      setIsAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Handle successful authentication
  const handleAuthSuccess = ({ user: authenticatedUser, userData: newUserData, isNewUser }) => {
    setUser(authenticatedUser)
    if (newUserData) {
      setUserData(newUserData)
    }
    setShowAuthOverlay(false)
    
    // Show welcome message for new users
    if (isNewUser) {
      console.log("Welcome to Vitacure!")
    }
  }

  // Show loading screen during initial auth check
  if (isAuthLoading) {
    return (<div className="loading-screen">
        <Loader />
    </div>)
            
  }

  return (
    <Router>
      <div className="App">
        {/* Auth Overlay */}
        <AuthOverlay 
          isOpen={showAuthOverlay}
          onClose={() => setShowAuthOverlay(false)}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Main App Content */}
        {user ? (
          // Authenticated User Experience - Dashboard-focused
          <Routes>
            <Route path="/dashboard" element={
              <ProtectedRoute user={user} isLoading={isAuthLoading}>
                <UserDashboard user={user} />
              </ProtectedRoute>
            } />
            
            {/* Redirect authenticated users to dashboard by default */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Optional: Keep some public pages accessible to authenticated users */}
            <Route path="/about" element={
              <>
                <Header 
                  user={user}
                  onSignInClick={() => setShowAuthOverlay(true)}
                  onSignOut={() => {
                    setUser(null)
                    setUserData(null)
                  }}
                />
                <About />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header 
                  user={user}
                  onSignInClick={() => setShowAuthOverlay(true)}
                  onSignOut={() => {
                    setUser(null)
                    setUserData(null)
                  }}
                />
                <Contact />
              </>
            } />
            
            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        ) : (
          // Public/Unauthenticated User Experience
          <>
            <Header 
              user={user}
              onSignInClick={() => setShowAuthOverlay(true)}
              onSignOut={() => {
                setUser(null)
                setUserData(null)
              }}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/about" element={<About />} />
              <Route path="/research" element={<Research />} />
              <Route path="/explore-research" element={<ExploreResearch />} />
              <Route path="/join-community" element={<JoinCommunity />} />
              <Route path="/support-research" element={<SupportResearch />} />
              <Route path="/access-support" element={<AccessSupport />} />
              <Route path="/research-collaboration" element={<ResearchCollaboration />} />
              <Route path="/support-mission" element={<SupportMission />} />
              
              {/* Redirect dashboard access to home for unauthenticated users */}
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
            </Routes>
            
            {/* Optional: Keep chat for public users */}
            {/* <Chat /> */}
          </>
        )}
      </div>
    </Router>
  )
}

export default App