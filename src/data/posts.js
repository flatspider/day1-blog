const posts = [
  {
    id: 0,
    slug: "day-one-with-claude",
    title: "Day One with Claude",
    excerpt:
      "Building a portfolio site with AI assistance - the good, the frustrating, and the surprisingly fast.",
    date: "February 2026",
    readTime: "4 min read",
    category: "Development",
    body: [
      "Claude can go absolutely crazy on some code. The raw SPEED Claude brings to the table.",
      "So far today, the most frustrating part of using Claude has been figuring out where our chat transcripts were. I'm still not sure. Initially, Claude provided me with just the messages from their side, which does not provide much illumination on how working with Claude was. The coding was much more within Claude's domain.",
      "My goal today was to build a fun portfolio site. Initially, I started by asking for a portfolio in the style of an art gallery. This ended up creating a blank feeling. But Claude absolutely crushed it in about 30 seconds. All of the links worked, the page navigation, the scrolling. It's amazing now what can be considered to be boilerplate code.",
      "I didn't really like that initial design. It was too flat. I went out looking for some design prompts to help Claude think, and stumbled upon the official Claude frontend design prompt. It includes things like \"You tend to converge toward generic, 'on distribution' outputs. In frontend design, this creates what users call the 'AI slop' aesthetic.\" This helped add energy to my design.",
      "I also knew I wanted a functional Conway's Game in the background of the site. I added that in, but the black on white was still too flat.",
      "Working with Claude is sort of like working with a coworker who has no ideas. You have to be the one to generate and drive the conversation, using prompts and making sure you have a clear path forward, especially with regards to design.",
      "My next design pivot was that I wanted the \"gallery\" feeling to disappear. I switched over to a computer terminal aesthetic. This ended up being far too Matrix-y. Black and green, a bit ominous for a portfolio site. I let Claude know, and provided some aesthetic examples, and Claude was off to the races.",
      "This is when I hit my token limit for the day. It seems that as the codebase expands, Claude can spend a lot of time reading through and making changes. Especially full scale design changes. I eventually settled on a whitish and black terminal color under a CRT screen. This looked less disgusting than the green.",
      "I upgraded to Max, and started fiddling with the CRT screen. Claude unsuccessfully resolved a tooltip bug that was occurring when hovering over a single cell in Conway's game. It was not able to adjust the code to avoid calling Math.random() over and over again.",
      "The nicest thing about Claude is that he does not get frustrated. Or question what you are trying to achieve. He puts his head down, and gets to work. Even if there were better ways to accomplish something.",
      "Claude also does not have a great sense of when something more fundamental is broken. When I attempted to deploy to GitHub Pages, GitHub actions were down. This was causing my builds to hang in the queue and fail. Claude kept blaming other files in my blog, when it was actually Microsoft.",
      "I shifted over to Railway, got an assets error, and Claude identified and solved it immediately. That felt really nice.",
      "You are currently reading this blogpost on my deployed website! Thank you, Claude!",
    ],
  },
  {
    id: 1,
    slug: "design-improvements",
    title: "How to get better at Design by trying really hard",
    excerpt: "What does it take to create something beautiful?",
    date: "January 2026",
    readTime: "5 min read",
    category: "Design",
    body: [
      "I have a lot of friends who went to design school. The main takeaway is design takes a lot of time. How do you develop taste? I don't think it is from extreme consumption. I think it is from creating ugly items. And then parsing through what makes it better. Simplicity is not the absence of detail; it is the presence of clarity. When we strip away the unnecessary, we create room for the parts that matter to speak louder.",
      "In practice, this means choosing one strong idea and supporting it with a few intentional details. It is the difference between a room full of furniture and a space arranged for a single conversation.",
      "When I design an interface, I try to remove anything that does not serve the core promise. If it does not deepen understanding, build trust, or guide action, it is probably a distraction.",
      "The surprising part is that simplicity takes time. It requires saying no to cleverness and yes to coherence. But when we do, the work feels effortless to the people who use it.",
    ],
  },
  {
    id: 2,
    slug: "building-with-claude",
    title: "Building for the Long Term",
    excerpt:
      "Thoughts on sustainable code architecture and the balance between shipping fast and building to last.",
    date: "January 2026",
    readTime: "8 min read",
    category: "Development",
    body: [""],
  },
  {
    id: 3,
    slug: "the-space-between",
    title: "The Space Between",
    excerpt:
      "Why whitespace is not empty space, and how it shapes the way we experience digital interfaces.",
    date: "November 2025",
    readTime: "4 min read",
    category: "Design",
    body: [
      "Whitespace is the pause between sentences. It is the space that turns noise into rhythm.",
      "When elements are crowded, the eye has no place to rest. When spacing breathes, content feels intentional instead of accidental.",
      "In interfaces, spacing is a form of hierarchy. What you separate, you emphasize. What you cluster, you connect.",
      "If I had to keep one design tool forever, I would keep space. It is the most humane and forgiving tool we have.",
    ],
  },
  {
    id: 4,
    slug: "learning-in-public",
    title: "Learning in Public",
    excerpt:
      "Reflections on my first month at Fractal Tech Bootcamp and the power of sharing your journey.",
    date: "February 2026",
    readTime: "6 min read",
    category: "Personal",
    body: [
      "The first month of Fractal Tech Bootcamp has been a whirlwind of new tools, new people, and new ways of thinking. The most surprising lesson has been how much momentum comes from sharing the messy middle.",
      "Posting work-in-progress thoughts felt scary at first. But every time I did it, I received a small wave of encouragement and useful feedback that made the work better.",
      "Learning in public keeps me honest. It creates a record of how my thinking changes, and it invites others to connect with the process, not just the polished result.",
      "If you are on the fence, start small. Share a sketch, a note, or a sentence. The habit matters more than the platform.",
    ],
  },
];

export default posts;
