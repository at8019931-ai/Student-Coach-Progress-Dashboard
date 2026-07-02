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
- Knight moving in straight L instead of diagonal — always verify the landing square.
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
- Learn the 4 ways to protect a piece: A=Attack the attacker, B=Block, C=Cover (add a defender), D=Defend (move the piece away).
- Students can: apply the correct ABCD method in a given position; explain why each method works.
- Directly builds on Session 4 (hanging pieces) — now students can STOP pieces from hanging.

### How to Explain It
- When a piece is attacked, you have 4 choices — remember **ABCD**:
  - **A – Attack back:** Threaten something bigger so the opponent must deal with that instead.
  - **B – Block:** Put another piece between the attacker and the attacked piece.
  - **C – Cover:** Add another defender to the attacked piece.
  - **D – Depart (move away):** Simply move the attacked piece to safety.
- Analogy: Your friend is being chased by a bully — you can confront the bully (A), stand between them (B), bring another friend (C), or pull your friend away (D).

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
- 5 min – Introduce ABCD acronym with the bully story
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
- **3 ways out of check:**
  1. **Block** — put a piece between the attacker and your King.
  2. **Capture** — take the attacking piece.
  3. **King moves** — move the King to a safe square.
- **Checkmate** = the King is in check AND has no escape — the game is over.

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
- Blocking check but the blocking piece is pinned (it was protecting the King already) — advanced but worth noting.
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
- Capture forks — taking a free piece that walks into a trap.
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
- 5 min – Warm-up breathing and confidence chat
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
- Combine the learning: "After you escape check, you also get to make a GOOD move — use ABCD to improve your position."

### Teaching Steps
1. Start with 3 quick "give check with this piece" exercises from different board positions.
2. Present 4 "escape the check" puzzles with increasing difficulty (1 option → 3 options → which is best?).
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
- "Control the centre and you control the game."

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
- 5 min – "Today's winner" setup and reflection
- **Homework:** Find 5 "Mate in 1" puzzles on Lichess and record which piece delivers the checkmate.`,

    11: `### Objective & Outcomes
- Learn castling: when, how, and why it is done. Both kingside (0-0) and queenside (0-0-0).
- Students can: castle correctly in a practice position, list the 4 conditions that prevent castling, explain why castling is important.
- Special rule that confuses many beginners — crystal clarity here prevents future rule arguments.

### How to Explain It
- **Castling** = the King and Rook do a special teamwork move — the only time two pieces move at once!
- **Kingside castle (0-0):** King slides 2 squares toward the h-file Rook; Rook jumps to the other side.
- **Queenside castle (0-0-0):** King slides 2 squares toward the a-file Rook.
- **4 conditions — you CANNOT castle if:**
  1. The King has moved before.
  2. The Rook has moved before.
  3. The King is currently in check.
  4. The King passes through or lands on an attacked square.

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
- **En passant:** When a pawn moves 2 squares from its start and lands beside an enemy pawn, the enemy pawn can capture it AS IF it only moved 1 square. Must be done IMMEDIATELY on the next move.
- **Pawn Promotion:** When a pawn reaches the opposite end of the board (row 8 for White, row 1 for Black), it can become ANY piece — almost always a Queen.
- Story: "The pawn is a brave little soldier who earns a promotion — reaching the enemy's base earns them a crown!"

### Teaching Steps
1. Set up en passant situation — most students find it shocking and confusing at first, so go slowly.
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
- En passant capture landing on the wrong square — the capturing pawn goes to the square the opponent's pawn PASSED through, not where it landed.
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
- Learn assisted checkmates — delivering checkmate with help from other pieces: Q+K, R+K, B+N+K, P+any.
- Students can: force checkmate with Queen and King, understand why lone pieces cannot checkmate alone.
- Foundation for the two-Rook checkmate and Queen/Rook solo checkmates in Session 23.

### How to Explain It
- A single Queen usually cannot force checkmate without the King's help — teamwork is needed.
- **Queen + King:** Push the lone King to the edge, then deliver checkmate.
- **Rook + King:** Same principle — use the Rook to cut off files/ranks, King helps corner the enemy King.
- Think of it like football: the King is the defender, the Queen/Rook is the striker scoring the goal.

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
- Causing stalemate when winning easily — this is the #1 heartbreak for beginners; spend time on it.
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
- **The rule:** Before capturing, ask "If I take this, what happens next?" Count: attackers vs defenders.
- Analogy: a sweet in a shop is free (hanging) — a sweet in someone's hand is defended; grabbing it causes trouble!

### Teaching Steps
1. Show 3 positions: one hanging, one defended, one tricky (looks hanging but isn't).
2. Teach the "attacker vs defender count" — tally both sides before deciding.
3. Show a captured piece that causes the captor to be captured in return (the trap).
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
- Analogy: exchanging a £5 note for a £10 note is great — exchanging a £10 note for a £5 note is not!

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

### Teaching Steps
1. Calming warm-up: one breathing exercise and one easy puzzle to build confidence.
2. Test positions cover: check escape, checkmate in 1, castling scenario, en passant spot, hanging piece, profitable exchange.
3. Students work independently and quietly.
4. After test: paired discussion — students explain their answers to a partner.
5. Coach shares observations: "I noticed everyone got checkmate in 1 — excellent! En passant needs more work."

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
- Mixed checkmate practice: direct checkmates (attacker and King only) and assisted checkmates (supporting pieces).
- Students can: identify checkmate patterns when multiple pieces are on the board, find the mating move quickly.
- Bridges single-piece checkmates to real game positions where the board is crowded.

### How to Explain It
- **Direct checkmate:** A piece directly attacks the King and it cannot escape, block, or capture.
- **Assisted checkmate:** One piece gives check while others cover the escape squares.
- Think of it as: the striker shoots (direct check), the team blocks exits (covers escape squares).
- The key skill: LOOK at all squares the King could run to BEFORE you make the mating move.

### Teaching Steps
1. Start with 3 direct mates — students should solve instantly ("like reading a word").
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
- Analogy: you've backed a player into a corner so tightly they are frozen — if they're not in check, you've gone too far and it's a draw!
- When you are winning, leave the opponent at least ONE legal move at all times until you can deliver checkmate.

### Teaching Steps
1. Show a stalemate position — "Why is this a draw?" Students usually say "the King can't move, so it should be a win!" Correct the misconception.
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
- Students still confusing stalemate and checkmate after explanation — run through the definition again: stalemate = NOT in check + NO legal move.
- Accidentally stalemating during Q+K vs K practice — this must be caught and corrected immediately.

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
- **Threefold repetition:** The SAME position (including whose turn it is) appears 3 times — either player can claim a draw.
- **50-move rule:** If no pawn has moved and no piece has been captured in the last 50 moves by each player (100 moves total), either player can claim a draw.
- **Insufficient material:** Neither side has enough pieces to deliver checkmate (e.g., K vs K, K+B vs K, K+N vs K).

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
- Students thinking K+N+N vs K is automatic checkmate — it is actually very rare and is usually a draw (technically it CANNOT be forced, interesting discussion!).
- Confusing "stalemate" with "threefold repetition" — review both definitions side by side.

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
- Real games use ALL rules at unpredictable moments — practice recognising when they apply.

### Teaching Steps
1. Set up a position using 3 special rules simultaneously — students identify each opportunity.
2. Play-through game: coach plays and students call out every time a special rule applies.
3. "Spot the rule" game: show positions where special moves are possible — students name the rule.
4. Full games where all rules are in play; coach monitors and quizzes students on their choices.
5. End with a "rules mastery" quiz — 10 questions, 30 seconds each.

### Questions to Ask Students
- "This pawn just moved 2 squares — what can your pawn do right now?"
- "You want to castle but your King needs to pass through e1 — is e1 attacked? Check before you castle."
- "This pawn is on d7 — whose turn is it to promote and what should they promote to?"
- "Count the remaining material — is a draw by insufficient material possible?"
- "If you repeat this position one more time, what can your opponent claim?"

### Watch For (Common Mistakes)
- Missing en passant opportunities — remind students to check for it every time an opponent pawn moves 2 squares.
- Promoting to anything other than a Queen without good reason — discuss when underpromotion makes sense.

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
- **Fool's Mate:** The fastest possible checkmate — White plays badly and Black mates in just 2 moves. Shows how fast the game can end without opening principles.
- **Scholar's Mate (4-move checkmate):** 1.e4 e5 2.Bc4 Nc6 3.Qh5 ... attacking f7. Devastating if Black doesn't know the defence.
- The defence is simple: develop pieces, don't move the same piece twice, watch for Qh5.
- These traps prove WHY the opening principles (Session 22) are so important.

### Teaching Steps
1. Play the Fool's Mate with a student without explaining what you are doing — they are surprised when they win/lose in 2 moves!
2. Analyse: "What did White do WRONG?" Links to future opening principles.
3. Demonstrate Scholar's Mate step by step — then defend it.
4. Students attempt to trap each other; partner must identify and defend.
5. Discuss: "Is it good chess to only try these traps?" — builds sportsmanship.

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
- **Control the centre:** Place pawns or pieces on/near d4,d5,e4,e5 — the most powerful squares.
- **Develop your pieces:** Bring out Knights and Bishops early; don't move the same piece twice without reason.
- **Castle:** Get your King to safety and connect your Rooks.
- Memory phrase: "**C-D-C:** Centre, Develop, Castle — always in that mindset."

### Teaching Steps
1. Ask "What should you do in the first 5 moves of a game?" — let students guess before teaching.
2. Compare a principled opening (e4, Nf3, Bc4, 0-0) vs unprincipled (h4, a4, Na3, Nh3).
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
- Moving the Queen early ("the Queen is the strongest piece, I'll attack!") — demonstrate why this loses time.
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
- Master checkmate with two Rooks (rolling Rook checkmate) and Queen checkmate against a lone King.
- Students can: deliver two-Rook checkmate in under 15 moves, apply the Queen+King checkmate reliably without stalemate.
- Practical endgame skill that decides most beginner games — essential before the final assessment.

### How to Explain It
- **Two Rooks ("Lawnmower"):** One Rook cuts off a rank, the other gives check — the King is pushed to the edge row by row like a lawnmower.
- **Queen + King:** Queen controls two rows at once; use the King to drive the enemy King to the edge.
- Key concept: **Zugzwang** — forcing the opponent into a position where any move makes their position worse.
- The key to both endings: patience and working row by row — never rush.

### Teaching Steps
1. Demonstrate the lawnmower with two Rooks — show the clean, mechanical pattern.
2. Students practice 2R+K vs K: can they do it in under 20 moves?
3. Compare to Q+K checkmate — Queen cuts off larger areas.
4. Stalemate trap reminder — deliberately show the stalemate danger with the Queen.
5. Tournament: students race to checkmate the lone King; coach times each attempt.

### Questions to Ask Students
- "The enemy King is on e5 — which Rook move pushes it backward without giving stalemate?"
- "Your second Rook is on a1 — when do you use it to give the final check?"
- "Why do we call the two-Rook checkmate a 'lawnmower'? What does the pattern look like?"
- "The King is on e8 — can you force checkmate in 1 from this position with your Rooks?"
- "What's the biggest danger when you're trying to deliver checkmate with the Queen alone?"

### Watch For (Common Mistakes)
- Rooks blocking each other — teach students to keep them on different files/ranks working together.
- Moving to the wrong Rook square and allowing the King to approach — trace the King's moves first.
- Stalemate with the Queen — reinforce: always leave one escape square until the King is cornered.

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
- 5 min – Favourite warm-up game / activity from the course
- 25 min – Final Assessment (8 positions covering all topics)
- 10 min – Review and personalised feedback
- 5 min – Celebration, Foundation 1 preview, and goal-setting
- **Homework:** Play 5 games this week applying everything you learned. Write down one improvement you notice in each game.`,
  },
}
