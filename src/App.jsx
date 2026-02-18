// frontend/src/App.jsx
import { useState } from 'react';
import './App.css'; // We'll add all our new styles here

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [contactFormStatus, setContactFormStatus] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const fetchBackendMessage = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/saludo');
      const data = await response.json();
      setBackendMessage(data.message);
    } catch (error) {
      console.error('Error connecting to the backend:', error);
      setBackendMessage('Fehler beim Abrufen der Nachricht vom Backend.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitContactForm = async (e) => {
    e.preventDefault();
    setContactFormStatus('Senden...');
    try {
      const response = await fetch('http://localhost:5000/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setContactFormStatus(`Erfolg: ${data.message}`);
        setFormData({ nombre: '', email: '', mensaje: '' }); // Clear form
      } else {
        setContactFormStatus(`Fehler: ${data.message || 'Etwas ist schief gelaufen.'}`);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setContactFormStatus('Verbindungsfehler beim Senden des Formulars.');
    }
  };

  return (
    <div className="page-wrapper">
      {/* Floating Chatbot Icon */}
      <div className="chatbot-icon-container">
        <span className="chatbot-icon" role="img" aria-label="Chatbot">🤖</span>
      </div>

      <header className="hero-section">
        <div className="hero-content">
          {/* Placeholder for your profile picture */}
          {/* You can add your actual image here, e.g., <img src="/path/to/your/profile-pic.jpg" alt="Eduard Morales" className="profile-pic" /> */}
          <img src="/foto.jpeg" alt="Eduard Morales" className="profile-pic" />
          <h1>Eduard Morales</h1>
          <p className="subtitle">Engineer Automatisierung</p>
          <p className="status-date">Stand: 20-07-2025</p>
        </div>
      </header>

      <main className="main-content">
        <section id="kurzprofil" className="section card">
          <h2>Kurzprofil</h2>
          <p>
            Eduard Morales ist ein erfahrener Ingenieur mit Spezialisierung auf die Automatisierungstechnik und die Konzeption sowie Implementierung maßgeschneiderter digitaler Lösungen. Er nutzt moderne Technologien wie Low-Code-Plattformen, Robotic Process Automation (RPA), Künstliche Intelligenz (KI) und API-Integration, um Geschäftsprozesse effizient zu optimieren und innovative Lösungen zu entwickeln. Seine Expertise umfasst die Analyse komplexer Anforderungen, die Standardisierung von Abläufen und die erfolgreiche Realisierung von Projekten, die auf Effizienzsteigerung und Datenmanagement abzielen. Eduard Morales zeichnet sich durch eine analytische, pragmatische und lösungsorientierte Arbeitsweise aus, mit dem klaren Ziel, nachhaltigen Mehrwert zu schaffen.
          </p>
        </section>

        <section id="services-experience" className="section card">
          <h2>Meine Dienstleistungen und Erfahrung</h2>
          <p>Hier spreche ich über meine Erfahrung in den Bereichen Automatisierung, n8n, LLMs, RPA, APIs.</p>
          <h3>Schwerpunkte:</h3>
          <ul className="grid-list">
            <li>Allgemein</li>
            <li>Prozessdesign, -analyse und -optimierung</li>
            <li>Projektmanagement</li>
            <li>Analytisches Denken und Lösungsorientierung</li>
            <li>Qualitätssicherung und Standardisierung</li>
            <li>Informationsmanagement</li>
            <li>Prozess- und IT-Automatisierung</li>
            <li>Automatisierungstechnologien</li>
            <li>Datenanalyse und -migration</li>
            <li>Künstliche Intelligenz (GenAI, LLMs)</li>
            <li>Software-Entwicklung</li>
            <li>Systemintegration</li>
          </ul>
        </section>

        <section id="roles-education" className="section card">
          <div className="two-column-layout">
            <div>
              <h3>Projektrollen:</h3>
              <ul>
                <li>Automation Engineer</li>
                <li>Projektmanager</li>
                <li>Requirements Engineer</li>
                <li>KI-Expert</li>
                <li>Prozess-Expert</li>
                <li>Software-Entwickler</li>
              </ul>
            </div>
            <div>
              <h3>Schulungen/Zertifikate:</h3>
              <ul>
                <li>Online-Kurs: SQL for Data Science (Coursera)</li>
                <li>Online-Kurs: IT Service Management (ServiceNow)</li>
              </ul>
              <h3>Sprachen:</h3>
              <ul>
                <li>Spanisch - Muttersprache</li>
                <li>Deutsch - verhandlungssicher</li>
                <li>Englisch - Mittelstufe bis fortgeschritten</li>
              </ul>
              <h3>Ausbildung:</h3>
              <p>Diplom-Ingenieur in Elektrotechnik</p>
            </div>
          </div>
        </section>


        {/* Contact Form Section - Moved to the end */}
        <section id="contact" className="section contact-section card dynamic-card">
          <h2>Kontaktieren Sie mich</h2>
          <p>Haben Sie Fragen oder möchten Sie über ein Projekt sprechen? Senden Sie mir eine Nachricht!</p>
          <form onSubmit={handleSubmitContactForm} className="contact-form">
            <div className="form-group">
              <label htmlFor="nombre">Name:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Nachricht:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Nachricht senden</button>
          </form>
          {contactFormStatus && <p className="form-status">{contactFormStatus}</p>}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Eduard Morales. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}

export default App;