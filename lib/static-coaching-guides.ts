// Pre-written coaching guides — load instantly, no API needed.
// Format mirrors the API response: ### headings with bullet/numbered content.

export const STATIC_GUIDES: Record<string, Record<number, string>> = {
  Beginner: {
    1: `### Objective & Outcomes
- Introduce the chessboard: 64 squares, 8 ranks (rows), 8 files (columns).
- Students can: orient the board correctly, place all pieces, describe the Rook's movement, state the goal of chess.
- Connects forward to every future lesson — the board is the foundation of everything.

### How to Explain It
- "Chess is a battle between two kingdoms on a checkered battlefield with 64 squares."
- Light square always goes on the right — remember: *light on right*.
- The **Rook** is like a castle on wheels — it slides in straight lines as far as it wants, but cannot jump.
- Goal of the game: trap the enemy King so it cannot escape — that is **Checkmate**.

### Story
Imagine you just opened a new video game and the first screen shows a big map with 64 squares on it — that is your chessboard! Your mission is simple: protect your King and catch the enemy King. The Rook is like a train — it zooms along straight tracks as far as it wants, but it can NEVER leave the track. Put something on the track and the train stops dead. Two teams line up on opposite sides of the map, and the battle is about to begin!

### Teaching Steps
1. Count squares together — ask "How many?" before revealing the answer.
2. Name the ranks (1–8) and files (a–h); play "find square d4" with students.
3. Set up all pieces together, one type at a time, students placing on their own boards.
4. Show the Rook sliding across the board; ask "What stops it?" before explaining.
5. Mini game: Rook race — who can reach the opposite corner first?

### Questions to Ask Students
- "How many squares does the chessboard have? Can you count without me telling you?"
- "The Rook wants to go from a1 to a8 — what's in its way?"
- "Why do you think we put Rooks in the corners?"
- "What is the GOAL of chess — capture all pieces, or something else?"
- "Which side of the board should the light square be on?"

### Watch For (Common Mistakes)
- Wrong board orientation — light square must be bottom-right; check every student's board.
- Students think the Rook can jump over pieces — demonstrate clearly: it is blocked.
- Confusing the goal with "capture everything" — reinforce: Checkmate of the King is the only goal.

### Timeline & Homework
- 5 min – Warm-up: show students a real or digital chess set, ask what they already know
- 10 min – Board orientation, ranks, files, square names
- 15 min – Piece setup + Rook movement exploration
- 10 min – Rook race mini game
- 5 min – Recap: "Tell me one thing you learned today"
- **Homework:** Set up the full board 3 times at home and draw the Rook's possible moves from e4.`,

    2: `### Objective & Outcomes
- Learn the Bishop, Queen, and Pawn movements and starting squares.
- Students can: move all three pieces correctly, write basic game notation (e4, Nf3 style), distinguish diagonal vs straight movement.
- Builds on Session 1 board knowledge; feeds into piece value discussion in Session 3.

### How to Explain It
- **Bishop:** The wise magician who only walks diagonally — and stays on the same colour forever.
- **Queen:** The superhero of chess — she moves like both the Rook AND the Bishop combined.
- **Pawn:** Brave little soldiers who march forward one square (or two on their first move) and capture diagonally.
- **Notation:** Each square has an address — column letter + row number. "e4" means column e, row 4.

### Story
Think of your chess pieces like a superhero team. The Queen is the strongest hero — she can fly in ANY direction, straight or diagonal, as far as she likes. The Bishop is the sneaky one who only ever moves diagonally and always stays on the same colour — like a player who only uses one lane on the pitch. The little Pawns are the rookie players who take one careful step at a time but can surprise everyone. And just like a sports team keeps score and records every play, chess players write down every move using notation!

### Teaching Steps
1. Ask "If you could design the most powerful piece, what would it do?" — then reveal the Queen.
2. Show the Bishop on both colours — ask "Will these two Bishops ever meet?"
3. Demonstrate pawn movement: one or two squares forward, and the diagonal capture rule.
4. Introduce notation: teacher moves a piece and students write down the move.
5. Dictation game: teacher calls out a square, students point to it.

### Questions to Ask Students
- "The Bishop starts on c1 — which colour squares will it always stay on?"
- "The Queen can move like which TWO pieces?"
- "A pawn is at e2 — how many squares can it move on its very first turn?"
- "How does a pawn capture? Same as it moves, or different?"
- "What does the notation 'Qd5' mean?"

### Watch For (Common Mistakes)
- Bishops moving straight — remind them: diagonals only, same colour always.
- Pawns capturing forward instead of diagonally — this is the most common pawn error.
- Forgetting pawns can move 2 squares only on their FIRST move, not any time.
- Writing notation in wrong order (number before letter) — reinforce: letter first, number second.

### Timeline & Homework
- 5 min – Recap Session 1: board setup from memory
- 12 min – Bishop and Queen movement practice
- 12 min – Pawn movement and capture rules
- 10 min – Notation dictation game
- 6 min – Mini game: Queen vs empty board, how many squares can she reach from d4?
- **Homework:** Play 5 moves on a board at home and write down each move using notation.`,

    3: `### Objective & Outcomes
- Learn the King and Knight movements; understand relative piece values.
- Students can: move the King and Knight correctly, recall piece values (P=1, N=B=3, R=5, Q=9), explain why trading pieces matters.
- Completes the piece movement knowledge needed before tactics begin.

### How to Explain It
- **King:** The royal piece who moves only ONE square in any direction — precious and must be protected.
- **Knight:** The only piece that can JUMP over others — moves in an "L-shape": two squares one way, one square sideways.
- **Piece Values:** Like coins — Pawn=1, Knight=Bishop=3, Rook=5, Queen=9. Trading a Rook for a Knight is losing 2 coins.
- Trick to remember the Knight's L: "two steps and a turn."

### Story
In every team, some players are more important than others. The King is like the team captain — only moves one step at a time, but if he gets caught, the whole game is over! The Knight is like a parkour athlete who can jump over teammates and opponents in an L-shaped leap — the ONLY piece that can do that. Every piece has a value, just like trading cards: a Pawn is worth 1 coin, a Knight or Bishop is worth 3, a Rook is worth 5, and the Queen is worth 9. Knowing the values helps you make smart swaps — never trade your Queen for a Pawn!

### Teaching Steps
1. Introduce the Knight's L-shape with a physical demonstration — walk it on the floor if possible.
2. "Find all the squares a Knight on d4 can reach" — students explore before you count together.
3. Explain piece values using a coin analogy — give students imaginary budgets to trade pieces.
4. Scenario: "I offer you my Queen for your Rook — good deal?" Students decide and explain.
5. Tabletop puzzle: which piece gets to the corner fastest?

### Questions to Ask Students
- "The Knight is at e4 — can you find ALL the squares it can jump to?"
- "Why do you think the Knight is the only piece that can jump?"
- "If you trade your Queen for two Rooks, who got the better deal?"
- "The King can move one square in any direction — how many escape squares does it have in the centre? In the corner?"
- "Which is worth more: two Bishops or a Rook and a Pawn?"

### Watch For (Common Mistakes)
- Knight moving in straight L instead of the correct L-shape — always verify the landing square.
- Students moving the King multiple squares like a Queen — strict one-square rule.
- Thinking piece values are fixed in all situations — build intuition: position matters too.

### Timeline & Homework
- 5 min – Warm-up: piece name quiz (show silhouette, students name it)
- 12 min – Knight movement: L-shape practice and counting reachable squares
- 10 min – King movement and "King in the corner" awareness
- 12 min – Piece value coin trading game
- 6 min – Summary: students rank all pieces in order of value from memory
- **Homework:** Find a Knight puzzle online (Lichess puzzles, filter by Knight) and try 5 puzzles.`,

    4: `### Objective & Outcomes
- Understand attack (a piece can take another), capture (actually taking it), and "hanging" pieces (undefended pieces that can be captured for free).
- Students can: spot a hanging piece in 5 seconds, capture it without hesitation, avoid leaving their own pieces hanging.
- This is the single most important beginner skill — free captures win games.

### How to Explain It
- A piece is **hanging** when it can be captured for FREE — no one is protecting it.
- Imagine pieces on the board are like free sweets on a table — if no one is guarding them, pick them up!
- **Attack** = aiming at a piece. **Capture** = taking it off the board.
- Before every move, ask: "Am I leaving something free? Can I take something free?"

### Story
Imagine leaving your lunch bag on a bench at school and walking away. If nobody is watching it, someone WILL take it — because it is free! Pieces left alone on the chessboard with no one protecting them are called "hanging" — they are like unclaimed sweets on a table. The rule is simple: before you move, always check if you left anything unguarded. And whenever your opponent leaves a free piece, grab it before they realise their mistake!

### Teaching Steps
1. Set up a position with 3 hanging pieces of different types — "Find the free sweets!"
2. Students name ALL the hanging pieces before making any moves.
3. Ask "Which one would YOU take first?" Discuss value (take the highest value free piece).
4. Switch perspective: set up a position where THEIR piece is hanging — would they notice?
5. Speed round: show positions for 10 seconds, students write down the hanging piece.

### Questions to Ask Students
- "What does it mean for a piece to be 'hanging'?"
- "There are two hanging pieces — a Rook and a Pawn — which do you take first and why?"
- "After you capture a piece, whose turn is it? Could your capturing piece now be in danger?"
- "How can you check if YOUR pieces are hanging before you make a move?"
- "Can a King be 'hanging' like other pieces?"

### Watch For (Common Mistakes)
- Taking a low-value piece when a higher-value one is also free — always take the best free piece.
- Capturing with a piece that then becomes hanging itself — "look before you leap."
- Forgetting to check if their OWN pieces are undefended before moving.

### Timeline & Homework
- 5 min – Warm-up: piece value recap quiz
- 15 min – Hanging piece spotting exercises (3 progressively harder positions)
- 10 min – Speed round: 10-second spotting challenge
- 10 min – Mini game with instruction: "Only capture hanging pieces"
- 5 min – Reflection: students share one position that fooled them
- **Homework:** Play 3 games and after each game count how many free pieces you took and missed.`,

    5: `### Objective & Outcomes
- Learn the 4 ways to protect a piece: A=Attack the attacker, B=Block, C=Cover (add a defender), D=Depart (move away).
- Students can: apply the correct ABCD method in a given position; explain why each method works.
- Directly builds on Session 4 (hanging pieces) — now students can STOP pieces from hanging.

### How to Explain It
- When a piece is attacked, you have 4 choices — remember **ABCD**:
  - **A – Attack back:** Threaten something bigger so the opponent must deal with that instead.
  - **B – Block:** Put another piece between the attacker and the attacked piece.
  - **C – Cover:** Add another defender to the attacked piece.
  - **D – Depart (move away):** Simply move the attacked piece to safety.

### Story
Imagine you are playing dodgeball and someone is about to throw the ball at your teammate. You have four choices: throw the ball back at them first (Attack), jump in front of your teammate (Block), stand next to your teammate so you can catch the ball together (Cover), or just pull your teammate out of the way (Depart). In chess, every time one of your pieces gets attacked, you have those exact same four options — A, B, C, D. The best choice depends on the situation, but knowing all four means you never have to panic!

### Teaching Steps
1. Show a piece under attack — ask "What can we do?" before mentioning ABCD.
2. Explore each option together — which is best depends on the position.
3. Set up 4 different positions, each where only ONE of the ABCD methods works.
4. Students identify which letter applies to each position.
5. Partner challenge: one student attacks, other must find the best ABCD response.

### Questions to Ask Students
- "Your Rook is being attacked by a Bishop — what are your 4 choices?"
- "If you cover your piece, is the problem always solved? What could go wrong?"
- "When would you choose D (move away) over C (add a defender)?"
- "Can you attack back with the same piece that is being attacked?"
- "Which ABCD method is your favourite and why?"

### Watch For (Common Mistakes)
- Students always choosing D (moving away) even when A, B, or C is better.
- Blocking with a more valuable piece than what is being protected — bad trade.
- Covering a piece but not noticing it is now attacked TWICE — count attackers vs defenders.

### Timeline & Homework
- 5 min – Warm-up: hanging piece spot from Session 4
- 5 min – Introduce ABCD acronym with the story
- 15 min – One position per letter: students solve each with the correct letter
- 12 min – Mixed positions: students identify the letter AND make the move
- 8 min – Partner game: attack and defend using ABCD
- **Homework:** In your next game, every time a piece is attacked, say the ABCD letter you used out loud.`,

    6: `### Objective & Outcomes
- Learn what a check is, the 3 ways to escape check (Block, Capture, King moves), and see the first checkmate positions.
- Students can: give check with every piece, escape check using all 3 methods, recognise a basic checkmate.
- Pivotal lesson — check and checkmate are the heart of chess.

### How to Explain It
- **Check** = The King is under direct attack — an emergency alarm has gone off!
- When in check, you MUST deal with it — you cannot ignore it or make another move.
- **3 ways out of check:** Block, Capture the attacker, King moves to safety.
- **Checkmate** = the King is in check AND has no escape — the game is over.

### Story
You know that feeling in a game of tag when someone is right behind you and about to catch you? That is CHECK in chess — the King is being chased and MUST escape right now. The King can run to a safe square, block the attacker with another piece, or capture the attacker. Checkmate is when the King is being tagged AND every single direction it could run is blocked too — totally cornered with no escape. It is the most exciting moment in the whole game — the moment it all ends!

### Teaching Steps
1. Put the King in check and say "The King is in danger! What must we do RIGHT NOW?"
2. Show all 3 escape methods one by one — which works depends on the position.
3. Show a position where NONE of the 3 methods work — that is checkmate!
4. Students give check with each piece type — Bishop, Rook, Queen, Knight.
5. Set up 3 basic checkmate positions and ask "Can the King escape?"

### Questions to Ask Students
- "You are in check — can you ignore it and capture a free piece instead?"
- "Your King is in check from a Bishop — can you capture it with your Rook? Show me."
- "What makes checkmate DIFFERENT from just being in check?"
- "Can the Knight give check in a way a Bishop cannot? How?"
- "If your King has 3 possible escape squares but one of them is still in danger, how many real escapes does it have?"

### Watch For (Common Mistakes)
- Moving a piece other than dealing with check — always stop and ask "Are you in check?"
- Blocking check but the blocking piece is pinned — worth noting even at beginner level.
- Forgetting that capturing the attacker is also a valid escape.

### Timeline & Homework
- 5 min – Warm-up: ABCD quiz from last session
- 10 min – Introduce check: give check with each piece
- 12 min – 3 escape methods practice positions
- 12 min – First checkmate positions: can the King escape?
- 6 min – Quick game: first to give check 3 times wins
- **Homework:** Set up a position where the King is in checkmate and explain to a family member why the King cannot escape.`,

    7: `### Objective & Outcomes
- Mixed test session — apply Sessions 1–6 knowledge: identify hanging pieces with all piece types together on the board.
- Students can: find hanging pieces quickly when multiple piece types are present, select the best capture, avoid oversights.
- Diagnostic: coach uses this session to identify which students need more support.

### How to Explain It
- Revision session — no new concepts. Students show what they know.
- Remind: "Before every move, scan the whole board for free pieces."
- Introduce the idea of the **candidate move process**: look → find options → pick the best.

### Story
Think of today like a treasure hunt where free pieces are scattered across the board. Your job is to find ALL of them and pick up the most valuable one first — just like grabbing the biggest Easter egg before the smaller ones! But here is the tricky part: sometimes after you grab a piece, the piece you used to grab it is now sitting there alone with nobody protecting it. Always ask yourself: "After I take this, is MY piece still safe?" Spot the free pieces, take the best one, and always look one step ahead!

### Teaching Steps
1. Warm up with piece value recall (1 minute quiz).
2. Present Position 1 (simple, 1 hanging piece) — students find it in 10 seconds.
3. Present Position 2 (2 hanging pieces — different values) — which do we take?
4. Present Position 3 (3 pieces, one trap — taking one piece puts your piece in danger).
5. Mixed game: students play and must name their hanging piece captures out loud.

### Questions to Ask Students
- "Scan the whole board — how many hanging pieces can you find?"
- "Which free piece do you take first and why?"
- "After you take this Rook — is YOUR capturing piece now safe?"
- "Are any of YOUR pieces hanging right now?"
- "What three-step scan do you do before making any move?"

### Watch For (Common Mistakes)
- Rushing — students take the FIRST free piece they see, not the BEST one.
- Capture traps — taking a free piece that walks into danger.
- Missing their OWN hanging pieces — reinforce the habit of checking both sides.

### Timeline & Homework
- 5 min – Piece value rapid fire quiz
- 15 min – 4 progressive hanging piece puzzles
- 15 min – Speed challenge: 10 positions, 15 seconds each
- 10 min – Mini games with "find before you move" rule enforced
- **Homework:** Solve 10 "Hanging pieces" puzzles on Lichess (free, no account needed).`,

    8: `### Objective & Outcomes
- Formal Test 1: assess understanding of piece movements, piece values, hanging pieces, checks, and basic ABCD.
- Coach notes which areas each student has mastered and which need reinforcement.
- No new content — create a calm, encouraging atmosphere where mistakes are part of learning.

### How to Explain It
- "Today we see how much your chess brain has grown — there are no wrong answers, only learning."
- Reassure students: every mistake in a test shows exactly what to practise next.
- Tests are like a treasure map — they reveal where the gold (knowledge) still needs to be dug up.

### Story
Think of a test not as an exam you can fail, but as a selfie of your brain right now. It shows you exactly what you know and what you still need to practise — like checking how far you have levelled up in a game. Every wrong answer is not a mistake, it is a signpost pointing at your next training target. The best players in the world got better by doing lots of tests and learning from every single wrong answer — so today, be excited about what you discover!

### Teaching Steps
1. Start with a calm breathing exercise — "Clear your mind, focus on the board."
2. Give 4–5 positions testing different skills from Sessions 1–6.
3. Students solve independently — no hints during the test.
4. After: go through each answer together, let students explain their thinking.
5. End positively: celebrate effort, not just correct answers.

### Questions to Ask Students (post-test discussion)
- "Which question did you find hardest? Why do you think that is?"
- "If you could go back and change one answer, which would it be?"
- "What was the quickest question for you? What made it easy?"
- "What do you want to practise more before our next test?"
- "What is one thing you are proud of from today?"

### Watch For (Common Mistakes)
- Test anxiety — some children freeze; encourage them to skip and come back.
- Rushing — enforce "check your answer once before moving on."
- Copying — in group settings, ensure boards are set up independently.

### Timeline & Homework
- 5 min – Confidence warm-up: 1 easy puzzle + breathing
- 25 min – Test positions (5 positions, 5 min each)
- 10 min – Group review: go through answers together
- 5 min – Personal reflection and goal-setting for next sessions
- **Homework:** Write down 2 things you got right and 1 thing you will practise more.`,

    9: `### Objective & Outcomes
- Extended practice on giving check with all pieces and escaping check using all 3 methods. Reinforce ABCD of defence.
- Students can: fluently give and escape check in positions with multiple pieces, combine ABCD with check-escape thinking.
- Builds confidence before checkmate exercises in Session 10.

### How to Explain It
- Repetition session — chess skills become automatic through practice, not memorisation.
- "Giving check is like pressing the alarm — your opponent MUST respond."
- Combine the learning: after escaping check, use ABCD to improve your position.

### Story
Just like a footballer practises free kicks until they can score in their sleep, today you practise giving check until it feels completely automatic. Every piece gives check in a different way — the Rook zooms down a straight line, the Bishop slides diagonally, the sneaky Knight jumps over everyone to land in an unexpected spot. By practising both giving check AND escaping check over and over, your brain will start to see these patterns instantly in a real game — no thinking required!

### Teaching Steps
1. Start with 3 quick "give check with this piece" exercises from different board positions.
2. Present 4 "escape the check" puzzles with increasing difficulty.
3. Combined exercise: escape check AND protect a hanging piece in the same move.
4. ABCD drill: set up 4 positions, students call out the letter before moving.
5. Mini game: alternate between giving check and defending — who survives longest?

### Questions to Ask Students
- "Can you give check with a Pawn? Show me how."
- "Your Queen is giving check — what are the 3 ways to escape?"
- "Can you escape check AND attack something at the same time?"
- "You have two ways to block — which blocking piece is safer to use?"
- "What is the ABCD letter for moving your King to safety?"

### Watch For (Common Mistakes)
- Missing the option to CAPTURE the checking piece (students over-rely on blocking or King moves).
- Moving the King into another check — always verify the escape square is safe.
- Blocking with the wrong piece — if the blocker can be captured for free, it's not a good block.

### Timeline & Homework
- 5 min – Test 1 review: revisit one question each student found hardest
- 12 min – Give check exercises (all piece types)
- 12 min – Escape check exercises (3 methods)
- 10 min – Combined check and ABCD positions
- 6 min – Mini game
- **Homework:** Set up 5 "give check" positions on the board and write down the move in notation.`,

    10: `### Objective & Outcomes
- Learn checkmate in one move with major and minor pieces. Learn board geography: centre squares (d4,d5,e4,e5), extended centre, White's camp, Black's camp.
- Students can: deliver checkmate in one move with Queen, Rook, Bishop, or Knight; identify centre and extended centre squares.
- Board geography knowledge directly supports opening principles in Session 22.

### How to Explain It
- **Checkmate in 1:** The King is in check AND has no escape — you win in ONE move!
- **Centre squares:** d4, d5, e4, e5 — the 4 most important squares on the board (like the midfield in football).
- **Extended centre:** c3–c6–f6–f3 — the ring around the centre.
- White camp = rows 1–4; Black camp = rows 5–8.

### Story
Think of the chess board like a football pitch. The four centre squares (d4, d5, e4, e5) are like the centre circle — whoever controls the middle controls the whole game, just like the best footballers always want to be in the centre of the pitch. And checkmate in one move is like having an open goal right in front of you — once you know what to look for, you should NEVER miss it! Today you learn both: know your map AND finish in one move.

### Teaching Steps
1. Show board geography first — draw or highlight the centre on a demo board.
2. Quiz: "Name a centre square. Is g4 a centre square?"
3. Introduce checkmate-in-1 with the Queen first (easiest to visualise).
4. Progress to Rook, then Bishop/Knight (harder angles).
5. Puzzle race: 5 positions, first to find checkmate in 1 wins a point.

### Questions to Ask Students
- "How many centre squares are there? Can you name them?"
- "Why do you think controlling the centre is so important in chess?"
- "Which piece do you think gives checkmate most easily? Why?"
- "The King is in the corner — which piece would YOU use to checkmate it?"
- "Can a Pawn give checkmate? Can you imagine how?"

### Watch For (Common Mistakes)
- Students deliver check but not checkmate — verify all escape squares are covered.
- Confusing check with checkmate — reinforce: checkmate = no escape.
- Missing the checkmate because they look for complex moves instead of the obvious one.

### Timeline & Homework
- 5 min – Warm-up: board geography labelling exercise
- 10 min – Centre squares discussion and quiz
- 15 min – Checkmate in 1 with each piece type
- 10 min – Timed puzzle race
- 5 min – Reflection
- **Homework:** Find 5 "Mate in 1" puzzles on Lichess and record which piece delivers the checkmate.`,

    11: `### Objective & Outcomes
- Learn castling: when, how, and why it is done. Both kingside (0-0) and queenside (0-0-0).
- Students can: castle correctly in a practice position, list the 4 conditions that prevent castling, explain why castling is important.
- Special rule that confuses many beginners — crystal clarity here prevents future rule arguments.

### How to Explain It
- **Castling** = the King and Rook do a special teamwork move — the only time two pieces move at once!
- **Kingside castle (0-0):** King slides 2 squares toward the h-file Rook; Rook jumps to the other side.
- **Queenside castle (0-0-0):** King slides 2 squares toward the a-file Rook.
- **You CANNOT castle if:** the King has moved, the Rook has moved, the King is in check, or the King passes through an attacked square.

### Story
In dodgeball, sometimes the best move is to dodge BEHIND a teammate for cover. Castling in chess is exactly like that — the King sprints two squares sideways and the Rook jumps over to stand guard right next to it. It is the only move in chess where TWO pieces move at the same time, and it gets your King off the dangerous open area and safely behind a wall of Pawns. Think of it as the King calling in a bodyguard — but only if neither of them have moved yet!

### Teaching Steps
1. Ask "Why would a King want to hide?" — leads naturally into the purpose of castling.
2. Demonstrate kingside castle step-by-step; have students mimic on their boards.
3. Demonstrate queenside castle; note the difference in Rook jump distance.
4. Set up 4 positions where castling is ILLEGAL — students spot why.
5. Game with a rule: first to castle legally gets a bonus point.

### Questions to Ask Students
- "How many squares does the King move when castling? Does it matter which side?"
- "Your Rook has already moved — can you still castle on that side?"
- "You are in check — can you castle to escape? Why not?"
- "What is the BIG advantage of castling for your King?"
- "After castling, where is the Rook? Why is that position useful?"

### Watch For (Common Mistakes)
- Moving the Rook first and then the King — rule: King ALWAYS moves first.
- Trying to castle through a square that is under attack — trace the King's path carefully.
- Forgetting that castling rights are lost if EITHER the King or relevant Rook has moved.

### Timeline & Homework
- 5 min – Warm-up: checkmate in 1 quick puzzles from Session 10
- 10 min – Why castle? Safety and Rook activation discussion
- 15 min – Castling demonstration and student practice (both sides)
- 10 min – "Can I castle?" puzzle positions
- 5 min – Game with castling bonus rule
- **Homework:** In your next game, try to castle within the first 10 moves and write down the notation.`,

    12: `### Objective & Outcomes
- Learn en passant (the special pawn capture) and pawn promotion (pawns becoming Queens or other pieces).
- Students can: demonstrate en passant correctly, promote a pawn to any piece, explain when en passant is available.
- Completes all special moves — combines with castling for the full rulebook.

### How to Explain It
- **En passant:** When a pawn moves 2 squares from its start and lands beside an enemy pawn, the enemy pawn can capture it AS IF it only moved 1 square. Must be done IMMEDIATELY.
- **Pawn Promotion:** When a pawn reaches the opposite end of the board, it becomes ANY piece — almost always a Queen.

### Story
Imagine you are playing a racing game and someone tries to skip ahead by jumping two steps instead of one. En passant is the rule that says — "No shortcuts! If you skip a step, I can still tag you as if you only took one." And pawn promotion is like a video game power-up: if your tiny character makes it all the way to the far end of the map, they transform into the strongest character in the game — almost always a Queen! The smallest piece on the board can become the most powerful — if it is brave enough to make the journey.

### Teaching Steps
1. Set up en passant situation — go slowly, it's usually the most surprising rule for beginners.
2. Show it happening step-by-step; have students do it on their own boards.
3. Important: "If you don't take en passant NOW, the chance is gone forever."
4. Set up a pawn race to the other side — demonstrate promotion.
5. Ask "Can you promote to a SECOND Queen?" (Yes!) — students are usually amazed.

### Questions to Ask Students
- "Why do you think en passant exists as a rule? What problem does it solve?"
- "Your opponent just moved their pawn 2 squares — you have an en passant capture available. What happens if you wait?"
- "A pawn is on e7 — how many moves to promotion? What piece would YOU choose?"
- "Can you promote to a King? Why do you think not?"
- "Imagine you promote to a Rook instead of a Queen — when might that be the right choice?"

### Watch For (Common Mistakes)
- En passant capture landing on the wrong square — the capturing pawn goes to the square the opponent's pawn PASSED through.
- Forgetting en passant must be immediate — this is a very common error.
- Students not promoting to a Queen by default — remind them it is almost always the best choice.

### Timeline & Homework
- 5 min – Castling recap: castle correctly in under 30 seconds
- 12 min – En passant: slow explanation, then student practice
- 8 min – En passant puzzle positions (when is it available?)
- 10 min – Pawn promotion race game
- 10 min – Practice game with all special moves allowed
- **Homework:** Explain en passant to a family member and teach them the pawn promotion rule.`,

    13: `### Objective & Outcomes
- Learn assisted checkmates — delivering checkmate with help: Q+K, R+K, multiple pieces together.
- Students can: force checkmate with Queen and King against a lone King, understand why lone pieces cannot checkmate alone.
- Foundation for the two-Rook checkmate in Session 23.

### How to Explain It
- A single Queen usually cannot force checkmate without the King's help — teamwork is needed.
- **Queen + King:** Push the lone King to the edge, then deliver checkmate with both pieces working together.
- **Rook + King:** Same principle — use the Rook to cut off files/ranks, King helps corner the enemy King.
- Stalemate danger: never leave the enemy King with NO moves unless it's also in check!

### Story
Imagine you are trying to score a goal but the goalkeeper is too strong for just one player — you need a teammate to distract the goalkeeper while you slot it in. Queen + King checkmate works exactly like that: the Queen cannot do it alone (she accidentally causes stalemate!) but with the King blocking the enemy King's escape squares, it becomes unstoppable. Two pieces working as a team beat one piece trying to do everything alone. In chess, as in sport — teamwork wins!

### Teaching Steps
1. Show why Queen alone cannot mate — demonstrate the stalemate trap (very important!).
2. Demonstrate Q+K checkmate step by step; show how to avoid stalemate.
3. Students practice Q+K checkmate: can they do it in under 20 moves?
4. Introduce R+K briefly (show the idea; full practice in Session 23).
5. Show a fun promoted-pawn checkmate (Pawn promotes to Queen and immediately mates).

### Questions to Ask Students
- "Can a Queen give checkmate all by herself without the King? Let's find out."
- "What is STALEMATE and why is it dangerous when you have a big material advantage?"
- "Where should the King go when you are trying to checkmate with Queen and King?"
- "Why does the enemy King keep going to the centre — how do we push it to the edge?"
- "What is the minimum number of moves to checkmate with Queen and King?"

### Watch For (Common Mistakes)
- Causing stalemate when winning easily — spend time on this, it's the #1 heartbreak for beginners.
- Not activating the King to help — students often try to do everything with the Queen.
- Giving unnecessary checks that push the King back to the centre — chase, don't push.

### Timeline & Homework
- 5 min – Special moves recap quiz
- 8 min – Stalemate trap demonstration and discussion
- 15 min – Queen + King checkmate practice
- 10 min – Students race: who mates fastest?
- 7 min – Show promoted-pawn mate positions
- **Homework:** Practice Q+K vs K on Lichess endgame trainer until you can do it every time without stalemate.`,

    14: `### Objective & Outcomes
- Learn to choose correct captures: only take pieces that are genuinely free (hanging), not pieces that are defended.
- Students can: distinguish hanging from defended pieces, avoid making losing captures, spot traps in simple positions.
- Extends the hanging piece skill from Session 4 — now with defenders added.

### How to Explain It
- **Hanging piece:** No one protecting it — take it for free!
- **Defended piece:** Protected by another piece — taking it might cost you more than you gain.
- **The rule:** Before capturing, ask "If I take this, what happens next?" Count attackers vs defenders.

### Story
Imagine reaching for the last biscuit on a plate at a party — but someone else's hand is already on it! A piece that LOOKS free is not always free. Sometimes there is a hidden defender watching over it, like a security camera you did not notice in the shop. Before you grab anything, count how many pieces are protecting it. If there is a guard, leave it alone. Wait for the guard to go away — and THEN take the free piece!

### Teaching Steps
1. Show 3 positions: one hanging, one defended, one tricky (looks hanging but isn't).
2. Teach the "attacker vs defender count" — tally both sides before deciding.
3. Show a captured piece that causes the captor to be captured in return.
4. Partner exercise: one student sets up, the other must decide "take or not take?"
5. Game with rule: every capture must be justified before making it.

### Questions to Ask Students
- "This pawn is at d5 and a Rook is behind it — is the pawn hanging?"
- "Count the attackers and defenders on this piece — who wins if there's a trade?"
- "You CAN take that Rook, but should you? What happens after?"
- "How do you tell the difference between a piece being attacked and a piece being hanging?"
- "What is your 3-second check before every capture?"

### Watch For (Common Mistakes)
- Capturing a defended piece and losing material — reinforce: count before you capture.
- Not capturing a genuinely hanging piece because it "looks suspicious" — teach trust in the count.
- Forgetting to count the King as a defender — the King can recapture!

### Timeline & Homework
- 5 min – Warm-up: 3 hanging piece puzzles from memory
- 12 min – Hanging vs defended piece positions (6 examples)
- 10 min – "Count before you capture" practice
- 12 min – Partner set-up and judge exercise
- 6 min – Game with justified capture rule
- **Homework:** In your next 2 games, before every capture write down "H" (hanging) or "D" (defended) to build the habit.`,

    15: `### Objective & Outcomes
- Learn profitable exchanges: capturing pieces of higher value (trading up), and when to avoid equal exchanges.
- Students can: calculate whether a trade gains material, recognise when to decline an exchange, apply piece value arithmetic.
- Prepares students for more complex tactical decisions; consolidates piece value understanding from Session 3.

### How to Explain It
- **Profitable exchange:** Trading a lower-value piece for a higher-value one — you GAIN material.
- Example: trading a Knight (3 points) for a Rook (5 points) = winning 2 points. Great deal!
- **Unprofitable exchange:** Trading a Rook (5) for a Bishop (3) = losing 2 points. Avoid!

### Story
Imagine trading stickers with a friend. You give them one common sticker and they give you a shiny rare one — great deal! But if you give them your rarest sticker and only get back a common one, that is a bad trade. In chess, swapping your Knight (worth 3) for their Rook (worth 5) is like getting a shiny sticker for a common one — you are up 2 coins! But giving your Rook for their Bishop means losing 2 coins. Always do the quick maths before you swap — who is getting the better deal?

### Teaching Steps
1. Recap piece values with a quick quiz (30 seconds).
2. Show 3 exchange scenarios — students calculate the material balance after the trade.
3. Introduce the concept of declining trades: "Is it worth keeping your Bishop alive here?"
4. Set up a position where two trades are available — students pick the more profitable one.
5. Mini tournament: players get points for profitable exchanges made during a game.

### Questions to Ask Students
- "Your Knight can take a Rook — what is the material change? Is this trade good?"
- "Your opponent offers to trade Queens — both queens disappear. Who benefits more?"
- "When might you choose NOT to trade even when it's profitable?"
- "Is trading two Bishops for a Rook + Pawn good or bad? Let's calculate."
- "Can you think of a situation where giving up your Queen is actually the right move?"

### Watch For (Common Mistakes)
- Reflexively trading pieces without calculating value — reinforce the 3-second arithmetic check.
- Thinking all equal-value trades are neutral — sometimes trading helps one player's position.
- Forgetting the Pawn is worth 1 — students often ignore Pawns in calculations.

### Timeline & Homework
- 5 min – Piece value lightning quiz
- 12 min – 6 "should I trade?" calculation puzzles
- 10 min – Profitable vs unprofitable exchange sorting game
- 10 min – Mini game with exchange scoring system
- 8 min – Review session: what was learned today?
- **Homework:** After your next game, list every trade made and calculate whether each was profitable, equal, or unprofitable.`,

    16: `### Objective & Outcomes
- Formal Test 2: assess Sessions 9–15 skills (check, checkmate in 1, special moves, hanging pieces, correct captures, exchanges).
- Coach identifies each student's strongest and weakest areas for targeted support.
- Calm, encouraging test environment — focus on growth, not grades.

### How to Explain It
- Same approach as Test 1 — reassure students this is a checkpoint, not a judgement.
- "Every mistake you make today tells us exactly what to practise — it is useful information, not failure."
- Use a growth mindset phrase: "Not yet — but getting closer!"

### Story
Halfway through any sports season, the coach does a practice match to see what is working and what needs more training. This test is your chess midseason check-up. You have practised piece swaps, castling, checkmate, and hanging pieces — now you get to show what stuck and discover what needs one more go. Remember: the test does not make you better. Your practice made you better. The test just shows you how much you have grown!

### Teaching Steps
1. Calming warm-up: one breathing exercise and one easy puzzle to build confidence.
2. Test positions cover: check escape, checkmate in 1, castling, en passant, hanging piece, profitable exchange.
3. Students work independently and quietly.
4. After test: paired discussion — students explain their answers to a partner.
5. Coach shares observations positively.

### Questions to Ask Students (post-test)
- "Which question surprised you the most?"
- "Did you use the 'count before you capture' habit?"
- "Where did you feel most confident? Most unsure?"
- "What do you want to focus on in the next sessions?"
- "If you were designing the test, what question would you add?"

### Watch For (Common Mistakes)
- Students rushing through test positions — enforce "check once before moving on."
- Anxiety about getting wrong answers — keep the atmosphere light and encouraging.
- Students who finish early becoming distracting — have extension puzzles ready.

### Timeline & Homework
- 5 min – Confidence warm-up: 1 easy puzzle + breathing
- 25 min – Test (6 positions)
- 10 min – Partner discussion and self-marking
- 5 min – Coach feedback and celebration of progress
- **Homework:** Identify 2 areas from the test to practise and do 5 puzzles in each area on Lichess.`,

    17: `### Objective & Outcomes
- Mixed checkmate practice: direct checkmates and assisted checkmates (supporting pieces).
- Students can: identify checkmate patterns when multiple pieces are on the board, find the mating move quickly.
- Bridges single-piece checkmates to real game positions where the board is crowded.

### How to Explain It
- **Direct checkmate:** A piece directly attacks the King and it cannot escape, block, or capture.
- **Assisted checkmate:** One piece gives check while others cover the escape squares.
- The key skill: LOOK at all squares the King could run to BEFORE you make the mating move.

### Story
A striker in football does not just practise shooting from one spot — they practise left foot, right foot, close in, far out, tricky angle. Today is your mixed checkmate shooting drill: sometimes the Queen gives the final check, sometimes the Rook, sometimes even a Pawn! Before you shout "Checkmate!", always trace every single square the King could run to. If even ONE escape square is open, it is only check — not checkmate. Close every door before you celebrate!

### Teaching Steps
1. Start with 3 direct mates — students should solve instantly.
2. Move to 3 assisted mates — students must trace the King's escape squares first.
3. Introduce a "mate in 1 checklist": is the King in check? Can it capture? Can it run? Can it be blocked?
4. Mixed drill: 10 positions — half direct, half assisted — students label each as D or A.
5. Game with instructor: students try to deliver checkmate; coach defends.

### Questions to Ask Students
- "Before you play the mate, trace every square the King can move to. Are they ALL covered?"
- "Which piece is giving the final check in this position?"
- "If the King could capture your mating piece, what would happen? Is it protected?"
- "Can you find a mate that uses TWO of your pieces working together?"
- "What's the fastest way to find checkmate in a position — where do you look first?"

### Watch For (Common Mistakes)
- Giving check instead of checkmate — the King escapes on the very next move.
- Not checking if the mating piece is protected when it could be captured.
- Missing the mate because they look for complicated moves — checkmate is often simple.

### Timeline & Homework
- 5 min – Warm-up: 2 easy direct mates as a refresh
- 12 min – Direct checkmate positions (escalating difficulty)
- 12 min – Assisted checkmate positions
- 10 min – Mixed drill (label and solve)
- 6 min – Students challenge the coach to escape checkmate
- **Homework:** Solve 10 "Mate in 1" puzzles on Lichess focusing on recognising whether they are direct or assisted.`,

    18: `### Objective & Outcomes
- Learn stalemate and the concept of a draw — what it means, how it happens, how to avoid it when winning.
- Students can: recognise a stalemate position, deliberately avoid stalemating the opponent when winning, understand why a draw is sometimes a good result.
- Critical lesson — stalemate is the #1 costly mistake for beginners who are winning.

### How to Explain It
- **Draw:** The game ends with no winner — neither side wins or loses.
- **Stalemate:** A player has NO legal move but is NOT in check — the game immediately ends as a draw!
- When you are winning, leave the opponent at least ONE legal move at all times until you can deliver checkmate.

### Story
Imagine you are winning a board game by miles — and then right at the end, you accidentally land on the one rule that wipes your score and makes it a draw. That is stalemate! You can capture every single piece on the board and still only get a draw if you leave the enemy King with NO moves but NOT in check. It is one of the most frustrating moments in chess — especially because it was so easy to avoid. Always make sure the King has at least one square to move to, until you are ready to deliver the final checkmate!

### Teaching Steps
1. Show a stalemate position — "Why is this a draw?" Correct the misconception.
2. Show 3 positions — students judge: is this checkmate or stalemate?
3. Classic stalemate trap with Queen alone vs King — show how to fall into it.
4. Show how to AVOID stalemate: give the King a safe square to waste a move on.
5. Students practice Q+K vs K again, now with stalemate awareness.

### Questions to Ask Students
- "What is the difference between checkmate and stalemate?"
- "If you have a Queen and King vs a lone King — can you guarantee a win? What must you avoid?"
- "Show me a position that looks like a win but is actually a draw."
- "If your opponent is about to be stalemated, what should you do differently?"
- "Has anyone ever accidentally drawn a winning game? How did it feel?"

### Watch For (Common Mistakes)
- Students still confusing stalemate and checkmate after explanation — run through the definition again.
- Accidentally stalemating during Q+K vs K practice — catch and correct immediately.

### Timeline & Homework
- 5 min – Warm-up: checkmate in 1 quick round
- 10 min – Stalemate definition and examples
- 10 min – Checkmate vs stalemate sorting: 6 positions
- 15 min – Q+K vs K practice with stalemate avoidance
- 5 min – "The most important draw rule" reflection
- **Homework:** Set up 3 stalemate positions and show a family member why they are draws, not checkmates.`,

    19: `### Objective & Outcomes
- Learn all remaining draw rules: draw by agreement, threefold repetition, 50-move rule, insufficient material.
- Students can: identify each draw type, recognise when to offer a draw strategically, avoid draws they don't want.
- Completes the full rule set — students now know EVERY rule in chess.

### How to Explain It
- **Draw by agreement:** Both players shake hands and agree to call it even.
- **Threefold repetition:** The SAME position appears 3 times — either player can claim a draw.
- **50-move rule:** No pawn move and no capture for 50 moves each — either player can claim a draw.
- **Insufficient material:** Neither side can force checkmate (e.g., K vs K, K+B vs K).

### Story
In football, if a match goes on for ages with no goals, eventually the final whistle blows and it is a draw — nobody wins. Chess has similar rules to stop games going on forever. If the same position happens three times, either player can say "draw!" If 50 moves pass with no captures and no pawn moves, same thing. And if there are not enough pieces left to even force checkmate, the game is automatically drawn. These rules exist so that chess games always come to an end — even when both players are being very stubborn!

### Teaching Steps
1. Ask "Can a chess game go on forever?" — leads to the 50-move and repetition rules.
2. Set up threefold repetition: demonstrate the same position three times with moves in between.
3. Show insufficient material examples — which combinations cannot force checkmate?
4. Role-play scenario: you are losing badly — when might you offer a draw?
5. Quiz: show 4 positions and ask "which draw rule applies here?"

### Questions to Ask Students
- "You have only a King and a Bishop left — can you still win? Or is it automatically a draw?"
- "Your opponent keeps repeating the same moves — what rule might save you?"
- "When would it be smart to OFFER a draw even if you have more pieces?"
- "After how many moves without a capture or pawn move can you claim a draw?"
- "King vs King — is it draw? What about King + two Knights vs King?"

### Watch For (Common Mistakes)
- Confusing stalemate with threefold repetition — review both definitions side by side.
- Students thinking K+N+N vs K is automatic checkmate — it usually cannot be forced.

### Timeline & Homework
- 5 min – Stalemate recap from Session 18
- 10 min – Draw by agreement and when to use it
- 12 min – Threefold repetition and 50-move rule demonstrations
- 10 min – Insufficient material positions quiz
- 8 min – "Would you offer a draw?" scenario discussion
- **Homework:** Play a game and try to deliberately create a threefold repetition — can you spot when it happens?`,

    20: `### Objective & Outcomes
- Mixed practice: combine all special moves (castling, en passant, promotion) and all draw types in realistic game positions.
- Students demonstrate fluency — applying rules without hesitation in the right situations.
- Final skills consolidation before opening checkmates and principles in Sessions 21–22.

### How to Explain It
- Consolidation session — no new rules. All the rules combined in one position.
- "By now you know EVERY rule in chess. Today we put them all together."

### Story
Think of today like a driving test where you have to show you can do EVERYTHING: park, indicate, give way, use mirrors. You know all the special chess rules now — castling, en passant, promotion, stalemate, draws. Today you prove you can spot the right rule at the right moment in a real game, without anyone telling you which one applies. That is the real skill: not just knowing the rules, but seeing them coming before they arrive!

### Teaching Steps
1. Set up a position using 3 special rules simultaneously — students identify each opportunity.
2. Play-through game: coach plays and students call out every time a special rule applies.
3. "Spot the rule" game: show positions where special moves are possible — students name the rule.
4. Full games where all rules are in play; coach monitors and quizzes students on their choices.
5. End with a "rules mastery" quiz — 10 questions, 30 seconds each.

### Questions to Ask Students
- "This pawn just moved 2 squares — what can your pawn do right now?"
- "You want to castle but your King needs to pass through an attacked square — can you castle?"
- "This pawn is on d7 — what should they promote to and why?"
- "Count the remaining material — is a draw by insufficient material possible?"
- "If you repeat this position one more time, what can your opponent claim?"

### Watch For (Common Mistakes)
- Missing en passant opportunities — remind students to check for it every time an opponent pawn moves 2 squares.
- Promoting to anything other than a Queen without good reason.

### Timeline & Homework
- 5 min – Rules rapid-fire quiz (all rules in 5 minutes)
- 15 min – Combined positions workout (5 positions, all rules possible)
- 15 min – Full games with rules awareness
- 5 min – "Hardest rule to remember" discussion and memory tricks
- **Homework:** Complete one full game and annotate every special rule or draw situation that came up.`,

    21: `### Objective & Outcomes
- Learn opening traps and checkmates: Fool's Mate (2 moves), Scholar's Mate (4 moves), and their defences.
- Students can: deliver Fool's Mate and Scholar's Mate, recognise when they are being played against, defend correctly against both.
- Highly motivating lesson — students love these quick wins and the "detective" feeling of spotting traps.

### How to Explain It
- **Fool's Mate:** The fastest possible checkmate — White plays badly and Black mates in just 2 moves.
- **Scholar's Mate (4-move checkmate):** 1.e4 e5 2.Bc4 ... Qh5 — attacking the weak f7 square.
- The defence is simple: develop pieces, don't move the same piece twice, watch for Qh5.

### Story
Every sport has trick plays — in cricket it is the googly, in football it is the dummy run. Scholar's Mate is chess's most famous trick play: attack the weak f7 square with the Queen and Bishop before your opponent has time to set up properly. It works against players who are not paying attention — but once you know it, you will defend it in your sleep. And Fool's Mate? That is what happens when you make two terrible moves in a row and hand your opponent an instant win. Learn both sides — how to set the trap AND how to escape it!

### Teaching Steps
1. Play the Fool's Mate with a student without explaining what you are doing — they are surprised!
2. Analyse: "What did White do WRONG?" Links to future opening principles.
3. Demonstrate Scholar's Mate step by step — then defend it.
4. Students attempt to trap each other; partner must identify and defend.
5. Discuss: "Is it good chess to only try these traps?"

### Questions to Ask Students
- "Can you tell me what's dangerous about Black's move Qh5?" (before revealing it attacks f7)
- "Why does Fool's Mate only work if White plays very badly?"
- "How would you defend against Qh5? What move stops the threat?"
- "After Scholar's Mate is defended, who has the better position? Why?"
- "Would you use these traps in a tournament? When might they work?"

### Watch For (Common Mistakes)
- Students not seeing the f7 weakness — point out that f7 is only protected by the King.
- Playing Qh5 without Bc4 first — the trap doesn't work without the Bishop.
- Defending Scholar's Mate with the wrong piece — Nf6 is the best defence; g6 also works.

### Timeline & Homework
- 5 min – Surprise Fool's Mate game (without warning!)
- 10 min – Fool's Mate analysis: what went wrong for White
- 15 min – Scholar's Mate demonstration and student practice
- 10 min – Defence training: student defends against coach's Scholar's Mate
- 5 min – Ethics discussion: is trapping good chess?
- **Homework:** Teach Scholar's Mate to a friend or family member, then show them how to defend it.`,

    22: `### Objective & Outcomes
- Learn the 3 core opening principles: control the centre, develop pieces to active squares, castle for King safety.
- Students can: apply all 3 principles in the first 10 moves of a game, explain WHY each principle matters.
- Transforms students from "move any piece" to purposeful chess players — this is a huge moment.

### How to Explain It
- **Control the centre:** Place pawns or pieces on/near d4, d5, e4, e5 — the most powerful squares.
- **Develop your pieces:** Bring out Knights and Bishops early; don't move the same piece twice without reason.
- **Castle:** Get your King to safety and connect your Rooks.
- Memory phrase: **CDC** — Centre, Develop, Castle.

### Story
Before a football match, the coach gives the team a game plan: control the middle of the pitch, get all your best players into position early, and make sure your goalkeeper is protected. In chess, your opening game plan is exactly the same — CDC: Control the centre, Develop your pieces, Castle your King to safety. If you follow CDC every game, you start from a strong position every single time. And if your opponent ignores CDC? You punish them immediately — just like a football team that presses high when the other team's defence is disorganised!

### Teaching Steps
1. Ask "What should you do in the first 5 moves of a game?" — let students guess before teaching.
2. Compare a principled opening vs unprincipled (h4, a4, Na3, Nh3).
3. Play out 10 moves with ONLY the principles — no tactics, just good development.
4. Show how breaking principles leads to trouble (Scholar's Mate connection from Session 21).
5. Students play 5-minute games focusing ONLY on applying CDC — no winning traps allowed.

### Questions to Ask Students
- "If you could choose any two pawns to move first, which would you choose? Why?"
- "You've already moved your Knight to f3 — should you move it again to get a better square?"
- "Where is your King after 10 moves if you forgot to castle? Is that safe?"
- "Which side of the board has more control — the player who developed or the one who moved pawns only?"
- "Can you develop a piece to a square where it cannot be used effectively?"

### Watch For (Common Mistakes)
- Moving the Queen early — demonstrate why this loses time.
- Neglecting to castle — the King stays in the centre and gets attacked.
- Moving the same pawn multiple times instead of developing new pieces.

### Timeline & Homework
- 5 min – Warm-up: Scholar's Mate defence recap
- 10 min – 3 opening principles introduction with board demonstration
- 12 min – Good vs bad opening comparison analysis
- 15 min – CDC game (principles-only, no tricks)
- 3 min – "One opening principle I will always remember" — each student shares
- **Homework:** Play 3 games and in each one, write down your first 10 moves — check: did you follow CDC?`,

    23: `### Objective & Outcomes
- Master checkmate with two Rooks (rolling lawnmower) and Queen checkmate against a lone King.
- Students can: deliver two-Rook checkmate in under 15 moves, apply the Queen+King checkmate reliably without stalemate.
- Practical endgame skill that decides most beginner games — essential before the final assessment.

### How to Explain It
- **Two Rooks ("Lawnmower"):** One Rook cuts off a rank, the other gives check — the King is pushed to the edge row by row.
- **Queen + King:** Queen controls two rows at once; use the King to drive the enemy King to the edge.
- Key concept: **Zugzwang** — forcing the opponent into a position where any move makes their position worse.

### Story
Think of two Rooks as two players in a game pushing the opponent toward the wall — one cuts off the left side, the other cuts off the right, and together they slowly herd the enemy King to the edge, row by row, like a lawnmower. Once the King is trapped on the last rank with no room to run, the second Rook slides across and delivers checkmate. It is one of the most satisfying finishes in chess — but only if you remember not to accidentally cause stalemate along the way!

### Teaching Steps
1. Demonstrate the lawnmower with two Rooks — show the clean, mechanical pattern.
2. Students practice 2R+K vs K: can they do it in under 20 moves?
3. Compare to Q+K checkmate — Queen cuts off larger areas.
4. Stalemate trap reminder — show the stalemate danger with the Queen.
5. Tournament: students race to checkmate the lone King; coach times each attempt.

### Questions to Ask Students
- "The enemy King is on e5 — which Rook move pushes it backward without giving stalemate?"
- "Your second Rook is on a1 — when do you use it to give the final check?"
- "Why do we call the two-Rook checkmate a 'lawnmower'? What does the pattern look like?"
- "The King is on e8 — can you force checkmate in 1 from this position with your Rooks?"
- "What's the biggest danger when you're trying to deliver checkmate with the Queen alone?"

### Watch For (Common Mistakes)
- Rooks blocking each other — keep them on different files/ranks working together.
- Moving to the wrong Rook square and allowing the King to approach — trace the King's moves first.
- Stalemate with the Queen — always leave one escape square until the King is cornered.

### Timeline & Homework
- 5 min – Opening principles warm-up (CDC in 5 moves from memory)
- 10 min – Two-Rook lawnmower demonstration
- 15 min – Students practice 2R+K vs K
- 12 min – Q+K vs K practice with stalemate drill
- 3 min – "Today I learned" 30-second shares
- **Homework:** Practice both 2R vs K and Q vs K on Lichess endgame trainer until you succeed 5 times in a row without stalemate.`,

    24: `### Objective & Outcomes
- Final Assessment: test all Beginner-level knowledge across the full curriculum.
- Coach provides each student with a personalised progress summary.
- Celebrate learning and set goals for Foundation 1 — end on a high note.

### How to Explain It
- "This is your graduation test — you've come so far from Session 1!"
- Reassure: "Chess masters never stop learning — this is just the end of the beginning."
- The final assessment is also a celebration — every student who completes the Beginner level deserves recognition.

### Story
Today is your graduation day — not from school, but from Beginner chess! Think about where you started: you did not know what a Rook was, how to give check, or what CDC meant. Now you know every piece, every special move, every type of draw, and you can spot a free piece in seconds. That is a HUGE amount of growth! The next level — Foundation 1 — has exciting new challenges waiting, including powerful tactics you have never seen before. You have earned your place there. Well done!

### Teaching Steps
1. Start with 5 minutes of the students' favourite game or warmup from the course.
2. Test covers: piece movement, special moves, draws, hanging pieces, ABCD, check/checkmate, captures, openings, endgames.
3. After the test, hand each student a "Beginner Checklist" of what they have mastered.
4. One-on-one 2-minute chats: "Your strongest skill is X. In Foundation 1, focus on Y."
5. End with a celebratory full game between students — all rules, all skills!

### Questions to Ask Students (post-assessment)
- "What is the chess concept you are most proud of learning?"
- "Which session was the hardest for you?"
- "What are you most excited to learn in Foundation 1?"
- "If you had to teach one thing from this level to a brand-new player, what would it be?"
- "How have you changed as a chess player since Session 1?"

### Watch For (Common Mistakes)
- Students underselling their progress — help them see how far they've come.
- Students who struggled throughout feeling demotivated — celebrate effort and improvement, not perfection.
- Missing answers due to test nerves — allow verbal answers for students who freeze under written tests.

### Timeline & Homework
- 5 min – Favourite warm-up game from the course
- 25 min – Final Assessment (8 positions covering all topics)
- 10 min – Review and personalised feedback
- 5 min – Celebration, Foundation 1 preview, and goal-setting
- **Homework:** Play 5 games this week applying everything you learned. Write down one improvement you notice in each game.`,
  },

  'Foundation 1': {
    1: `### Objective & Outcomes
- Solidify Beginner knowledge: castling rules, mate-in-1 patterns, and CDC opening principles.
- Students can: castle correctly under pressure, find a mate-in-1 in 10 seconds, recite CDC from memory.
- Connects everything learned in Beginner to the tactical work starting in Session 3 — a strong foundation is essential before tactics begin.

### How to Explain It
- "Think of today as a fitness warm-up — we are sharpening the tools you already have before picking up new ones."
- **Castling:** King 2 squares, Rook jumps over — only if neither has moved, not through check, not in check.
- **Mate in 1:** Scan all your pieces, ask "Can any of these give a check that cannot be escaped?"
- **CDC (Centre, Develop, Castle):** Every opening move should serve at least one of these three goals.

### Story
Before any sports season, athletes go back to basics — stretching, footwork, the fundamentals — even if they have done it a hundred times before. You learned castling, mate in 1, and CDC in Beginner. Today you sharpen them until they feel as automatic as tying your shoelaces. You do not even think about it — you just do it. The stronger your basics, the more powerful the new tactics you are about to learn will become!

### Teaching Steps
1. Quick-fire castling quiz: show 6 positions — legal or illegal? Students answer within 5 seconds.
2. Mate-in-1 speed round: 5 positions, 10 seconds each — students write the move in notation.
3. Ask "What does CDC stand for?" — students answer, then demonstrate on the board.
4. Play a practice opening: coach makes a bad opening move, students identify which CDC principle it breaks.
5. Short game: students play 10 moves applying CDC while coach watches and gives live feedback.

### Questions to Ask Students
- "Your King has never moved but the Rook has — can you castle on that side?"
- "CDC says control the centre — which 4 squares are we talking about?"
- "You have a mate in 1 available but you haven't noticed it. How do you train yourself to always look?"
- "After castling, where is your Rook? Why is that a better square than the corner?"
- "Name one CDC principle that was BROKEN in this opening. What should White have played instead?"

### Watch For (Common Mistakes)
- Forgetting the King cannot castle through an attacked square — trace the path carefully.
- Missing mate-in-1 because students scan pieces in the wrong order — suggest starting with the Queen.
- Playing CDC mechanically (moving a centre pawn twice "because CDC") — CDC is a guide, not a rigid rule.

### Timeline & Homework
- 5 min – CDC from memory: students write it out without looking
- 12 min – Castling legal/illegal speed quiz (6 positions)
- 12 min – Mate-in-1 speed round (5 positions)
- 10 min – Opening game with CDC focus
- 6 min – Recap: what are we learning NEXT session? (Preview: endgame checkmates)
- **Homework:** Play 3 games and in each one, castle within the first 10 moves. Write down which move you castled on.`,

    2: `### Objective & Outcomes
- Revise and master Queen checkmate, two-Rook (lawnmower) checkmate, and Rook+King checkmate.
- Students can: deliver all three checkmate types reliably, avoid stalemate in every scenario.
- Closes out the endgame fundamentals chapter before pure tactics begins in Session 3.

### How to Explain It
- **2 Rooks (Lawnmower):** Alternating Rooks cut off ranks one by one — like mowing grass from one end to the other.
- **Queen + King:** Queen controls two rows at once; King drives the enemy King to the edge.
- **Key danger:** Never leave the enemy King with NO safe squares AND not in check — that's stalemate (a draw!).
- **Speed goal:** Foundation 1 students should be able to force these checkmates in under 20 moves.

### Story
Imagine herding a cat into its carrier. If you just chase it, it will run everywhere. But if one person blocks the left exit and another person blocks the right, the cat has nowhere to go! That is exactly how two Rooks work together — one cuts off escape rows, the other gives check, and the lone King is slowly pushed to the edge. Just like the cat situation, if you rush it and leave no escape at all but forget the check — it is stalemate. Be patient, coordinate, and finish it properly!

### Teaching Steps
1. Demo the two-Rook lawnmower slowly — narrate each move aloud.
2. Students race: who can deliver 2R checkmate in the fewest moves? (Target: under 15)
3. Demo Q+K checkmate with the stalemate avoidance technique.
4. Students practice Q+K — coach deliberately creates stalemate traps to see if students notice.
5. Timed challenge: checkmate in under 2 minutes — pressure adds to the learning.

### Questions to Ask Students
- "Your two Rooks are on a1 and a2 — the Black King is on e5. What is your first move?"
- "The Black King has one square to move to — but it's not in check. What do you do?"
- "You're about to move your Queen to give checkmate — but wait, is the Black King actually in check?"
- "After delivering 2R checkmate, can you convert the same position using only a Queen?"
- "Why do you always want the enemy King on the EDGE of the board, not the centre?"

### Watch For (Common Mistakes)
- Stalemate — still the #1 error; reinforce: always leave one safe square until ready to mate.
- Rooks blocking each other (both on the same rank/file) — keep them on separate lines.
- Using the Queen to give pointless checks instead of shrinking the King's space methodically.

### Timeline & Homework
- 5 min – Warm-up: stalemate vs checkmate — can students tell the difference in 3 positions?
- 15 min – Two-Rook lawnmower practice (race format)
- 15 min – Q+K vs lone K practice with stalemate traps
- 10 min – Mixed drill: coach gives a random endgame position, students identify which technique to use
- **Homework:** Complete the Lichess endgame trainer for 2R vs K and Q vs K — 5 consecutive successes each.`,

    3: `### Objective & Outcomes
- Understand the **Pin**: a piece cannot or should not move because it would expose a more valuable piece behind it.
- Students can: identify an absolute pin (illegal to move) and a relative pin (costly to move), use pins to win material.
- The Pin is one of the most common and powerful tactics in chess — mastering it unlocks dozens of patterns.

### How to Explain It
- **Absolute Pin:** A piece is pinned to the King — it CANNOT legally move (would expose the King to check).
- **Relative Pin:** A piece is pinned to a valuable piece (Queen, Rook) — it CAN move but it's a bad idea.
- **How to create a pin:** Align your long-range piece (Bishop, Rook, Queen) with an enemy piece and a more valuable piece behind it.
- **How to exploit a pin:** Attack the pinned piece repeatedly — it cannot defend itself by moving!

### Story
Imagine you are stuck in a queue at school because the person in front of you is not moving — and if they move, something bad happens. That is a PIN in chess! One piece is frozen because moving it would put a more important piece behind it in danger. The pinned piece looks strong but cannot do anything — like a player on the bench who is not allowed to come on. Once you spot a pinned piece, you can keep attacking it and the opponent cannot move it to defend!

### Teaching Steps
1. Set up a simple absolute pin on the King — ask "Can this Knight move? Why not?"
2. Set up a relative pin on the Queen — ask "Can this Bishop move? Should it?"
3. Show how to EXPLOIT a pin: pile up attackers on the pinned piece.
4. Show how to ESCAPE a pin: interpose a piece, move the valuable piece away, or capture the pinning piece.
5. Puzzle drill: 5 pin positions — students identify the pin and find the best continuation.

### Questions to Ask Students
- "This Bishop is pinned to the King — what type of pin is this? Can the Bishop legally move?"
- "There is a relative pin on your Knight. Your opponent attacks it with a Pawn. What do you do?"
- "How many times can you attack a pinned piece before it runs out of defenders?"
- "What are the 3 ways to escape a pin?"
- "Can a Pawn create a pin? How?"

### Watch For (Common Mistakes)
- Moving a piece that is absolutely pinned — students sometimes do this; stop and explain clearly.
- Not recognising relative pins — students move the pinned piece and lose the valuable piece behind it.
- Missing the opportunity to exploit a pin by piling up attackers.

### Timeline & Homework
- 5 min – Warm-up: quick mate-in-1 from Session 2
- 8 min – Introduce absolute pin with 2 clear examples
- 8 min – Introduce relative pin with 2 examples
- 12 min – Exploit the pin: attack and re-attack puzzles
- 10 min – Mixed pin puzzles (find the pin, name the type, find the best move)
- 7 min – Mini game with pin awareness
- **Homework:** Find 10 "Pin" puzzles on Lichess and solve them. Note whether each is absolute or relative.`,

    4: `### Objective & Outcomes
- Understand the **Skewer**: the opposite of a pin — a valuable piece is attacked, it moves, and a less valuable piece behind it is captured.
- Students can: set up a skewer with Bishops, Rooks, and the Queen; distinguish a skewer from a pin.
- Skewers are a key tactic that beginners often miss — they win material in endgames and middlegames alike.

### How to Explain It
- **Skewer = reversed pin.** In a pin, the MORE valuable piece is behind. In a skewer, the MORE valuable piece is IN FRONT — and must move, exposing what's behind.
- Classic skewer: Queen attacks enemy Queen → enemy Queen moves → your Queen takes the Rook that was behind.
- The attacker forces the move — the opponent has no choice but to "skewer" themselves.

### Story
A skewer is the opposite of a pin — instead of the important piece being stuck behind, the important piece is in FRONT! Imagine telling the teacher to move because you want something that is behind them. They have to step aside — they are too important to take a hit — and the moment they do, you grab what was behind them! In chess, your Rook (or Bishop or Queen) aims at an important enemy piece, forces it to move away, and then captures the less important piece hiding behind it. Out of the way — we are coming through!

### Teaching Steps
1. Contrast the pin and skewer side by side on the board — students spot the difference.
2. Show 3 skewer types: Rook skewer (straight), Bishop skewer (diagonal), Queen skewer.
3. Setup puzzle: place pieces so a skewer is possible — students find the skewering move.
4. King skewers: King in front of a Rook → skewer the King → take the Rook. Very common in endgames.
5. Mixed drill: 5 positions — is it a pin or a skewer? Students identify and find the tactic.

### Questions to Ask Students
- "What is the difference between a pin and a skewer? Which piece is in front?"
- "The White Rook is on a1, Black King is on a5, and a Black Rook is on a8 — what tactic is this?"
- "After you skewer the King and it moves, where do you capture and what do you win?"
- "Can a Knight create a skewer? Why or why not?"
- "In an endgame, your Bishop is aiming at the enemy King with a Rook behind it — what do you play?"

### Watch For (Common Mistakes)
- Confusing pin and skewer — run through the distinction again: valuable piece IN FRONT = skewer.
- Choosing the wrong piece to skewer with — only long-range pieces (Bishop, Rook, Queen) can skewer.
- Missing skewers in endgames — this is where they are most common; specifically King+Rook formations.

### Timeline & Homework
- 5 min – Warm-up: 3 pin puzzles from last session (revision)
- 8 min – Pin vs Skewer comparison: side-by-side on the board
- 10 min – Skewer with each piece type (Rook, Bishop, Queen)
- 10 min – King skewer endgame positions
- 10 min – Mixed pin/skewer drill: identify and solve
- 7 min – Game with pin/skewer hunting
- **Homework:** Find 5 "Skewer" puzzles on Lichess. After solving, write down which piece delivered the skewer.`,

    5: `### Objective & Outcomes
- Understand the **Double Attack (Fork)**: one piece simultaneously attacks two enemy pieces.
- Students can: identify double attacks with every piece type, set up a double attack deliberately, escape or avoid being forked.
- The double attack is the most common winning tactic in beginner and intermediate games — every chess player must master it.

### How to Explain It
- **Double Attack / Fork:** One move that creates TWO threats simultaneously. The opponent can only deal with one — you win the other.
- Any piece can create a double attack — even a Pawn!
- The most powerful form: attack the King (check) AND another piece at the same time — the opponent MUST deal with the check first.

### Story
You know in a game of tag when two people chase you from different sides at once? You can only dodge one — the other one tags you! A double attack in chess is exactly the same: one move threatens TWO of your opponent's pieces at the same time. They can only save one, so you win the other for free. It is like asking your mum AND your dad for permission at the same time — even if one says no, the other might say yes! One move, two threats — and your opponent can only answer one.

### Teaching Steps
1. Show a Pawn fork first — it's the most surprising and memorable.
2. Show a Queen double attack (very common) and a Rook double attack.
3. Show a "check-plus-attack" double: the most powerful type (opponent must respond to check).
4. Puzzle: set up a position where a double attack is possible — students find the forking square.
5. Game: students score a bonus point every time they create (or avoid) a double attack.

### Questions to Ask Students
- "What makes a double attack different from a regular attack?"
- "Your Queen can move to d5 and attack two pieces. Which two? Which one will you win?"
- "Why is a double attack with a CHECK especially powerful?"
- "You notice your Rook is about to be forked — what can you do to avoid it?"
- "Can a King create a double attack? In what situation?"

### Watch For (Common Mistakes)
- Students playing a double attack but the forking piece itself is unprotected and can be taken for free.
- Missing the "check-plus-attack" version — remind students to always check if a check creates a second threat.
- Not spotting that their own pieces are vulnerable to being forked.

### Timeline & Homework
- 5 min – Warm-up: skewer vs pin identification from last sessions
- 10 min – Double attack with Pawn, Queen, Rook (show each type)
- 10 min – Check + attack double attack examples
- 12 min – Find-the-fork puzzle positions (6 puzzles)
- 10 min – Mini game with "double attack bonus point" rule
- 8 min – "How could this have been avoided?" — analyse each puzzle from the defender's view
- **Homework:** Solve 10 "Fork" puzzles on Lichess (select "Fork" theme). Write down WHICH piece delivered each fork.`,

    6: `### Objective & Outcomes
- Master the **Knight Fork**: a Knight attacks two (or more) pieces simultaneously, often including the King.
- Students can: find the Knight fork square in a position, set up a Knight fork deliberately, avoid leaving pieces en prise to a fork.
- The Knight fork is the most exciting and surprising tactic — students love it and it appears in nearly every game.

### How to Explain It
- A **Knight fork** is a double attack by the Knight — it jumps to a square and attacks two pieces at once.
- The most powerful: Knight forks the **King and Queen** (called a "Royal Fork") — you win the Queen!
- How to set one up: look for a square where the Knight can reach that attacks two valuable enemy pieces.
- Remember the Knight's 8 possible squares from any position — the fork square is always one of those 8.

### Story
The Knight is the trickiest piece in chess because it is the ONLY one that can jump over other pieces — like a gymnast doing a backflip over the whole team! A Knight fork is when the Knight lands on a magic square where it attacks TWO enemy pieces at once. The most exciting one is when it attacks the King AND the Queen at the same time. The King is in check and HAS to move — and the moment it does, the Knight captures the Queen for free. One jump, two targets, one huge reward!

### Teaching Steps
1. Draw the Knight's 8 possible landing squares from any position — always visualise all 8.
2. Show 2 simple Royal Forks (King + Queen) — students identify the fork square.
3. Show Knight forks on Rooks, and Knight + two Rooks forks (win one Rook).
4. Set-up puzzle: pieces are placed so a fork is ONE MOVE away — students move a piece to create the fork opportunity.
5. Speed drill: 8 positions, 20 seconds each — find the Knight fork.

### Questions to Ask Students
- "The Knight is on d4 — list all 8 squares it can jump to."
- "The enemy King is on e8 and the Queen is on g7 — is there a Knight fork? Where?"
- "You see a Knight fork but the fork square is defended by a Pawn — what do you do first?"
- "How do you prevent your own King and Queen from being forked?"
- "Can a Knight fork THREE pieces at once? Can you set up a position where that happens?"

### Watch For (Common Mistakes)
- Students jumping to the fork square before checking if the landing square is defended — the forking Knight gets captured!
- Not seeing all 8 Knight moves — students often miss the "awkward" L-shapes; force them to list all 8.
- Forgetting that the fork must give CHECK to guarantee winning a piece (otherwise the opponent saves both).

### Timeline & Homework
- 5 min – Warm-up: find a double attack from Session 5
- 8 min – Knight's 8 squares visualisation drill (from 3 different positions)
- 12 min – Royal Fork puzzles (King + Queen) — 4 positions
- 12 min – Other Knight fork puzzles (Rook, Bishop targets)
- 10 min – Speed drill: 8 fork positions, 20 seconds each
- **Homework:** Find 10 "Knight Fork" puzzles on Lichess. For each one, write the Knight's fork square in notation (e.g., "Nf7+").`,

    7: `### Objective & Outcomes
- Learn **Discovered Check** (moving a piece to reveal a check from behind) and **Double Check** (both the moved piece AND the revealed piece give check simultaneously).
- Students can: identify a discovered check in a position, find a double check, understand why double check can only be answered by moving the King.
- These are among the most powerful attacking weapons in chess — a double check is almost always devastating.

### How to Explain It
- **Discovered Check:** Piece A moves (for ANY reason), revealing Piece B behind it — which gives check. The moved piece can also attack or capture while revealing the check!
- **Double Check:** Piece A moves AND gives check while simultaneously revealing Piece B's check. Two pieces checking at once — the only escape is to MOVE the King (you cannot block or capture both).

### Story
Imagine hiding a water balloon behind your friend. Your friend steps to the side — and suddenly the water balloon is pointing right at someone! That is a discovered check. You move one piece out of the way, and the piece BEHIND it suddenly gives check. Even more powerful: what if BOTH pieces give check at exactly the same time? That is a double check — the most unstoppable attack in all of chess. You cannot block two checks at once, you cannot capture both pieces at once, so the King is forced to run no matter what!

### Teaching Steps
1. Set up a discovered check position — show how ANY move of Piece A reveals check.
2. Show how the moved piece can also make a useful threat (capture a piece, give check, or even promote).
3. Escalate to a double check — show that ONLY the King move is a valid escape.
4. Windmill puzzle (bonus): a series of discovered checks and direct checks alternating — devastating pattern.
5. Puzzle drill: 5 discovered check + 3 double check positions.

### Questions to Ask Students
- "Piece A moves to reveal a check — can Black block the check? Why can it sometimes and sometimes not?"
- "In a double check, why can't Black capture the checking piece?"
- "Your Bishop is behind your Queen, pointing at the enemy King — what does the Bishop do to create a discovered check?"
- "What makes a discovered check especially dangerous compared to a regular check?"
- "Can you create a discovered check where the moving piece ALSO gives check? What do we call that?"

### Watch For (Common Mistakes)
- Students forgetting to think about what the MOVING piece can do — it's often the key to the tactic.
- Not realising double check forces a King move — students try to block or capture one checker.
- Missing discovered checks because they only look at moving pieces that directly attack.

### Timeline & Homework
- 5 min – Warm-up: Knight fork speed drill from Session 6
- 10 min – Discovered check: demonstrate and identify (3 positions)
- 12 min – How to use the moving piece to add extra threats
- 10 min – Double check: demonstrate why only the King can escape
- 10 min – Mixed discovered/double check puzzle drill
- 8 min – Create your own: students set up a discovered check on their boards
- **Homework:** Find 8 "Discovered Check" puzzles on Lichess. For 3 of them, describe in words why the tactic works.`,

    8: `### Objective & Outcomes
- Formal Test 1: assess Pin, Skewer, Double Attack, Knight Fork, Discovered Check, and Double Check.
- Coach identifies each student's strongest and weakest tactical patterns for targeted follow-up.
- Reinforce: tactics are patterns — the more you see them, the faster you recognise them.

### How to Explain It
- "Today is a checkpoint — not to see if you are clever, but to see which patterns are already in your chess brain and which ones need more practice."
- Reassure: every missed tactic is simply a pattern you haven't seen enough times yet.

### Story
Every superhero has a skills test before going on their first real mission. Today is yours! You have practised pins, skewers, forks, and discovered checks — now you need to find them in positions without anyone telling you what to look for. This is exactly how it works in a real game: the board does not put a label on the tactic. You have to see it yourself. Think of each position like a face you recognise from a crowd — once you have seen enough of them, they just pop out at you!

### Teaching Steps
1. Calm start: one easy warm-up puzzle from each tactic type before the test begins.
2. Test: 6 positions (one per tactic: pin, skewer, double attack, Knight fork, discovered check, double check).
3. Students work independently — 5 minutes per position is generous, less is fine.
4. After test: pair up and explain answers to each other.
5. Coach reviews each position on the demonstration board — celebrate all correct answers.

### Questions to Ask Students (post-test)
- "Which tactic felt most natural? Which felt unfamiliar?"
- "For the Knight fork — did you list all 8 squares first?"
- "In the discovered check — what did the moving piece do besides reveal the check?"
- "What is the ONE thing you will practise most before Test 2?"
- "Can you explain the difference between a pin and a skewer in one sentence?"

### Watch For (Common Mistakes)
- Rushing through without checking all candidate moves — enforce "pause and look before writing."
- Students getting discouraged by wrong answers — celebrate the analysis, not just correct results.

### Timeline & Homework
- 5 min – Warm-up: one puzzle per tactic type (6 puzzles, 30 seconds each)
- 25 min – Test (6 positions, guided pacing)
- 10 min – Partner explanation and self-check
- 5 min – Coach review and celebration
- **Homework:** Revisit any tactic you missed in the test. Solve 5 puzzles of THAT specific type on Lichess today.`,

    9: `### Objective & Outcomes
- Mixed "Mate in 1" practice: checkmates from all angles using all piece types on more complex boards.
- Students can: find mate-in-1 in 15 seconds with pieces and pawns of both colours on the board, distinguish check from checkmate confidently.
- Builds pattern recognition for Session 14's mate-in-2 and Session 23's sacrifice-to-mate concepts.

### How to Explain It
- "Mate in 1 is a reflex — by Foundation 1, it should be instant. Today we build that reflex."
- Method: look at all checks → for each check, ask "can the King escape? Can it capture my piece? Can it be blocked?" If NO to all three — it's checkmate.
- On a full board, more escape routes exist — be systematic.

### Story
A star footballer can score from any angle — left foot, right foot, header, volley, close range, far out. Today you practise finding checkmate from any angle: Queen, Rook, Bishop, Knight, and even a Pawn! The more positions you see, the faster your brain spots them — like recognising a friend's face in a crowded place. You do not think about it, you just see it. The goal is simple: make finding mate in 1 feel as easy as scoring in an open goal. Repetition is the key!

### Teaching Steps
1. Show a mate-in-1 solved in 3 steps: find checks → test escape → test block → test capture.
2. Speed round 1: 5 simple positions (single piece giving mate) — 10 seconds each.
3. Speed round 2: 5 medium positions (full board, tactical setup) — 20 seconds each.
4. Hard round: 3 positions where the mating piece must first be moved INTO position in one move.
5. "Trick" round: 2 positions that look like mate but aren't — why is it check, not checkmate?

### Questions to Ask Students
- "What is the THREE-step checklist you run through for every potential mating move?"
- "This looks like mate — but can the King capture your piece? Is your piece protected?"
- "Is it checkmate or just check? How do you know for sure?"
- "Which piece type gives checkmate most often in your puzzles? Why do you think that is?"
- "If you can't find mate in 1, what should you do next — give up or look differently?"

### Watch For (Common Mistakes)
- Giving check instead of checkmate — trace every King escape square before claiming it's mate.
- Missing mate because the mating piece appears to be on a "bad" square — don't dismiss any check.
- Students checking only with "big" pieces — remind them a Pawn checkmate is just as valid.

### Timeline & Homework
- 5 min – Test 1 review: revisit one position each student found hardest
- 10 min – 3-step mate process walkthrough
- 15 min – Three speed rounds (easy → medium → hard)
- 10 min – Trick positions (check vs checkmate)
- 5 min – Personal best: who improved their speed from the start of class to the end?
- **Homework:** Complete 20 "Mate in 1" puzzles on Lichess. Time yourself and try to beat your average by the end.`,

    10: `### Objective & Outcomes
- Learn common **opening traps**: positions where bad moves in the opening allow quick material gain or checkmate.
- Students can: recognise the most common opening traps (Noah's Ark Trap, Legal's Trap, fishing pole), exploit them when opponents fall in, avoid falling for them.
- Combines opening principles (CDC) with tactical awareness — bad opening play is immediately punishable.

### How to Explain It
- An **opening trap** = a tempting but bad move in the opening that leads to losing material or being checkmated.
- The opponent breaks an opening principle → we punish it tactically.
- **Key mindset:** Every bad opponent move is an opportunity — ask "how do I punish this?"

### Story
Have you ever seen someone in Minecraft dig straight down because they spotted diamonds — and fall straight into lava? Opening traps in chess are exactly like that: tempting moves that look great but lead to disaster. The most famous trap fools players who bring their Queen out too early. When you know how the trap works, you spot it coming from a mile away — and when your opponent falls for it, you punish them immediately. Know the trap AND know the escape!

### Teaching Steps
1. Open with Scholar's Mate — defend it perfectly and then exploit the resulting bad position.
2. Show the Legal Trap (Queen sacrifice leading to checkmate) — students are amazed.
3. Show the Noah's Ark Trap: the Ruy Lopez Pawn trap that wins a Bishop.
4. For each trap: show the WRONG move (falls for it) and the RIGHT move (avoids/punishes it).
5. Game: one student tries to set a trap, the other tries to identify and punish the bad opening move.

### Questions to Ask Students
- "White just moved Qh5 on move 2. What opening principle did they break? How do we punish it?"
- "In the Legal Trap, White sacrifices the Queen — why does Black lose even though they take the Queen?"
- "What is the signal that your opponent has played a bad opening move?"
- "Why is the c3-square Bishop in the Ruy Lopez under threat? How does the trap work?"
- "Can YOU set a trap for your opponent in the opening? What bad move would you be hoping they play?"

### Watch For (Common Mistakes)
- Students only learning the "trap" but not understanding why it works — always explain the underlying tactic.
- Falling for the trap themselves when the opponent plays the right moves — traps only work against bad play.

### Timeline & Homework
- 5 min – Warm-up: CDC principles quiz
- 10 min – Scholar's Mate defence and punishment
- 12 min – Legal Trap: demonstration and walk-through
- 10 min – Noah's Ark Trap: Ruy Lopez Pawn trap
- 10 min – Partner game: set a trap, identify and punish
- 8 min – "Which principles were broken?" analysis
- **Homework:** Look up one opening trap you haven't seen before and teach it to your coach or a friend next session.`,

    11: `### Objective & Outcomes
- Learn **Defence against Mate**: how to identify a mating threat and stop it before it happens.
- Students can: spot a checkmate threat 1 move in advance, choose the best defensive move, distinguish between blocking, capturing, and counter-attacking.
- The flip side of attacking — strong defenders think about threats BEFORE they arrive.

### How to Explain It
- "After every opponent move, ask: is there a mate threat? If yes, STOP IT before anything else."
- **3 ways to stop a mate threat:** (1) Block the mating piece's path, (2) Capture the mating piece, (3) Counter-attack (if your counter-threat is faster or also forces checkmate).
- Priority rule: if your opponent threatens checkmate in 1, it is ALWAYS the priority — even if you could win material.

### Story
A goalkeeper in a penalty shootout tries to read where the ball is going BEFORE it is kicked. Defending against checkmate works the same way: after EVERY opponent move, you must ask "Is my King in danger?" before you do anything else. If your opponent is about to checkmate you next turn, stopping that is your number one priority — even if you spotted a free piece or a nice attack. A goalkeeper who does not watch the ball gets scored on. A chess player who misses the mate threat loses — even from a winning position!

### Teaching Steps
1. Show a position where mate is threatened next move — students must spot it BEFORE making any other move.
2. Drill: "Find the mate threat in this position" — not the best attacking move, just the threat first.
3. For each threat, show all 3 defensive options — students vote on which is best.
4. Show a case where counter-attacking is better than passive defence.
5. Mixed practice: some positions have immediate mate threats, some don't — students must decide which before acting.

### Questions to Ask Students
- "What is the first question you ask after your opponent moves?"
- "Your opponent threatens checkmate in 1 — but you see a winning tactic. Which do you do first?"
- "There are two ways to stop this mate threat — one blocks, one captures. Which is better and why?"
- "Is counter-attacking always an option? What do you need to be careful about?"
- "How do you develop the habit of always checking for mate threats before your move?"

### Watch For (Common Mistakes)
- Playing a "nice" move without checking for mate threats — students walk into checkmate they could have prevented.
- Over-defending: spending two moves to stop a threat that only needed one.
- Missing the counter-attack option — students default to passive defence when counter-play was available.

### Timeline & Homework
- 5 min – Warm-up: quick mate-in-1 to stay sharp
- 10 min – "Spot the mate threat" drill (6 positions — identify the threat only)
- 12 min – For each threat: find all 3 defensive options
- 10 min – Counter-attack positions: when is attack better than defence?
- 10 min – Mixed: mate threat or not? Students scan each position
- **Homework:** After each game this week, look back and find one move where your opponent threatened checkmate. Did you see it? Did you stop it? Write it down.`,

    12: `### Objective & Outcomes
- Learn to **punish bad opening moves**: recognise when the opponent has broken an opening principle and win material or create a decisive advantage.
- Students can: identify which opening principle was broken, formulate a concrete punishment, execute the tactical or positional refutation.
- Turns opening knowledge into practical weapons — CDC becomes offensive, not just defensive.

### How to Explain It
- The 3 opening sins: (1) Moving the same piece twice without reason, (2) Bringing the Queen out too early, (3) Neglecting King safety (not castling when under attack).
- When an opponent commits a sin, the punishment is usually tactical: a fork, pin, skewer, or mate threat.
- **Template:** Identify the sin → find the weakness it created → exploit it immediately.

### Story
Imagine a cricket batsman who keeps leaving the crease at the wrong moment — the experienced wicketkeeper will stump them every time! When your opponent breaks an opening rule — like bringing their Queen out way too early — you do not just play normally. You PUNISH them immediately: attack the Queen, force it to retreat, and use every move it wastes to develop your own pieces. By the time they have moved their Queen three times, you have three new pieces ready to attack. They brought one dancer; you built an army.

### Teaching Steps
1. Show a game where White plays Qh5 early — demonstrate the exact punishing moves.
2. Show a game where White moves the f-Pawn early, weakening the King — Black punishes with a direct attack.
3. Show a game where White moves the same Knight twice unnecessarily — Black develops faster and controls the centre.
4. For each example: name the sin, then find the punishment.
5. Students create "bad opening" positions for their partner to punish.

### Questions to Ask Students
- "White moved the Queen to h5 on move 2. Which CDC principle did they break? How do you punish it?"
- "Your opponent has moved the f-Pawn, g-Pawn, AND h-Pawn in the opening. What weakness does this create?"
- "They've moved their Knight three times to get it to a 'better' square. What advantage do you have?"
- "You see a way to win a Pawn immediately but it breaks CDC. Should you take the Pawn or follow CDC?"
- "What is the connection between opening principles and tactics?"

### Watch For (Common Mistakes)
- Students punishing correctly but breaking their own CDC in the process — play principled chess while punishing.
- Being too subtle — against a bad opening, the punishment should be concrete and immediate.

### Timeline & Homework
- 5 min – Warm-up: name the three opening sins
- 12 min – Punish the early Queen: walk through 3 positions
- 12 min – Punish weakened King safety: 2 positions with direct attacks
- 10 min – Punish loss of development: 2 positions
- 10 min – Partner game: "bad move on purpose" and punish it
- **Homework:** In your next 3 games, after each game review moves 1-10. Did your opponent commit an opening sin? Did you punish it? What could you have done?`,

    13: `### Objective & Outcomes
- Learn the **Back-Rank Mate**: checkmate delivered by a Rook or Queen on the first or last rank when the King is trapped behind its own Pawns.
- Students can: spot a back-rank mate threat, deliver back-rank mate, defend against it (creating a luft square).
- Back-rank mate is one of the most common winning patterns in club chess — it appears in games at every level.

### How to Explain It
- **Back-Rank Mate:** The King is castled and sheltered behind Pawns on the back rank. A Rook or Queen invades the back rank and delivers checkmate because the Pawns block the King's own escape squares.
- **Luft:** Moving a Pawn (usually h3, g3, or h6/g6) to give the King an escape square — the essential defence.
- **Doubling Rooks:** Two Rooks on the same file is often the set-up for a back-rank invasion.

### Story
Think of a goalkeeper who walks away from the goal to watch a fight in the stands. Suddenly the striker taps the ball in — empty net! Back-rank checkmate is exactly that feeling: your King is cosy behind its Pawns, but those same Pawns are ALSO blocking every escape route. A Rook or Queen sneaks to the last rank — checkmate! The simple fix is to push ONE Pawn one square forward to give your King a breathing hole before you ever need it. Chess players call it "luft" — the German word for "air." Give your King some air and it will never be suffocated!

### Teaching Steps
1. Set up the classic back-rank mate — show why the Pawns on the second rank trap the King.
2. Ask "What ONE move would have prevented this?" — introduce luft (h3/g3 or h6/g6).
3. Show a two-move back-rank mate: first clear a piece off the back rank, then deliver mate.
4. Intermediate puzzle: defend the back rank with your Rook, then counter-attack.
5. Drill: 5 back-rank mate puzzles — students find the mating move. 2 puzzles where they must PREVENT it.

### Questions to Ask Students
- "The enemy Rook is on e8 and your King is on g1 behind f2, g2, h2 — what happens if you play Rxe1?"
- "What is 'luft' and when should you create it?"
- "Your opponent doubles Rooks on the e-file — what should you immediately check?"
- "Can a Queen give back-rank mate just as well as a Rook?"
- "If the back rank is under threat but you see a way to win a piece — do you take the piece first?"

### Watch For (Common Mistakes)
- Students not noticing back-rank threats when calculating — always check the back rank after any Rook move.
- Creating luft at the wrong moment (wasting a tempo when better moves exist early on).
- Delivering what they think is back-rank mate but the King has an escape through a piece gap.

### Timeline & Homework
- 5 min – Warm-up: mate-in-1 speed round
- 10 min – Back-rank mate demonstration and explanation of luft
- 12 min – Find-the-back-rank-mate puzzles (5 positions)
- 10 min – Defend against back-rank mate (2 positions + luft discussion)
- 10 min – Game with attention to back-rank threats
- 8 min – When to create luft: timing discussion
- **Homework:** Find 10 "Back Rank Mate" puzzles on Lichess. Note in which ones the luft square could have saved the losing King.`,

    14: `### Objective & Outcomes
- Learn **Checkmate in 2 moves**: calculate one move ahead to set up the unstoppable mate.
- Students can: find mate-in-2 in simple positions, identify the first move (usually setting up the second), calculate that the opponent's responses don't prevent the mate.
- The bridge from pattern recognition (mate in 1) to calculation (look ahead) — a critical skill leap.

### How to Explain It
- **Mate in 2 = a plan:** Move 1 sets up an unstoppable threat. Move 2 delivers the checkmate.
- The key question for Move 1: "After I play this, can my opponent stop the mate?" If NO → you have a forced mate in 2.
- **Process:** Find all the opponent's possible responses to Move 1 → show the mate works against ALL of them.

### Story
Planning two moves ahead is like knowing in football that you will pass to Player A, who will pass to Player B, who is already in the perfect position to score. Mate in 2 works the same way: your first move sets a trap so good that your opponent cannot fully escape, and your second move is always checkmate. The tricky part is checking EVERY possible opponent response to your first move — like a goalkeeper who needs to cover both sides of the goal at once. Does your plan work against all of them? If yes, you have found the mate!

### Teaching Steps
1. Show a mate-in-2 where Move 1 is a direct threat — students find both moves.
2. Show a mate-in-2 where Move 1 is a "quiet" non-checking move — harder to find.
3. Show how to check ALL opponent responses: "If Black plays Ke8 — mate by...? If Black plays Kc8 — mate by...?"
4. Puzzle drill: 4 mate-in-2 positions. Start simple, escalate to medium.
5. Create your own: students set up a mate-in-2 for their partner to solve.

### Questions to Ask Students
- "What is the process for finding a mate in 2? Walk me through it step by step."
- "You found Move 1 — now check every Black response. Does your Move 2 work against all of them?"
- "Why is a quiet first move (not a check) often the hardest to find in mate-in-2 puzzles?"
- "Your Move 1 creates a threat — but Black has a way to block it. Is your first move correct?"
- "How many moves ahead do you need to calculate to solve a mate in 2?"

### Watch For (Common Mistakes)
- Playing a check as Move 1 even when it's not the right one — not every check leads to mate.
- Finding a forcing move but not verifying all Black responses — the mate might not work after all.
- Giving up too quickly — mate-in-2 requires patience and methodical checking.

### Timeline & Homework
- 5 min – Warm-up: 3 mate-in-1 puzzles (instant reflex practice)
- 10 min – Process explanation: how to approach mate-in-2
- 15 min – 4 mate-in-2 puzzles with full response checking
- 10 min – Create-your-own mate-in-2 and swap with partner
- 10 min – Mini game: try to force a mate-in-2 situation in a real game
- **Homework:** Find 10 "Mate in 2" puzzles on Lichess. For each one, write down your Move 1 AND why it works against every possible opponent response.`,

    15: `### Objective & Outcomes
- Learn **Destroying the Defender** (capturing the piece that protects a key square or piece) and **Distracting the Defender** (forcing it away from its defensive duty).
- Students can: identify an overloaded or key defender, choose between destroying and distracting, win material or deliver checkmate using these techniques.
- These are advanced tactical themes that underpin many combinations at Foundation level and above.

### How to Explain It
- **Destroying the Defender:** Simply CAPTURE the defending piece — the protected square or piece is now vulnerable.
- **Distracting the Defender:** Force the defending piece to move AWAY from its post (with a threat it must answer) — then exploit what it was protecting.
- Both achieve the same goal: remove the protection from a key piece or square.

### Story
In a tug-of-war, if the strongest person on the other team is suddenly called away, the rest of the team becomes much weaker. Removing a defender in chess works exactly like that: you either CAPTURE the defending piece (destroy the guard) or force it to move away by threatening something else (distract the guard). Once the guard is gone, the piece it was protecting is free to take! It is like getting the goalkeeper to run off the pitch so your striker can score in the empty net.

### Teaching Steps
1. Show a position where a key defender can be captured — "destroy" the guard, take the target.
2. Show a position where a guard is too valuable to take — distract it with a check or threat.
3. Show an "overloaded defender" position — one piece defending TWO things at once — distract it to win one.
4. Puzzle drill: 4 positions — students must choose: destroy or distract? Then find the move.
5. Game application: students try to identify the key defender before making tactical moves.

### Questions to Ask Students
- "This Bishop is protecting both the Rook and the back rank — what is that called? How do you exploit it?"
- "The key defender is worth more than the attacker — do you destroy it anyway? Why or why not?"
- "You want to take this Rook but it's defended by a Bishop. You could give a check that forces the Bishop to move — is that destroy or distract?"
- "How do you identify the KEY defender in a position? What role does it play?"
- "After you destroy or distract a defender, what EXACTLY do you capture?"

### Watch For (Common Mistakes)
- Destroying the defender with a losing trade — check the value before capturing.
- Not seeing the overloaded defender — when one piece defends two targets, it's always worth noting.
- Playing the distraction but the defender doesn't HAVE to respond — make sure the distracting threat is forcing.

### Timeline & Homework
- 5 min – Warm-up: back-rank mate threat (from Session 13)
- 10 min – Destroying the defender: 3 positions
- 10 min – Distracting the defender: 3 positions
- 8 min – Overloaded defender: 2 positions
- 10 min – Mixed: destroy or distract? (4 positions, students choose and solve)
- 10 min – Game with "identify the key defender" habit
- **Homework:** Find 8 "Remove the Defender" puzzles on Lichess. For each one, label whether the solution destroys or distracts the defender.`,

    16: `### Objective & Outcomes
- Formal Test 2: assess Mate-in-1 mix, Opening Traps, Defence against Mate, Back-Rank Mate, Mate-in-2, and Destroying/Distracting the Defender.
- Coach identifies each student's progress and areas for final stretch of Foundation 1.
- Students consolidate the sessions-9-15 material before the advanced topics of sessions 17-23.

### How to Explain It
- "We are now past the halfway mark in Foundation 1 — you know powerful tactics and important patterns. Today we see how deeply they have been absorbed."
- Encourage: mistakes are not failures, they are tomorrow's practice material.

### Story
Halfway through any sports season, the coach does a practice match to check what is working. Which skills are sharp? Which need more training? This is your Foundation 1 midseason check-up. After the test, you will know exactly which tactics feel natural and which ones need one more round of practice. The position you get wrong today becomes the puzzle you master tomorrow — and the mistake you remember longest is often the one that helps you the most!

### Teaching Steps
1. Calm opening: one puzzle from each of the last 7 sessions (quick warm-up, not a pre-test).
2. Test: 6 positions — each targeting a specific skill from sessions 9-15.
3. Independent work — no coaching during the test.
4. After: students annotate their own answers ("confident / unsure / wrong — why?").
5. Coach gives personalised 1-minute feedback to each student.

### Questions to Ask Students (post-test)
- "Which position did you feel most confident about? Walk me through your thought process."
- "Which position stumped you? What did you try?"
- "In the 'defend against mate' position — did you check for the threat BEFORE making a move?"
- "In the mate-in-2 — did you check all opponent responses to your first move?"
- "What is the one tactic you want to practise the most in the remaining sessions?"

### Watch For (Common Mistakes)
- Students who rush test positions — enforce: "name the tactic, then find the move."
- Test anxiety masking actual skill — students who struggled verbally often perform better in writing.

### Timeline & Homework
- 5 min – Warm-up: one puzzle per skill from sessions 9-15
- 25 min – Test (6 positions)
- 10 min – Self-annotation and partner discussion
- 5 min – Coach feedback and personalised goals for sessions 17-23
- **Homework:** Based on today's test, identify your weakest tactic and solve 15 puzzles of that type on Lichess before next session.`,

    17: `### Objective & Outcomes
- Learn **Checkmate with one Rook and King** against a lone King — the most practical endgame to master.
- Students can: force Rook+King checkmate in under 30 moves, avoid stalemate, know the optimal "box-shrinking" technique.
- This is a harder endgame than Q+K; mastery here shows genuine endgame understanding.

### How to Explain It
- **Box technique:** Use the Rook to cut off files/ranks, creating a shrinking "box" around the enemy King.
- The enemy King must be driven to an edge, then a corner.
- **King cooperation is essential** — the King must "escort" the enemy King to the edge.
- Key danger: offering stalemate when the enemy King has no move but is not in check.

### Story
Imagine slowly herding a kitten into a box. You cannot just chase it — it will run everywhere. You have to patiently close off exits one by one until there is nowhere left to run, and then gently guide it in. Rook + King vs lone King works exactly like that: the Rook cuts off ranks and files, the King closes in, and the enemy King slowly runs out of space. Be patient, do not rush, and whatever you do — do not accidentally give stalemate by blocking every single square when the King is not even in check!

### Teaching Steps
1. Explain the box technique with a diagram — show how the "box" shrinks after each King march.
2. Demo the full checkmate from a starting position (Rook on a4, White King on e1, Black King on e8).
3. Students practice — coach watches for stalemate traps.
4. Introduce the "opposition" concept: when Kings face each other with one square between them.
5. Timed race: who can force Rook+King checkmate in fewer moves?

### Questions to Ask Students
- "What does 'cutting off' mean with the Rook? What does it prevent the enemy King from doing?"
- "The enemy King is on d6 — where should your King walk to help corner it?"
- "Your Rook just pushed the Black King to the back rank — what is your NEXT step before delivering check?"
- "The Black King has only one square to move to after your check — is it checkmate or might it be stalemate?"
- "At what point in the Rook+King checkmate do you not need the Rook to give check immediately?"

### Watch For (Common Mistakes)
- Stalemate — the #1 error in Rook+King endings; monitor closely.
- Moving the Rook to give meaningless checks that push the Black King back to the centre.
- Not activating the White King — students try to do everything with the Rook alone.

### Timeline & Homework
- 5 min – Warm-up: Q+K vs K (quick revision from Beginner level)
- 8 min – Box technique explanation with diagrams
- 20 min – Rook+King practice (students practice, coach monitors)
- 10 min – Stalemate trap challenge: coach creates traps, students avoid them
- 7 min – Timed race: fastest checkmate wins
- **Homework:** Practice Rook+King vs King on Lichess endgame trainer until you achieve 5 wins in a row with no stalemates.`,

    18: `### Objective & Outcomes
- Learn Queen endgame technique: **Queen vs Bishop** and **Queen vs Knight** — how the Queen wins material or mates.
- Students can: trap a lone Knight with the Queen, corner the Bishop, recognise drawn and winning positions.
- Develops endgame precision and the understanding of how the Queen overwhelms minor pieces.

### How to Explain It
- **Queen vs Knight:** The Knight struggles in open positions — the Queen can chase it to the edge where it has fewer squares. Centralised Knight with no Pawns can often draw; edge Knight loses.
- **Queen vs Bishop:** Bishop on a long diagonal can be tricky but the Queen can win the Bishop with the King's help using a fork or forcing the Bishop to a bad square.
- Key insight: even small advantages require technique to convert in these endings.

### Story
Imagine you are playing a game of tag where the other person is extremely quick and keeps jumping out of your reach. You cannot catch them by chasing — you have to slowly close off the area they can run to, making their world smaller and smaller. Queen vs Knight works exactly like this: do not chase the Knight all over the board. Instead, use your Queen to shrink the number of safe squares the Knight has, push it to the edge where it has fewer options, and bring your King in to finish the job together!

### Teaching Steps
1. Show Q vs Knight: the Queen chasing the Knight to the edge using forks.
2. Show the "fork trick" — Queen threatens to fork King and Knight repeatedly.
3. Show Q vs Bishop: how the Queen wins the Bishop with the King's help.
4. Show a drawn Q vs Knight position (centralised Knight, no Pawns on board) — theory.
5. Practice: students try to win Q vs Knight from three different starting positions.

### Questions to Ask Students
- "The Knight is on d4 — is it in a strong or weak position? What do you do to make it weaker?"
- "Your Queen threatens a fork on the Knight — but the Knight jumps away. How do you cut off its next square?"
- "The Bishop is on a long diagonal — how do you win it without letting it escape?"
- "What is the danger of chasing the Knight to the CORNER instead of a good edging square?"
- "In Q vs N, does your King need to help? At what point does it get involved?"

### Watch For (Common Mistakes)
- Chasing the Knight without a plan — random checks don't win; systematic squeezing does.
- Forgetting the King must help — the Queen alone often cannot finish the job efficiently.
- Stalemate in Q vs B (rare but possible in specific positions with Bishops on same-coloured corners).

### Timeline & Homework
- 5 min – Warm-up: Rook+King checkmate refresher (move 1 from a standard position)
- 12 min – Queen vs Knight: chase, fork, and corner technique
- 12 min – Queen vs Bishop: King+Queen coordination
- 10 min – Practice games (Q vs N and Q vs B from various positions)
- 6 min – Drawn position recognition: when does Q vs N draw?
- **Homework:** Play Q vs Knight against a friend or computer. Try from 5 starting positions. How many can you win?`,

    19: `### Objective & Outcomes
- **Mixed Tactics** session: practice pins, skewers, forks, discovered checks, back-rank mates, and destroying/distracting defenders in mixed positions.
- Students can: identify the correct tactic type in a random position without being told what to look for.
- Builds the pattern recognition that makes tactics automatic in real games.

### How to Explain It
- "In a real game, nobody tells you 'this is a fork position' — you have to SEE it yourself."
- **Tactical scanning order (remember SSCF):** Skewers, Skewers → Checks → Captures → Forks (any order that works for you, but be systematic).
- Before every move, ask: "Can I win material right now? Is there a mate threat?"

### Story
A really experienced cook does not need a recipe card — they look at the ingredients, recognise what they have, and know exactly what to cook. Mixed tactics work the same way: you look at a board, recognise the pattern (is that a pin? a fork? a back-rank threat?), and choose the right weapon — without anyone giving you a hint. That is the skill that makes the difference in a real game. Nobody tells you "this is a fork position." You have to feel it, see it, and use it yourself!

### Teaching Steps
1. Teach (or review) a tactical scanning system: students pick their own order and commit to it.
2. Quick warm-up: 1 puzzle of each type (6 types, 30 seconds each — just identify the tactic, don't solve).
3. Mixed drill round 1: 6 positions, no hints — students identify AND solve.
4. Mixed drill round 2: 6 harder positions — students must name the tactic before moving.
5. Students set up 2 positions for each other — both try to fool the other with tricky but valid tactics.

### Questions to Ask Students
- "What is your tactical scanning process? Walk me through it out loud."
- "You've identified a possible pin AND a possible fork — which do you play and why?"
- "This position has a back-rank mate threat AND a way to win a piece. Which is more urgent?"
- "Sometimes the tactic is a quiet first move — how do you find those when you're scanning?"
- "What is the most common tactic type you MISS in your own games? How will you fix that?"

### Watch For (Common Mistakes)
- Students solving the FIRST tactic they see without checking if a better one exists.
- Naming the wrong tactic type — if they say "pin" but it's a skewer, clarify immediately.
- Rushing — accuracy beats speed at this stage; build the habit of the full scan first.

### Timeline & Homework
- 5 min – Tactical scanning system introduction (students choose their order)
- 8 min – Warm-up: identify only (no solving), 1 of each tactic type
- 15 min – Mixed drill round 1 (6 positions, identify and solve)
- 12 min – Mixed drill round 2 (6 harder positions)
- 10 min – Student-created positions and discussion
- **Homework:** Set a timer for 2 minutes. Open a random Lichess puzzle. Run your scan. Record which tactic it was. Repeat 10 times. Track which you got right and wrong.`,

    20: `### Objective & Outcomes
- Learn to identify and create **checkmate threats** — moves that threaten checkmate next move even without delivering it immediately.
- Students can: create a checkmate threat, force the opponent to deal with it, and use the tempo gained to build a larger attack.
- Checkmate threats are the foundation of attacking chess — they combine tactics with strategy.

### How to Explain It
- A **checkmate threat** = a move that threatens to deliver checkmate on the NEXT move.
- The opponent MUST respond to a checkmate threat — giving you control of the game tempo.
- **Double threats:** threaten mate AND another tactic simultaneously — the opponent cannot stop both.

### Story
Sometimes in video games, the best strategy is not to attack directly — it is to make a move that FORCES the other player to react to you. A checkmate threat works exactly like that: instead of giving checkmate now, you make a move that says "I WILL checkmate you next turn — do something about it!" Your opponent has to stop your threat, and while they are busy defending, you build your next one. It is like making the other team chase your play instead of playing their own game. You control the tempo!

### Teaching Steps
1. Set up a position and play a move that threatens mate on the next move — point out how it forces a response.
2. Show how the opponent's forced defensive move can be used to launch the next threat.
3. Show a double checkmate threat — two mates at once, only one can be stopped.
4. Puzzle drill: 4 positions where the task is "find the move that THREATENS mate" (not delivers it).
5. Game: students try to build up checkmate threats rather than immediate checkmates.

### Questions to Ask Students
- "What is the difference between a checkmate threat and actual checkmate?"
- "You threaten mate on h7 — your opponent defends with g6. What did you gain from that exchange?"
- "How do you create a DOUBLE checkmate threat that your opponent cannot fully answer?"
- "Your opponent has just stopped your mate threat. Is their move a good one? What can you do next?"
- "When is a checkmate threat MORE powerful than immediate checkmate?"

### Watch For (Common Mistakes)
- Playing the checkmate threat but not noticing the opponent's response completely stops it — think ahead.
- Missing the double threat opportunity — always ask "can I threaten TWO things with ONE move?"
- Losing a piece while threatening checkmate — the threat must come at no cost or be worth the cost.

### Timeline & Homework
- 5 min – Warm-up: mixed tactics scan (from Session 19)
- 10 min – Checkmate threat basics: 3 examples
- 12 min – Double checkmate threats: 3 examples
- 12 min – Puzzle drill: find the threatening move (4 positions)
- 10 min – Game with "threat before checkmate" focus
- **Homework:** In your next 3 games, count how many checkmate threats you created. Did your opponent always see and stop them?`,

    21: `### Objective & Outcomes
- Learn **Passed Pawns** and advanced **Pawn Promotion** concepts: what makes a pawn "passed," how to support it, and how to stop opponent's passed pawns.
- Students can: identify a passed pawn, choose the right piece to block a passed pawn, calculate whether a pawn will queen in time.
- Pawn play is one of the most important endgame skills — passed pawns win many games between equal opponents.

### How to Explain It
- **Passed Pawn:** A pawn with no enemy pawns in front of it or on adjacent files — nothing can stop it from promoting!
- **"Passed pawns must be pushed!"** (Nimzowitsch) — a passed pawn is only powerful when it advances.
- The **Rule of the Square:** Whether the King can catch a passed pawn in time — draw a diagonal from the pawn to the promotion square; if the enemy King is inside the square, it catches the pawn.

### Story
Imagine the quietest kid in class who nobody notices — slowly, steadily working their way to the front of the queue while everyone is distracted. A passed pawn is exactly that: a tiny pawn with no enemy pawns in its way, quietly marching toward the other end of the board to become a Queen. The opponent has to sprint across to stop it. But if the pawn is already too far ahead — if they simply cannot get there in time — that little pawn becomes the most powerful piece on the board. Never underestimate the underdog!

### Teaching Steps
1. Define passed pawn with 3 examples on the board — students identify which pawns are "passed."
2. Explain why passed pawns are powerful (they will promote if not stopped).
3. Teach the Rule of the Square — draw the box with students.
4. Show how to SUPPORT a passed pawn with the King vs how to BLOCK it with the King.
5. Endgame puzzle: two Pawns racing to promote — which one wins and why?

### Questions to Ask Students
- "Which of these four pawns is 'passed'? How can you tell?"
- "Using the Rule of the Square — does the Black King catch this pawn on d5 in time?"
- "What is better for the attacking side: using the King to escort the pawn or racing ahead to promote?"
- "Your opponent has a passed pawn on e4 — how do you stop it? Where should your King go?"
- "Two passed pawns, one for each side, racing to promote — how do you calculate who queens first?"

### Watch For (Common Mistakes)
- Not noticing a passed pawn is passed — students focus on tactics and miss the endgame structure.
- Using the wrong rule for whether the King catches the pawn — the Rule of the Square needs careful drawing.
- Advancing the passed pawn too early without King support (sometimes the King must escort).

### Timeline & Homework
- 5 min – Warm-up: identify passed pawns in 5 positions
- 10 min – Passed pawn power and Rule of the Square
- 12 min – Pawn race endgame puzzles (3 positions)
- 12 min – Stop the pawn vs support the pawn positions
- 6 min – Game with focus on pawn structure and passed pawn creation
- 5 min – "Passed pawns must be pushed" — what does this mean in practice?
- **Homework:** In your next 3 games, identify if either side had a passed pawn. Who won the game? Was the passed pawn the deciding factor?`,

    22: `### Objective & Outcomes
- Learn **Trapping Pieces**: using your pieces to restrict and trap an enemy piece until it has no escape.
- Students can: identify when a piece is vulnerable to being trapped, execute a trapping manoeuvre, avoid having their own pieces trapped.
- Trapping pieces is the "quiet" side of tactics — no flashy captures, just methodical encirclement.

### How to Explain It
- **Trapping** = cutting off every escape square of an enemy piece until it cannot move without being captured for free.
- Most commonly traps: the Bishop in the corner (e.g., trapped Bishop on h7 after g6-h7), the Knight on the rim (no safe squares), or a Queen that has wandered into enemy territory.
- Key: trap a piece with pieces of LOWER value — trapping a Bishop (3 pts) with a Pawn (1 pt) wins material.

### Story
Have you ever set a trap in a game — dug a pit in Minecraft or set up a lure to catch someone? Trapping a piece in chess works the same way: you slowly and quietly close off every escape route until the piece has absolutely nowhere safe to go. Then you capture it for free! A Bishop that wandered to the corner, a Knight stranded at the edge — both become easy targets once they run out of room. Learn to set traps for your opponent, and always watch out for when they are setting one for you!

### Teaching Steps
1. Show the classic trapped Bishop position — demonstrate the encirclement.
2. Show a trapped Knight on the rim — why the rim has fewer escape squares.
3. Show a trapped Queen — advanced students love this (Queen trapped in enemy territory).
4. Preventative thinking: set up potential traps — ask "which of my pieces could be trapped?"
5. Puzzle drill: 4 "trap the piece" puzzles and 2 "rescue your piece" puzzles.

### Questions to Ask Students
- "The enemy Bishop is on h3 — how many safe squares does it have? How do you trap it?"
- "Your Knight is on a3 with no squares to jump to safely — how do you get it out?"
- "Why is the RIM dangerous for a Knight? How many squares does it have from a1? From h4?"
- "Can you deliberately LURE a piece into a position where it becomes trapped?"
- "What is the minimum number of moves needed to trap this Bishop? Walk me through it."

### Watch For (Common Mistakes)
- Taking too many moves to set the trap — each move must cut off an escape; no wasted moves.
- Students moving their own pieces to the rim where they become vulnerable to trapping.
- Failing to recognise that the trapped piece can sacrifice itself to escape the trap.

### Timeline & Homework
- 5 min – Warm-up: passed pawn identification from Session 21
- 10 min – Trapping technique: Bishop and Knight traps (with demonstration)
- 12 min – Trap the piece puzzles (4 positions)
- 10 min – Rescue your piece (2 positions — escape the trap)
- 10 min – "Could this be trapped?" board scanning game
- 8 min – Partner game: try to trap each other's pieces
- **Homework:** Find 10 "Trapped Piece" puzzles on Lichess. For each, identify which piece is trapped and how it got into that position.`,

    23: `### Objective & Outcomes
- Learn **Sacrificing pieces to deliver checkmate**: giving up material to force a mating combination.
- Students can: recognise a sacrificial mating attack, calculate that the sacrifice leads to forced checkmate, distinguish a sacrifice from a blunder.
- The most exciting and dramatic tactical idea — sacrifices appear in nearly every famous chess game.

### How to Explain It
- A **sacrifice** = giving up material intentionally to gain a greater benefit — usually checkmate or a decisive positional advantage.
- **How to know it's correct:** After the sacrifice, every opponent response leads to checkmate — it is FORCED.
- The sacrifice creates **irreversible weaknesses** around the King — open files, stripped pawns, exposed King.

### Story
Have you seen a superhero movie where the hero walks into danger on purpose — gives something up — because they KNOW it will lead to a bigger win? Chess sacrifices are exactly like that. You give up a piece willingly, but you have already calculated that no matter what your opponent does next, checkmate is coming. It looks crazy from the outside — "You just gave away your Bishop!" — but if the calculation is right, it is the best move on the board. The key: calculate FIRST, sacrifice SECOND. A guess is a blunder. A calculated sacrifice is a masterpiece!

### Teaching Steps
1. Show a simple Bishop sacrifice on h7 (or h2 for Black) — the classic attacking sacrifice.
2. Walk through the forced continuation — show ALL opponent responses and demonstrate mate in each.
3. Show a Rook sacrifice to open a file for the Queen.
4. Show the difference: this sacrifice leads to mate vs this "sacrifice" that just loses a piece.
5. Puzzle drill: 3 sacrificial mate positions — students must find the sacrifice AND the follow-up.

### Questions to Ask Students
- "White sacrifices the Bishop on h7 — why does Black HAVE to take it? What if Black doesn't?"
- "After the sacrifice, Black has 3 possible responses. Walk me through why each one leads to checkmate."
- "How do you know the difference between a sacrifice and a blunder?"
- "What is opened up or created by this sacrifice? (file? diagonal? weakness?)"
- "Could you have delivered checkmate WITHOUT the sacrifice? Why was the sacrifice the better path?"

### Watch For (Common Mistakes)
- Students playing "sacrifices" that just lose material without compensation — require them to calculate first.
- Not calculating ALL opponent responses — missing one spoils the whole combination.
- Being scared to sacrifice — confidence in calculation is the key; the sacrifice is only scary until you see it's forced.

### Timeline & Homework
- 5 min – Warm-up: checkmate threat identification from Session 20
- 10 min – Classic h7 sacrifice demonstration with full calculation
- 12 min – Rook sacrifice and follow-up
- 12 min – Sacrifice puzzles: find the sacrifice and the forced continuation
- 8 min – "Sacrifice or blunder?" — 4 positions, students decide
- 8 min – Game: try to build a sacrificial attack
- **Homework:** Watch one sacrificial combination from a famous game (Grandmaster Game of the Week on YouTube or Chess.com TV). Write down: what was sacrificed, what was gained, and was it forced?`,

    24: `### Objective & Outcomes
- Final Test 3: assess the complete Foundation 1 curriculum.
- Students receive a personalised certificate of completion and feedback summary.
- Coach previews Foundation 2 — new topics await: overloading, X-ray attacks, windmill, and named checkmate patterns.

### How to Explain It
- "Today is your Foundation 1 graduation — everything from pins and skewers to sacrificial mates."
- "By finishing Foundation 1, you have moved from a chess player who knows the rules to a chess player who knows TACTICS. That is a significant transformation."

### Story
You made it to the end of Foundation 1! Think about where you started this level: "pin" and "skewer" sounded like wrestling moves, not chess tactics! Now you can find a Knight fork in seconds, set up a back-rank mate, defend against checkmate threats, and even sacrifice a piece to force a win. That is a massive jump in skill. Foundation 2 has brand new adventures coming — overloading, X-ray attacks, the windmill, and famous checkmate patterns from history's greatest games. You have absolutely earned your place there. Let us go!

### Teaching Steps
1. Grand review warm-up: one puzzle per major tactic (10 puzzles, 30 seconds each — student names the tactic AND solves it).
2. Final Test: 8 positions covering all major Foundation 1 themes.
3. After test: coach shares personalised strengths and development areas for each student.
4. Foundation 2 preview: show 3 topics from Foundation 2 as exciting glimpses of what's coming.
5. Celebration: certificates, personal bests, reflection on growth since Beginner.

### Questions to Ask Students (post-test)
- "What is the tactic you are most proud of mastering in Foundation 1?"
- "Which session was your breakthrough moment — where something suddenly clicked?"
- "What do you think Foundation 2 will be about? What would you like to learn?"
- "If you met a Beginner student, what is the most important tactic tip you'd give them?"
- "How has your thinking changed from when you started Foundation 1 to now?"

### Watch For (Common Mistakes)
- Students underestimating how much they've learned — help them compare themselves to their Beginner self.
- Overconfidence about what's ahead — Foundation 2 will introduce brand new challenges.

### Timeline & Homework
- 5 min – Grand warm-up: 10 tactics puzzles, 30 seconds each (the "greatest hits" of Foundation 1)
- 25 min – Final Test (8 positions)
- 10 min – Personalised feedback and certificates
- 5 min – Foundation 2 preview: overloading, X-ray, windmill, and named checkmates
- **Homework:** Play 5 games this week using EVERY tactic you learned in Foundation 1. After each game, write down: which tactic did you use? Which did you miss? Bring your notes to the first Foundation 2 session.`,
  },
}
