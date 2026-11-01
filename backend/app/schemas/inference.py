from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


# --- AgriXAI ---
class AgriXAIRequest(BaseModel):
    crop: str = Field(default="Rice", description="Agricultural crop type")
    season: str = Field(default="Kharif", description="Farming season")
    state: str = Field(default="Karnataka", description="State or agricultural climatic zone")
    area_hectares: float = Field(default=2.5, gt=0, le=1000, description="Cultivated land in hectares")
    annual_rainfall_mm: float = Field(default=1050.0, ge=100, le=5000, description="Annual rainfall in mm")
    fertilizer_usage_kg: float = Field(default=220.0, ge=0, le=5000, description="Fertilizer applied in kg")
    pesticide_usage_kg: float = Field(default=12.5, ge=0, le=200, description="Pesticide applied in kg")


class FeatureImpact(BaseModel):
    feature: str
    impact_score: float
    direction: str  # "positive" | "negative"
    description: str


class AgriXAIResponse(BaseModel):
    crop: str
    area_hectares: float
    predicted_yield_tons_per_ha: float
    total_estimated_production_tons: float
    model_name: str
    r2_score: float
    shap_explanations: List[FeatureImpact]
    recommendation: str


# --- Kidney Stone Prediction ---
class KidneyStoneRequest(BaseModel):
    gravity: float = Field(default=1.021, ge=1.000, le=1.050, description="Urine specific gravity")
    ph: float = Field(default=5.4, ge=4.0, le=9.0, description="Urine pH level")
    osmo: float = Field(default=750.0, ge=100.0, le=1400.0, description="Osmolality (mOsm/kg)")
    cond: float = Field(default=21.4, ge=1.0, le=50.0, description="Conductivity (mMho)")
    urea: float = Field(default=380.0, ge=10.0, le=800.0, description="Urea concentration (mmol/L)")
    calc: float = Field(default=6.8, ge=0.1, le=20.0, description="Calcium concentration (mmol/L)")


class KidneyStoneResponse(BaseModel):
    risk_detected: bool
    risk_level: str
    risk_probability: float
    model_name: str
    accuracy: float
    biomarker_analysis: List[Dict[str, Any]]
    clinical_note: str


# --- Smart Employee Safety & Access ---
class SafetyAccessRequest(BaseModel):
    vehicle_plate: str = Field(default="KA-34-M-2025", description="Detected vehicle license plate text")
    rider_helmet_present: bool = Field(default=True, description="Whether helmet is detected by YOLO")
    speed_kmh: float = Field(default=18.0, ge=0.0, le=120.0, description="Vehicle speed at gate")
    gate_zone: str = Field(default="MSPL Plant Gate 3 - Hospet", description="Gate surveillance location")


class SafetyAccessResponse(BaseModel):
    access_granted: bool
    status_code: str
    gate_action: str
    compliance_score: float
    detection_summary: Dict[str, Any]
    registered_employee: Optional[Dict[str, str]] = None
    violation_reasons: List[str]
    audit_log_id: str
