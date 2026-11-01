import uuid
from datetime import datetime
from typing import Dict, Any, List
from app.schemas.inference import SafetyAccessRequest, SafetyAccessResponse


class ComputerVisionSafetyService:
    def __init__(self):
        # Database of authorized employee vehicle plates (MSPL Limited Plant access list)
        self.authorized_vehicles: Dict[str, Dict[str, str]] = {
            "KA-34-M-2025": {
                "employee_id": "EMP-4091",
                "employee_name": "Venugopal K",
                "department": "Computer Vision & Edge AI",
                "clearance": "Plant Floor & Engineering Labs",
                "vehicle_type": "Two-Wheeler (Motorcycle)"
            },
            "KA-34-E-1090": {
                "employee_id": "EMP-2104",
                "employee_name": "Rajesh Sharma",
                "department": "Operations & Logistics",
                "clearance": "General Plant Entry",
                "vehicle_type": "Two-Wheeler (Motorcycle)"
            },
            "KA-35-H-4411": {
                "employee_id": "EMP-3882",
                "employee_name": "Ananya Patil",
                "department": "Safety & Quality Control",
                "clearance": "All Access Zones",
                "vehicle_type": "Two-Wheeler (Scooter)"
            }
        }

    def evaluate_access(self, req: SafetyAccessRequest) -> SafetyAccessResponse:
        # Standardize plate string (e.g. KA-34-M-2025 or KA34M2025)
        clean_plate = req.vehicle_plate.upper().strip().replace(" ", "")
        
        # Match against authorized records
        matched_employee = None
        for registered_plate, emp_data in self.authorized_vehicles.items():
            reg_clean = registered_plate.replace("-", "").replace(" ", "")
            if clean_plate.replace("-", "") == reg_clean:
                matched_employee = emp_data
                clean_plate = registered_plate
                break

        violations: List[str] = []
        
        # 1. Helmet compliance check
        if not req.rider_helmet_present:
            violations.append("SAFETY VIOLATION: Industrial safety helmet not detected by YOLO vision detector.")
        
        # 2. Vehicle speed compliance
        if req.speed_kmh > 20.0:
            violations.append(f"SPEED VIOLATION: Gate zone speed limit is 20 km/h. Detected speed: {req.speed_kmh} km/h.")

        # 3. Registration authorization check
        if not matched_employee:
            violations.append("UNAUTHORIZED VEHICLE: License plate not found in active MSPL employee database.")

        access_granted = len(violations) == 0
        status_code = "ACCESS_GRANTED" if access_granted else "ACCESS_DENIED"
        gate_action = "OPEN_AUTOMATIC_BOOM_BARRIER" if access_granted else "RESTRICT_BARRIER_LOG_SECURITY_FLAG"

        # Compliance score (0 to 100%)
        compliance_score = 100.0
        if not req.rider_helmet_present:
            compliance_score -= 50.0
        if not matched_employee:
            compliance_score -= 35.0
        if req.speed_kmh > 20.0:
            compliance_score -= 15.0
        compliance_score = max(0.0, compliance_score)

        detection_summary = {
            "yolo_object_classes": [
                {"class": "motorcycle", "confidence": 0.96, "bbox": [120, 240, 480, 560]},
                {"class": "rider", "confidence": 0.98, "bbox": [150, 100, 390, 450]},
                {
                    "class": "helmet" if req.rider_helmet_present else "no_helmet",
                    "confidence": 0.94 if req.rider_helmet_present else 0.92,
                    "bbox": [210, 100, 310, 190],
                    "status": "COMPLIANT" if req.rider_helmet_present else "NON_COMPLIANT"
                }
            ],
            "ocr_extraction": {
                "raw_text": clean_plate,
                "confidence": 0.98,
                "bbox": [240, 460, 380, 520],
                "char_length": len(clean_plate)
            },
            "speed_radar": {
                "speed_kmh": req.speed_kmh,
                "status": "Normal" if req.speed_kmh <= 20.0 else "Over-speeding"
            }
        }

        audit_log_id = f"MSPL-SEC-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:6].upper()}"

        return SafetyAccessResponse(
            access_granted=access_granted,
            status_code=status_code,
            gate_action=gate_action,
            compliance_score=compliance_score,
            detection_summary=detection_summary,
            registered_employee=matched_employee,
            violation_reasons=violations,
            audit_log_id=audit_log_id
        )


cv_safety_service = ComputerVisionSafetyService()
