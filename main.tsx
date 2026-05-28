import React, { createContext, useContext, useState, useEffect } from "react"

export type Goal = "Weight Loss" | "Muscle Gain" | "Balanced Diet"

export type User = {
  id: string
  name: string
  email: string
  goal?: Goal
}

type AuthContextType = {
  user: User | null
  login: (email: string, name: string, goal?: Goal) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const sessionUser = localStorage.getItem("nutrimind-active-user")
    if (sessionUser) {
      setUser(JSON.parse(sessionUser))
    }
  }, [])

  const login = (email: string, name: string, goal?: Goal) => {
    const usersDB = JSON.parse(localStorage.getItem("nutrimind-users-db") || "[]")
    let existingUser = usersDB.find((u: User) => u.email.toLowerCase() === email.toLowerCase())
    
    if (!existingUser) {
      existingUser = { id: `usr_${Date.now()}`, email, name, goal: goal || "Balanced Diet" }
      usersDB.push(existingUser)
      localStorage.setItem("nutrimind-users-db", JSON.stringify(usersDB))
    } else if (goal && existingUser.goal !== goal) {
      existingUser.goal = goal
      localStorage.setItem("nutrimind-users-db", JSON.stringify(usersDB))
    }

    setUser(existingUser)
    localStorage.setItem("nutrimind-active-user", JSON.stringify(existingUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nutrimind-active-user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
