import { Canvas } from '@react-three/fiber'
import { Background, Controls, ReactFlow, type Edge, type Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useState } from 'react'

const mindNodes: Node[] = [
  { id: 'genai', position: { x: 290, y: 135 }, data: { label: 'GEN AI\nFUNDAMENTALS' }, className: 'root-node', style:{color:'#fff',whiteSpace:'pre-line'} },
  { id: 'models', position: { x: 25, y: 8 }, data: { label: 'Models & data' }, className: 'mind-node blue', style:{color:'#fff'} },
  { id: 'learn', position: { x: 20, y: 280 }, data: { label: 'Learning types' }, className: 'mind-node violet', style:{color:'#fff'} },
  { id: 'prompt', position: { x: 555, y: 8 }, data: { label: 'Prompting & tools' }, className: 'mind-node teal', style:{color:'#fff'} },
  { id: 'safety', position: { x: 570, y: 280 }, data: { label: 'Safety & guardrails' }, className: 'mind-node coral', style:{color:'#fff'} },
]
const mindEdges: Edge[] = ['models','learn','prompt','safety'].map((target) => ({ id: `e-${target}`, source: 'genai', target, animated: true, style: { stroke: '#7c8cff', strokeWidth: 2 } }))

function Orb() {
  return <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
    <ambientLight intensity={1.3} /><pointLight position={[4, 3, 3]} intensity={25} color="#86f8e1" />
    <mesh rotation={[0.3, 0.4, 0]}><icosahedronGeometry args={[1.45, 2]} /><meshStandardMaterial color="#6f6bff" roughness={.24} metalness={.35} emissive="#252062" /></mesh>
    <mesh scale={1.68}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#8ff8db" wireframe transparent opacity={.13}/></mesh>
  </Canvas>
}

const questions = [
  { q: 'What best describes a token in an LLM?', a: ['A database row', 'A unit of text the model processes', 'A safety policy'], correct: 1 },
  { q: 'Which practice helps reduce hallucination risk?', a: ['Treat every output as fact', 'Ground the task in reliable context and verify claims', 'Use a longer prompt only'], correct: 1 },
  { q: 'Responsible AI is mainly about:', a: ['Fastest model selection', 'Using models with awareness of risks and safeguards', 'Removing human review'], correct: 1 },
]

const curriculum = [
  { number:'01', title:'Gen AI Fundamentals', count:'8 lessons', topics:['AI, ML & Generative AI','Learning types','Data, neural networks & LLM tokens','Diffusion, foundation models & hallucinations'], note:'Start here: build the vocabulary, then learn how outputs are produced and where their limits are.' },
  { number:'02', title:'Prompt Engineering', count:'5 lessons', topics:['Well-structured prompts','Prompt templates','Zero-, one- & few-shot prompting','Chain-of-thought & role prompting'], note:'Turn vague requests into repeatable instructions that guide better responses.' },
  { number:'03', title:'Advanced LLM Features', count:'9 lessons', topics:['Data analysis, projects & memory','Web search & deep research','MCP, custom instructions & knowledge bases','Grounding, RAG & evidence checks'], note:'Use context and tools to make AI answers more accurate, useful and auditable.' },
  { number:'04', title:'Gen AI Tools', count:'11 lessons', topics:['Google AI Studio & NotebookLM','Reports, summaries & mind maps','Image, audio & video generation','Gemini across Workspace'], note:'Pick the right tool and workflow for research, creative output and productivity.' },
  { number:'05', title:'Vibe Coding & Automation Basics', count:'prerequisite module', topics:['What vibe coding can and cannot do','Describing the product clearly','Client, server & APIs','API keys & webhooks'], note:'Learn the technical building blocks before using workflow automation or AI coding tools.' },
  { number:'06', title:'Workflow Automation', count:'5 lessons', topics:['Foundations of workflow automation','n8n platform setup','Triggers and actions','Data transformation and logic','AI agents and workflow templates'], note:'Build business workflows from small, connected steps, then add AI only where it adds useful capability.' },
  { number:'07', title:'Vibe Coding', count:'6 lessons', topics:['What and why','Choosing Replit or Lovable','Idea to first prototype','Communicating requirements to AI','Troubleshooting, deployment and safeguards'], note:'Prototype quickly, then iterate and validate the generated code before you share or ship it.' },
  { number:'08', title:'Context Engineering', count:'5 lessons', topics:['Definition and importance','Structuring context for LLMs','Compression and summarization','Context-window management','Optimising agents with context'], note:'Treat context as a designed system: concise, relevant information in the right sequence improves complex work.' },
  { number:'09', title:'Claude', count:'7 lessons', topics:['Foundations','Documents, files, artifacts and projects','Accuracy, verification and connectors','Skills','Claude Code, Cowork and Design'], note:'Learn the Claude surfaces, validate outputs, and collaborate with it as a focused AI coworker.' },
  { number:'10', title:'Codex', count:'6 lessons', topics:['What it is and where it runs','Setup and safe first use','High-quality task instructions','Real workflows end to end','Review, test, accept, revert and ship','Automations, skills and shared instructions'], note:'Use Codex with constrained instructions, checkpoints, review and tests—especially before any change is shipped.' },
  { number:'11–12', title:'Applied AI Practice', count:'advanced workflow pathway', topics:['Tool-specialist workflows','Controlled agentic work','Evaluation sets','Reliable handoffs'], note:'Continue the applied-skills path with tool-specific practice and systematic evaluation.' },
  { number:'13', title:'AI Safety & Guardrails', count:'policy module', topics:['Transparency, privacy, fairness & legal compliance','Risk tiers and approval paths','Permitted vs prohibited use','Human review, monitoring & records'], note:'The policy layer for every earlier module: classify data, protect secrets, validate outputs and retain the right evidence.' },
]

function App() {
  const [tab, setTab] = useState<'explore'|'map'|'quiz'>('explore'); const [answers, setAnswers] = useState<number[]>([])
  const score = answers.reduce((n, a, i) => n + Number(a === questions[i].correct), 0)
  return <main>
    <nav><div className="brand"><span>✦</span> GENAI / FUNDAMENTALS</div><div className="navlinks">{(['explore','map','quiz'] as const).map(x => <button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x === 'map' ? 'Mind map' : x === 'quiz' ? 'Quiz & revise' : 'Explore'}</button>)}</div><a href="#source">Source notes ↗</a></nav>
    {tab === 'explore' && <>
      <section className="hero"><div><p className="eyebrow">13 MODULES · LEARN BY BUILDING</p><h1>Make sense of<br/><em>Generative AI.</em></h1><p className="lede">A visual field guide to the concepts, tools and guardrails in the GenAI Fundamentals training.</p><div className="actions"><button className="primary" onClick={()=>setTab('map')}>Explore the map <b>→</b></button><button className="ghost" onClick={()=>setTab('quiz')}>Test yourself</button></div></div><div className="orb"><Orb/><div className="orb-label">INTERACTIVE<br/><b>MODEL SPACE</b></div></div></section>
      <section className="stats"><div><b>3</b><span>learning paths</span></div><div><b>13</b><span>modules</span></div><div><b>8</b><span>lessons in Module 1</span></div><div><b>∞</b><span>questions to ask</span></div></section>
      <section className="paths"><p className="eyebrow">THE COURSE LANDSCAPE</p><h2>Three ways into the work.</h2><div className="cardgrid"><article className="card"><i>01</i><h3>Foundations & productivity</h3><p>AI, ML and GenAI basics; prompts, tools, automation and vibe coding.</p><div className="tags"><span>LLMs</span><span>tokens</span><span>diffusion</span></div></article><article className="card"><i>02</i><h3>Applied AI skills</h3><p>Context engineering, advanced workflows, agentic systems and evaluation sets.</p><div className="tags"><span>context</span><span>agents</span><span>evals</span></div></article><article className="card"><i>03</i><h3>Safety & guardrails</h3><p>Know model limits, protect information and keep human judgment in the loop.</p><div className="tags"><span>risk</span><span>SAIF</span><span>review</span></div></article></div></section>
      <section className="explainer"><div><p className="eyebrow">3D EXPLAINER</p><h2>From input to an answer.</h2><p>An LLM turns your input into tokens, uses patterns learned during training, then predicts the next useful token—one step at a time.</p></div><div className="pipeline"><span>YOUR CONTEXT</span><b>→</b><span>TOKENS</span><b>→</b><span className="glow">MODEL</span><b>→</b><span>RESPONSE</span></div></section>
      <section className="library"><p className="eyebrow">EMBEDDED COURSE LIBRARY</p><h2>The complete learning path, made explorable.</h2><p className="library-intro">This on-site guide reflects the connected Notion modules and lesson lists. Select a card to scan its outcomes; continue in the original training for videos, handouts, assignments and the module chatbot.</p><div className="module-list">{curriculum.map(module=><details key={module.number}><summary><span>{module.number}</span><div><b>{module.title}</b><small>{module.count}</small></div><i>+</i></summary><div className="module-body"><p>{module.note}</p><ul>{module.topics.map(topic=><li key={topic}>{topic}</li>)}</ul><div className="lesson-routine"><b>Lesson routine</b><span>Objective → video/handout → AI chatbot revision → assessment</span></div></div></details>)}</div></section>
    </>}
    {tab === 'map' && <section className="map-page"><p className="eyebrow">CONCEPT CONNECTIONS</p><h2>Mind map: the GenAI core.</h2><p>High-contrast labels and full module concepts, designed to remain readable as you pan and zoom.</p><div className="flow"><ReactFlow nodes={mindNodes} edges={mindEdges} fitView proOptions={{ hideAttribution: true }}><Background color="#293052" gap={22}/><Controls /></ReactFlow></div><div className="concepts"><article><b>Models & data</b><p>Data is the raw material. Neural networks learn patterns; foundation models generalize them across tasks.</p></article><article><b>Prompting & tools</b><p>Structured prompts, templates, examples and roles set the task; grounding and tools supply trustworthy context.</p></article><article><b>Safety first</b><p>Classify risk, keep secrets and restricted data out of unapproved tools, and retain human approval for high-impact work.</p></article></div></section>}
    {tab === 'quiz' && <section className="quiz"><p className="eyebrow">KNOWLEDGE CHECK</p><h2>Quick revision round.</h2><p className="quiz-sub">Choose an answer. A helpful explanation is included after each choice.</p>{questions.map((item,i)=><article className="question" key={item.q}><span>0{i+1}</span><div><h3>{item.q}</h3><div className="options">{item.a.map((choice,j)=><button className={answers[i]===j ? (j===item.correct?'correct':'wrong') : ''} onClick={()=>setAnswers(a=>{const next=[...a]; next[i]=j; return next})} key={choice}>{choice}</button>)}</div>{answers[i]!==undefined && <p className="feedback">{answers[i]===item.correct ? '✓ Exactly right.' : `Try again — ${item.a[item.correct]}.`}</p>}</div></article>)}<div className="score">{answers.length ? <><b>{score}/{questions.length}</b> correct so far</> : 'Answer a question to begin.'}</div></section>}
    <footer id="source"><b>Built from the connected “GEN AI Fundamentals Trainings” Notion curriculum.</b><span>Course topics shown here are learning summaries; use the original training and its AI chatbot for the complete material.</span></footer>
  </main>
}
export default App
