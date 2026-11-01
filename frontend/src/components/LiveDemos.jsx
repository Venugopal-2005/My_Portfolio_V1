import React, { useState } from 'react';
import { FlaskConical, Leaf, Heart, Shield, ChevronDown, ChevronRight, Send, AlertTriangle, CheckCircle2, Loader } from 'lucide-react';

const API_BASE = '/api';

function AgriXAIDemo() {
  const [form, setForm] = useState({
    crop: 'Rice',
    season: 'Kharif',
    state: 'Karnataka',
    area_hectares: 2.5,
    annual_rainfall_mm: 1050,
    fertilizer_usage_kg: 220,
    pesticide_usage_kg: 12,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Soybean', 'Pulses', 'Barley'];
  const seasons = ['Kharif', 'Rabi', 'Zaid'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/inference/agrixai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          area_hectares: parseFloat(form.area_hectares),
          annual_rainfall_mm: parseFloat(form.annual_rainfall_mm),
          fertilizer_usage_kg: parseFloat(form.fertilizer_usage_kg),
          pesticide_usage_kg: parseFloat(form.pesticide_usage_kg),
        }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.85rem',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.9rem',
    background: 'var(--bg)',
    color: 'var(--text-main)',
    outline: 'none',
  };
  const labelStyle = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d' }}>
          <Leaf size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>AgriXAI Crop Yield Prediction</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Random Forest (R² = 98.75%) + SHAP Explainability</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
        <div>
          <label style={labelStyle}>Crop Type</label>
          <select value={form.crop} onChange={e => setForm({ ...form, crop: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
            {crops.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Season</label>
          <select value={form.season} onChange={e => setForm({ ...form, season: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
            {seasons.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>State / Region</label>
          <input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Area (Hectares)</label>
          <input type="number" min="0.1" max="1000" step="0.1" value={form.area_hectares} onChange={e => setForm({ ...form, area_hectares: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Rainfall (mm/year)</label>
          <input type="number" min="100" max="5000" step="10" value={form.annual_rainfall_mm} onChange={e => setForm({ ...form, annual_rainfall_mm: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Fertilizer (kg)</label>
          <input type="number" min="0" max="5000" step="5" value={form.fertilizer_usage_kg} onChange={e => setForm({ ...form, fertilizer_usage_kg: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Pesticide (kg)</label>
          <input type="number" min="0" max="200" step="0.5" value={form.pesticide_usage_kg} onChange={e => setForm({ ...form, pesticide_usage_kg: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
            {loading ? 'Running...' : 'Predict Yield'}
          </button>
        </div>
      </form>

      {error && (
        <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', color: '#b91c1c', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {result && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <h4 style={{ fontWeight: 700, color: '#166534', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} /> Prediction Results
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid #d1fae5' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#166534' }}>{result.predicted_yield_tons_per_ha}</div>
              <div style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 500 }}>tons/ha yield</div>
            </div>
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid #d1fae5' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#166534' }}>{result.total_estimated_production_tons}</div>
              <div style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 500 }}>total production (tons)</div>
            </div>
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid #d1fae5' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#166534' }}>{(result.r2_score * 100).toFixed(1)}%</div>
              <div style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 500 }}>R² Model Score</div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#166534', marginBottom: '0.5rem' }}>SHAP Explainability:</p>
            {result.shap_explanations.map((exp, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', fontSize: '0.83rem' }}>
                <span style={{ width: '130px', fontWeight: 600, color: '#166534', flexShrink: 0 }}>{exp.feature}</span>
                <div style={{ flex: 1, height: '8px', background: '#d1fae5', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, exp.impact_score * 30 + 20)}%`, background: exp.direction === 'positive' ? '#16a34a' : '#dc2626', borderRadius: '4px', transition: 'width 0.6s ease' }} />
                </div>
                <span style={{ color: exp.direction === 'positive' ? '#16a34a' : '#dc2626', fontWeight: 600, fontSize: '0.75rem' }}>
                  {exp.direction === 'positive' ? '↑' : '↓'} {exp.direction}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function KidneyStoneDemo() {
  const [form, setForm] = useState({ gravity: 1.021, ph: 5.4, osmo: 750, cond: 21.4, urea: 380, calc: 6.8 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/inference/kidney-stone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gravity: parseFloat(form.gravity),
          ph: parseFloat(form.ph),
          osmo: parseFloat(form.osmo),
          cond: parseFloat(form.cond),
          urea: parseFloat(form.urea),
          calc: parseFloat(form.calc),
        }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      setResult(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.6rem 0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--bg)', outline: 'none' };
  const labelStyle = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' };
  const riskColor = result ? (result.risk_level.includes('High') ? '#dc2626' : result.risk_level.includes('Moderate') ? '#d97706' : '#16a34a') : null;
  const riskBg = result ? (result.risk_level.includes('High') ? '#fef2f2' : result.risk_level.includes('Moderate') ? '#fffbeb' : '#f0fdf4') : null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
          <Heart size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Kidney Stone Risk Classifier</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Extra Trees Classifier (Accuracy: 94.46%)</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
        {[
          { key: 'gravity', label: 'Specific Gravity', min: 1.000, max: 1.050, step: 0.001 },
          { key: 'ph', label: 'pH Level', min: 4.0, max: 9.0, step: 0.1 },
          { key: 'osmo', label: 'Osmolality (mOsm/kg)', min: 100, max: 1400, step: 10 },
          { key: 'cond', label: 'Conductivity (mMho)', min: 1, max: 50, step: 0.1 },
          { key: 'urea', label: 'Urea (mmol/L)', min: 10, max: 800, step: 5 },
          { key: 'calc', label: 'Calcium (mmol/L)', min: 0.1, max: 20, step: 0.1 },
        ].map(({ key, label, min, max, step }) => (
          <div key={key}>
            <label style={labelStyle}>{label}</label>
            <input type="number" min={min} max={max} step={step} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <FlaskConical size={16} />}
            {loading ? 'Analyzing...' : 'Assess Risk'}
          </button>
        </div>
      </form>

      {error && <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', color: '#b91c1c', fontSize: '0.875rem' }}>{error}</div>}

      {result && (
        <div style={{ background: riskBg, border: `1px solid ${riskColor}33`, borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: riskColor }}>{(result.risk_probability * 100).toFixed(1)}%</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: riskColor }}>Risk Probability</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: riskColor, fontSize: '1rem' }}>{result.risk_level}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Model: {result.model_name}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {result.biomarker_analysis.map((b, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--secondary)' }}>{b.marker.split('(')[0]}</div>
                <div style={{ color: b.status === 'Normal' || b.status === 'Balanced' ? '#15803d' : '#c2410c', fontWeight: 500 }}>{b.value} — {b.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SafetyAccessDemo() {
  const [form, setForm] = useState({ vehicle_plate: 'KA-34-M-2025', rider_helmet_present: true, speed_kmh: 15, gate_zone: 'MSPL Plant Gate 3 - Hospet' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/inference/safety-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, speed_kmh: parseFloat(form.speed_kmh) }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      setResult(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.6rem 0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--bg)', outline: 'none' };
  const labelStyle = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c2410c' }}>
          <Shield size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Smart Industrial Safety Access</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>YOLO Detection + OCR Plate Recognition + Helmet Compliance</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
        <div>
          <label style={labelStyle}>Vehicle Plate (OCR Output)</label>
          <input value={form.vehicle_plate} onChange={e => setForm({ ...form, vehicle_plate: e.target.value })} placeholder="e.g. KA-34-M-2025" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Speed (km/h)</label>
          <input type="number" min="0" max="120" step="0.5" value={form.speed_kmh} onChange={e => setForm({ ...form, speed_kmh: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Gate Zone</label>
          <input value={form.gate_zone} onChange={e => setForm({ ...form, gate_zone: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Helmet Detected (YOLO)</label>
          <select value={form.rider_helmet_present ? 'true' : 'false'} onChange={e => setForm({ ...form, rider_helmet_present: e.target.value === 'true' })} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="true">✅ Helmet Detected</option>
            <option value="false">❌ No Helmet Detected</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Shield size={16} />}
            {loading ? 'Processing...' : 'Evaluate Access'}
          </button>
        </div>
      </form>

      {error && <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', color: '#b91c1c', fontSize: '0.875rem' }}>{error}</div>}

      {result && (
        <div style={{ background: result.access_granted ? '#f0fdf4' : '#fef2f2', border: `1px solid ${result.access_granted ? '#bbf7d0' : '#fecaca'}`, borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>{result.access_granted ? '✅' : '🚫'}</span>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: result.access_granted ? '#166534' : '#b91c1c' }}>
                  {result.access_granted ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{result.audit_log_id}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: result.access_granted ? '#166534' : '#b91c1c' }}>{result.compliance_score}%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Compliance Score</div>
            </div>
          </div>
          {result.registered_employee && (
            <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>👤 {result.registered_employee.employee_name} ({result.registered_employee.employee_id})</div>
              <div style={{ color: 'var(--text-muted)' }}>{result.registered_employee.department} • {result.registered_employee.clearance}</div>
            </div>
          )}
          {result.violation_reasons.length > 0 && (
            <div>
              <div style={{ fontWeight: 700, color: '#b91c1c', marginBottom: '0.35rem', fontSize: '0.85rem' }}>Violations:</div>
              {result.violation_reasons.map((v, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.83rem', color: '#b91c1c', marginBottom: '0.25rem' }}>
                  <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                  {v}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const demos = [
  { id: 'agrixai', label: 'AgriXAI Yield Prediction', icon: Leaf, component: AgriXAIDemo },
  { id: 'kidney', label: 'Kidney Stone Risk', icon: Heart, component: KidneyStoneDemo },
  { id: 'safety', label: 'Smart Safety Access', icon: Shield, component: SafetyAccessDemo },
];

export default function LiveDemos() {
  const [activeDemo, setActiveDemo] = useState('agrixai');

  const ActiveDemoComponent = demos.find(d => d.id === activeDemo)?.component || AgriXAIDemo;

  return (
    <section id="demos" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">LIVE AI/ML DEMOS</span>
          <h2 className="section-title">Interactive AI Inference</h2>
          <p className="section-subtitle">Run live predictions from real Python ML models powering the FastAPI backend</p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {demos.map(d => {
              const DemoIcon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDemo(d.id)}
                  className={activeDemo === d.id ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <DemoIcon size={16} />
                  {d.label}
                </button>
              );
            })}
          </div>

          <div className="card" style={{ cursor: 'default', boxShadow: 'var(--shadow-md)' }}>
            <ActiveDemoComponent />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
