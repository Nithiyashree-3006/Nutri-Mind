export type Category = "Sweet" | "Savory" | "Spicy" | "Crunchy" | "Creamy" | "Salty"
export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night" | "Midnight"
export type MoodType = "Happy" | "Stressed" | "Anxious" | "Energetic" | "Tired" | "Calm" | "Sad" | "Excited" | "Bored"

export interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  benefits: string[]
  timeOfDay: TimeOfDay[]
  category: Category[]
  moods: MoodType[]
}

export const foodDatabase: FoodItem[] = [
  {
    id: "v1",
    name: "Fruit salad",
    calories: 120, protein: 1, carbs: 30, fat: 0,
    benefits: ["High fiber", "Vitamin C", "Natural sugars"],
    timeOfDay: ["Morning", "Evening"],
    category: ["Sweet"],
    moods: ["Happy", "Calm", "Excited"]
  },
  {
    id: "v2",
    name: "Banana smoothie",
    calories: 210, protein: 5, carbs: 45, fat: 2,
    benefits: ["Potassium", "Muscle recovery", "Instant energy"],
    timeOfDay: ["Morning", "Evening"],
    category: ["Sweet", "Creamy"],
    moods: ["Tired", "Sad", "Happy"]
  },
  {
    id: "v3",
    name: "Oats with honey",
    calories: 180, protein: 6, carbs: 35, fat: 3,
    benefits: ["Stable energy", "Heart healthy", "Soothing"],
    timeOfDay: ["Morning", "Night"],
    category: ["Sweet"],
    moods: ["Tired", "Sad", "Calm"]
  },
  {
    id: "v4",
    name: "Idli with chutney",
    calories: 150, protein: 4, carbs: 32, fat: 1,
    benefits: ["Probiotics", "Easy to digest", "Low calorie"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Calm", "Stressed"]
  },
  {
    id: "v5",
    name: "Vegetable poha",
    calories: 220, protein: 4, carbs: 40, fat: 6,
    benefits: ["Iron rich", "Light energy", "Gluten-free"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Happy", "Energetic"]
  },
  {
    id: "v6",
    name: "Upma",
    calories: 210, protein: 5, carbs: 40, fat: 5,
    benefits: ["Warm & filling", "Quick energy", "Digestive health"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Calm", "Happy"]
  },
  {
    id: "v7",
    name: "Apple slices",
    calories: 95, protein: 0, carbs: 25, fat: 0,
    benefits: ["Vitamin C", "Fiber", "Satisfying crunch"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Sweet"],
    moods: ["Calm", "Tired"]
  },
  {
    id: "v8",
    name: "Chia pudding",
    calories: 180, protein: 6, carbs: 15, fat: 11,
    benefits: ["Omega-3s", "Hydrating", "Antioxidants"],
    timeOfDay: ["Morning", "Night"],
    category: ["Sweet", "Creamy"],
    moods: ["Calm", "Sad"]
  },
  {
    id: "v9",
    name: "Buttermilk",
    calories: 60, protein: 3, carbs: 5, fat: 2,
    benefits: ["Cooling", "Probiotics", "Hydrating"],
    timeOfDay: ["Afternoon"],
    category: ["Salty"],
    moods: ["Calm", "Tired"]
  },
  {
    id: "v10",
    name: "Warm lemon water",
    calories: 10, protein: 0, carbs: 2, fat: 0,
    benefits: ["Detoxifying", "Metabolism boost", "Vitamin C"],
    timeOfDay: ["Morning"],
    category: ["Salty"],
    moods: ["Stressed", "Tired"]
  },
  {
    id: "v11",
    name: "Almonds",
    calories: 160, protein: 6, carbs: 6, fat: 14,
    benefits: ["Healthy fats", "Vitamin E", "Brain health"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Crunchy"],
    moods: ["Anxious", "Stressed"]
  },
  {
    id: "v12",
    name: "Walnuts",
    calories: 180, protein: 4, carbs: 4, fat: 18,
    benefits: ["Omega-3s", "Anti-inflammatory", "Heart health"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Crunchy"],
    moods: ["Anxious", "Calm"]
  },
  {
    id: "v13",
    name: "Dates",
    calories: 120, protein: 1, carbs: 30, fat: 0,
    benefits: ["Natural energy", "Fiber", "Iron rich"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Sweet"],
    moods: ["Tired", "Sad"]
  },
  {
    id: "v14",
    name: "Coconut water",
    calories: 45, protein: 0, carbs: 11, fat: 0,
    benefits: ["Electrolytes", "Skin health", "Hydrating"],
    timeOfDay: ["Morning", "Afternoon"],
    category: ["Sweet"],
    moods: ["Tired", "Calm"]
  },
  {
    id: "v15",
    name: "Green tea",
    calories: 2, protein: 0, carbs: 0, fat: 0,
    benefits: ["Antioxidants", "Metabolism", "Focus"],
    timeOfDay: ["Morning", "Evening"],
    category: ["Salty"],
    moods: ["Stressed", "Anxious"]
  },
  {
    id: "v16",
    name: "Herbal tea",
    calories: 2, protein: 0, carbs: 0, fat: 0,
    benefits: ["Relaxing", "Sleep aid", "Caffeine free"],
    timeOfDay: ["Evening", "Night"],
    category: ["Salty"],
    moods: ["Calm", "Anxious"]
  },
  {
    id: "v17",
    name: "Boiled corn",
    calories: 100, protein: 3, carbs: 22, fat: 1,
    benefits: ["Lutein for eyes", "Fiber", "Low GI"],
    timeOfDay: ["Evening"],
    category: ["Salty"],
    moods: ["Bored", "Happy"]
  },
  {
    id: "v18",
    name: "Roasted chickpeas",
    calories: 140, protein: 7, carbs: 22, fat: 3,
    benefits: ["Plant protein", "Satisfying crunch", "Iron"],
    timeOfDay: ["Evening"],
    category: ["Crunchy", "Salty"],
    moods: ["Bored", "Energetic"]
  },
  {
    id: "v19",
    name: "Fox nuts (makhana)",
    calories: 100, protein: 3, carbs: 20, fat: 0,
    benefits: ["Low calorie", "Anti-aging", "Magnesium"],
    timeOfDay: ["Evening"],
    category: ["Crunchy", "Salty"],
    moods: ["Bored", "Calm"]
  },
  {
    id: "v20",
    name: "Carrot sticks",
    calories: 40, protein: 1, carbs: 10, fat: 0,
    benefits: ["Beta-carotene", "Eye health", "Crunchy"],
    timeOfDay: ["Evening"],
    category: ["Crunchy"],
    moods: ["Bored", "Happy"]
  },
  {
    id: "v21",
    name: "Cucumber sticks",
    calories: 30, protein: 1, carbs: 6, fat: 0,
    benefits: ["Hydrating", "Low calorie", "Cooling"],
    timeOfDay: ["Evening"],
    category: ["Crunchy"],
    moods: ["Calm", "Tired"]
  },
  {
    id: "v22",
    name: "Hummus",
    calories: 150, protein: 5, carbs: 15, fat: 8,
    benefits: ["Fiber", "Healthy fats", "Protein"],
    timeOfDay: ["Evening"],
    category: ["Creamy", "Savory"],
    moods: ["Calm", "Happy"]
  },
  {
    id: "v23",
    name: "Dark chocolate (70%)",
    calories: 150, protein: 2, carbs: 12, fat: 11,
    benefits: ["Mood lifter", "Magnesium", "Heart healthy"],
    timeOfDay: ["Evening", "Night"],
    category: ["Sweet"],
    moods: ["Sad", "Stressed"]
  },
  {
    id: "v24",
    name: "Oats cookies (healthy)",
    calories: 160, protein: 3, carbs: 22, fat: 6,
    benefits: ["Controlled sugar", "Fiber", "Satiating"],
    timeOfDay: ["Evening"],
    category: ["Sweet"],
    moods: ["Sad", "Happy"]
  },
  {
    id: "v25",
    name: "Fruit smoothie",
    calories: 180, protein: 4, carbs: 35, fat: 1,
    benefits: ["Vitamin boost", "Refreshing", "Antioxidants"],
    timeOfDay: ["Morning", "Evening"],
    category: ["Sweet", "Creamy"],
    moods: ["Happy", "Excited"]
  },
  {
    id: "v26",
    name: "Sprouts salad",
    calories: 140, protein: 10, carbs: 18, fat: 1,
    benefits: ["Live enzymes", "High protein", "Digestive health"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Energetic", "Happy"]
  },
  {
    id: "v27",
    name: "Paneer wrap",
    calories: 380, protein: 18, carbs: 40, fat: 15,
    benefits: ["Calcium", "Muscle repair", "Sustained energy"],
    timeOfDay: ["Afternoon", "Evening"],
    category: ["Savory", "Spicy"],
    moods: ["Energetic", "Excited"]
  },
  {
    id: "v28",
    name: "Vegetable dosa",
    calories: 220, protein: 5, carbs: 40, fat: 6,
    benefits: ["Balanced meal", "Light", "Probiotics"],
    timeOfDay: ["Morning", "Afternoon"],
    category: ["Savory"],
    moods: ["Happy", "Energetic"]
  },
  {
    id: "v29",
    name: "Khichdi",
    calories: 250, protein: 9, carbs: 48, fat: 3,
    benefits: ["Detoxifying", "Easy digest", "Comforting"],
    timeOfDay: ["Afternoon", "Night"],
    category: ["Savory"],
    moods: ["Tired", "Stressed", "Calm"]
  },
  {
    id: "v30",
    name: "Curd rice",
    calories: 240, protein: 8, carbs: 42, fat: 6,
    benefits: ["Cooling", "Gut health", "B Vitamins"],
    timeOfDay: ["Afternoon", "Night"],
    category: ["Creamy"],
    moods: ["Calm", "Stressed"]
  },
  {
    id: "v31",
    name: "Vegetable soup",
    calories: 120, protein: 4, carbs: 20, fat: 2,
    benefits: ["Hydrating", "Vitamin rich", "Warmth"],
    timeOfDay: ["Night"],
    category: ["Savory"],
    moods: ["Tired", "Calm", "Sad"]
  },
  {
    id: "v32",
    name: "Tomato soup",
    calories: 90, protein: 2, carbs: 15, fat: 2,
    benefits: ["Lycopene", "Comforting", "Low calorie"],
    timeOfDay: ["Night"],
    category: ["Savory"],
    moods: ["Sad", "Tired"]
  },
  {
    id: "v33",
    name: "Millet porridge",
    calories: 180, protein: 5, carbs: 35, fat: 2,
    benefits: ["Fiber rich", "Magnesium", "Heart healthy"],
    timeOfDay: ["Night"],
    category: ["Savory"],
    moods: ["Calm", "Tired"]
  },
  {
    id: "v34",
    name: "Sweet potato (baked)",
    calories: 110, protein: 2, carbs: 26, fat: 0,
    benefits: ["Vitamin A", "Stable energy", "Fiber"],
    timeOfDay: ["Evening", "Night"],
    category: ["Sweet"],
    moods: ["Tired", "Sad"]
  },
  {
    id: "v35",
    name: "Banana",
    calories: 105, protein: 1, carbs: 27, fat: 0,
    benefits: ["Potassium", "Instant fuel", "Mood support"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Sweet"],
    moods: ["Tired", "Sad", "Stressed"]
  },
  {
    id: "v36",
    name: "Peanut butter",
    calories: 190, protein: 8, carbs: 6, fat: 16,
    benefits: ["Protein", "Satiety", "Healthy fats"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Creamy"],
    moods: ["Energetic", "Tired"]
  },
  {
    id: "v37",
    name: "Whole wheat toast",
    calories: 120, protein: 5, carbs: 22, fat: 2,
    benefits: ["B Vitamins", "Fiber", "Complex carbs"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Tired", "Happy"]
  },
  {
    id: "v38",
    name: "Avocado toast",
    calories: 250, protein: 6, carbs: 24, fat: 16,
    benefits: ["Brain fuel", "Omega-3s", "Sustained energy"],
    timeOfDay: ["Morning"],
    category: ["Creamy"],
    moods: ["Calm", "Energetic"]
  },
  {
    id: "v39",
    name: "Quinoa bowl",
    calories: 280, protein: 12, carbs: 45, fat: 8,
    benefits: ["Complete protein", "Gluten free", "Mineral rich"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Energetic"]
  },
  {
    id: "v40",
    name: "Brown rice + dal",
    calories: 340, protein: 14, carbs: 60, fat: 4,
    benefits: ["Protein synthesis", "Steady energy", "Fiber"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Calm", "Tired"]
  },
  {
    id: "v41",
    name: "Vegetable pulao",
    calories: 310, protein: 6, carbs: 55, fat: 7,
    benefits: ["Balanced", "Filling", "Vegetable variety"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Happy"]
  },
  {
    id: "v42",
    name: "Chapati + paneer",
    calories: 380, protein: 20, carbs: 45, fat: 15,
    benefits: ["High protein", "Calcium", "Muscle fuel"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Energetic"]
  },
  {
    id: "v43",
    name: "Vegetable salad",
    calories: 80, protein: 2, carbs: 15, fat: 2,
    benefits: ["Hydrating", "Micronutrients", "Low calorie"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Calm"]
  },
  {
    id: "v44",
    name: "Corn chaat",
    calories: 140, protein: 4, carbs: 28, fat: 2,
    benefits: ["Spicy & Tangy", "Fiber", "Mood lifter"],
    timeOfDay: ["Evening"],
    category: ["Spicy", "Salty"],
    moods: ["Excited"]
  },
  {
    id: "v45",
    name: "Fruit chaat",
    calories: 130, protein: 1, carbs: 32, fat: 0,
    benefits: ["Vitamin boost", "Tangy sweetness", "Refreshing"],
    timeOfDay: ["Evening"],
    category: ["Sweet", "Spicy"],
    moods: ["Excited"]
  },
  {
    id: "v46",
    name: "Baked sweet potato fries",
    calories: 160, protein: 2, carbs: 35, fat: 2,
    benefits: ["Beta-carotene", "Guilt-free crunch", "Fiber"],
    timeOfDay: ["Evening"],
    category: ["Crunchy"],
    moods: ["Bored"]
  },
  {
    id: "v47",
    name: "Apple with peanut butter",
    calories: 200, protein: 6, carbs: 22, fat: 12,
    benefits: ["Protein & Fiber", "Satisfying", "Heart healthy"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Sweet", "Creamy"],
    moods: ["Anxious"]
  },
  {
    id: "v48",
    name: "Spinach dal",
    calories: 220, protein: 12, carbs: 32, fat: 4,
    benefits: ["Iron rich", "Folate", "Stress relief"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Stressed"]
  },
  {
    id: "v49",
    name: "Lentil soup",
    calories: 180, protein: 14, carbs: 28, fat: 1,
    benefits: ["B Vitamins", "Muscle repair", "Warming"],
    timeOfDay: ["Night"],
    category: ["Savory"],
    moods: ["Tired"]
  },
  {
    id: "v50",
    name: "Ragi porridge",
    calories: 180, protein: 5, carbs: 38, fat: 2,
    benefits: ["Calcium", "Iron", "Instant energy"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Tired"]
  },
  {
    id: "v51",
    name: "Smoothie bowl",
    calories: 260, protein: 8, carbs: 45, fat: 6,
    benefits: ["Superfood rich", "Antioxidants", "Refreshing"],
    timeOfDay: ["Morning"],
    category: ["Sweet", "Creamy"],
    moods: ["Excited"]
  },
  {
    id: "v52",
    name: "Yogurt",
    calories: 100, protein: 10, carbs: 8, fat: 3,
    benefits: ["Probiotics", "Calcium", "Gut health"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Creamy"],
    moods: ["Calm"]
  },
  {
    id: "v53",
    name: "Lassi",
    calories: 150, protein: 6, carbs: 18, fat: 4,
    benefits: ["Cooling", "Probiotics", "Energy"],
    timeOfDay: ["Afternoon"],
    category: ["Creamy"],
    moods: ["Happy"]
  },
  {
    id: "v54",
    name: "Peanut salad",
    calories: 210, protein: 9, carbs: 12, fat: 15,
    benefits: ["Crunchy protein", "Stable energy", "Fiber"],
    timeOfDay: ["Afternoon"],
    category: ["Crunchy"],
    moods: ["Energetic"]
  },
  {
    id: "v55",
    name: "Chickpea salad",
    calories: 220, protein: 12, carbs: 35, fat: 5,
    benefits: ["Fiber rich", "Plant protein", "B Vitamins"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Energetic"]
  },
  {
    id: "v56",
    name: "Tofu stir fry",
    calories: 240, protein: 18, carbs: 12, fat: 12,
    benefits: ["Complete protein", "Isoflavones", "Light"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Energetic"]
  },
  {
    id: "v57",
    name: "Vegetable wrap",
    calories: 320, protein: 12, carbs: 45, fat: 10,
    benefits: ["Balanced", "Fiber", "Sustained fuel"],
    timeOfDay: ["Evening"],
    category: ["Savory"],
    moods: ["Excited"]
  },
  {
    id: "v58",
    name: "Homemade popcorn",
    calories: 110, protein: 3, carbs: 22, fat: 2,
    benefits: ["High volume", "Whole grain", "Magnesium"],
    timeOfDay: ["Evening"],
    category: ["Crunchy"],
    moods: ["Bored"]
  },
  {
    id: "v59",
    name: "Trail mix",
    calories: 180, protein: 6, carbs: 15, fat: 12,
    benefits: ["Mixed nutrients", "Portability", "Focus"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Crunchy"],
    moods: ["Tired"]
  },
  {
    id: "v60",
    name: "Energy balls",
    calories: 130, protein: 4, carbs: 15, fat: 7,
    benefits: ["Quick snack", "Natural sweeteners", "Nutrient dense"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Sweet"],
    moods: ["Tired"]
  },
  {
    id: "v61",
    name: "Honey milk",
    calories: 120, protein: 8, carbs: 18, fat: 3,
    benefits: ["Tryptophan", "Sleep aid", "Soothing"],
    timeOfDay: ["Night"],
    category: ["Sweet"],
    moods: ["Sad"]
  },
  {
    id: "v62",
    name: "Warm milk",
    calories: 100, protein: 8, carbs: 12, fat: 3,
    benefits: ["Calming", "Bone health", "Muscle relaxation"],
    timeOfDay: ["Night"],
    category: ["Creamy"],
    moods: ["Anxious"]
  },
  {
    id: "v63",
    name: "Boiled vegetables",
    calories: 80, protein: 3, carbs: 15, fat: 0,
    benefits: ["Easy to digest", "Vitamins", "Alkalizing"],
    timeOfDay: ["Night"],
    category: ["Savory"],
    moods: ["Calm"]
  },
  {
    id: "v64",
    name: "Steamed vegetables",
    calories: 80, protein: 3, carbs: 15, fat: 0,
    benefits: ["Nutrient retention", "Fiber", "Low calorie"],
    timeOfDay: ["Night"],
    category: ["Savory"],
    moods: ["Calm"]
  },
  {
    id: "v65",
    name: "Cucumber salad",
    calories: 45, protein: 1, carbs: 8, fat: 0,
    benefits: ["Hydrating", "Refreshing", "Vitamin K"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Calm"]
  },
  {
    id: "v66",
    name: "Carrot salad",
    calories: 60, protein: 1, carbs: 14, fat: 0,
    benefits: ["Beta-carotene", "Fiber", "Crunchy"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Happy"]
  },
  {
    id: "v67",
    name: "Tomato salad",
    calories: 50, protein: 1, carbs: 10, fat: 1,
    benefits: ["Lycopene", "Heart health", "Vitamins"],
    timeOfDay: ["Afternoon"],
    category: ["Savory"],
    moods: ["Happy"]
  },
  {
    id: "v68",
    name: "Banana milkshake",
    calories: 220, protein: 6, carbs: 40, fat: 5,
    benefits: ["Potassium", "B6", "Energy boost"],
    timeOfDay: ["Morning"],
    category: ["Sweet", "Creamy"],
    moods: ["Tired"]
  },
  {
    id: "v69",
    name: "Fresh juice",
    calories: 100, protein: 1, carbs: 24, fat: 0,
    benefits: ["Vitamin C", "Refreshing", "Instant energy"],
    timeOfDay: ["Morning"],
    category: ["Sweet"],
    moods: ["Happy"]
  },
  {
    id: "v70",
    name: "Lemon juice",
    calories: 30, protein: 0, carbs: 8, fat: 0,
    benefits: ["Detoxifying", "Alkalizing", "Immunity"],
    timeOfDay: ["Morning"],
    category: ["Salty"],
    moods: ["Tired"]
  },
  {
    id: "v71",
    name: "Ragi drink",
    calories: 130, protein: 4, carbs: 25, fat: 1,
    benefits: ["Calcium", "Iron", "Gluten free"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Tired"]
  },
  {
    id: "v72",
    name: "Millet dosa",
    calories: 160, protein: 4, carbs: 32, fat: 3,
    benefits: ["Gluten free", "Stable energy", "Magnesium"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Calm"]
  },
  {
    id: "v73",
    name: "Vegetable upma",
    calories: 220, protein: 5, carbs: 42, fat: 6,
    benefits: ["Filling", "Fiber rich", "Quick"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Happy"]
  },
  {
    id: "v74",
    name: "Oats porridge",
    calories: 170, protein: 6, carbs: 32, fat: 3,
    benefits: ["Heart healthy", "Stable fuel", "Beta-glucan"],
    timeOfDay: ["Morning"],
    category: ["Savory"],
    moods: ["Tired"]
  },
  {
    id: "v75",
    name: "Banana oats",
    calories: 240, protein: 7, carbs: 48, fat: 4,
    benefits: ["Potassium & Fiber", "Perfect duo", "Satiety"],
    timeOfDay: ["Morning"],
    category: ["Sweet"],
    moods: ["Tired"]
  },
  {
    id: "v76",
    name: "Apple smoothie",
    calories: 160, protein: 4, carbs: 32, fat: 1,
    benefits: ["Vitamin C", "Refreshing", "Light energy"],
    timeOfDay: ["Morning"],
    category: ["Sweet"],
    moods: ["Happy"]
  },
  {
    id: "v77",
    name: "Berry smoothie",
    calories: 180, protein: 5, carbs: 38, fat: 1,
    benefits: ["Antioxidant powerhouse", "Polyphenols", "Anti-inflammatory"],
    timeOfDay: ["Morning"],
    category: ["Sweet"],
    moods: ["Excited"]
  },
  {
    id: "v78",
    name: "Chia smoothie",
    calories: 190, protein: 6, carbs: 12, fat: 12,
    benefits: ["Omega-3s", "Hydrating", "Brain fuel"],
    timeOfDay: ["Morning"],
    category: ["Creamy"],
    moods: ["Calm"]
  },
  {
    id: "v79",
    name: "Nut mix",
    calories: 180, protein: 6, carbs: 10, fat: 14,
    benefits: ["Healthy fats", "Mineral rich", "Concentrated energy"],
    timeOfDay: ["Morning", "Afternoon", "Evening", "Night", "Midnight"],
    category: ["Crunchy"],
    moods: ["Tired"]
  },
  {
    id: "v80",
    name: "Roasted peanuts",
    calories: 170, protein: 7, carbs: 6, fat: 14,
    benefits: ["Zinc", "Satisfying crunch", "B-Vitamins"],
    timeOfDay: ["Evening"],
    category: ["Crunchy"],
    moods: ["Bored"]
  }
]
