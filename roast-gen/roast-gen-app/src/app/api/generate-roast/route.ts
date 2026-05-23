import { NextRequest, NextResponse } from 'next/server';
import { personas, getPersonaBySlug } from '@/lib/personas';

// Profanity-tiered mock scripts — names will be substituted at runtime
const MOCK_TEMPLATES = [
  // Profanity 1-2: Kid-friendly
  [
    {
      host: "Darth Vader",
      roasters: ["Hulk Hogan", "SpongeBob"],
      roastee: "Ric Flair",
      lines: {
        host: [
          "\"I find your lack of comedy talent... disturbing. But not unexpected.\"",
          "\"Welcome to this roast. Your jokes are as weak as your arguments.\""
        ],
        roasters: [
          "\"Whoooo brother! You call that a roast? My dog roasts harder!\"",
          "\"You're such a jabroni, you couldn't beat a cardboard box in a wrestling match!\"",
          "\"I'm ready! I'm ready! I'm ready to tell you you're not very good at this!\"",
          "\"Bikini Bottom would be embarrassed to have you here!\""
        ],
        roastee: [
          "\"Oh yeah! I've had better material since kindergarten!\"",
          "\"WOOOO! You think that's a burn? My grandma burns hotter than that!\""
        ]
      }
    },
    {
      host: "Arnold Schwarzenegger",
      roasters: ["Mike Tyson", "Keanu Reeves"],
      roastee: "The Undertaker",
      lines: {
        host: [
          "\"I am the governator of this roast. And you... you are getting fired.\"",
          "\"Your comedy career ends here. It's not a threat. It's a promise.\""
        ],
        roasters: [
          "\"Everyone has a plan until they get hit with the truth. And your plan stinks.\"",
          "\"You talk a lot of trash for someone with no chin and no jokes.\"",
          "\"Whoa... I've seen better material in a parking lot.\"",
          "\"I once saved the world 47 times. You've never even saved a joke.\""
        ],
        roastee: [
          "\"...Your career is about to rest... in peace. Just like your comedy.\"",
          "\"I've seen scarier things than your stand-up routine.\""
        ]
      }
    }
  ],
  // Profanity 3: Moderate
  [
    {
      host: "Darth Vader",
      roasters: ["Hulk Hogan", "Macho Man Randy Savage"],
      roastee: "Peter Griffin",
      lines: {
        host: [
          "\"I find your lack of faith disturbing. And your jokes? Equally pathetic.\"",
          "\"Your attempt at comedy is about as effective as a thermal exhaust port.\""
        ],
        roasters: [
          "\"Whoooo! Brother! I've seen kindergartners tell better jokes!\"",
          "\"You look like someone dropped you on your head as a baby! Repeatedly!\"",
          "\"Ohhhh yeah! You look like a cheap imitation of a cheap imitation!\"",
          "\"I've wrestled bigger fools than you and they all got pinned!\""
        ],
        roastee: [
          "\"My brain hurts just thinking about how bad that was.\"",
          "\"I'd roast you back but my brain don't work that good.\""
        ]
      }
    },
    {
      host: "Ric Flair",
      roasters: ["Mike Tyson", "Arnold Schwarzenegger"],
      roastee: "SpongeBob",
      lines: {
        host: [
          "\"WOOOO! Welcome to the most brutal roast in the universe!\"",
          "\"I've been in 16 championship matches and NONE of them were this painful to watch!\""
        ],
        roasters: [
          "\"You talk a lot of trash for someone who lives in a pineapple under the sea.\"",
          "\"I'd punch you but I'm on a seafood diet. I don't eat sponges.\"",
          "\"You look like something the Krabby Patty formula rejected.\"",
          "\"I've been to infinity and back and I've never met someone this unfunny.\""
        ],
        roastee: [
          "\"I'm ready! I'm ready! I'm ready for you to stop!\"",
          "\"Gary says this roast is making him angry. Meow.\""
        ]
      }
    }
  ],
  // Profanity 4-5: R-rated
  [
    {
      host: "Ric Flair",
      roasters: ["Hulk Hogan", "Mike Tyson", "Macho Man"],
      roastee: "Peter Griffin",
      lines: {
        host: [
          "\"WOOOOO! Welcome to the most f***ed up roast night in the universe!\"",
          "\"I've seen more entertaining things in a nursing home than what you just did!\""
        ],
        roasters: [
          "\"You look like something the genetic lottery f***ed up on!\"",
          "\"Your jokes are so bad even Quagmire is cringing!\"",
          "\"I've bitten ears off in wrestling matches and I'd bite your head off if I thought it would improve this roast!\"",
          "\"Oh yeah! You look like the lovechild of a trainwreck and a bad decision!\"",
          "\"You couldn't roast a hot dog without setting off the smoke alarm!\""
        ],
        roastee: [
          "\"My family is so dysfunctional we make your comedy look polished!\"",
          "\"I'd defend myself but I literally have nothing to work with here!\""
        ]
      }
    },
    {
      host: "Darth Vader",
      roasters: ["Mike Tyson", "Arnold Schwarzenegger", "The Undertaker"],
      roastee: "Hulk Hogan",
      lines: {
        host: [
          "\"Your lack of comedic talent is disturbing. Your lack of self-awareness? Even more so.\"",
          "\"I find your weakness disturbing. And believe me, I've seen a LOT of weakness.\""
        ],
        roasters: [
          "\"Everyone has a plan until they get knocked the f*** out. Your plan was never even a plan.\"",
          "\"I've taken better hits than your punchlines. You're basically swinging wet cardboard.\"",
          "\"You talk about being a champion but you couldn't win a comedy contest against a parking ticket.\"",
          "\"I've killed careers in the ring. Your career deserves to be put down.\"",
          "\"Terminated. Just like your career. AGAIN.\""
        ],
        roastee: [
          "\"WHHOOOO BROTHER! Your mother was a great roast! Wait...\"",
          "\"I've been body-slammed by real wrestlers and your jokes hit harder! Which isn't saying much!\""
        ]
      }
    }
  ]
];

// Build a mapping of slug -> name
const SLUG_TO_NAME: Record<string, string> = {};
personas.forEach(p => { SLUG_TO_NAME[p.slug] = p.name; });

function substituteNames(template: typeof MOCK_TEMPLATES[0][0], hostSlug: string, roasterSlugs: string[], roasteeSlug: string) {
  const hostName = SLUG_TO_NAME[hostSlug] || template.host;
  const roasteeName = SLUG_TO_NAME[roasteeSlug] || template.roastee;
  const roasterNames = roasterSlugs.map((slug, i) => SLUG_TO_NAME[slug] || template.roasters[i] || `Roaster ${i+1}`);

  return {
    ...template,
    host: hostName,
    roasters: roasterNames,
    roastee: roasteeName,
  };
}

function buildMockScript(hostSlug: string, roasterSlugs: string[], roasteeSlug: string, profanity: number): string {
  const p = Math.min(5, Math.max(1, profanity)) - 1;
  const pool = MOCK_TEMPLATES[p] || MOCK_TEMPLATES[2];
  const template = pool[Math.floor(Math.random() * pool.length)];
  const sub = substituteNames(template, hostSlug, roasterSlugs, roasteeSlug);

  const roasterSection = sub.roasters.map((name, i) => {
    const lines = template.lines.roasters.slice(i*2, i*2+2);
    return `ROASTER ${i+1}: ${name}\n${lines.map(l => `  "${l}"`).join('\n')}`;
  }).join('\n');

  return `========================================
HOST: ${sub.host}
"${template.lines.host[0]}"
"${template.lines.host[1]}"

${roasterSection}

ROASTEE: ${sub.roastee}
${template.lines.roastee.map(l => `  "${l}"`).join('\n')}

========================================
Generated by Humble Claw Roast Generator`;
}

export async function POST(request: NextRequest) {
  try {
    const { host, roasters, roastee, profanity } = await request.json();

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      // Use real OpenAI API
      const hostPersona = getPersonaBySlug(host);
      const roasteePersona = getPersonaBySlug(roastee);
      const roasterPersonas = roasters.map((slug: string) => getPersonaBySlug(slug)).filter(Boolean) as Array<{name?: string; voice?: string; roastStyle?: string}>;

      const profanityInstructions = [
        'Kid-friendly. No swears. No adult references. Clean comedy only.',
        'Light teasing. No swears. Mild innuendo allowed.',
        'Moderate burns. Mild language. Some adult themes.',
        'Strong burns. Occasional mild swears. Adult themes.',
        'R-rated. Full profanity. Adult humor. No holds barred.',
      ];

      const roasterLines = roasterPersonas.map((p) => `${p?.name} (Voice: ${p?.voice}, Style: ${p?.roastStyle})`).join('\n- ');

      const systemPrompt = `You are producing a Comedy Central-style roast script.

The characters are:
- HOST/MC: ${hostPersona?.name}
  Voice: ${hostPersona?.voice}
  Roast Style: ${hostPersona?.roastStyle}
  Catchphrase: ${hostPersona?.catchphrase}

- ROASTER: ${roasterLines}

- ROASTEE: ${roasteePersona?.name}
  Personality: ${roasteePersona?.personality}
  Roast Style: ${roasteePersona?.roastStyle}

PROFANITY LEVEL: ${profanity}
${profanityInstructions[profanity - 1]}

FORMAT REQUIREMENTS:
- Host opens with a 2-3 punchline intro
- Each Roaster delivers 2-4 burns targeting the Roastee
- Roastee fires back with 2-4 defensive burns
- Host closes with a classic sign-off
- Total script should be 400-600 words
- Write in actual character voices, not placeholders`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Write the roast script now. Be funny. Be in character. Make it actually funny - punchlines should have genuine shock/surprise.' },
          ],
          temperature: 0.9,
          max_tokens: 1500,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        return NextResponse.json({
          script: data.choices[0].message.content + '\n\nGenerated by Humble Claw Roast Generator',
        });
      }
    }

    // Profanity-aware mock: varies output based on slider
    const profanityLevel = Math.min(5, Math.max(1, profanity || 3));
    const script = buildMockScript(host, roasters, roastee, profanityLevel);
    return NextResponse.json({ script, mock: true, profanityLevel });

  } catch (error) {
    console.error('Roast generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate roast. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ personas });
}
