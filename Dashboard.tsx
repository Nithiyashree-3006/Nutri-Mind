import React, { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import type { FoodItem } from "@/data/foods"

export type Mood = "Happy" | "Stressed" | "Anxious" | "Energetic" | "Tired" | "Calm" | "Sad" | "Excited" | "Bored"

export type EatingEvent = {
  id: string
  timestamp: string
  date: string
  day: string
  time: string
  mood: Mood
  stressLevel: number
  sleepHours: number
  food: FoodItem
  cravedItem?: string
}

export type UserStats = {
  points: number
  currentStreak: number
  bestStreak: number
  lastActivityDate: string | null
  history: EatingEvent[]
  junkFreeStreak: number
  healthyDaysCount: number
  lastJunkFreeDate: string | null
}

type UserStatsContextType = {
  stats: UserStats
  logHealthyChoice: (event: Omit<EatingEvent, "id" | "timestamp" | "date" | "day" | "time">) => void
  confirmJunkFreeDay: () => void
  getPatterns: () => Array<{ pattern: string; frequency: number }>
  predictCraving: () => { timeLabel: string; cravedItem: string | undefined; suggestion: string }
  addPoints: (amount: number) => void
}

const defaultStats: UserStats = {
  points: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastActivityDate: null,
  history: [],
  junkFreeStreak: 0,
  healthyDaysCount: 0,
  lastJunkFreeDate: null
}

const UserStatsContext = createContext<UserStatsContextType | undefined>(undefined)

export function UserStatsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [stats, setStats] = useState<UserStats>(defaultStats)

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`nutrimind-stats-${user.id}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        setStats({
          ...defaultStats,
          ...parsed
        })
      } else {
        setStats(defaultStats)
      }
    } else {
      setStats(defaultStats)
    }
  }, [user])

  const saveStats = (newStats: UserStats) => {
    setStats(newStats)
    if (user) {
      localStorage.setItem(`nutrimind-stats-${user.id}`, JSON.stringify(newStats))
    }
  }

  const logHealthyChoice = (eventData: Omit<EatingEvent, "id" | "timestamp" | "date" | "day" | "time">) => {
    const now = new Date()
    const today = now.toDateString()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const dayStr = now.toLocaleDateString([], { weekday: 'long' })
    const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    
    let { currentStreak, bestStreak, lastActivityDate, points, healthyDaysCount } = stats

    if (lastActivityDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (lastActivityDate === yesterday.toDateString()) {
        currentStreak += 1
      } else {
        currentStreak = 1
      }
      lastActivityDate = today
      bestStreak = Math.max(bestStreak, currentStreak)
      healthyDaysCount += 1
    }

    const newEvent: EatingEvent = {
      ...eventData,
      id: Date.now().toString(),
      timestamp: now.toISOString(),
      date: dateStr,
      day: dayStr,
      time: timeStr
    }

    saveStats({
      ...stats,
      points: points + 10,
      currentStreak,
      bestStreak,
      lastActivityDate,
      healthyDaysCount,
      history: [newEvent, ...stats.history].slice(0, 100)
    })
  }

  const confirmJunkFreeDay = () => {
    const today = new Date().toDateString()
    let { junkFreeStreak, lastJunkFreeDate, points } = stats

    if (lastJunkFreeDate === today) {
      alert("You've already confirmed your junk-free status for today!")
      return
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (lastJunkFreeDate === yesterday.toDateString()) {
      junkFreeStreak += 1
    } else {
      junkFreeStreak = 1
    }

    saveStats({
      ...stats,
      junkFreeStreak,
      lastJunkFreeDate: today,
      points: points + 15 // Bonus for discipline
    })
    
    alert(`Great job! Junk-free streak is now ${junkFreeStreak} days. +15 points! 🎉`)
  }

  const getPatterns = () => {
    const triggerPatterns: Record<string, number> = {}
    const habitPatterns: Record<string, number> = {}

    stats.history.forEach(log => {
      if (log.cravedItem) {
        const key = `${log.mood} → ${log.cravedItem}`
        triggerPatterns[key] = (triggerPatterns[key] || 0) + 1
      } else {
        const key = `${log.mood} → ${log.food.name}`
        habitPatterns[key] = (habitPatterns[key] || 0) + 1
      }
    })

    const formattedTriggers = Object.entries(triggerPatterns)
      .filter(([_, count]) => count >= 2)
      .map(([pattern, frequency]) => ({ pattern, frequency, type: 'trigger' as const }))

    const formattedHabits = Object.entries(habitPatterns)
      .filter(([_, count]) => count >= 2)
      .map(([pattern, frequency]) => ({ pattern, frequency, type: 'habit' as const }))

    return [...formattedTriggers, ...formattedHabits]
      .sort((a, b) => b.frequency - a.frequency)
  }

  const predictCraving = () => {
    // Generate an intelligent prediction based on recent history
    const hour = new Date().getHours()
    let timeLabel = "now"
    if (hour >= 14 && hour <= 17) timeLabel = "at 4 PM"
    else if (hour >= 20 || hour <= 23) timeLabel = "late at night"
    else if (hour >= 8 && hour <= 11) timeLabel = "in the morning"

    const cravedItems = stats.history.filter(h => h.cravedItem).map(h => h.cravedItem!)
    const mostCraved = cravedItems.length > 0 
      ? cravedItems.sort((a,b) => cravedItems.filter(v => v===a).length - cravedItems.filter(v => v===b).length).pop() 
      : "sweets" // Fallback to sweets if no data

    let suggestion = "a healthier homemade alternative."
    const userGoal = user?.goal || "Balanced Diet"

    if (mostCraved === "Pizza" || mostCraved === "Burger") {
      if (userGoal === "Weight Loss") suggestion = "a large green salad or low-calorie cauliflower bowl."
      else if (userGoal === "Muscle Gain") suggestion = "a high-protein chicken salad or paneer wrap."
      else suggestion = "a healthy, portion-controlled homemade veggie pizza."
    } else if (mostCraved === "sweets" || mostCraved === "Chocolate" || mostCraved === "Ice Cream") {
      if (userGoal === "Weight Loss") suggestion = "fresh berries or a small piece of dark chocolate."
      else if (userGoal === "Muscle Gain") suggestion = "a high-protein Greek yogurt bowl."
      else suggestion = "a moderate portion of fruit salad."
    } else {
      if (userGoal === "Weight Loss") suggestion = "a low-calorie option rich in fiber."
      else if (userGoal === "Muscle Gain") suggestion = "a protein-rich snack to fuel recovery."
      else suggestion = "a balanced alternative with whole ingredients."
    }

    return {
      timeLabel,
      cravedItem: mostCraved,
      suggestion
    }
  }

  const addPoints = (amount: number) => {
    saveStats({
      ...stats,
      points: stats.points + amount
    })
  }

  return (
    <UserStatsContext.Provider value={{ stats, logHealthyChoice, confirmJunkFreeDay, getPatterns, predictCraving, addPoints }}>
      {children}
    </UserStatsContext.Provider>
  )
}

export const useUserStats = () => {
  const context = useContext(UserStatsContext)
  if (context === undefined) throw new Error("useUserStats must be used within UserStatsProvider")
  return context
}
