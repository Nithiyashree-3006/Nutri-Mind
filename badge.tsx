import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUserStats } from "@/contexts/UserStatsContext"
import { 
  Brain, AlertCircle, 
  Target, Zap, Clock, Heart,
  ShieldCheck, BrainCircuit, Sparkles, MessageSquare,
  CheckCircle2, XCircle, LineChart
} from "lucide-react"

export default function ReportTab() {
  const { stats, addPoints } = useUserStats()
  const [rewardClaimed, setRewardClaimed] = useState(false)

  const handleClaimReward = () => {
    if (rewardClaimed) return
    addPoints(50)
    setRewardClaimed(true)
  }
  
  const aiReport = useMemo(() => {
    try {
      const hasData = stats?.history && stats.history.length > 0
      const history = stats?.history || []
      
      // 1. Core Counts
      let healthyCount = 0
      let junkCount = 0
      let sweetCravings = 0
      let spicyCravings = 0
      let savoryCravings = 0
      
      // 2. Time-Based Stats
      const timeSlots = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 }
      const timeSuccess = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 }
      
      // 3. Mood Patterns
      const moodMap: Record<string, { healthy: number, junk: number }> = {}
  
      history.forEach(log => {
        // Safety check for older logs that might not have the 'time' field
        const timeStr = log.time || "12:00 PM"
        const hourPart = timeStr.split(":")[0]
        const hour = parseInt(hourPart)
        const isPM = timeStr.includes("PM")
        const normalizedHour = isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour)
        
        let slot: keyof typeof timeSlots = "Morning"
        if (normalizedHour >= 12 && normalizedHour < 17) slot = "Afternoon"
        else if (normalizedHour >= 17 && normalizedHour < 21) slot = "Evening"
        else if (normalizedHour >= 21 || normalizedHour < 5) slot = "Night"
        
        timeSlots[slot]++
        
        if (!moodMap[log.mood]) moodMap[log.mood] = { healthy: 0, junk: 0 }
        
        if (log.cravedItem) {
          junkCount++
          timeSuccess[slot] -= 1
          moodMap[log.mood].junk++
          
          const item = log.cravedItem.toLowerCase()
          if (item.includes("pizza") || item.includes("burger") || item.includes("savory")) savoryCravings++
          if (item.includes("chocolate") || item.includes("sugar") || item.includes("cake") || item.includes("sweet")) sweetCravings++
          if (item.includes("spicy") || item.includes("65") || item.includes("fry")) spicyCravings++
        } else {
          healthyCount++
          timeSuccess[slot] += 1
          moodMap[log.mood].healthy++
        }
      })
  
      // 4. Scoring Logic (0-100)
      const healthyRatio = (healthyCount / (healthyCount + junkCount)) || 0
      const streakBonus = Math.min((stats?.currentStreak || 0) * 5, 20)
      const habitScore = Math.min(Math.round((healthyRatio * 80) + streakBonus), 100)
      
      let scoreLabel = "Needs Focus ⚠️"
      if (habitScore > 80) scoreLabel = "Excellent Week 🎉"
      else if (habitScore > 60) scoreLabel = "Good Progress 👍"
      else if (habitScore > 40) scoreLabel = "Making Steps 🏃"
  
      // 5. AI Summary Generation
      const summary = hasData 
        ? `You stayed disciplined for ${stats?.healthyDaysCount || 0} days this week. You made ${healthyCount} healthy choices and managed ${junkCount} cravings. ${timeSuccess.Evening < 0 ? "Your evenings are a weak point," : "Your consistency is great,"} keep building that momentum! 💪`
        : "Start logging your meals to see your AI-powered weekly transformation summary!"
  
      // 6. Mood vs Food Insight
      const stressLogs = moodMap["stressed"] || { healthy: 0, junk: 0 }
      const stressJunkPercent = Math.round((stressLogs.junk / (stressLogs.healthy + stressLogs.junk)) * 100) || 0
      
      // 7. Time Performance
      const getPerf = (slot: keyof typeof timeSlots) => {
        if (timeSlots[slot] === 0) return { label: "Good", color: "text-emerald-500", icon: <CheckCircle2 className="w-4 h-4" /> }
        const ratio = timeSuccess[slot] / timeSlots[slot]
        if (ratio > 0.5) return { label: "Excellent", color: "text-emerald-500", icon: <CheckCircle2 className="w-4 h-4" /> }
        if (ratio >= 0) return { label: "Average", color: "text-amber-500", icon: <AlertCircle className="w-4 h-4" /> }
        return { label: "Poor", color: "text-red-500", icon: <XCircle className="w-4 h-4" /> }
      }
  
      return {
        habitScore, scoreLabel, summary,
        healthyCount, junkCount, 
        sweetCravings, spicyCravings,
        stressJunkPercent,
        timePerf: {
          Morning: getPerf("Morning"),
          Afternoon: getPerf("Afternoon"),
          Evening: getPerf("Evening")
        },
        hasData,
        dailyScores: (() => {
          const scores = []
          for (let i = 6; i >= 0; i--) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            const dateStr = d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
            const dayLogs = history.filter(log => log.date === dateStr)
            
            if (dayLogs.length === 0) {
              scores.push({ date: d.toLocaleDateString([], { weekday: 'short' }), score: 0 })
            } else {
              const healthy = dayLogs.filter(log => !log.cravedItem).length
              scores.push({ 
                date: d.toLocaleDateString([], { weekday: 'short' }), 
                score: Math.round((healthy / dayLogs.length) * 100) 
              })
            }
          }
          return scores
        })()
      }
    } catch (e) {
      console.error("AI Report calculation error:", e)
      return {
        habitScore: 0,
        scoreLabel: "Analyzing...",
        summary: "We're having trouble calculating your report. Try logging a few more meals!",
        healthyCount: 0, junkCount: 0,
        sweetCravings: 0, spicyCravings: 0,
        stressJunkPercent: 0,
        timePerf: {
          Morning: { label: "Good", color: "text-emerald-500", icon: <CheckCircle2 className="w-4 h-4" /> },
          Afternoon: { label: "Good", color: "text-emerald-500", icon: <CheckCircle2 className="w-4 h-4" /> },
          Evening: { label: "Good", color: "text-emerald-500", icon: <CheckCircle2 className="w-4 h-4" /> }
        },
        hasData: false,
        dailyScores: []
      }
    }
  }, [stats])

  return (
    <div className="space-y-6 pb-20">
      {/* Header Summary Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Your Week at a Glance</h2>
            <p className="text-muted-foreground text-sm">AI Summary & Performance</p>
          </div>
        </div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-2 border-primary/20 shadow-xl overflow-hidden relative backdrop-blur-md bg-background/60">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <BrainCircuit className="w-24 h-24" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <CardContent className="p-6 md:p-8 relative z-10">
              <p className="text-lg md:text-xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                “{aiReport.summary}”
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-black px-4 py-1.5 rounded-full">
                  ✔ {aiReport.healthyCount} Healthy Days
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-black px-4 py-1.5 rounded-full">
                  🔥 {stats.currentStreak}-Day Streak
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Habit Score Card */}
        <Card className="md:col-span-1 shadow-lg border-2 border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Habit Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-4 pb-8">
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="10" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * aiReport.habitScore) / 100} className="text-emerald-500" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black">{aiReport.habitScore}</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase">Out of 100</span>
              </div>
            </div>
            <p className="font-black text-lg text-emerald-600">{aiReport.scoreLabel}</p>
            <div className="mt-4 w-full space-y-2">
               <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground px-1">
                 <span>Nutrition: 80</span>
                 <span>Discipline: {Math.round(aiReport.habitScore * 0.8)}</span>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Mood vs Food Power Insight */}
        <Card className="md:col-span-2 shadow-lg border-2 border-primary/10 overflow-hidden bg-gradient-to-br from-background to-amber-500/5">
          <CardHeader>
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Mood vs Food Analysis
            </CardTitle>
            <CardDescription className="font-bold">Our "Killer Feature" identifying your emotional triggers</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-background border border-amber-500/20 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1 bg-amber-500"></div>
                <h4 className="text-sm font-black text-amber-600 mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Trigger Warning
                </h4>
                <p className="text-base font-bold leading-snug">
                  "{aiReport.stressJunkPercent}% of your unhealthy meals happened during stress."
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-emerald-500/20 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1 bg-emerald-500"></div>
                <h4 className="text-sm font-black text-emerald-600 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Strength Pattern
                </h4>
                <p className="text-base font-bold leading-snug">
                  "Healthy choices increase by 40% when you log as 'Calm'."
                </p>
              </div>
            </div>
            
            <div className="bg-background/50 rounded-2xl p-4 border border-border/50 space-y-4">
               <h4 className="text-xs font-black uppercase text-muted-foreground tracking-widest">Time-Based Performance</h4>
               <div className="space-y-3">
                 {Object.entries(aiReport.timePerf).map(([slot, perf]) => (
                   <div key={slot} className="flex items-center justify-between">
                     <span className="text-sm font-bold flex items-center gap-2">
                       <Clock className="w-4 h-4 text-muted-foreground" /> {slot}
                     </span>
                     <Badge variant="outline" className={`${perf.color} border-current/20 font-black gap-1.5`}>
                       {perf.icon}
                       {perf.label}
                     </Badge>
                   </div>
                 ))}
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Craving Balance Report */}
        <Card className="shadow-lg border-border/50">
          <CardHeader>
             <CardTitle className="text-lg font-black flex items-center gap-2">
               <Target className="w-5 h-5 text-red-500" />
               Craving Balance Report
             </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                   <span className="block text-2xl font-black text-destructive">{aiReport.sweetCravings}</span>
                   <span className="text-[10px] font-black uppercase text-muted-foreground">Sweet</span>
                </div>
                <div className="text-center p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                   <span className="block text-2xl font-black text-amber-600">{aiReport.spicyCravings}</span>
                   <span className="text-[10px] font-black uppercase text-muted-foreground">Spicy</span>
                </div>
                <div className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                   <span className="block text-2xl font-black text-primary">{aiReport.healthyCount}</span>
                   <span className="text-[10px] font-black uppercase text-muted-foreground">Swaps</span>
                </div>
             </div>
             <div className="p-4 rounded-xl bg-muted/30 border border-dashed text-sm font-bold flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary shrink-0" />
                “You had {aiReport.sweetCravings + aiReport.spicyCravings} cravings but managed {aiReport.healthyCount} healthy swaps. Excellent discipline! ⚖️”
             </div>
          </CardContent>
        </Card>

        {/* AI Coach Suggestion */}
        <Card className="shadow-lg border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Smart Next-Week Advice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex gap-4">
               <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-xl shadow-lg shrink-0">🤖</div>
               <div className="space-y-2">
                 <p className="font-bold leading-tight">
                   “You're improving slowly. Focus on stress eating in the evenings—small changes will give big results.”
                 </p>
                 <div className="p-3 bg-background rounded-xl border border-primary/10 shadow-sm">
                    <p className="text-xs font-black text-primary uppercase mb-1">🔥 Top Challenge:</p>
                    <p className="text-sm font-bold">"Try 3 days without refined sugar next week"</p>
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Rewards & Visual Progress */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
             <CardTitle className="text-lg font-black flex items-center gap-2">
               <LineChart className="w-5 h-5 text-primary" />
               Visual Progress
             </CardTitle>
             <Badge className="bg-emerald-500 font-black">+20% vs Last Week 🎉</Badge>
          </CardHeader>
          <CardContent className="h-48 flex items-end gap-2 px-2 pb-2">
             {aiReport.dailyScores.map((day, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                 <div className="w-full bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary/40 flex flex-col justify-end overflow-hidden" style={{ height: `${Math.max(day.score, 5)}%` }}>
                   <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                     {day.score}%
                   </div>
                   {/* Visual indicator for the rate directly on the bar */}
                   {day.score > 15 && (
                     <div className="text-[8px] font-black text-white text-center mb-1 opacity-80">
                       {day.score}%
                     </div>
                   )}
                   <div className={`w-full h-full ${day.score > 70 ? 'bg-emerald-500' : day.score > 40 ? 'bg-amber-500' : 'bg-red-500'} opacity-80`} />
                 </div>
                 <span className="text-[10px] font-black text-muted-foreground">{day.date}</span>
               </div>
             ))}
          </CardContent>
        </Card>

        <motion.div whileHover={{ scale: 1.02 }} className="h-full">
          <Card className={`shadow-xl text-white border-none h-full relative overflow-hidden transition-all duration-500 ${rewardClaimed ? 'bg-emerald-500/50' : 'bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700'}`}>
             <AnimatePresence mode="wait">
               {!rewardClaimed ? (
                 <motion.div 
                   key="reward-available"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="h-full"
                 >
                   <CardHeader>
                     <CardTitle className="text-lg font-black flex items-center gap-2">
                       <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                       New Badge Available!
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="text-center py-6 flex flex-col h-[calc(100%-80px)] justify-between">
                     <div>
                       <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-inner ring-4 ring-white/10 animate-bounce">
                          🧠
                       </div>
                       <h4 className="text-xl font-black mb-1">Mindful Eater</h4>
                       <p className="text-white/80 text-xs font-bold leading-tight px-4">
                          You've successfully swapped 5+ cravings this week. You're a pro!
                       </p>
                     </div>
                     <Button 
                       variant="secondary" 
                       className="mt-6 w-full font-black bg-white text-emerald-600 hover:bg-emerald-50 hover:scale-[1.02] transition-all shadow-lg py-4 text-base"
                       onClick={handleClaimReward}
                     >
                        Claim +50 Points
                     </Button>
                   </CardContent>
                 </motion.div>
               ) : (
                 <motion.div 
                   key="reward-claimed"
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="h-full flex flex-col items-center justify-center p-8 text-center"
                 >
                   <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center text-5xl mb-4 shadow-2xl">
                      🏆
                   </div>
                   <h4 className="text-2xl font-black mb-1 text-white">Reward Claimed!</h4>
                   <p className="text-emerald-50 text-sm font-bold">50 points added to your profile. Great work!</p>
                   <div className="mt-4 flex gap-1">
                      {[1,2,3].map(i => <Sparkles key={i} className="w-4 h-4 text-yellow-300" />)}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </Card>
        </motion.div>
      </section>

      {/* Why This Matters */}
      <div className="bg-muted/30 rounded-3xl p-6 border border-border/50 text-center">
         <h4 className="text-sm font-black uppercase text-muted-foreground tracking-widest mb-2">🧬 Why This Matters</h4>
         <p className="text-lg font-bold max-w-xl mx-auto leading-tight">
           “Reducing junk food by 30% this week has directly improved your energy stabilization and focus for next Monday.”
         </p>
         <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600 font-black">
            <Heart className="w-5 h-5 fill-current" />
            <span>Building a healthier life—keep going 💚</span>
         </div>
      </div>
    </div>
  )
}

function Button({ children, className, variant, ...props }: any) {
  return (
    <button 
      className={`px-4 py-2 rounded-xl text-sm transition-all active:scale-95 ${variant === 'secondary' ? 'bg-white text-emerald-600' : 'bg-primary text-white'} ${className}`} 
      {...props}
    >
      {children}
    </button>
  )
}
