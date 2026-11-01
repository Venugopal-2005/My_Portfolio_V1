import pytest


def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "Venugopal K Portfolio API"


def test_api_directory(client):
    response = client.get("/api")
    assert response.status_code == 200
    data = response.json()
    assert "/api/profile" in data["endpoints"]
    assert "/api/inference/agrixai" in data["endpoints"]


def test_get_profile(client):
    response = client.get("/api/profile")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Venugopal K"
    assert "Python Full-Stack" in data["title"]
    assert len(data["education"]) >= 1
    assert data["education"][0]["institution"] == "SRM Institute of Science and Technology, Chennai"


def test_get_projects(client):
    response = client.get("/api/projects")
    assert response.status_code == 200
    projects = response.json()
    assert len(projects) >= 6
    slugs = [p["slug"] for p in projects]
    assert "agrixai" in slugs
    assert "kidney-stone" in slugs
    assert "vehicle-safety" in slugs


def test_project_filter_and_search(client):
    # Filter by category
    resp_cat = client.get("/api/projects?category=Machine%20Learning")
    assert resp_cat.status_code == 200
    cat_projects = resp_cat.json()
    assert len(cat_projects) >= 1
    for p in cat_projects:
        assert "Machine Learning" in p["category"]

    # Search
    resp_search = client.get("/api/projects?search=AgriXAI")
    assert resp_search.status_code == 200
    search_projects = resp_search.json()
    assert len(search_projects) >= 1
    assert search_projects[0]["slug"] == "agrixai"


def test_get_single_project(client):
    response = client.get("/api/projects/agrixai")
    assert response.status_code == 200
    project = response.json()
    assert project["slug"] == "agrixai"
    assert "98.75%" in project["metrics"]
    assert "Random Forest" in project["tech_stack"]


    # Not found
    resp_404 = client.get("/api/projects/non-existent-project")
    assert resp_404.status_code == 404


def test_get_experience(client):
    response = client.get("/api/experience")
    assert response.status_code == 200
    exp = response.json()
    assert len(exp) >= 1
    assert "MSPL Limited" in exp[0]["company"]
    assert "Computer Vision Intern" in exp[0]["title"]


def test_get_skills(client):
    response = client.get("/api/skills")
    assert response.status_code == 200
    data = response.json()
    assert "Python Full-Stack & Backend" in data["categories"]
    assert "AI & Machine Learning" in data["categories"]
    assert len(data["all_skills"]) >= 10


def test_get_certifications(client):
    response = client.get("/api/certifications")
    assert response.status_code == 200
    certs = response.json()
    assert len(certs) >= 5
    titles = [c["title"] for c in certs]
    assert any("SAP Analytics Cloud" in t for t in titles)


def test_get_achievements(client):
    response = client.get("/api/achievements")
    assert response.status_code == 200
    achievements = response.json()
    assert len(achievements) >= 4
    titles = [a["title"] for a in achievements]
    assert any("Elsevier SSRN" in t for t in titles)


def test_contact_submission(client):
    payload = {
        "name": "Sarah Connor",
        "email": "sarah.connor@cyberdyne.org",
        "subject": "Full-Stack Python & AI Role Opportunity",
        "message": "Hi Venugopal, we are impressed by your AgriXAI research and CV internship. We would love to interview you."
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 201
    result = response.json()
    assert result["success"] is True
    assert result["submission_id"] > 0

    # Test invalid email validation
    bad_payload = {
        "name": "Sarah Connor",
        "email": "not-an-email",
        "subject": "Hi",
        "message": "Too short"
    }
    bad_response = client.post("/api/contact", json=bad_payload)
    assert bad_response.status_code == 422


def test_agrixai_inference(client):
    req = {
        "crop": "Rice",
        "season": "Kharif",
        "state": "Karnataka",
        "area_hectares": 3.0,
        "annual_rainfall_mm": 1150.0,
        "fertilizer_usage_kg": 240.0,
        "pesticide_usage_kg": 14.0
    }
    response = client.post("/api/inference/agrixai", json=req)
    assert response.status_code == 200
    data = response.json()
    assert data["predicted_yield_tons_per_ha"] > 0
    assert data["total_estimated_production_tons"] > 0
    assert len(data["shap_explanations"]) >= 3
    assert data["r2_score"] == 0.9875


def test_kidney_stone_inference(client):
    req = {
        "gravity": 1.025,
        "ph": 5.2,
        "osmo": 850.0,
        "cond": 25.0,
        "urea": 420.0,
        "calc": 8.5
    }
    response = client.post("/api/inference/kidney-stone", json=req)
    assert response.status_code == 200
    data = response.json()
    assert "risk_detected" in data
    assert "risk_level" in data
    assert 0.0 <= data["risk_probability"] <= 1.0
    assert data["accuracy"] == 0.9446


def test_safety_access_inference(client):
    req = {
        "vehicle_plate": "KA-34-M-2025",
        "rider_helmet_present": True,
        "speed_kmh": 14.5,
        "gate_zone": "Plant Gate 1"
    }
    response = client.post("/api/inference/safety-access", json=req)
    assert response.status_code == 200
    data = response.json()
    assert data["access_granted"] is True
    assert data["gate_action"] == "OPEN_AUTOMATIC_BOOM_BARRIER"
    assert data["registered_employee"]["employee_name"] == "Venugopal K"

    # Unauthorized with missing helmet
    req_denied = {
        "vehicle_plate": "UNKNOWN-99",
        "rider_helmet_present": False,
        "speed_kmh": 35.0,
        "gate_zone": "Plant Gate 1"
    }
    resp_denied = client.post("/api/inference/safety-access", json=req_denied)
    assert resp_denied.status_code == 200
    data_denied = resp_denied.json()
    assert data_denied["access_granted"] is False
    assert len(data_denied["violation_reasons"]) >= 2
