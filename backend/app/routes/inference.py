from fastapi import APIRouter
from app.schemas.inference import (
    AgriXAIRequest,
    AgriXAIResponse,
    KidneyStoneRequest,
    KidneyStoneResponse,
    SafetyAccessRequest,
    SafetyAccessResponse,
)
from app.services.ml_service import ml_service
from app.services.cv_service import cv_safety_service

router = APIRouter(prefix="/inference", tags=["AI/ML & Computer Vision Inference"])


@router.post("/agrixai", response_model=AgriXAIResponse, summary="Run AgriXAI Crop Yield Prediction & SHAP Analysis")
def infer_agrixai(request: AgriXAIRequest):
    """
    Empirical AgriXAI model inference:
    Computes expected agricultural yield using the calibrated Random Forest ensemble (98.75% R^2)
    and provides feature-level SHAP explainability insights.
    """
    return ml_service.predict_agrixai(request)


@router.post("/kidney-stone", response_model=KidneyStoneResponse, summary="Run Kidney Stone Risk Classifier")
def infer_kidney_stone(request: KidneyStoneRequest):
    """
    Kidney stone risk diagnostic inference:
    Evaluates patient urine physicochemical markers using the Extra Trees Classifier (94.46% accuracy).
    """
    return ml_service.predict_kidney_stone(request)


@router.post("/safety-access", response_model=SafetyAccessResponse, summary="Evaluate Smart Industrial Safety Access")
def infer_safety_access(request: SafetyAccessRequest):
    """
    MSPL Smart Employee Safety & Access Control Pipeline:
    Simulates real-time YOLO helmet detection, license plate OCR parsing, and gate control decisioning.
    """
    return cv_safety_service.evaluate_access(request)
