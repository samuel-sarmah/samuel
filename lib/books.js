// Book data for the Books page. `slug` matches the cover image filename in
// public/books/<slug>.jpg (downloaded from Open Library). `url` is where a
// reader can get a copy.

export const BOOK_GROUPS = [
  {
    books: [
      {
        slug: "pragmatic-programmer",
        title: "The Pragmatic Programmer",
        author: "David Thomas and Andrew Hunt",
        url: "https://www.amazon.com/s?k=the+pragmatic+programmer",
        note: "The habits that separate people who ship working software from people who write code. The one I'd hand to a developer starting out.",
      },
      {
        slug: "designing-data-intensive-applications",
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        url: "https://www.amazon.com/s?k=designing+data+intensive+applications+kleppmann",
        note: "What actually happens underneath a database, a queue, or a replica set. Changed how I think about every backend I've built since.",
      },
      {
        slug: "philosophy-of-software-design",
        title: "A Philosophy of Software Design",
        author: "John Ousterhout",
        url: "https://www.amazon.com/s?k=a+philosophy+of+software+design+ousterhout",
        note: "A short, opinionated case that complexity is the whole problem, and that deep modules with simple interfaces are the way out.",
      },
      {
        slug: "refactoring",
        title: "Refactoring",
        author: "Martin Fowler",
        url: "https://www.amazon.com/s?k=refactoring+martin+fowler",
        note: "A catalogue of small, safe moves for improving code you're afraid to touch. Most of my work on legacy projects is in here.",
      },
      {
        slug: "mythical-man-month",
        title: "The Mythical Man-Month",
        author: "Frederick P. Brooks Jr.",
        url: "https://www.amazon.com/s?k=the+mythical+man+month+brooks",
        note: "Fifty years old and still right about why late software projects get later when you add people to them.",
      },
      {
        slug: "sicp",
        title: "Structure and Interpretation of Computer Programs",
        author: "Harold Abelson and Gerald Jay Sussman",
        url: "https://www.amazon.com/s?k=structure+and+interpretation+of+computer+programs",
        note: "Less a programming book than a book about abstraction itself. Hard, and worth the difficulty.",
      },
    ],
  },
  {
    books: [
      {
        slug: "rationality-ai-to-zombies",
        title: "Rationality: From AI to Zombies",
        author: "Eliezer Yudkowsky",
        url: "https://www.amazon.com/s?k=rationality+from+ai+to+zombies+yudkowsky",
        note: "A distillation of the “Sequences” on how human reasoning works and where it goes wrong."
      },
      {
        slug: "scout-mindset",
        title: "The Scout Mindset",
        author: "Julia Galef",
        url: "https://www.amazon.com/s?k=the+scout+mindset+julia+galef",
        note: "The difference between reasoning to find out what’s true (scout) and reasoning to defend what you already believe (soldier).",
      },
      {
        slug: "thinking-fast-and-slow",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        url: "https://www.amazon.com/s?k=thinking+fast+and+slow+daniel+kahneman",
        note: "The definitive tour of the two systems behind human judgment, from the researcher who mapped the field.",
      },
      {
        slug: "superforecasting",
        title: "Superforecasting",
        author: "Philip Tetlock",
        url: "https://www.amazon.com/s?k=superforecasting+philip+tetlock",
        note: "What the best forecasters actually do differently.",
      },
      {
        slug: "bible",
        title: "The Holy Bible",
        author: "",
        url: "https://www.amazon.com/s?k=holy+bible",
        note: "The central scripture of Christianity: history, law, poetry, prophecy, and letters gathered into one book, and among the most influential ever written.",
      },
      {
        slug: "focusing",
        title: "Focusing",
        author: "Eugene T. Gendlin",
        url: "https://www.amazon.com/s?k=focusing+eugene+gendlin",
        note: "A concrete introspection technique for surfacing thoughts and feelings you can sense but can't yet name.",
      },
      {
        slug: "quran",
        title: "The Qur’an",
        author: "",
        url: "https://www.amazon.com/s?k=the+quran+english+translation",
        note: "The central scripture of Islam, recited and studied by well over a billion people, and a profound counterpart to reading the Bible.",
      },
    ],
  },
  {
    books: [
      {
        slug: "reflective-mind",
        title: "Rationality and the Reflective Mind",
        author: "Keith Stanovich",
        url: "https://www.amazon.com/s?k=rationality+and+the+reflective+mind+stanovich",
        note: "A more rigorous model of human bias and what it takes to correct it.",
      },
      {
        slug: "rational-choice",
        title: "Rational Choice in an Uncertain World",
        author: "Reid Hastie and Robyn M. Dawes",
        url: "https://www.amazon.com/s?k=rational+choice+in+an+uncertain+world+hastie+dawes",
        note: "A grounding textbook on judgment and decision-making under uncertainty.",
      },
      {
        slug: "judgment-under-uncertainty",
        title: "Judgment Under Uncertainty: Heuristics and Biases",
        author: "Daniel Kahneman, Paul Slovic, and Amos Tversky",
        url: "https://www.amazon.com/s?k=judgment+under+uncertainty+heuristics+and+biases+kahneman",
        note: "The deep dive into the mental shortcuts we use and the systematic errors they produce.",
      },
    ],
  },
  {
    books: [
      {
        slug: "nonviolent-communication",
        title: "Nonviolent Communication",
        author: "Marshall Rosenberg",
        url: "https://www.amazon.com/s?k=nonviolent+communication+marshall+rosenberg",
        note: "Practical strategies for saying hard things without triggering defenses. Useful far beyond conflict.",
      },
      {
        slug: "godel-escher-bach",
        title: "Gödel, Escher, Bach",
        author: "Douglas Hofstadter",
        url: "https://www.amazon.com/s?k=godel+escher+bach+hofstadter",
        note: "A sprawling connection between pattern, self-reference, and mind. Slow, strange, and worth it.",
      },
      {
        slug: "hpmor",
        title: "Harry Potter and the Methods of Rationality",
        author: "Eliezer Yudkowsky",
        url: "https://hpmor.com",
        note: "Fan fiction that turns Hogwarts into a laboratory for the scientific method. Free to read online, and a surprisingly good on-ramp to the ideas above.",
      },
      {
        slug: "impro",
        title: "Impro: Improvisation and the Theatre",
        author: "Keith Johnstone",
        url: "https://www.amazon.com/s?k=impro+improvisation+and+the+theatre+keith+johnstone",
        note: "On the unconscious mind’s role in creativity and performance.",
      },
      {
        slug: "inner-game-of-tennis",
        title: "The Inner Game of Tennis",
        author: "W. Timothy Gallwey",
        url: "https://www.amazon.com/s?k=the+inner+game+of+tennis+gallwey",
        note: "Ostensibly about tennis, actually about getting your own head out of the way while learning any skill.",
      },
      {
        slug: "bonds-that-make-us-free",
        title: "Bonds That Make Us Free",
        author: "C. Terry Warner",
        url: "https://www.amazon.com/s?k=bonds+that+make+us+free+terry+warner",
        note: "On the patterns of self-deception that quietly damage our relationships.",
      },
    ],
  },
];
