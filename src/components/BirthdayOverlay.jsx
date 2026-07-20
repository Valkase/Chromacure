"use client"

import { useState, useMemo, useEffect } from "react"
import { X } from "lucide-react"
import "../styles/BirthdayOverlay.css"
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, signInAnonymously } from "firebase/auth"
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"

// Same Firebase project already used by AuthOverlay.jsx / Contact.jsx.
const firebaseConfig = {
  apiKey: "AIzaSyBmMMzrSolqcqy0W-BZ5nSUZTrcxjNxSX8",
  authDomain: "chromacure-4aac2.firebaseapp.com",
  projectId: "chromacure-4aac2",
  storageBucket: "chromacure-4aac2.firebasestorage.app",
  messagingSenderId: "659675138326",
  appId: "1:659675138326:web:70317441370a6d682ee837",
  measurementId: "G-LK4JQB238F",
}

// IMPORTANT: this runs on its own NAMED secondary Firebase app instance,
// completely separate from the site's main [DEFAULT] app (the one used by
// App.jsx / AuthOverlay.jsx / Contact.jsx). App.jsx has a global
// onAuthStateChanged listener on the default app that redirects any signed-in
// user to /dashboard — if we signed in anonymously on that same default auth
// instance, it would trigger that redirect and hijack the surprise. Using a
// separate named app means signing in here can never be seen by that listener.
const BIRTHDAY_LOG_APP_NAME = "birthday-log"

const birthdayApp = getApps().some((a) => a.name === BIRTHDAY_LOG_APP_NAME)
  ? getApp(BIRTHDAY_LOG_APP_NAME)
  : initializeApp(firebaseConfig, BIRTHDAY_LOG_APP_NAME)

const birthdayDb = getFirestore(birthdayApp)
const birthdayAuth = getAuth(birthdayApp)


const logBirthdayOpen = async () => {
  try {
    if (!birthdayAuth.currentUser) {
      await signInAnonymously(birthdayAuth)
    }
    const data = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    }
    await addDoc(collection(birthdayDb, "birthdayOpens"), data)
  } catch (err) {
    console.error("birthday open log failed:", err)
  }
}
// --------------------------------------------------------------------------

// ---- easy-to-tweak settings -------------------------------------------
const CANDLE_COUNT = 4         // decorative candles to "blow out" (kept low on purpose
                                 // so every candle is a comfortably tappable target on a phone)
const CONFETTI_COUNT = 70
const CONFETTI_COLORS = ["#d4af37", "#f4c869", "#8c1f4a", "#c73866", "#7a1440", "#f7e7ce"]
// ------------------------------------------------------------------------

/**
 * Full-screen birthday celebration overlay.
 * Local component state for the whole experience — the only network
 * activity is the single timestamp-only open log described above.
 * Renders nothing until `isOpen` is true.
 */
const BirthdayOverlay = ({ isOpen, onClose, name = "Basmalla", age = 18 }) => {
  const [candles, setCandles] = useState(() => Array(CANDLE_COUNT).fill(true))
  const [step, setStep] = useState("cake") // "cake" -> "revealed"

  const blownCount = candles.filter((lit) => !lit).length
  const allBlown = blownCount === CANDLE_COUNT

  // Randomized confetti pieces — generated once per time the overlay mounts
  const confetti = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.2,
        duration: 3.2 + Math.random() * 3,
        size: 6 + Math.random() * 8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.round(Math.random() * 360),
        drift: Math.round((Math.random() - 0.5) * 140),
      })),
    []
  )

  // Slow drifting embers for the ambient background
  const embers = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        size: 2 + Math.random() * 4,
      })),
    []
  )

  // Lock page scroll while the overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Log that the overlay was opened — timestamp only, nothing else.
  // Fires every time it's opened (fresh mount each time, since we return
  // null when closed), so each open gets its own record.
  useEffect(() => {
    if (isOpen) {
      logBirthdayOpen()
    }
  }, [isOpen])

  // Once every candle is out, pause a beat, then reveal the message
  useEffect(() => {
    if (allBlown && step === "cake") {
      const t = setTimeout(() => setStep("revealed"), 700)
      return () => clearTimeout(t)
    }
  }, [allBlown, step])

  const blowCandle = (index) => {
    setCandles((prev) => {
      if (!prev[index]) return prev
      const next = [...prev]
      next[index] = false
      return next
    })
  }

  const handleClose = () => {
    onClose()
    // reset so it plays fresh next time it's opened
    setTimeout(() => {
      setCandles(Array(CANDLE_COUNT).fill(true))
      setStep("cake")
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="bday-overlay" role="dialog" aria-modal="true" aria-label={`Happy birthday ${name}`}>
      <div className="bday-ambience" aria-hidden="true">
        {embers.map((e) => (
          <span
            key={e.id}
            className="bday-ember"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              animationDelay: `${e.delay}s`,
              animationDuration: `${e.duration}s`,
            }}
          />
        ))}
      </div>

      <button className="bday-close" onClick={handleClose} aria-label="Close">
        <X size={22} />
      </button>

      {step === "cake" && (
        <div className="bday-stage bday-stage-cake">
          <p className="bday-eyebrow">Yaaa {name}</p>
          <h1 className="bday-title">
            Happy {age}<sup>th</sup> Birthday
          </h1>
          <p className="bday-hint">Make a wish, then blow out every candle 🕯️</p>

          <div className="bday-cake-wrap">
            <div className="bday-candles">
              {candles.map((lit, i) => (
                <button
                  key={i}
                  type="button"
                  className={`bday-candle${lit ? "" : " blown"}`}
                  onClick={() => blowCandle(i)}
                  aria-label={lit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
                >
                  <span className="bday-flame" />
                  <span className="bday-smoke" />
                  <span className="bday-wick" />
                </button>
              ))}
            </div>

            <div className="bday-cake">
              <div className="bday-cake-topper">{age}</div>
              <div className="bday-cake-layer bday-cake-top" />
              <div className="bday-cake-layer bday-cake-mid" />
              <div className="bday-cake-layer bday-cake-base" />
              <div className="bday-cake-plate" />
            </div>
          </div>

          <p className="bday-progress">{blownCount} / {CANDLE_COUNT} candles out</p>
        </div>
      )}

      {step === "revealed" && (
        <div className="bday-stage bday-stage-message">
          <div className="bday-confetti" aria-hidden="true">
            {confetti.map((c) => (
              <span
                key={c.id}
                className="bday-confetti-piece"
                style={{
                  left: `${c.left}%`,
                  backgroundColor: c.color,
                  width: `${c.size}px`,
                  height: `${c.size * 0.4}px`,
                  animationDelay: `${c.delay}s`,
                  animationDuration: `${c.duration}s`,
                  "--bday-drift": `${c.drift}px`,
                  "--bday-rotate": `${c.rotate}deg`,
                }}
              />
            ))}
          </div>

         <div className="bday-reveal-content">
            <p className="bday-eyebrow">wish sent into the world </p>
            <h1 className="bday-title bday-title-big">
              Happy {age}<sup>th</sup> Birthday,
              <br />
              <span className="bday-name">{name}</span>
            </h1>


            <div className="bday-message-card">
              <p>
               بما ان انت مش ناوية تفكري حد بعيد ميلادك, فده يخلينا نحتفل بيه غصب عنك. كل سنة وانت طيبة يا بسمله و إن شاء الله تكون سنة سعيده عليكي
              </p>
              <p className="bday-message-emph">You don't get older,  {name} , you get more legendary.</p>

              <p className="bday-signoff">سنة متألقة لواحده متألقة ✨</p>
            </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default BirthdayOverlay
