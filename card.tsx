import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Zap, Target, Flame, Sparkles } from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"

type Substitution = {
  junk: string
  junkCals: number
  healthy: string
  healthyCals: number
  benefits: string[]
  tags: string[]
}

const SUBSTITUTIONS_DB: Substitution[] = [
  { junk: "Pizza", junkCals: 800, healthy: "Whole wheat veggie pizza", healthyCals: 450, benefits: ["More fiber", "Less refined flour", "Lower glycemic index"], tags: ["savory", "creamy", "meal", "evening"] },
  { junk: "Burger", junkCals: 650, healthy: "Whole wheat veggie burger", healthyCals: 380, benefits: ["Less fat", "More nutrients", "High fiber"], tags: ["savory", "meal", "afternoon"] },
  { junk: "French fries", junkCals: 450, healthy: "Baked sweet potato fries", healthyCals: 200, benefits: ["Less oil", "More vitamins", "Vitamin A rich"], tags: ["savory", "salty", "snack", "afternoon"] },
  { junk: "Potato chips", junkCals: 400, healthy: "Roasted makhana", healthyCals: 120, benefits: ["Low fat", "High fiber", "Rich in minerals"], tags: ["salty", "crunchy", "snack", "afternoon", "bored"] },
  { junk: "Soft drinks", junkCals: 150, healthy: "Fresh fruit juice", healthyCals: 60, benefits: ["Natural sugars", "Vitamins", "Antioxidants"], tags: ["sweet", "liquid", "afternoon"] },
  { junk: "Ice cream", junkCals: 350, healthy: "Frozen yogurt", healthyCals: 180, benefits: ["Lower fat", "Probiotics", "Digestive health"], tags: ["sweet", "creamy", "dessert", "night", "stressed"] },
  { junk: "Chocolate bar", junkCals: 250, healthy: "Dark chocolate (70%)", healthyCals: 150, benefits: ["Less sugar", "Antioxidants", "Mood booster"], tags: ["sweet", "snack", "evening", "stressed"] },
  { junk: "Milkshake", junkCals: 400, healthy: "Banana smoothie", healthyCals: 220, benefits: ["Natural sweetness", "Potassium", "No added sugar"], tags: ["sweet", "creamy", "liquid", "morning"] },
  { junk: "White bread", junkCals: 150, healthy: "Whole wheat bread", healthyCals: 110, benefits: ["More fiber", "Better digestion"], tags: ["savory", "morning", "meal"] },
  { junk: "Instant noodles", junkCals: 450, healthy: "Whole wheat noodles with veggies", healthyCals: 280, benefits: ["More nutrients", "Complex carbs"], tags: ["savory", "spicy", "meal", "night", "bored"] },
  { junk: "Fried chicken", junkCals: 600, healthy: "Grilled paneer or tofu", healthyCals: 250, benefits: ["Less oil", "High protein", "Lean muscle fuel"], tags: ["savory", "spicy", "protein", "meal", "evening"] },
  { junk: "Fried rice", junkCals: 550, healthy: "Brown rice veggie bowl", healthyCals: 320, benefits: ["High fiber", "Stable energy"], tags: ["savory", "meal", "afternoon"] },
  { junk: "Sugary cereal", junkCals: 220, healthy: "Oats with fruits", healthyCals: 180, benefits: ["Low sugar", "High fiber", "Heart healthy"], tags: ["sweet", "morning", "meal"] },
  { junk: "Candy", junkCals: 200, healthy: "Dates or dry fruits", healthyCals: 120, benefits: ["Natural sugar", "Iron rich", "Fiber"], tags: ["sweet", "snack", "afternoon", "bored"] },
  { junk: "Donuts", junkCals: 350, healthy: "Baked whole wheat muffins", healthyCals: 160, benefits: ["Less oil", "Whole grain goodness"], tags: ["sweet", "morning", "snack"] },
  { junk: "Cake", junkCals: 400, healthy: "Banana oat cake", healthyCals: 210, benefits: ["No refined sugar", "Fiber rich"], tags: ["sweet", "dessert", "evening"] },
  { junk: "Biscuits", junkCals: 180, healthy: "Oats cookies", healthyCals: 120, benefits: ["More fiber", "Satisfying crunch"], tags: ["sweet", "snack", "evening"] },
  { junk: "Nachos", junkCals: 480, healthy: "Baked tortilla chips", healthyCals: 240, benefits: ["Less fat", "Whole grain corn"], tags: ["savory", "crunchy", "snack", "night"] },
  { junk: "Cheese dip", junkCals: 300, healthy: "Hummus", healthyCals: 150, benefits: ["Healthy fats", "Plant protein"], tags: ["creamy", "savory", "snack", "afternoon"] },
  { junk: "Mayonnaise", junkCals: 100, healthy: "Greek yogurt dip", healthyCals: 40, benefits: ["High protein", "Low fat"], tags: ["creamy", "savory", "afternoon"] },
  { junk: "Cream pasta", junkCals: 700, healthy: "Whole wheat pasta with veggies", healthyCals: 350, benefits: ["Less fat", "Complex carbs", "Vitamin rich"], tags: ["creamy", "savory", "meal", "night", "stressed"] },
  { junk: "Butter naan", junkCals: 350, healthy: "Chapati", healthyCals: 120, benefits: ["Less fat", "Easier to digest"], tags: ["savory", "meal", "night"] },
  { junk: "Sugary coffee", junkCals: 250, healthy: "Black coffee with little jaggery", healthyCals: 40, benefits: ["Less sugar", "Metabolism boost"], tags: ["sweet", "liquid", "morning"] },
  { junk: "Energy drinks", junkCals: 180, healthy: "Coconut water", healthyCals: 45, benefits: ["Natural electrolytes", "Hydrating"], tags: ["liquid", "afternoon"] },
  { junk: "Samosa", junkCals: 300, healthy: "Baked samosa", healthyCals: 150, benefits: ["Low oil", "Spices for metabolism"], tags: ["spicy", "savory", "snack", "evening"] },
  { junk: "Pakora", junkCals: 350, healthy: "Grilled veggie bites", healthyCals: 120, benefits: ["Less fat", "Nutrient dense"], tags: ["spicy", "savory", "snack", "evening", "stressed"] },
  { junk: "Pani puri", junkCals: 250, healthy: "Sprouts chaat", healthyCals: 140, benefits: ["High protein", "Less refined flour"], tags: ["spicy", "savory", "snack", "evening"] },
  { junk: "Chaat", junkCals: 350, healthy: "Fruit chaat", healthyCals: 120, benefits: ["More vitamins", "Natural freshness"], tags: ["sweet", "spicy", "snack", "afternoon"] },
  { junk: "White rice", junkCals: 240, healthy: "Brown rice", healthyCals: 210, benefits: ["More fiber", "Lower GI"], tags: ["savory", "meal", "afternoon"] },
  { junk: "Fried fish", junkCals: 450, healthy: "Grilled fish", healthyCals: 220, benefits: ["Less oil", "Omega-3 preservation"], tags: ["savory", "protein", "meal", "night"] },
  { junk: "Sugary tea", junkCals: 120, healthy: "Green tea", healthyCals: 2, benefits: ["Antioxidants", "Zero calories"], tags: ["liquid", "morning", "evening"] },
  { junk: "Cream biscuits", junkCals: 240, healthy: "Whole grain biscuits", healthyCals: 140, benefits: ["Less sugar", "More fiber"], tags: ["sweet", "creamy", "snack", "evening"] },
  { junk: "Butter popcorn", junkCals: 350, healthy: "Air-popped popcorn", healthyCals: 120, benefits: ["Low fat", "High volume"], tags: ["salty", "snack", "night", "bored"] },
  { junk: "Fried paneer", junkCals: 400, healthy: "Grilled paneer", healthyCals: 250, benefits: ["Less oil", "High protein"], tags: ["creamy", "savory", "protein", "evening"] },
  { junk: "Heavy biryani", junkCals: 750, healthy: "Vegetable pulao", healthyCals: 380, benefits: ["Light digestion", "Lower fat"], tags: ["savory", "spicy", "meal", "afternoon"] },
  { junk: "Butter chicken", junkCals: 650, healthy: "Paneer curry", healthyCals: 350, benefits: ["Less fat", "Balanced spices"], tags: ["creamy", "savory", "spicy", "meal", "night"] },
  { junk: "Cola", junkCals: 150, healthy: "Lemon water", healthyCals: 15, benefits: ["Hydration", "Vitamin C boost"], tags: ["liquid", "afternoon"] },
  { junk: "Fried noodles", junkCals: 550, healthy: "Stir-fried whole wheat noodles", healthyCals: 320, benefits: ["Less oil", "More veggies"], tags: ["savory", "spicy", "meal", "night"] },
  { junk: "Candy bars", junkCals: 280, healthy: "Dark chocolate", healthyCals: 160, benefits: ["Less sugar", "Polyphenols"], tags: ["sweet", "snack", "evening", "stressed"] },
  { junk: "Fried corn", junkCals: 250, healthy: "Boiled corn", healthyCals: 100, benefits: ["Low fat", "Natural sweetness"], tags: ["sweet", "snack", "afternoon"] },
  { junk: "Fried cutlets", junkCals: 350, healthy: "Baked cutlets", healthyCals: 180, benefits: ["Less oil", "Clean protein"], tags: ["savory", "spicy", "snack", "evening"] },
  { junk: "Sugary pancakes", junkCals: 400, healthy: "Oats pancakes", healthyCals: 220, benefits: ["More fiber", "Stable energy"], tags: ["sweet", "morning", "meal"] },
  { junk: "Fried dosa", junkCals: 380, healthy: "Plain dosa (less oil)", healthyCals: 210, benefits: ["Less fat", "Fermented benefits"], tags: ["savory", "morning", "meal"] },
  { junk: "Sugary milkshake", junkCals: 450, healthy: "Protein smoothie", healthyCals: 250, benefits: ["Balanced nutrition", "Muscle support"], tags: ["sweet", "creamy", "protein", "morning"] },
  { junk: "Sugary custard", junkCals: 280, healthy: "Greek yogurt with fruits", healthyCals: 150, benefits: ["High protein", "Probiotics"], tags: ["sweet", "creamy", "dessert", "night"] },
  { junk: "Chicken biriyani", junkCals: 750, healthy: "Brown rice chicken biriyani", healthyCals: 450, benefits: ["Less oil", "Higher fiber"], tags: ["savory", "spicy", "meal", "afternoon"] },
  { junk: "Chicken 65", junkCals: 450, healthy: "Air-fried chicken 65", healthyCals: 180, benefits: ["Same taste", "Less deep frying"], tags: ["spicy", "savory", "snack", "evening", "stressed"] },
  { junk: "Chicken momos (fried)", junkCals: 400, healthy: "Steamed chicken momos", healthyCals: 220, benefits: ["No deep frying", "Lighter digestion"], tags: ["savory", "spicy", "snack", "evening"] },
  { junk: "Atho", junkCals: 500, healthy: "Homemade atho (Less oil)", healthyCals: 250, benefits: ["Less oil", "More fiber"], tags: ["spicy", "savory", "meal", "evening"] }
]

const getEmoji = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes("pizza")) return "🍕"
  if (n.includes("burger")) return "🍔"
  if (n.includes("chicken") || n.includes("65")) return "🍗"
  if (n.includes("biriyani") || n.includes("rice")) return "🍛"
  if (n.includes("chips") || n.includes("french")) return "🍟"
  if (n.includes("momo")) return "🥟"
  if (n.includes("juice") || n.includes("drink") || n.includes("cola")) return "🥤"
  if (n.includes("soup")) return "🥣"
  if (n.includes("coffee") || n.includes("tea")) return "☕"
  if (n.includes("dessert") || n.includes("cake") || n.includes("ice cream")) return "🍨"
  return "🍱"
}

export default function SubstitutionsTab() {
  const { user } = useAuth()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Substitution[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedTaste, setSelectedTaste] = useState<string | null>(null)

  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    if (hour < 21) return "evening"
    return "night"
  }

  const getSmartRecommendations = () => {
    const time = getTimeOfDay()
    
    return SUBSTITUTIONS_DB.filter(s => {
      const matchesTime = s.tags.includes(time)
      const matchesTaste = selectedTaste ? s.tags.includes(selectedTaste.toLowerCase()) : true
      
      return matchesTime && matchesTaste
    }).slice(0, 4)
  }

  const applyGoalToSubstitution = (sub: Substitution): Substitution => {
    const goal = user?.goal || "Balanced Diet"
    let updatedSub = { ...sub }

    if (goal === "Weight Loss") {
      if (sub.junk === "Pizza") {
        updatedSub.healthy = "Cauliflower Crust Thin Pizza"
        updatedSub.healthyCals = 250
        updatedSub.benefits = ["Ultra Low Carb", "High Volume", "Weight Loss Approved"]
      } else if (sub.junkCals > 400 && sub.healthyCals > 250) {
        updatedSub.healthyCals = Math.floor(updatedSub.healthyCals * 0.8)
        updatedSub.benefits = ["Calorie Controlled", "Keto-friendly Option", ...sub.benefits.slice(0, 1)]
      }
    } else if (goal === "Muscle Gain") {
      if (sub.healthy.includes("Wrap") || sub.healthy.includes("Chicken")) {
        updatedSub.healthy = "Double Protein " + updatedSub.healthy
        updatedSub.healthyCals = Math.floor(updatedSub.healthyCals * 1.2)
        updatedSub.benefits = ["High Protein", "Muscle Recovery", ...sub.benefits]
      }
    }

    return updatedSub
  }

  const handleSearch = () => {
    if (!query.trim()) return
    const q = query.toLowerCase()
    
    let matches = SUBSTITUTIONS_DB.filter(s => 
      s.junk.toLowerCase().includes(q) || 
      s.healthy.toLowerCase().includes(q)
    )
    
    if (matches.length === 0) {
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
      matches = [{
        junk: query.trim().split(" ").map(capitalize).join(" "),
        junkCals: 500,
        healthy: "Homemade " + query.trim() + " (Less Oil)",
        healthyCals: 300,
        benefits: ["Personalized Choice", "Fresh Ingredients", "Nutrient Dense"],
        tags: ["custom", "savory"]
      }]
    }
    
    setResults(matches.map(applyGoalToSubstitution))
    setHasSearched(true)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="bg-gradient-to-br from-primary/20 via-background to-emerald-500/10 border-primary/20 shadow-2xl overflow-hidden relative backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <CardContent className="p-10 relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <motion.div 
                initial={{ rotate: -10 }} 
                animate={{ rotate: 0 }}
                className="inline-flex p-4 rounded-3xl bg-primary/10 mb-2 shadow-inner ring-1 ring-primary/20"
              >
                <Target className="w-10 h-10 text-primary" />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-600 to-primary/80">
                  Smart Substitutions
                </h2>
                <p className="text-muted-foreground font-medium text-lg">Craving something? Let's find a realistic, healthier version together.</p>
              </div>
              
              <div className="flex gap-3 max-w-lg mx-auto pt-4">
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="e.g., Pizza, Biriyani, Chicken 65..." 
                    className="h-14 pl-12 text-lg bg-background/80 backdrop-blur-sm shadow-lg border-primary/20 focus-visible:ring-primary rounded-2xl transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button size="lg" className="h-14 px-10 font-black text-lg bg-primary hover:bg-primary/90 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all" onClick={handleSearch}>
                  Find
                </Button>
              </div>

              <div className="flex flex-col gap-5 items-center pt-6">
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] self-center mr-2 opacity-50">Filter by Taste</span>
                  {['Spicy', 'Sweet', 'Creamy', 'Savory'].map(taste => (
                    <Badge 
                      key={taste} 
                      variant={selectedTaste === taste ? "default" : "outline"}
                      className={`cursor-pointer font-black px-4 py-1.5 rounded-full transition-all hover:scale-110 active:scale-90 border-primary/20 ${selectedTaste === taste ? 'shadow-lg shadow-primary/30' : 'bg-background/50'}`}
                      onClick={() => setSelectedTaste(selectedTaste === taste ? null : taste)}
                    >
                      {taste}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {!hasSearched && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase text-muted-foreground tracking-[0.3em] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              AI Suggestions for {getTimeOfDay()}
            </h3>
            {selectedTaste && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedTaste(null)} className="text-[10px] font-black h-auto py-0 text-primary hover:bg-transparent">Clear Filters</Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {getSmartRecommendations().map((item, i) => (
                 <motion.div
                   key={item.junk}
                   layout
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ delay: i * 0.05 }}
                 >
                   <Card 
                     className="cursor-pointer hover:border-primary/50 transition-all hover:bg-primary/5 active:scale-95 group border-2 border-primary/5 shadow-lg hover:shadow-primary/10 rounded-3xl overflow-hidden h-full" 
                     onClick={() => { setQuery(item.junk); setHasSearched(true); setResults([item]) }}
                   >
                     <CardContent className="p-6 flex flex-col gap-4">
                       <div className="flex items-center justify-between">
                         <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                           {getEmoji(item.junk)}
                         </div>
                         <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <ArrowRight className="w-4 h-4 text-primary" />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <div className="flex flex-wrap gap-1">
                           {item.tags.filter(t => !['morning', 'afternoon', 'evening', 'night'].includes(t)).slice(0, 2).map(t => (
                             <span key={t} className="text-[8px] font-black uppercase text-primary/60 tracking-wider bg-primary/5 px-2 py-0.5 rounded-full">{t}</span>
                           ))}
                         </div>
                         <h4 className="font-black text-base leading-tight group-hover:text-primary transition-colors">{item.junk}</h4>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>
              ))}
            </AnimatePresence>
            {getSmartRecommendations().length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-16 text-center bg-muted/10 rounded-[3rem] border-2 border-dashed border-muted-foreground/10">
                <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">No matching cravings found</p>
                <p className="text-xs font-bold text-muted-foreground/60 mt-1">Try a different taste or clear filters!</p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {hasSearched && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Comparison: Original vs Suggested
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setHasSearched(false)} className="text-muted-foreground font-bold">Clear</Button>
            </div>
            
            {results.length > 0 ? (
              <div className="grid gap-6">
                {results.map((item, idx) => {
                  const saved = item.junkCals - item.healthyCals
                  return (
                    <Card key={idx} className="overflow-hidden border-2 border-emerald-500/20 shadow-xl relative bg-gradient-to-br from-background to-emerald-500/5">
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-md z-20">
                        <Flame className="w-3 h-3" />
                        -{saved} kcal
                      </div>
                      
                      <CardContent className="p-6 md:p-8 space-y-6">
                        <div className="space-y-4">
                          {/* Original Line */}
                          <div className="flex items-center gap-3">
                            <span className="text-3xl filter grayscale opacity-70">{getEmoji(item.junk)}</span>
                            <h4 className="text-2xl font-black text-foreground/40 line-through">{item.junk}</h4>
                          </div>

                          {/* Arrow Line */}
                          <div className="flex items-center gap-3 ml-1">
                            <div className="h-8 w-0.5 bg-emerald-500/20 ml-4"></div>
                            <span className="text-emerald-500 font-black">➡️</span>
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-600">✅</span>
                              <h4 className="text-2xl font-black text-primary leading-tight">{item.healthy}</h4>
                            </div>
                          </div>
                        </div>

                        {/* Benefit Quote Box */}
                        <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-5 border-l-4 border-emerald-500 shadow-sm space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">💡</span>
                            <p className="text-sm font-bold text-foreground/80 italic">
                              "{item.benefits[0].charAt(0).toUpperCase() + item.benefits[0].slice(1)}, {item.benefits[1] || 'better for your goals'}"
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.benefits.map((b, i) => (
                              <Badge key={i} variant="outline" className="text-[10px] uppercase font-black tracking-tighter bg-emerald-500/5 border-emerald-500/20">
                                {b}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                <p className="text-muted-foreground font-bold">No alternatives found. Try a different snack!</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
