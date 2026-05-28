import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { AlertCircle, X, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUserStats } from "@/contexts/UserStatsContext"

export default function CravingAlert() {
  const { predictCraving } = useUserStats()
  const [isVisible, setIsVisible] = useState(false)
  const [prediction, setPrediction] = useState<{ timeLabel: string; cravedItem: string | undefined; suggestion: string } | null>(null)

  useEffect(() => {
    // Only show once per session to avoid annoying the user
    // In a real app we'd time this closer to the actual prediction hour
    const hasSeenAlert = sessionStorage.getItem("nutrimind-craving-alert-seen")
    if (!hasSeenAlert) {
      const pred = predictCraving()
      setPrediction(pred)
      // Slight delay to allow dashboard to load first
      const timer = setTimeout(() => {
        setIsVisible(true)
        sessionStorage.setItem("nutrimind-craving-alert-seen", "true")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [predictCraving])

  if (!prediction) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-50 mb-6"
        >
          <Card className="border-amber-500/50 shadow-lg bg-amber-500/10 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-amber-600 hover:bg-amber-500/20 rounded-full h-8 w-8"
              onClick={() => setIsVisible(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="bg-amber-500 rounded-full p-2.5 text-white shadow-sm shrink-0 mt-1 sm:mt-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-amber-700 dark:text-amber-500 tracking-tight">AI Craving Alert</h4>
                <p className="text-foreground/90 font-medium leading-relaxed mt-1">
                  You usually crave <span className="font-bold border-b border-amber-500 border-dashed">{prediction.cravedItem || "unhealthy food"}</span> <span className="font-bold">{prediction.timeLabel}</span>. 
                  Try <span className="text-emerald-600 dark:text-emerald-400 font-bold">{prediction.suggestion}</span>
                </p>
              </div>
              <Button 
                onClick={() => {
                  setIsVisible(false)
                  // Could optionally navigate to suggestions tab or log the choice
                  // navigate("/dashboard?tab=substitutions")
                }}
                className="w-full sm:w-auto shrink-0 bg-amber-600 hover:bg-amber-700 text-white shadow-md gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Accept Suggestion
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
