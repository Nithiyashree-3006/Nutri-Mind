import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, Send, Sparkles, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

type Message = {
  id: string
  role: "assistant" | "user"
  text: string
  timestamp: string
}

const PRESET_QUESTIONS = [
  "Why do I crave sugar?",
  "How to reduce cravings?",
  "Best foods for stress?",
  "Why am I hungry at night?",
]

const AI_KNOWLEDGE: Record<string, string> = {
  "Why do I crave sugar?": "Sugar cravings often stem from fluctuations in blood glucose levels, poor sleep, or high stress. When you eat sugar, your brain releases dopamine, reinforcing the craving. Try complex carbs or sweet fruits to satisfy the physical need without the crash.",
  "How to reduce cravings?": "Cravings can be reduced by ensuring you eat enough protein and fiber throughout the day, staying hydrated, managing stress, and getting 7-8 hours of sleep. A balanced circadian rhythm is key.",
  "Best foods for stress?": "Foods rich in magnesium (spinach, almonds), omega-3s (salmon, chia seeds), and vitamin C (oranges, bell peppers) help lower cortisol levels. Complex carbs also help your brain produce serotonin.",
  "Why am I hungry at night?": "Nighttime hunger is usually caused by inadequate calorie or protein intake during the day, or simply staying up too late, which disrupts hormones like ghrelin and leptin. Try a light protein snack like Greek yogurt.",
}

export default function AICoachTab() {
  const { user } = useAuth()
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      text: "Hi there! I'm your NutriMind AI coach. Ask me anything about your cravings, nutrition, or behavior.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputStr, setInputStr] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) return
    const saved = localStorage.getItem(`nutrimind-chat-${user.id}`)
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch (e) {}
    }
  }, [user])

  useEffect(() => {
    if (!user) return
    if (messages.length === 1 && messages[0].id === "init") return
    localStorage.setItem(`nutrimind-chat-${user.id}`, JSON.stringify(messages))
  }, [messages, user])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])
  
  const clearHistory = () => {
    if (!user) return
    const initMsg: Message = {
      id: `init-${Date.now()}`,
      role: "assistant",
      text: "Chat history cleared. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([initMsg])
    localStorage.removeItem(`nutrimind-chat-${user.id}`)
  }

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    setInputStr("")

    setTimeout(() => {
      let aiText = ""
      const lower = text.toLowerCase()
      
      if (AI_KNOWLEDGE[text]) {
        aiText = AI_KNOWLEDGE[text]
      } else if (lower.includes("sugar") || lower.includes("sweet") || lower.includes("candy") || lower.includes("chocolate")) {
        aiText = "Sugar cravings often stem from fluctuations in blood glucose levels, poor sleep, or high stress. Try complex carbs or sweet fruits like berries to satisfy the physical need without the crash."
      } else if (lower.includes("stress") || lower.includes("anxi")) {
        aiText = "When you're stressed, your cortisol levels spike, making you crave high-fat, high-carb comfort foods. Foods rich in magnesium (like almonds or spinach) help lower cortisol. Take a deep breath!"
      } else if (lower.includes("night") || lower.includes("late") || lower.includes("sleep")) {
        aiText = "Nighttime hunger is usually caused by inadequate protein intake during the day. Try a light protein snack like Greek yogurt to avoid disrupting your sleep."
      } else if (lower.includes("salt") || lower.includes("chip") || lower.includes("savory")) {
        aiText = "Craving salty or crunchy foods often points to dehydration or stress. Try drinking a large glass of water first, or snack on roasted chickpeas for a healthy crunch."
      } else if (lower.includes("hello") || lower.includes("hi ") || lower.includes("hey")) {
        aiText = "Hello! I'm your NutriMind AI. How are your cravings today, and what can I help you understand about your eating habits?"
      } else if (lower.includes("calorie") || lower.includes("weight") || lower.includes("fat")) {
        aiText = "Weight goals require a balance of caloric awareness and emotional regulation. Focus on high-protein and high-fiber foods to keep you full longer without spiking calories."
      } else {
        aiText = `That's an interesting point about "${text}". Nutritional science shows that our bodies often crave specific foods when we lack certain macronutrients or emotional balance. I recommend tracking how this feeling correlates with your stress levels and sleep in the dashboard!`
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMsg])
    }, 1000)
  }

  return (
    <Card className="h-[600px] max-h-[75vh] flex flex-col overflow-hidden shadow-lg border-primary/20">
      <CardHeader className="bg-primary/10 py-4 border-b flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          AI Nutrition Coach
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={clearHistory} className="h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="w-4 h-4 mr-1" /> Clear
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "ml-auto" : ""}`}
            >
              <div className={`p-3 rounded-2xl ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"}`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.role === "assistant" ? <Bot className="w-4 h-4 opacity-70" /> : <User className="w-4 h-4 opacity-70" />}
                  <span className="text-xs font-semibold opacity-70">{msg.role === "assistant" ? "NutriAI" : "You"}</span>
                </div>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <span className={`text-xs font-medium text-muted-foreground/80 mt-1 flex ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.timestamp}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>

      <div className="p-4 bg-muted/50 border-t">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {PRESET_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap px-4 py-1.5 bg-background border border-primary/30 text-xs font-bold rounded-full text-primary hover:bg-primary hover:text-white transition-colors shadow-sm flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              {q}
            </button>
          ))}
        </div>
        <form 
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend(inputStr)
          }}
        >
          <Input 
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            placeholder="Ask about your cravings..." 
            className="flex-1 bg-background"
          />
          <Button type="submit" size="icon" disabled={!inputStr.trim()} className="shrink-0 bg-primary">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
