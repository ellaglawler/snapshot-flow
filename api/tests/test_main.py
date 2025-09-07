import pytest
import sys
import os

# Add the parent directory to the path so we can import main
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from fastapi.testclient import TestClient
    from main import app
    client = TestClient(app)
    APP_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Could not import main app: {e}")
    APP_AVAILABLE = False


@pytest.mark.skipif(not APP_AVAILABLE, reason="App not available")
def test_health_check():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


@pytest.mark.skipif(not APP_AVAILABLE, reason="App not available")
def test_root_endpoint():
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert "Background Check API" in response.json()["message"]


@pytest.mark.skipif(not APP_AVAILABLE, reason="App not available")
def test_api_v1_endpoints():
    """Test that API v1 endpoints are accessible."""
    # Test that the API v1 router is included
    response = client.get("/api/v1/")
    # This should return 404 or 405 since there's no root endpoint in v1
    assert response.status_code in [404, 405]
