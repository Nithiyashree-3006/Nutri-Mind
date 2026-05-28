import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Flame, Medal, Star, Trophy, Zap } from "lucide-react"
import { useUserStats } from "@/contexts/UserStatsContext"

const achievements = [
  { id: "beginner", title: "Beginner", pointsRequired: 10, icon: <Star className="w-8 h-8 text-blue-500" /> },
  { id: "committed", title: "Committed", pointsRequired: 50, icon: <Zap className="w-8 h-8 text-emerald-500" /> },
  { id: "champion", title: "Champion", pointsRequired: 100, icon: <Medal className="w-8 h-8 text-amber-500" /> },
  { id: "legend", title: "Legend", pointsRequired: 200, icon: <Trophy className="w-8 h-8 text-purple-500" /> },
  { id: "master", title: "Master", pointsRequired: 500, icon: <Award className="w-8 h-8 text-rose-500" /> },
]

export default function RewardsTab() {
  const { stats } = useUserStats()
  const { points, currentStreak, bestStreak } = stats

  const nextAchievement = achievements.find(a => a.pointsRequired > points) || achievements[achievements.length - 1]
  const currentAchievement = [...achievements].reverse().find(a => points >= a.pointsRequired)
  const isMaxLevel = points >= achievements[achievements.length - 1].pointsRequired

  const progressPercentage = isMaxLevel 
    ? 100 
    : ((points - (currentAchievement?.pointsRequired || 0)) / (nextAchievement.pointsRequired - (currentAchievement?.pointsRequired || 0))) * 100

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-md">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="bg-primary/20 p-4 rounded-full">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-600">{points}</h3>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Points</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 shadow-md">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="bg-amber-500/20 p-4 rounded-full">
              <Flame className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-3xl font-bold text-amber-600">{currentStreak} <span className="text-lg">days</span></h3>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 shadow-md">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="bg-blue-500/20 p-4 rounded-full">
              <Medal className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-3xl font-bold text-blue-600">{bestStreak} <span className="text-lg">days</span></h3>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Best Streak</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Level Progress</CardTitle>
          <CardDescription>Earn 10 points for every healthy meal you log!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span>{currentAchievement ? currentAchievement.title : "Beginner"}</span>
              <span>{isMaxLevel ? "Max Level!" : `Next: ${nextAchievement.title} (${points}/${nextAchievement.pointsRequired})`}</span>
            </div>
            <Progress value={Math.min(100, Math.max(0, progressPercentage))} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Badges & Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {achievements.map((a, i) => {
            const isUnlocked = points >= a.pointsRequired
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full text-center p-6 flex flex-col items-center justify-center space-y-4 border-2 transition-all ${isUnlocked ? 'border-primary/50 shadow-md bg-card' : 'border-dashed bg-muted/50 filter grayscale opacity-60'}`}>
                  {isUnlocked && <div className="absolute top-2 right-2 flex"><CheckCircleIcon className="w-4 h-4 text-emerald-500"/></div>}
                  <div className={`p-4 rounded-full ${isUnlocked ? 'bg-background shadow-inner' : 'bg-muted'}`}>
                    {a.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{a.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{a.pointsRequired} pts</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  )
}
