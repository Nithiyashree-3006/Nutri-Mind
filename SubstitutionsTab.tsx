import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Flame } from "lucide-react"
import { useUserStats } from "@/contexts/UserStatsContext"
import { useAuth } from "@/contexts/AuthContext"

type Friend = {
  id: string
  name: string
  points: number
  streak: number
}

const MOCK_FRIENDS: Friend[] = [
  { id: "f1", name: "Sarah J.", points: 840, streak: 14 },
  { id: "f2", name: "Michael T.", points: 620, streak: 8 },
  { id: "f3", name: "Jessica R.", points: 410, streak: 5 },
  { id: "f4", name: "David L.", points: 150, streak: 2 },
  { id: "f5", name: "Emma W.", points: 90, streak: 1 },
]

export default function LeaderboardTab() {
  const { stats } = useUserStats()
  const { user } = useAuth()
  const [leaderboard, setLeaderboard] = useState<Friend[]>([])

  useEffect(() => {
    if (!user) return
    const currentUser: Friend = {
      id: user.id,
      name: user.name + " (You)",
      points: stats.points,
      streak: stats.currentStreak
    }
    const combined = [...MOCK_FRIENDS, currentUser].sort((a, b) => b.points - a.points)
    setLeaderboard(combined)
  }, [stats, user])

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-primary/20">
        <CardHeader className="bg-primary/5 border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 text-amber-500 rounded-full shadow-inner">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
                Global Leaderboard
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-1">
                See how you rank against your friends and neighbors.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <div className="divide-y divide-border">
            {leaderboard.map((person, index) => {
              const isCurrentUser = person.id === user?.id
              return (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-4 sm:p-6 transition-colors ${
                    isCurrentUser ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 flex justify-center font-bold text-xl text-muted-foreground">
                      {index === 0 ? <span className="text-yellow-500 text-2xl">🥇</span> : 
                       index === 1 ? <span className="text-gray-400 text-2xl">🥈</span> : 
                       index === 2 ? <span className="text-amber-700 text-2xl">🥉</span> : 
                       `#${index + 1}`}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-lg">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg ${isCurrentUser ? "text-primary" : "text-foreground"}`}>{person.name}</h4>
                        <div className="flex items-center gap-3 mt-0.5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-500" /> {person.streak} day streak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={isCurrentUser ? "default" : "secondary"} className="text-sm px-3 py-1 font-bold shadow-sm">
                      {person.points} pts
                    </Badge>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
