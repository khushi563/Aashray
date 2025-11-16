import React from 'react';
export default function Home(){
  return (
    <>
      <section className="hero">
        <h2>Empowering Communities, Changing Lives</h2>
        <p>Join us in making a real impact through education, health, and sustainability.</p>
        <a href="/donate" className="btn" style={{marginTop:'15px'}}>Donate Now</a>
      </section>

      <section className="container">
        <h3 style={{marginBottom:'20px'}}>Our Focus Areas</h3>
        <div className="grid grid-3">
          <div className="card"><h4>📚 Education</h4><p>Helping children with quality learning resources.</p></div>
          <div className="card"><h4>🩺 Health</h4><p>Medical assistance, camps and welfare programs.</p></div>
          <div className="card"><h4>🌿 Sustainability</h4><p>Eco-friendly initiatives for a greener tomorrow.</p></div>
        </div>
      </section>
    </>
  )
}
