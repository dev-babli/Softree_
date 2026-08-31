"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import './ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ReverseStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Initialize Lenis scroll smoothing
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Grab all section elements inside our container
    const sections = gsap.utils.toArray<HTMLElement>('.rss_section');

    sections.forEach((section, i) => {
      const innerContainer = section.querySelector('.rss_container');
      if (!innerContainer) return;

      // 1. Entrance Rotation Animation (for sections after the first one)
      if (i > 0) {
        gsap.set(innerContainer, {
          rotation: 30,
        });

        gsap.to(innerContainer, {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 25%',
            scrub: true,
          },
        });
      }

      // 2. Sticky Pinning Animation (for sections before the last one)
      if (i < sections.length - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });
      }
    });

    // Cleanup function
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="rss_wrap">
      {/* Section 1 */}
      <section className="rss_section rss_s1">
        <div className="rss_container">
          <p className="rss_tag">01 - Offshore AI Squads</p>
          <hr className="rss_hr" />
          <div>
            <h1 className="rss_big">
              Scale<br />Your AI<br />Capacity
            </h1>
          </div>
          <hr className="rss_hr" />
          <p className="rss_sub rss_bottom">
            We embed dedicated offshore AI engineering squads directly into your delivery team. Build, deploy, and scale custom AI agents, LLM applications, and RAG systems at 40% lower operational cost.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="rss_section rss_s2">
        <div className="rss_container">
          <p className="rss_tag">02 - Core Capabilities</p>
          <hr className="rss_hr" />
          <div>
            <h2 className="rss_big">
              Custom<br />AI By<br />Design
            </h2>
          </div>
          <hr className="rss_hr" />
          <div>
            <p className="rss_sub">
              Production-ready AI integration across the Microsoft stack. We build secure, reliable, and compliant AI solutions that integrate with your enterprise data.
            </p>
          </div>
          <hr className="rss_hr" />
          
          <div className="rss_cols">
            <div>
              <p className="rss_label">Agentic AI</p>
              <p className="rss_detail">
                Design and build autonomous multi-agent networks that automate complex multi-step workflows and decisions using Copilot Studio and Azure AI.
              </p>
            </div>
            <div>
              <p className="rss_label">Enterprise RAG</p>
              <p className="rss_detail">
                Implement high-fidelity Retrieval-Augmented Generation systems for secure semantic search across documents, databases, and APIs.
              </p>
            </div>
            <div>
              <p className="rss_label">Custom Copilots</p>
              <p className="rss_detail">
                Extend Microsoft 365 Copilot with custom plugins, actions, and graph connectors tailored to your proprietary processes.
              </p>
            </div>
          </div>
          
          <hr className="rss_hr" />
          
          <div className="rss_cols">
            <div>
              <p className="rss_label">LLM Fine-Tuning</p>
              <p className="rss_detail">
                Optimize foundation models for domain-specific tasks, evaluating performance, prompt latency, cost, and output quality.
              </p>
            </div>
            <div>
              <p className="rss_label">MLOps & Observability</p>
              <p className="rss_detail">
                Establish continuous evaluation, logging, cost control, and security guardrails using MLflow, Azure AI Studio, and Grafana.
              </p>
            </div>
            <div>
              <p className="rss_label">AI Integration</p>
              <p className="rss_detail">
                Connect AI models securely to legacy databases, line-of-business ERPs, CRM systems, and custom APIs.
              </p>
            </div>
          </div>
          
          <hr className="rss_hr" />
          <p className="rss_sub rss_bottom rss_right">
            Every AI solution we deploy is built for security, scalability, and measurable business value.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="rss_section rss_s3">
        <div className="rss_container">
          <p className="rss_tag">03 - Delivery Model</p>
          <hr className="rss_hr" />
          <div>
            <h2 className="rss_big">
              Agile.<br />Secure.<br />Vetted.
            </h2>
          </div>
          <hr className="rss_hr" />
          <p className="rss_sub">Our offshore AI delivery squads work under your direction or as a fully managed team to ship production-ready systems in weeks.</p>
          <hr className="rss_hr" />
          
          <div className="rss_cols">
            <div>
              <p className="rss_label">01 - Discovery</p>
              <p className="rss_detail">
                We audit your workflows, evaluate data readiness, choose model architectures, and define concrete AI success metrics.
              </p>
            </div>
            <div>
              <p className="rss_label">02 - Prototyping</p>
              <p className="rss_detail">
                We build and evaluate prompt logic and vector indexing options in 2 to 4 weeks using real enterprise datasets.
              </p>
            </div>
            <div>
              <p className="rss_label">03 - Squad Assembly</p>
              <p className="rss_detail">
                We assign senior AI engineers, data engineers, and PMs to scale your internal team with zero overhead.
              </p>
            </div>
          </div>
          
          <hr className="rss_hr" />
          
          <div className="rss_cols">
            <div>
              <p className="rss_label">04 - MLOps Setup</p>
              <p className="rss_detail">
                We configure CI/CD pipelines, containerize services, and set up performance logging and LLM cost monitoring.
              </p>
            </div>
            <div>
              <p className="rss_label">05 - Compliance</p>
              <p className="rss_detail">
                ISO 27001 certified delivery processes ensuring data privacy, governance, and strict access controls.
              </p>
            </div>
            <div>
              <p className="rss_label">06 - Continuous Scale</p>
              <p className="rss_detail">
                Ongoing evaluation, model upgrades, dataset curation, and reinforcement learning iterations to improve accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="rss_section rss_s4">
        <div className="rss_container">
          <p className="rss_tag">04 - Impact & Scale</p>
          <hr className="rss_hr" />
          <div>
            <h2 className="rss_big">
              Proven<br />AI<br />Results
            </h2>
          </div>
          <hr className="rss_hr" />
          <div>
            <p className="rss_sub">
              We don't build generic API wrappers. Every system we develop is designed to solve real operational bottlenecks and process complexity.
            </p>
          </div>
          <hr className="rss_hr" />
          
          <div className="rss_cols">
            <div>
              <p className="rss_label">100+ Engineers</p>
              <p className="rss_detail">
                A highly specialized offshore pool of AI, ML, and data engineers proficient in Azure, OpenAI, and LangGraph.
              </p>
            </div>
            <div>
              <p className="rss_label">4–16 Weeks</p>
              <p className="rss_detail">
                Typical time-to-production for custom enterprise agents, RAG pipelines, and automated workflow integrations.
              </p>
            </div>
            <div>
              <p className="rss_label">ISO 27001</p>
              <p className="rss_detail">
                Certified information security management systems ensuring enterprise-grade compliance for all code and data pipelines.
              </p>
            </div>
          </div>
          
          <hr className="rss_hr" />
          <div>
            <p className="rss_sub">
              Enterprise AI requires more than model API calls. It requires data pipelines, evaluation harnesses, cost containment, and robust security architecture. We deliver all of it.
            </p>
          </div>
          <hr className="rss_hr" />
          
          <div className="rss_cols">
            <div>
              <p className="rss_label">Secure Data</p>
              <p className="rss_detail">
                Zero-data retention models and secure vector stores to safeguard intellectual property and customer datasets.
              </p>
            </div>
            <div>
              <p className="rss_label">High Efficiency</p>
              <p className="rss_detail">
                Dedicated offshore developers that integrate directly into your Jira, Slack, Teams, and code repos with no time-zone lag.
              </p>
            </div>
            <div>
              <p className="rss_label">Cost Control</p>
              <p className="rss_detail">
                Semantic caching, prompt token optimizations, and hybrid small language models (SLMs) to cut operational costs by up to 50%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="rss_section rss_s5">
        <div className="rss_container">
          <p className="rss_tag">05 - Get Started</p>
          <hr className="rss_hr" />
          <div>
            <h2 className="rss_big">
              Build<br />Your AI<br />Team
            </h2>
          </div>
          <hr className="rss_hr" />
          <p className="rss_sub rss_bottom">
            Accelerate your AI roadmap. Contact Softree today to schedule an architecture consult and scope your offshore AI engineering squad.
          </p>
        </div>
      </section>
    </div>
  );
};
