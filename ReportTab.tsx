import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, Trophy, CheckCircle2, Star, Target, Utensils } from "lucide-react"
import { useUserStats } from "@/contexts/UserStatsContext"

export default function HabitTracker() {
  const { stats, confirmJunkFreeDay } = useUserStats()
  
  const junkStreak = stats.junkFreeStreak || 0
  const healthyStreak = stats.currentStreak || 0
  const progress = Math.min((junkStreak / 7) * 100, 100)
  
  const milestones = [
    { days: 3, icon: <Star className="w-4 h-4" />, label: "Starter" },
    { days: 5, icon: <Trophy className="w-4 h-4" />, label: "Consistent" },
    { days: 10, icon: <Flame className="w-4 h-4" />, label: "Unstoppable" },
  ]

  return (
    <Card className="overflow-hidden border-primary/20 shadow-lg bg-gradient-to-br from-card to-background">
      <CardHeader className="pb-2 bg-primary/5">
        <CardTitle className="text-xl flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Habit Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 flex flex-col items-center text-center"
          >
            <Utensils className="w-8 h-8 text-emerald-500 mb-2" />
            <span className="text-3xl font-bold text-emerald-600">{healthyStreak}</span>
            <span className="text-xs font-semibold uppercase text-emerald-600/70">Healthy Days</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20 flex flex-col items-center text-center"
          >
            <Flame className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-3xl font-bold text-orange-600">{junkStreak}</span>
            <span className="text-xs font-semibold uppercase text-orange-600/70">Junk-Free Streak</span>
          </motion.div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h4 className="text-sm font-bold flex items-center gap-2">
              7-Day Goal Progress
            </h4>
            <span className="text-xs font-bold text-primary">{junkStreak}/7 Days</span>
          </div>
          <Progress value={progress} className="h-3 bg-muted shadow-inner" />
          <p className="text-sm text-muted-foreground font-medium italic">
            {junkStreak >= 5 
              ? `${junkStreak} days without junk food 🎉 Keep going!` 
              : "Every healthy choice counts! You're doing great."}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent Badges</h4>
          <div className="flex flex-wrap gap-2">
            {milestones.map((m) => (
              <Badge 
                key={m.days} 
                variant={junkStreak >= m.days ? "default" : "outline"}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  junkStreak >= m.days 
                    ? "bg-gradient-to-r from-primary to-emerald-500 border-none shadow-md" 
                    : "opacity-40 grayscale"
                }`}
              >
                {m.icon}
                <span className="text-[10px] font-bold">{m.days} Days: {m.label}</span>
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          onClick={confirmJunkFreeDay}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold h-12 shadow-lg hover:shadow-xl transition-all"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Confirm Junk-Free Day
        </Button>
      </CardContent>
    </Card>
  )
}
