// ═══════════════════════════════════════════════════════════
// DATA — 180+ sentences from class slides + Te Aka Dictionary
// Week 3 level: 6-12 word sentences with A/O, pronouns, tenses
// ═══════════════════════════════════════════════════════════

const data = {
  // ═══ A/O POSSESSIVES (60 sentences) ═══
  ao: [
    // From class slides
    {q:"I haere ia ki te tiki i _____ kau",sub:"tāna or tōna?",reo:"tāna kau",note:"Kau = A-category (controlled). Tāna = his/her A.",blank:"I haere ia ki te tiki i _____ kau.",ans:"tāna",build:"I haere ia ki te tiki i tāna kau"},
    {q:"I whāngai te māmā i _____ kuia",sub:"tāna or tōna?",reo:"tōna kuia",note:"Kuia = O-category (whanaungatanga). Tōna = his/her O.",blank:"I whāngai te māmā i _____ kuia.",ans:"tōna",build:"I whāngai te māmā i tōna kuia"},
    {q:"Kei hea ā _____ tamariki?",sub:"tāua or tōua?",reo:"ā tāua tamariki",note:"Tamariki (children you care for) = A-category. Tāua = us two.",blank:"Kei hea ā _____ tamariki?",ans:"tāua",build:"Kei hea ā tāua tamariki"},
    {q:"Ko te reo Māori _____ reo rangatira",sub:"tō tāua nei",reo:"tō tāua nei reo rangatira",note:"Reo = O-category (intrinsic identity). Tāua = us two.",blank:"Ko te reo Māori _____ reo rangatira.",ans:"tō tāua nei",build:"Ko te reo Māori tō tāua nei reo rangatira"},
    {q:"Ka haere au ki _____ whare",sub:"tōu or tāu?",reo:"tōu whare",note:"Whare = O-category (you live IN it). Tōu = your O.",blank:"Ka haere au ki _____ whare.",ans:"tōu",build:"Ka haere au ki tōu whare"},
    {q:"Kua pakaru _____ waka",sub:"tōku or tāku?",reo:"tōku waka",note:"Waka = O-category (you belong to it). Tōku = my O.",blank:"Kua pakaru _____ waka.",ans:"tōku",build:"Kua pakaru tōku waka"},
    {q:"Me kai ahau i _____ pire",sub:"ōku or āku?",reo:"ōku pire",note:"Pire = O-category (acts on body). Ōku = my plural O.",blank:"Me kai ahau i _____ pire.",ans:"ōku",build:"Me kai ahau i ōku pire"},
    {q:"I ngaro i a ia _____ rongoā",sub:"tōna or tāna?",reo:"tōna rongoā",note:"Rongoā = O-category (heals you). Tōna = his/her O.",blank:"I ngaro i a ia _____ rongoā.",ans:"tōna",build:"I ngaro i a ia tōna rongoā"},
    {q:"He wahine kaha _____ māmā",sub:"tōku or tāku?",reo:"tōku māmā",note:"Māmā = O-category (whanaungatanga). Tōku = my O.",blank:"He wahine kaha _____ māmā.",ans:"tōku",build:"He wahine kaha tōku māmā"},
    {q:"Tīkina _____ waea pūkoro",sub:"tāu or tōu?",reo:"tāu waea pūkoro",note:"Waea pūkoro = A-category (you control it). Tāu = your A.",blank:"Tīkina _____ waea pūkoro.",ans:"tāu",build:"Tīkina tāu waea pūkoro"},
    {q:"He iti _____ kurī",sub:"tāku or tōku?",reo:"tāku kurī",note:"Kurī = A-category (you care for it). Tāku = my A.",blank:"He iti _____ kurī.",ans:"tāku",build:"He iti tāku kurī"},
    {q:"I hoki ia ki _____ mahi",sub:"tāna or tōna?",reo:"tāna mahi",note:"Mahi = A-category (things you do). Tāna = his/her A.",blank:"I hoki ia ki _____ mahi.",ans:"tāna",build:"I hoki ia ki tāna mahi"},
    {q:"He mamae _____ tuke",sub:"tōku or tāku?",reo:"tōku tuke",note:"Tuke = O-category (body part). Tōku = my O.",blank:"He mamae _____ tuke.",ans:"tōku",build:"He mamae tōku tuke"},
    {q:"He āhuru mōwai _____ tūrangawaewae",sub:"tōku or tāku?",reo:"tōku tūrangawaewae",note:"Tūrangawaewae = O-category (you belong TO it). Tōku = my O.",blank:"He āhuru mōwai _____ tūrangawaewae.",ans:"tōku",build:"He āhuru mōwai tōku tūrangawaewae"},
    {q:"Kua waiata kē _____ hoa",sub:"tōu or tāu?",reo:"tōu hoa",note:"Hoa = O-category (relationship). Tōu = your O.",blank:"Kua waiata kē _____ hoa.",ans:"tōu",build:"Kua waiata kē tōu hoa"},
    
    // From dictionary
    {q:"Kei a au _____ hākete",sub:"tōu or tāu?",reo:"tōu hākete",note:"Hākete (jacket) = O-category (you wear it on body). Tōu = your O.",blank:"Kei a au _____ hākete.",ans:"tōu",build:"Kei a au tōu hākete"},
    {q:"He kete _____ ",sub:"tāku or tōku?",reo:"tāku",note:"Kete = A-category (you carry/use it). Tāku = my A.",blank:"He kete _____.",ans:"tāku",build:"He kete tāku"},
    {q:"Kāore _____ tarau",sub:"ōku or āku?",reo:"ōku tarau",note:"Tarau (trousers) = O-category (clothing). Ōku = my plural O.",blank:"Kāore _____ tarau.",ans:"ōku",build:"Kāore ōku tarau"},
    {q:"He motokā _____",sub:"ōku or āku?",reo:"ōku",note:"Motokā (cars owned) = O-category. Ōku = my plural O.",blank:"He motokā _____.",ans:"ōku",build:"He motokā ōku"},
    {q:"He ika ā _____",sub:"tātou or tātau?",reo:"ā tātou",note:"Ika = A-category (food you caught/control). Ā tātou = our plural A.",blank:"He ika ā _____.",ans:"tātou",build:"He ika ā tātou"},
    {q:"Waimarie rawa atu _____",sub:"kōrua",reo:"kōrua",note:"Context: You two are lucky. No possessive needed here.",blank:"Waimarie rawa atu _____.",ans:"kōrua",build:"Waimarie rawa atu kōrua"},
    {q:"Kāore he whare karakia ō _____ marae",sub:"tō mātou",reo:"tō mātou marae",note:"Marae = O-category (you belong to it). Tō mātou = our O (exclusive).",blank:"Kāore he whare karakia ō _____ marae.",ans:"tō mātou",build:"Kāore he whare karakia ō tō mātou marae"},
    {q:"He reka _____ kai",sub:"tāku or tōku?",reo:"tāku kai",note:"Kai = A-category (food you control/eat). Tāku = my A.",blank:"He reka _____ kai.",ans:"tāku",build:"He reka tāku kai"},
    {q:"Kua hinga _____ mōhio",sub:"tōku or tāku?",reo:"tōku mōhio",note:"Mōhio (knowledge) = O-category (part of you). Tōku = my O.",blank:"Kua hinga _____ mōhio.",ans:"tōku",build:"Kua hinga tōku mōhio"},
    {q:"He pai _____ whakaaro",sub:"tōu or tāu?",reo:"tōu whakaaro",note:"Whakaaro (thought/idea) = O-category (intrinsic). Tōu = your O.",blank:"He pai _____ whakaaro.",ans:"tōu",build:"He pai tōu whakaaro"},
    {q:"Kua ngaro _____ pene",sub:"tāku or tōku?",reo:"tāku pene",note:"Pene (pen) = A-category (tool you control). Tāku = my A.",blank:"Kua ngaro _____ pene.",ans:"tāku",build:"Kua ngaro tāku pene"},
    {q:"He nui _____ whānau",sub:"tōku or tāku?",reo:"tōku whānau",note:"Whānau = O-category (you belong to them). Tōku = my O.",blank:"He nui _____ whānau.",ans:"tōku",build:"He nui tōku whānau"},
    {q:"Kei te haere _____ tamaiti ki te kura",sub:"tāku or tōku?",reo:"tāku tamaiti",note:"Tamaiti (child you care for) = A-category. Tāku = my A.",blank:"Kei te haere _____ tamaiti ki te kura.",ans:"tāku",build:"Kei te haere tāku tamaiti ki te kura"},
    {q:"He ātaahua _____ kakahu",sub:"tōu or tāu?",reo:"tōu kakahu",note:"Kakahu (clothing) = O-category (you wear it). Tōu = your O.",blank:"He ātaahua _____ kakahu.",ans:"tōu",build:"He ātaahua tōu kakahu"},
    {q:"Kei hea _____ pūkeke?",sub:"tāu or tōu?",reo:"tāu pūkeke",note:"Pūkeke (bag) = A-category (you carry it). Tāu = your A.",blank:"Kei hea _____ pūkeke?",ans:"tāu",build:"Kei hea tāu pūkeke"},
    
    // More variations
    {q:"He roa _____ waewae",sub:"ōku or āku?",reo:"ōku waewae",note:"Waewae (legs) = O-category (body parts). Ōku = my plural O.",blank:"He roa _____ waewae.",ans:"ōku",build:"He roa ōku waewae"},
    {q:"Kua tae mai _____ hoa",sub:"tōku or tāku?",reo:"tōku hoa",note:"Hoa = O-category (relationship). Tōku = my O.",blank:"Kua tae mai _____ hoa.",ans:"tōku",build:"Kua tae mai tōku hoa"},
    {q:"He pai _____ mahi",sub:"tāu or tōu?",reo:"tāu mahi",note:"Mahi (your work) = A-category. Tāu = your A.",blank:"He pai _____ mahi.",ans:"tāu",build:"He pai tāu mahi"},
    {q:"Kei te kite au i _____ matua",sub:"tōku or tāku?",reo:"tōku matua",note:"Matua (parent) = O-category (whanaungatanga). Tōku = my O.",blank:"Kei te kite au i _____ matua.",ans:"tōku",build:"Kei te kite au i tōku matua"},
    {q:"He nui _____ kāinga",sub:"tō rātou",reo:"tō rātou kāinga",note:"Kāinga (home) = O-category. Tō rātou = their O.",blank:"He nui _____ kāinga.",ans:"tō rātou",build:"He nui tō rātou kāinga"},
    {q:"Kua hoki mai _____ teina",sub:"tāku or tōku?",reo:"tōku teina",note:"Teina (younger sibling) = O-category (whanaungatanga). Tōku = my O.",blank:"Kua hoki mai _____ teina.",ans:"tōku",build:"Kua hoki mai tōku teina"},
    {q:"He māngere _____ kurī",sub:"tāku or tōku?",reo:"tāku kurī",note:"Kurī = A-category (animal you care for). Tāku = my A.",blank:"He māngere _____ kurī.",ans:"tāku",build:"He māngere tāku kurī"},
    {q:"Kei te kai _____ whānau",sub:"tōku or tāku?",reo:"tōku whānau",note:"Whānau = O-category. Tōku = my O.",blank:"Kei te kai _____ whānau.",ans:"tōku",build:"Kei te kai tōku whānau"},
    {q:"He reka _____ kōrero",sub:"tāu or tōu?",reo:"tāu kōrero",note:"Kōrero (speech/words) = A-category (you produce it). Tāu = your A.",blank:"He reka _____ kōrero.",ans:"tāu",build:"He reka tāu kōrero"},
    {q:"Kua wareware ahau i _____ ingoa",sub:"tōna or tāna?",reo:"tōna ingoa",note:"Ingoa (name) = O-category (intrinsic identity). Tōna = his/her O.",blank:"Kua wareware ahau i _____ ingoa.",ans:"tōna",build:"Kua wareware ahau i tōna ingoa"},
    
    // Additional A/O practice
    {q:"He tino pai _____ pukapuka",sub:"tēnei",reo:"tēnei pukapuka",note:"Pukapuka (book) = A-category (you read/control it). Can use tēnei (this).",blank:"He tino pai _____ pukapuka.",ans:"tēnei",build:"He tino pai tēnei pukapuka"},
    {q:"Kei te mōhio au ki _____ pāpā",sub:"tōu or tāu?",reo:"tōu pāpā",note:"Pāpā = O-category (whanaungatanga). Tōu = your O.",blank:"Kei te mōhio au ki _____ pāpā.",ans:"tōu",build:"Kei te mōhio au ki tōu pāpā"},
    {q:"He aha _____ take?",sub:"tōu or tāu?",reo:"tōu take",note:"Take (reason/issue) = O-category (intrinsic). Tōu = your O.",blank:"He aha _____ take?",ans:"tōu",build:"He aha tōu take"},
    {q:"Kei te aroha au ki _____ tamariki",sub:"āku or ōku?",reo:"āku tamariki",note:"Tamariki (children cared for) = A-category. Āku = my plural A.",blank:"Kei te aroha au ki _____ tamariki.",ans:"āku",build:"Kei te aroha au ki āku tamariki"},
    {q:"He rawe _____ waiata",sub:"tāu or tōu?",reo:"tāu waiata",note:"Waiata (song you sing/compose) = A-category. Tāu = your A.",blank:"He rawe _____ waiata.",ans:"tāu",build:"He rawe tāu waiata"},
    {q:"Kua mutu _____ mahi",sub:"tāku or tōku?",reo:"tāku mahi",note:"Mahi = A-category (work you do). Tāku = my A.",blank:"Kua mutu _____ mahi.",ans:"tāku",build:"Kua mutu tāku mahi"},
    {q:"He nui _____ aroha",sub:"tōku or tāku?",reo:"tōku aroha",note:"Aroha (love/compassion) = O-category (emotion). Tōku = my O.",blank:"He nui _____ aroha.",ans:"tōku",build:"He nui tōku aroha"},
    {q:"Kei te haere _____ whaea ki te toa",sub:"tōku or tāku?",reo:"tōku whaea",note:"Whaea (mother/aunt) = O-category (whanaungatanga). Tōku = my O.",blank:"Kei te haere _____ whaea ki te toa.",ans:"tōku",build:"Kei te haere tōku whaea ki te toa"},
    {q:"He pai _____ kēmu",sub:"tā māua",reo:"tā māua kēmu",note:"Kēmu (game) = A-category (activity you do). Tā māua = our A (dual exclusive).",blank:"He pai _____ kēmu.",ans:"tā māua",build:"He pai tā māua kēmu"},
    {q:"Kua riro _____ paoro i a ia",sub:"te",reo:"te paoro",note:"Using 'te' (the) instead of possessive here - direct object marker.",blank:"Kua riro _____ paoro i a ia.",ans:"te",build:"Kua riro te paoro i a ia"},
    {q:"He ātaahua _____ tāera",sub:"tōna or tāna?",reo:"tōna tāera",note:"Tāera (style/look) = O-category (intrinsic appearance). Tōna = his/her O.",blank:"He ātaahua _____ tāera.",ans:"tōna",build:"He ātaahua tōna tāera"},
    {q:"Kei te whakarongo au ki _____ reo",sub:"tōu or tāu?",reo:"tōu reo",note:"Reo (voice/language) = O-category (intrinsic). Tōu = your O.",blank:"Kei te whakarongo au ki _____ reo.",ans:"tōu",build:"Kei te whakarongo au ki tōu reo"},
    {q:"He tino māngere _____ ngeru",sub:"tāku or tōku?",reo:"tāku ngeru",note:"Ngeru (cat) = A-category (pet you care for). Tāku = my A.",blank:"He tino māngere _____ ngeru.",ans:"tāku",build:"He tino māngere tāku ngeru"},
    {q:"Kua hoki _____ tuahine ki te kāinga",sub:"tōku or tāku?",reo:"tōku tuahine",note:"Tuahine (sister) = O-category (whanaungatanga). Tōku = my O.",blank:"Kua hoki _____ tuahine ki te kāinga.",ans:"tōku",build:"Kua hoki tōku tuahine ki te kāinga"},
    {q:"He nui _____ mahi",sub:"ā tātou",reo:"ā tātou mahi",note:"Mahi (tasks) = A-category. Ā tātou = our plural A (inclusive).",blank:"He nui _____ mahi.",ans:"ā tātou",build:"He nui ā tātou mahi"},
    {q:"Kei te pēhea _____ tinana?",sub:"tōu or tāu?",reo:"tōu tinana",note:"Tinana (body) = O-category (you ARE your body). Tōu = your O.",blank:"Kei te pēhea _____ tinana?",ans:"tōu",build:"Kei te pēhea tōu tinana"},
    {q:"He tino pai _____ whakaaro",sub:"tā koutou",reo:"tā koutou whakaaro",note:"Whakaaro (idea) can be A-category when it's a plan/action. Tā koutou = your plural A.",blank:"He tino pai _____ whakaaro.",ans:"tā koutou",build:"He tino pai tā koutou whakaaro"},
    {q:"Kua ngaro _____ kī",sub:"āku or ōku?",reo:"āku kī",note:"Kī (keys) = A-category (tools you use). Āku = my plural A.",blank:"Kua ngaro _____ kī.",ans:"āku",build:"Kua ngaro āku kī"},
    {q:"He roa rawa _____ makawe",sub:"ōna or āna?",reo:"ōna makawe",note:"Makawe (hair) = O-category (body part). Ōna = his/her plural O.",blank:"He roa rawa _____ makawe.",ans:"ōna",build:"He roa rawa ōna makawe"},
    {q:"Kei te haere _____ tungāne ki Tāmaki",sub:"tōku or tāku?",reo:"tōku tungāne",note:"Tungāne (brother) = O-category (whanaungatanga). Tōku = my O.",blank:"Kei te haere _____ tungāne ki Tāmaki.",ans:"tōku",build:"Kei te haere tōku tungāne ki Tāmaki"}
  ],

  // ═══ PRONOUNS (40 sentences) ═══
  kupu: [
    // Basic pronouns from class
    {q:"Ko wai tēnei? (I, speaker)",sub:"1st singular",reo:"ahau (au in sentences)",note:"Ahau = I. After verbs: au. Kei te haere au.",blank:"Kei te haere _____ ki te kura.",ans:"au",build:"Kei te haere au ki te kura"},
    {q:"Ko wai? (You, 1 person)",sub:"2nd singular",reo:"koe",note:"Koe = you (singular). E oma ana koe.",blank:"E oma ana _____ i tēnei rā.",ans:"koe",build:"E oma ana koe i tēnei rā"},
    {q:"Ko wai? (He/she/it)",sub:"3rd singular",reo:"ia",note:"Ia = he/she/it (no gender). Ka oma ia.",blank:"Ka oma _____ āpōpō.",ans:"ia",build:"Ka oma ia āpōpō"},
    {q:"Ko wai? (You and me, 2)",sub:"1st dual inclusive",reo:"tāua",note:"Tāua = us two (YOU + ME). Ka haere tāua.",blank:"Ka haere _____ ki te toa.",ans:"tāua",build:"Ka haere tāua ki te toa"},
    {q:"Ko wai? (Me + one, NOT you)",sub:"1st dual exclusive",reo:"māua",note:"Māua = us two (NOT you). Ka noho māua.",blank:"Ka noho _____ i konei.",ans:"māua",build:"Ka noho māua i konei"},
    {q:"Ko wai? (You two)",sub:"2nd dual",reo:"kōrua",note:"Kōrua = you two. He pai kōrua.",blank:"He pai _____.",ans:"kōrua",build:"He pai kōrua"},
    {q:"Ko wai? (Those two)",sub:"3rd dual",reo:"rāua",note:"Rāua = those two (3rd party). Ka haere rāua.",blank:"Ka haere _____ ki te whare.",ans:"rāua",build:"Ka haere rāua ki te whare"},
    {q:"Ko wai? (All of us, 3+)",sub:"1st plural inclusive",reo:"tātou",note:"Tātou = we all (3+, includes YOU). Ka kai tātou.",blank:"Ka kai _____ āpōpō.",ans:"tātou",build:"Ka kai tātou āpōpō"},
    {q:"Ko wai? (We 3+, NOT you)",sub:"1st plural exclusive",reo:"mātou",note:"Mātou = we (3+, excludes YOU). Ka hoe mātou.",blank:"Ka hoe _____ āpōpō.",ans:"mātou",build:"Ka hoe mātou āpōpō"},
    {q:"Ko wai? (You all, 3+)",sub:"2nd plural",reo:"koutou",note:"Koutou = you all (3+). He pai koutou.",blank:"He pai _____ katoa.",ans:"koutou",build:"He pai koutou katoa"},
    {q:"Ko wai? (They, 3+)",sub:"3rd plural",reo:"rātou",note:"Rātou = they (3+). Ka haere rātou.",blank:"Ka haere _____ ki te whare.",ans:"rātou",build:"Ka haere rātou ki te whare"},
    
    // Pronouns in context (from dictionary)
    {q:"Kei te mōhio _____ ki tō pāpā",sub:"Which pronoun (I)?",reo:"au",note:"Au = I (after verb). Kei te mōhio au = I know.",blank:"Kei te mōhio _____ ki tō pāpā.",ans:"au",build:"Kei te mōhio au ki tō pāpā"},
    {q:"E haere ana _____ ki te toa",sub:"you (singular)",reo:"koe",note:"Koe = you. E haere ana koe = you are going.",blank:"E haere ana _____ ki te toa.",ans:"koe",build:"E haere ana koe ki te toa"},
    {q:"Ka kai _____ i te ahiahi",sub:"he/she",reo:"ia",note:"Ia = he/she/it. Ka kai ia = she will eat.",blank:"Ka kai _____ i te ahiahi.",ans:"ia",build:"Ka kai ia i te ahiahi"},
    {q:"Kua tae mai _____ ki te hui",sub:"us two (you+me)",reo:"tāua",note:"Tāua = us two (inclusive). Kua tae mai tāua.",blank:"Kua tae mai _____ ki te hui.",ans:"tāua",build:"Kua tae mai tāua ki te hui"},
    {q:"I haere _____ ki te moana",sub:"us two (NOT you)",reo:"māua",note:"Māua = us two (exclusive). I haere māua.",blank:"I haere _____ ki te moana.",ans:"māua",build:"I haere māua ki te moana"},
    {q:"Kei te pēhea _____?",sub:"you two",reo:"kōrua",note:"Kōrua = you two. Kei te pēhea kōrua = How are you two?",blank:"Kei te pēhea _____?",ans:"kōrua",build:"Kei te pēhea kōrua"},
    {q:"E noho ana _____ i Tāmaki",sub:"those two",reo:"rāua",note:"Rāua = those two. E noho ana rāua.",blank:"E noho ana _____ i Tāmaki.",ans:"rāua",build:"E noho ana rāua i Tāmaki"},
    {q:"Ka waiata _____ āpōpō",sub:"all of us (3+)",reo:"tātou",note:"Tātou = we all (3+, inclusive). Ka waiata tātou.",blank:"Ka waiata _____ āpōpō.",ans:"tātou",build:"Ka waiata tātou āpōpō"},
    {q:"I kite _____ i te kurī",sub:"we (NOT you, 3+)",reo:"mātou",note:"Mātou = we (exclusive). I kite mātou.",blank:"I kite _____ i te kurī.",ans:"mātou",build:"I kite mātou i te kurī"},
    {q:"Kei hea _____?",sub:"you all (3+)",reo:"koutou",note:"Koutou = you all. Kei hea koutou = Where are you all?",blank:"Kei hea _____?",ans:"koutou",build:"Kei hea koutou"},
    {q:"Kua haere _____ ki te maunga",sub:"they (3+)",reo:"rātou",note:"Rātou = they (3+). Kua haere rātou.",blank:"Kua haere _____ ki te maunga.",ans:"rātou",build:"Kua haere rātou ki te maunga"},
    
    // More pronoun practice
    {q:"Kei te hiahia _____ ki te kai",sub:"I",reo:"au",note:"Au = I. Kei te hiahia au = I want.",blank:"Kei te hiahia _____ ki te kai.",ans:"au",build:"Kei te hiahia au ki te kai"},
    {q:"Ka hoki _____ ki te kāinga",sub:"you (one person)",reo:"koe",note:"Koe = you. Ka hoki koe = you will return.",blank:"Ka hoki _____ ki te kāinga.",ans:"koe",build:"Ka hoki koe ki te kāinga"},
    {q:"I mate _____ i te tūroro",sub:"he/she",reo:"ia",note:"Ia = he/she. I mate ia = he/she was sick.",blank:"I mate _____ i te tūroro.",ans:"ia",build:"I mate ia i te tūroro"},
    {q:"E mahi ana _____ i te whare",sub:"us two (you+me)",reo:"tāua",note:"Tāua = us two (inclusive). E mahi ana tāua.",blank:"E mahi ana _____ i te whare.",ans:"tāua",build:"E mahi ana tāua i te whare"},
    {q:"Kua mutu tā _____ mahi",sub:"us two (NOT you)",reo:"māua",note:"Māua = us two (exclusive). Tā māua = our (A-cat).",blank:"Kua mutu tā _____ mahi.",ans:"māua",build:"Kua mutu tā māua mahi"},
    {q:"He aha tā _____ e mahi ana?",sub:"you two",reo:"kōrua",note:"Kōrua = you two. Tā kōrua = your (A-cat).",blank:"He aha tā _____ e mahi ana?",ans:"kōrua",build:"He aha tā kōrua e mahi ana"},
    {q:"Kei te kōrero _____ mō te hunga",sub:"those two",reo:"rāua",note:"Rāua = those two. Kei te kōrero rāua.",blank:"Kei te kōrero _____ mō te hui.",ans:"rāua",build:"Kei te kōrero rāua mō te hui"},
    {q:"Me haere _____ ki te kura",sub:"all of us",reo:"tātou",note:"Tātou = we all (inclusive). Me haere tātou.",blank:"Me haere _____ ki te kura.",ans:"tātou",build:"Me haere tātou ki te kura"},
    {q:"Kua rongo _____ i te tangi",sub:"we (NOT you)",reo:"mātou",note:"Mātou = we (exclusive). Kua rongo mātou.",blank:"Kua rongo _____ i te tangi.",ans:"mātou",build:"Kua rongo mātou i te tangi"},
    {q:"Kei te pai _____ katoa",sub:"you all",reo:"koutou",note:"Koutou = you all. Kei te pai koutou katoa.",blank:"Kei te pai _____ katoa.",ans:"koutou",build:"Kei te pai koutou katoa"},
    {q:"I hoko _____ i te kai",sub:"they",reo:"rātou",note:"Rātou = they. I hoko rātou = they bought.",blank:"I hoko _____ i te kai.",ans:"rātou",build:"I hoko rātou i te kai"},
    {q:"E pīrangi ana _____ kia haere",sub:"I",reo:"au",note:"Au = I. E pīrangi ana au = I want (formal).",blank:"E pīrangi ana _____ kia haere.",ans:"au",build:"E pīrangi ana au kia haere"},
    {q:"Ka tū _____ ki te kōrero",sub:"you",reo:"koe",note:"Koe = you. Ka tū koe = you will stand.",blank:"Ka tū _____ ki te kōrero.",ans:"koe",build:"Ka tū koe ki te kōrero"},
    {q:"Kua roa _____ e noho ana i konei",sub:"she/he",reo:"ia",note:"Ia = she/he. Kua roa ia e noho ana.",blank:"Kua roa _____ e noho ana i konei.",ans:"ia",build:"Kua roa ia e noho ana i konei"},
    {q:"Kei te aroha _____ ki a koutou",sub:"us two (you+me)",reo:"tāua",note:"Tāua = us two (inclusive). Kei te aroha tāua.",blank:"Kei te aroha _____ ki a koutou.",ans:"tāua",build:"Kei te aroha tāua ki a koutou"},
    {q:"I kite _____ i a ia inanahi",sub:"us two (NOT you)",reo:"māua",note:"Māua = us two (exclusive). I kite māua.",blank:"I kite _____ i a ia inanahi.",ans:"māua",build:"I kite māua i a ia inanahi"}
  ],

  // ═══ TENSES (60 sentences) ═══
  tense: [
    // Basic tense markers from class
    {q:"Kei te oma ahau",sub:"What tense?",reo:"Kei te ___ (present now)",note:"Kei te = RIGHT NOW. Kei te oma ahau = I am running.",blank:"_____ oma ahau.",ans:"Kei te",build:"Kei te oma ahau"},
    {q:"E oma ana koe",sub:"What tense?",reo:"E ___ ana (continuous)",note:"E...ana = continuous. E oma ana koe.",blank:"E oma _____ koe.",ans:"ana",build:"E oma ana koe"},
    {q:"Ka oma ia",sub:"What tense?",reo:"Ka ___ (future)",note:"Ka = future/sequential. Ka oma ia = she will run.",blank:"_____ oma ia.",ans:"Ka",build:"Ka oma ia"},
    {q:"I oma ahau",sub:"What tense?",reo:"I ___ (simple past)",note:"I = simple past (done). I oma ahau = I ran.",blank:"_____ oma ahau inanahi.",ans:"I",build:"I oma ahau inanahi"},
    {q:"Kua oma ahau",sub:"What tense?",reo:"Kua ___ (past→present)",note:"Kua = present perfect. Kua pakaru = has broken.",blank:"_____ pakaru tōku waka.",ans:"Kua",build:"Kua pakaru tōku waka"},
    {q:"I te oma ahau",sub:"What tense?",reo:"I te ___ (was ___ing)",note:"I te = past continuous. I te oma = was running.",blank:"_____ oma ahau i tērā rā.",ans:"I te",build:"I te oma ahau i tērā rā"},
    
    // Dictionary examples with tenses
    {q:"Kei te maumahara tonu au",sub:"Tense + continuity",reo:"Kei te ... tonu",note:"Tonu = still. Kei te maumahara tonu = I still remember.",blank:"Kei te maumahara tonu _____.",ans:"au",build:"Kei te maumahara tonu au"},
    {q:"Kua waiata kē tōu hoa",sub:"Tense + already",reo:"Kua ... kē",note:"Kē = already. Kua waiata kē = has already sung.",blank:"Kua waiata kē _____ hoa.",ans:"tōu",build:"Kua waiata kē tōu hoa"},
    {q:"Ka haere māua ki te hāereere",sub:"Ka + purpose",reo:"Ka ... ki te",note:"Ki te = to/in order to. Ka haere ki te = will go to.",blank:"Ka haere _____ ki te hāereere.",ans:"māua",build:"Ka haere māua ki te hāereere"},
    {q:"I pai tonu, engari kāore i inati te pai",sub:"Past + contrast",reo:"I ... engari kāore",note:"Engari = but. I pai tonu, engari = was good, but.",blank:"I pai tonu, engari kāore i inati te _____.",ans:"pai",build:"I pai tonu engari kāore i inati te pai"},
    {q:"Kāore a Tio i te hoko kai",sub:"Negative present",reo:"Kāore ... i te",note:"Kāore i te = not (present). Kāore i te hoko = not buying.",blank:"Kāore a Tio i te hoko _____.",ans:"kai",build:"Kāore a Tio i te hoko kai"},
    {q:"Kāore he raihi i roto i te kāpata",sub:"Negative existence",reo:"Kāore he",note:"Kāore he = there is no. Kāore he raihi = there is no rice.",blank:"Kāore he raihi i roto i te _____.",ans:"kāpata",build:"Kāore he raihi i roto i te kāpata"},
    {q:"Kāore anō te wai kia hū",sub:"Not yet",reo:"Kāore anō ... kia",note:"Kāore anō kia = not yet. Te wai kia hū = water to boil.",blank:"Kāore anō te wai kia _____.",ans:"hū",build:"Kāore anō te wai kia hū"},
    {q:"Me kai ahau i ōku pire",sub:"Must/should",reo:"Me",note:"Me = must/should. Me kai ahau = I must eat.",blank:"Me kai ahau i _____ pire.",ans:"ōku",build:"Me kai ahau i ōku pire"},
    {q:"Kia tere, kei mākū koe",sub:"Command + warning",reo:"Kia ... kei",note:"Kia = let (command). Kei = lest/might. Hurry or you'll get wet.",blank:"Kia tere, kei mākū _____.",ans:"koe",build:"Kia tere kei mākū koe"},
    {q:"Ka tū ki Ākarana i te Paraire",sub:"Sequential Ka",reo:"Ka tū",note:"Ka = then (sequential). Ka tū = then stopped/stood.",blank:"Ka tū ki Ākarana i te _____.",ans:"Paraire",build:"Ka tū ki Ākarana i te Paraire"},
    {q:"Kei te karo kē pea i te oma",sub:"Present + hedging",reo:"Kei te ... kē pea",note:"Pea = maybe/perhaps. Kē = different/rather. Dodging the run.",blank:"Kei te karo kē pea i te _____.",ans:"oma",build:"Kei te karo kē pea i te oma"},
    {q:"I heke tōna kaha nā te rā roa",sub:"Past cause-effect",reo:"I ... nā te",note:"I = past. Nā te = because of. Strength fell because of long day.",blank:"I heke tōna kaha nā te rā _____.",ans:"roa",build:"I heke tōna kaha nā te rā roa"},
    {q:"E mātakitaki ana ō mātou mātua",sub:"E...ana continuous",reo:"E ... ana",note:"E...ana wraps verb. E mātakitaki ana = are staring.",blank:"E mātakitaki ana ō _____ mātua.",ans:"mātou",build:"E mātakitaki ana ō mātou mātua"},
    {q:"Kua karangahia tētahi hui",sub:"Kua passive",reo:"Kua ... tia",note:"Kua + passive. Kua karangahia = has been called.",blank:"Kua karangahia tētahi _____.",ans:"hui",build:"Kua karangahia tētahi hui"},
    
    // More tense practice
    {q:"Kei te kai rātou",sub:"Present",reo:"Kei te kai",note:"Kei te kai rātou = They are eating.",blank:"Kei te kai _____.",ans:"rātou",build:"Kei te kai rātou"},
    {q:"E haere ana ia ki te toa",sub:"Continuous",reo:"E haere ana",note:"E haere ana = is going (continuous).",blank:"E haere ana ia ki te _____.",ans:"toa",build:"E haere ana ia ki te toa"},
    {q:"Ka hoki mai ia āpōpō",sub:"Future",reo:"Ka hoki mai",note:"Ka = will. Ka hoki mai = will return.",blank:"Ka hoki mai ia _____.",ans:"āpōpō",build:"Ka hoki mai ia āpōpō"},
    {q:"I haere au ki te kura inanahi",sub:"Simple past",reo:"I haere",note:"I = past. I haere = went.",blank:"I haere au ki te kura _____.",ans:"inanahi",build:"I haere au ki te kura inanahi"},
    {q:"Kua mutu te mahi",sub:"Perfect",reo:"Kua mutu",note:"Kua mutu = has finished (with present relevance).",blank:"Kua mutu te _____.",ans:"mahi",build:"Kua mutu te mahi"},
    {q:"I te ako ahau i tērā wā",sub:"Past continuous",reo:"I te ako",note:"I te = was ___ing. I te ako = was learning.",blank:"I te ako ahau i tērā _____.",ans:"wā",build:"I te ako ahau i tērā wā"},
    {q:"Kei te pēhea koe?",sub:"How are you?",reo:"Kei te pēhea",note:"Kei te pēhea = how are (you)? Standard greeting.",blank:"Kei te pēhea _____?",ans:"koe",build:"Kei te pēhea koe"},
    {q:"E noho ana koe i hea?",sub:"Where do you live?",reo:"E noho ana ... i hea",note:"E noho ana = are living. I hea = where.",blank:"E noho ana koe i _____?",ans:"hea",build:"E noho ana koe i hea"},
    {q:"Ka pai",sub:"Will be good",reo:"Ka pai",note:"Ka pai = will be good / that's fine. Common response.",blank:"Ka _____.",ans:"pai",build:"Ka pai"},
    {q:"I rongo au i te tangi",sub:"I heard",reo:"I rongo",note:"I rongo = heard. I rongo au = I heard.",blank:"I rongo au i te _____.",ans:"tangi",build:"I rongo au i te tangi"},
    {q:"Kua tae mai ia",sub:"Has arrived",reo:"Kua tae mai",note:"Kua tae mai = has arrived (and is here).",blank:"Kua tae mai _____.",ans:"ia",build:"Kua tae mai ia"},
    {q:"I te whakarongo au i taua wā",sub:"I was listening",reo:"I te whakarongo",note:"I te = was ___ing. I te whakarongo = was listening.",blank:"I te whakarongo au i taua _____.",ans:"wā",build:"I te whakarongo au i taua wā"},
    {q:"Kei te hiakai au",sub:"I'm hungry",reo:"Kei te hiakai",note:"Kei te hiakai = am hungry (present state).",blank:"Kei te hiakai _____.",ans:"au",build:"Kei te hiakai au"},
    {q:"E ako ana tātou i te reo Māori",sub:"We are learning",reo:"E ako ana",note:"E ako ana tātou = we are learning (continuous).",blank:"E ako ana tātou i te reo _____.",ans:"Māori",build:"E ako ana tātou i te reo Māori"},
    {q:"Ka tae au ki reira ā te 3 karaka",sub:"I'll arrive by 3",reo:"Ka tae ... ā te",note:"Ka tae = will arrive. Ā te 3 karaka = by 3 o'clock.",blank:"Ka tae au ki reira ā te 3 _____.",ans:"karaka",build:"Ka tae au ki reira ā te 3 karaka"},
    {q:"I kite ia i tōna hoa",sub:"She saw her friend",reo:"I kite",note:"I kite = saw. I kite ia = she saw.",blank:"I kite ia i _____ hoa.",ans:"tōna",build:"I kite ia i tōna hoa"},
    {q:"Kua roa ia e noho ana i konei",sub:"Has been staying long",reo:"Kua roa ... e ... ana",note:"Kua roa = for a long time (perfect). E noho ana = staying.",blank:"Kua roa ia e noho ana i _____.",ans:"konei",build:"Kua roa ia e noho ana i konei"},
    {q:"I te moe au i te ahiahi",sub:"I was sleeping",reo:"I te moe",note:"I te moe = was sleeping. I te ahiahi = in the evening.",blank:"I te moe au i te _____.",ans:"ahiahi",build:"I te moe au i te ahiahi"},
    {q:"Kei te māuiui koe?",sub:"Are you sick?",reo:"Kei te māuiui",note:"Kei te māuiui = are sick (present state question).",blank:"Kei te māuiui _____?",ans:"koe",build:"Kei te māuiui koe"},
    {q:"E haere ana ia ki te hui āpōpō",sub:"She's going tomorrow",reo:"E haere ana ... āpōpō",note:"E haere ana = is going. Āpōpō = tomorrow.",blank:"E haere ana ia ki te hui _____.",ans:"āpōpō",build:"E haere ana ia ki te hui āpōpō"},
    {q:"Ka hoki tātou ki te kāinga",sub:"We'll return home",reo:"Ka hoki",note:"Ka hoki = will return. Tātou = we all.",blank:"Ka hoki tātou ki te _____.",ans:"kāinga",build:"Ka hoki tātou ki te kāinga"},
    {q:"I noho rātou i te marae",sub:"They stayed",reo:"I noho",note:"I noho = stayed. I te marae = at the marae.",blank:"I noho rātou i te _____.",ans:"marae",build:"I noho rātou i te marae"},
    {q:"Kua mate tōku koroua",sub:"My grandfather has died",reo:"Kua mate",note:"Kua mate = has died (with present effect/grief).",blank:"Kua mate _____ koroua.",ans:"tōku",build:"Kua mate tōku koroua"},
    {q:"I te mahi māua i tērā wiki",sub:"We two were working",reo:"I te mahi ... i tērā wiki",note:"I te mahi = were working. I tērā wiki = last week.",blank:"I te mahi māua i tērā _____.",ans:"wiki",build:"I te mahi māua i tērā wiki"},
    {q:"Kei te wera te rangi",sub:"It's hot",reo:"Kei te wera",note:"Kei te wera = is hot. Te rangi = the weather/day.",blank:"Kei te wera te _____.",ans:"rangi",build:"Kei te wera te rangi"},
    {q:"E moe ana ngā tamariki",sub:"The children are sleeping",reo:"E moe ana",note:"E moe ana = are sleeping (continuous).",blank:"E moe ana ngā _____.",ans:"tamariki",build:"E moe ana ngā tamariki"},
    {q:"Ka tīmata te hui ā te 10 karaka",sub:"Meeting starts at 10",reo:"Ka tīmata ... ā te",note:"Ka tīmata = will start. Ā te 10 karaka = at 10 o'clock.",blank:"Ka tīmata te hui ā te 10 _____.",ans:"karaka",build:"Ka tīmata te hui ā te 10 karaka"},
    {q:"I whānau ia i Tāmaki",sub:"She was born",reo:"I whānau",note:"I whānau = was born. I Tāmaki = in Auckland.",blank:"I whānau ia i _____.",ans:"Tāmaki",build:"I whānau ia i Tāmaki"},
    {q:"Kua roa mātou e tatari ana",sub:"We've been waiting long",reo:"Kua roa ... e tatari ana",note:"Kua roa = for long. E tatari ana = have been waiting.",blank:"Kua roa mātou e tatari _____.",ans:"ana",build:"Kua roa mātou e tatari ana"},
    {q:"I te ako ia i ngā rā o mua",sub:"He was learning in the old days",reo:"I te ako ... i ngā rā o mua",note:"I te ako = was learning. I ngā rā o mua = in the past.",blank:"I te ako ia i ngā rā o _____.",ans:"mua",build:"I te ako ia i ngā rā o mua"},
    {q:"Kei te hiahia ahau ki te haere",sub:"I want to go",reo:"Kei te hiahia ... ki te",note:"Kei te hiahia = want. Ki te haere = to go.",blank:"Kei te hiahia ahau ki te _____.",ans:"haere",build:"Kei te hiahia ahau ki te haere"},
    {q:"E tū ana te whare i runga i te puke",sub:"The house stands",reo:"E tū ana ... i runga i",note:"E tū ana = is standing. I runga i = on top of.",blank:"E tū ana te whare i runga i te _____.",ans:"puke",build:"E tū ana te whare i runga i te puke"},
    {q:"Ka whakarongo au ki tōu kōrero",sub:"I'll listen",reo:"Ka whakarongo",note:"Ka whakarongo = will listen. Ki tōu kōrero = to your speech.",blank:"Ka whakarongo au ki _____ kōrero.",ans:"tōu",build:"Ka whakarongo au ki tōu kōrero"}
  ],

  mix: [] // Will be filled automatically
};

// Auto-fill mix with samples from all topics
data.mix = [
  ...data.ao.slice(0, 20),
  ...data.kupu.slice(0, 15),
  ...data.tense.slice(0, 20)
];

console.log('Data loaded:', {
  ao: data.ao.length,
  kupu: data.kupu.length,
  tense: data.tense.length,
  mix: data.mix.length,
  total: data.ao.length + data.kupu.length + data.tense.length
});
