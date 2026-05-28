import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Check, CheckCircle2, AlertTriangle, AlertCircle, Info, Clock, HeartPulse } from "lucide-react"

import { useUserStats, type Mood } from "@/contexts/UserStatsContext"
import { useAuth } from "@/contexts/AuthContext"
import { foodDatabase, type Category, type FoodItem } from "@/data/foods"
import { getCurrentTimeOfDay, getTimeMetadata } from "@/lib/time"
import HabitTracker from "./HabitTracker"

const ALL_MOODS: Mood[] = ["Happy", "Stressed", "Anxious", "Energetic", "Tired", "Calm", "Sad", "Excited", "Bored"]
const ALL_TASTES: Category[] = ["Sweet", "Savory", "Spicy", "Crunchy", "Creamy", "Salty"]

export default function HomeTab() {
  const { logHealthyChoice, stats } = useUserStats()
  const { user } = useAuth()
  
  // Form State
  const [mood, setMood] = useState<Mood>("Calm")
  const [stress, setStress] = useState([5])
  const [sleep, setSleep] = useState("7")
  const [preferences, setPreferences] = useState<Category[]>([])
  
  // Results State
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [recommendations, setRecommendations] = useState<FoodItem[]>([])
  const [isFallback, setIsFallback] = useState(false)
  
  const timeOfDay = getCurrentTimeOfDay()
  const timeMeta = getTimeMetadata(timeOfDay)

  // Real-time Clock logic for display
  const now = new Date()
  const displayTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const displayDate = now.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })
  const displayDay = now.toLocaleDateString([], { weekday: 'long' })

  // Calculate Risk
  const sleepValue = parseFloat(sleep) || 0
  const stressValue = stress[0]
  
  let riskLevel = "Low"
  let riskColor = "bg-emerald-500"
  let riskIcon = <CheckCircle2 className="w-6 h-6 text-emerald-500" />
  let riskMessage = "You're in a good state to make healthy choices naturally."
  
  if (stressValue > 7 || sleepValue < 5) {
    riskLevel = "High"
    riskColor = "bg-red-500"
    riskIcon = <AlertTriangle className="w-6 h-6 text-red-500" />
    riskMessage = "High risk of stress-eating or sugar cravings. Stick to the suggested alternatives!"
  } else if ((stressValue >= 5 && stressValue <= 7) || (sleepValue >= 5 && sleepValue < 7)) {
    riskLevel = "Moderate"
    riskColor = "bg-yellow-500"
    riskIcon = <AlertCircle className="w-6 h-6 text-yellow-500" />
    riskMessage = "Moderate craving risk. Be mindful of emotional triggers."
  }

  const getWellnessSuggestion = () => {
    switch (mood) {
      case "Stressed":
      case "Anxious":
        return { msg: "You seem stressed. Try a 5-minute walk or meditation to re-canter.", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" }
      case "Bored":
        return { msg: "Boredom often triggers snacking! Try reading a chapter or doing a light activity.", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30" }
      case "Tired":
        return { msg: "You seem tired. Consider drinking a glass of cold water or taking a 20min power nap.", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/30" }
      case "Sad":
        return { msg: "We're here for you. Reach out to a friend or go for a gentle walk outside.", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30" }
      case "Happy":
      case "Energetic":
      case "Excited":
        return { msg: "You're in a great mood! Keep the momentum going with a healthy choice.", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" }
      default:
        return { msg: "Stay balanced and remember to stay hydrated throughout the day.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" }
    }
  }

  const wellnessTip = getWellnessSuggestion()

  const togglePreference = (pref: Category) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    )
  }

  const getRecommendations = () => {
    const userGoal = user?.goal || "Balanced Diet"
    
    // 1. Hard Filter: Time of Day (Essential for breakfast vs dinner logic)
    const timePool = foodDatabase.filter(food => food.timeOfDay.includes(timeOfDay))
    
    // 2. Scoring System
    const scoredPool = timePool.map(food => {
      let score = 0
      
      // Taste Preference Score (Highest Priority)
      if (preferences.length > 0) {
        const matchesTaste = food.category.some(cat => preferences.includes(cat))
        if (matchesTaste) score += 10
      }
      
      // Goal Score
      if (userGoal === "Weight Loss" && food.calories < 300) score += 5
      else if (userGoal === "Muscle Gain" && (food.protein > 15 || food.calories > 300)) score += 5
      else if (userGoal === "Balanced Diet") score += 2
      
      // Mood Score
      if (food.moods && food.moods.includes(mood)) score += 3
      
      return { ...food, score }
    })

    // 3. Sort by Score and Shuffle slightly for variety among top matches
    const topScored = scoredPool.sort((a, b) => b.score - a.score)
    const highestScore = topScored[0]?.score || 0
    
    // Pick from items that are within a reasonable range of the top score to allow variety
    const bestMatches = topScored.filter(f => f.score >= Math.max(highestScore - 5, 0))
    const shuffled = [...bestMatches].sort(() => 0.5 - Math.random())
    
    // Determine if we had to fall back (no taste match)
    const hasTasteMatch = preferences.length > 0 && bestMatches.some(f => f.category.some(cat => preferences.includes(cat)))
    setIsFallback(preferences.length > 0 && !hasTasteMatch)

    setRecommendations(shuffled.slice(0, 6))
    setHasSubmitted(true)
  }

  const handleEat = (food: FoodItem) => {
    logHealthyChoice({
      mood,
      stressLevel: stressValue,
      sleepHours: sleepValue,
      food
    })
    
    const newPoints = stats.points + 10
    const message = `Amazing choice! 🥗 You've logged ${food.name}.\n+10 points (Total: ${newPoints})\nKeep that ${stats.currentStreak + 1} day streak alive!`
    alert(message)
  }

  return (
    <div className="space-y-6">
      {/* Habit Tracker at the top */}
      <HabitTracker />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="shadow-md border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold uppercase tracking-tighter">
              Goal: {user?.goal || "Balanced Diet"}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">How are you feeling?</CardTitle>
            <CardDescription>We'll predict your craving risk based on this.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Current Mood</Label>
              <div className="flex flex-wrap gap-2">
                {ALL_MOODS.map(m => (
                  <Badge 
                    key={m} 
                    variant={mood === m ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 text-sm font-normal hover:bg-primary hover:text-white transition-colors"
                    onClick={() => setMood(m)}
                  >
                    {m}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Stress Level</Label>
                <span className="font-bold text-primary">{stressValue}/10</span>
              </div>
              <Slider value={stress} onValueChange={setStress} min={1} max={10} step={1} />
            </div>

            <div className="space-y-2">
              <Label>Sleep Last Night (hours)</Label>
              <Input 
                type="number" 
                min="0" max="24" step="0.5" 
                value={sleep} 
                onChange={(e) => setSleep(e.target.value)} 
              />
            </div>

            <div className="space-y-3">
              <Label>What are you craving? (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                {ALL_TASTES.map(t => (
                  <Badge 
                    key={t} 
                    variant={preferences.includes(t) ? "secondary" : "outline"}
                    className="cursor-pointer px-3 py-1 font-normal"
                    onClick={() => togglePreference(t)}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white shadow-md text-lg h-12" onClick={getRecommendations}>
              Analyze & Get Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Dynamic Context & Meter */}
        <div className="space-y-6">
          <Card className="shadow-sm border-secondary/20 bg-gradient-to-br from-card to-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Time Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl"></div>
                <div className="text-5xl drop-shadow-md">{timeMeta.emoji}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-2xl text-foreground">{displayTime}</h4>
                    <Badge variant="outline" className="bg-background text-[10px] font-black uppercase h-5">{timeOfDay}</Badge>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground">{displayDay}, {displayDate}</p>
                  <p className="text-xs text-secondary font-black uppercase tracking-widest mt-2">{timeMeta.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Craving Risk Meter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/30 border space-y-4">
                <div className="flex items-center justify-center p-4 rounded-full bg-background shadow-md">
                  {riskIcon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${stressValue > 7 || sleepValue < 5 ? "text-red-500" : (stressValue >= 5 || sleepValue < 7) ? "text-yellow-500" : "text-emerald-500"}`}>
                    {riskLevel} Risk
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    {riskMessage}
                  </p>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden mt-6 flex shadow-inner">
                  <div className={`h-full transition-all duration-700 ease-out ${riskColor}`} style={{ width: riskLevel === 'High' ? '90%' : riskLevel === 'Moderate' ? '50%' : '15%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Suggestion Card */}
          <motion.div
            key={mood}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`shadow-sm border ${wellnessTip.border} ${wellnessTip.bg} transition-colors`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`p-2 rounded-full bg-background shadow-sm ${wellnessTip.color}`}>
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-sm mb-1 ${wellnessTip.color}`}>Wellness Tip</h4>
                  <p className="text-sm font-medium text-foreground/80 leading-snug">
                    {wellnessTip.msg}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Recommendations */}
      <AnimatePresence>
        {hasSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mt-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">Your Smart Choices</h2>
              {isFallback && (
                <div className="flex items-center text-amber-500 text-sm font-medium gap-2 px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                  <Info className="w-4 h-4" />
                  Showing general {timeOfDay} options based on time.
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((food, i) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-all hover:border-primary/50 relative overflow-hidden group hover:-translate-y-1">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{food.name}</CardTitle>
                        <Badge variant="outline" className="whitespace-nowrap bg-background font-bold text-primary">
                          {food.calories} kcal
                        </Badge>
                      </div>
                      <div className="flex gap-1.5 flex-wrap mt-3">
                        {food.category.map(c => <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">{c}</span>)}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                      <div className="flex justify-between text-sm mb-5 bg-muted/60 px-4 py-2 rounded-lg border border-border/50">
                        <div className="flex flex-col items-center"><span className="text-[10px] uppercase text-muted-foreground font-bold">Protein</span><span className="font-semibold">{food.protein}g</span></div>
                        <div className="flex flex-col items-center"><span className="text-[10px] uppercase text-muted-foreground font-bold">Carbs</span><span className="font-semibold">{food.carbs}g</span></div>
                        <div className="flex flex-col items-center"><span className="text-[10px] uppercase text-muted-foreground font-bold">Fat</span><span className="font-semibold">{food.fat}g</span></div>
                      </div>
                      <ul className="space-y-2">
                        {food.benefits.map((b, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button className="w-full gap-2 transition-transform active:scale-95 bg-primary/10 text-primary hover:bg-primary hover:text-white group-hover:shadow-md" onClick={() => handleEat(food)}>
                        I ate this! <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {recommendations.length === 0 && (
              <div className="text-center p-8 bg-muted border border-dashed border-muted-foreground/30 rounded-xl">
                <p className="text-muted-foreground">No recommendations found for this time. Try adjusting preferences.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
