import { Canvas } from '@react-three/fiber'
import { Background, Controls, ReactFlow, type Edge, type Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useState } from 'react'

const mindNodes: Node[] = [
  { id: 'genai', position: { x: 280, y: 135 }, data: { label: 'GEN AI\nFUNDAMENTALS' }, className: 'root-node' },
  { id: 'models', position: { x: 40, y: 10 }, data: { label: 'Models & data' }, className: 'mind-node blue' },
  { id: 'learn', position: { x: 35, y: 255 }, data: { label: 'Learning types' }, className: 'mind-node violet' },
  { id: 'prompt', position: { x: 550, y: 0 }, data: { label: 'Prompting & tools' }, className: 'mind-node teal' },
  { id: 'safety', position: { x: 565, y: 275 }, data: { label: 'Safety & guardrails' }, className: 'mind-node coral' },
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
    </>}
    {tab === 'map' && <section className="map-page"><p className="eyebrow">CONCEPT CONNECTIONS</p><h2>Mind map: the GenAI core.</h2><p>Follow the animated links, then open a concept in your own words.</p><div className="flow"><ReactFlow nodes={mindNodes} edges={mindEdges} fitView proOptions={{ hideAttribution: true }}><Background color="#293052" gap={22}/><Controls /></ReactFlow></div><div className="concepts"><article><b>Models & data</b><p>Data is the raw material. Neural networks learn patterns; foundation models generalize them across tasks.</p></article><article><b>Learning types</b><p>Supervised learning uses labeled examples; unsupervised finds structure; reinforcement learns from feedback.</p></article><article><b>Safety first</b><p>Verify outputs, respect data boundaries, and use a human check for meaningful decisions.</p></article></div></section>}
    {tab === 'quiz' && <section className="quiz"><p className="eyebrow">KNOWLEDGE CHECK</p><h2>Quick revision round.</h2><p className="quiz-sub">Choose an answer. A helpful explanation is included after each choice.</p>{questions.map((item,i)=><article className="question" key={item.q}><span>0{i+1}</span><div><h3>{item.q}</h3><div className="options">{item.a.map((choice,j)=><button className={answers[i]===j ? (j===item.correct?'correct':'wrong') : ''} onClick={()=>setAnswers(a=>{const next=[...a]; next[i]=j; return next})} key={choice}>{choice}</button>)}</div>{answers[i]!==undefined && <p className="feedback">{answers[i]===item.correct ? '✓ Exactly right.' : `Try again — ${item.a[item.correct]}.`}</p>}</div></article>)}<div className="score">{answers.length ? <><b>{score}/{questions.length}</b> correct so far</> : 'Answer a question to begin.'}</div></section>}
    <footer id="source"><b>Built from the connected “GEN AI Fundamentals Trainings” Notion curriculum.</b><span>Course topics shown here are learning summaries; use the original training and its AI chatbot for the complete material.</span></footer>
  </main>
}
export default App
