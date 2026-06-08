'use client'

import React, { useEffect, useRef, useState } from 'react'

interface TherapyItem {
  title: string
  description: string
}

interface SpeechTherapyProps {
  title: string
  description: string
  items: TherapyItem[]
}

const ProcessCard: React.FC<{ item: TherapyItem; index: number }> = ({ item, index }) => {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    const check = () => {
      if (!expanded) setOverflowing(el.scrollHeight - 1 > el.clientHeight)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [expanded])

  return (
    <article className="card">
      <span className="step" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="h-md">{item.title}</h3>
      <p ref={textRef} className={`ctext clamp${expanded ? ' expanded' : ''}`}>
        {item.description}
      </p>
      <button
        className="card-toggle"
        type="button"
        aria-expanded={expanded}
        hidden={!overflowing && !expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="ctlabel">{expanded ? 'Less' : 'More'}</span>
        <span className="cti" aria-hidden="true">
          {expanded ? '−' : '+'}
        </span>
      </button>
    </article>
  )
}

const SpeechTherapy: React.FC<SpeechTherapyProps> = ({ title, description, items }) => {
  return (
    <section className="section" id="speech_therapy" aria-labelledby="process-h">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">How therapy works</p>
          <h2 className="display-lg" id="process-h">
            {title}
          </h2>
          {description && <p className="body-lg">{description}</p>}
        </div>
        <div className="grid-4">
          {items.map((item, index) => (
            <ProcessCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpeechTherapy
