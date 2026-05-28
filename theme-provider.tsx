import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUserStats } from "@/contexts/UserStatsContext"
import { BrainCircuit, Activity, Clock, UtensilsCrossed } from "lucide-react"

const getTimeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function PatternsTab() {
  const { stats, getPatterns } = useUserStats()
  const patterns = getPatterns()
  const recentHistory = stats.history.slice(0, 5)

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-primary/20">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>AI Pattern Analysis</CardTitle>
              <CardDescription>We analyze your logs to uncover emotional eating triggers.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {patterns.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {patterns.map((p: any, i: number) => (
                <motion.div 
                   key={p.pattern}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className={`flex items-center justify-between p-4 rounded-xl border ${p.type === 'trigger' ? 'bg-amber-500/5 border-amber-200' : 'bg-emerald-500/5 border-emerald-200'}`}
                >
                   <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-full shadow-sm ${p.type === 'trigger' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                       {p.type === 'trigger' ? <UtensilsCrossed className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                     </div>
                     <div>
                       <p className="font-bold text-lg leading-tight">{p.pattern}</p>
                       <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">
                         {p.type === 'trigger' ? 'Emotional Trigger' : 'Positive Habit'}
                       </p>
                     </div>
                   </div>
                   <Badge variant={p.type === 'trigger' ? 'destructive' : 'default'} className={`text-sm px-3 font-black ${p.type === 'habit' ? 'bg-emerald-600' : ''}`}>
                     {p.frequency}x
                   </Badge>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-muted-foreground/20">
              <BrainCircuit className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4 animate-pulse" />
              <h3 className="text-lg font-bold text-foreground mb-1">Detecting Patterns...</h3>
              <p className="max-w-xs mx-auto">Keep logging your meals! We need at least 2 logs of a specific mood + food combination to identify a pattern.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 opacity-60">
                <Badge variant="outline" className="text-[10px] font-black uppercase">Triggers (Cravings)</Badge>
                <Badge variant="outline" className="text-[10px] font-black uppercase">Positive Habits</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold tracking-tight mt-8 mb-4">Recent Eating History</h2>
      {recentHistory.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {recentHistory.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex flex-col sm:flex-row items-center gap-4 p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-xl w-full sm:w-24 shrink-0 text-center">
                    <Clock className="w-4 h-4 text-muted-foreground mb-1" />
                    <span className="text-xs font-semibold">{getTimeAgo(item.timestamp)}</span>
                  </div>
                  
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold">{item.food.name}</h4>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{item.food.calories} kcal</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Mood: {item.mood}</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Stress: {item.stressLevel}/10</span>
                      {item.cravedItem && (
                        <span className="flex items-center gap-1"><UtensilsCrossed className="w-3 h-3 text-amber-500"/> Craved: {item.cravedItem}</span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <UtensilsCrossed className="w-12 h-12 mb-4 text-muted-foreground/30" />
            <p className="text-lg font-medium text-foreground">No history yet</p>
            <p>Your logged choices will appear here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
