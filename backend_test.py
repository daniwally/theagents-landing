#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import uuid

class TheAgentsAPITester:
    def __init__(self, base_url="https://theagents-preview.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = None
        
    def log_result(self, test_name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name} - PASSED")
        else:
            print(f"❌ {test_name} - FAILED")
        if details:
            print(f"   {details}")
        print()

    def test_api_health(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}, Response: {response.json()}"
            self.log_result("API Health Check", success, details)
            return success
        except Exception as e:
            self.log_result("API Health Check", False, f"Error: {str(e)}")
            return False

    def test_trial_submission(self):
        """Test trial form submission"""
        try:
            trial_data = {
                "name": "Juan Test",
                "email": "juan.test@empresa.com", 
                "company": "Test Company",
                "phone": "+54911234567"
            }
            
            response = requests.post(
                f"{self.api_url}/trial",
                json=trial_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            success = response.status_code == 200
            if success:
                data = response.json()
                trial_id = data.get('id')
                details = f"Status: {response.status_code}, Trial ID: {trial_id}"
            else:
                details = f"Status: {response.status_code}, Error: {response.text}"
                
            self.log_result("Trial Form Submission", success, details)
            return success, response.json() if success else {}
            
        except Exception as e:
            self.log_result("Trial Form Submission", False, f"Error: {str(e)}")
            return False, {}

    def test_get_trials(self):
        """Test retrieving trial requests"""
        try:
            response = requests.get(f"{self.api_url}/trials", timeout=10)
            success = response.status_code == 200
            
            if success:
                trials = response.json()
                details = f"Status: {response.status_code}, Trials count: {len(trials)}"
            else:
                details = f"Status: {response.status_code}, Error: {response.text}"
                
            self.log_result("Get Trial Requests", success, details)
            return success
            
        except Exception as e:
            self.log_result("Get Trial Requests", False, f"Error: {str(e)}")
            return False

    def test_chat_endpoint(self):
        """Test chat functionality with Claude Sonnet 4.5"""
        try:
            # First message - establish session
            chat_data = {
                "message": "Hola, ¿cómo pueden ayudar los agentes a mi empresa?"
            }
            
            response = requests.post(
                f"{self.api_url}/chat",
                json=chat_data,
                headers={'Content-Type': 'application/json'},
                timeout=30  # LLM calls can take time
            )
            
            success = response.status_code == 200
            if success:
                data = response.json()
                self.session_id = data.get('session_id')
                ai_response = data.get('response', '')
                details = f"Status: {response.status_code}, Session: {self.session_id}, Response length: {len(ai_response)}"
                
                # Check if response looks like Rock's personality
                if any(word in ai_response.lower() for word in ['hola', 'che', 'dale', 'agentes']):
                    details += " (Response seems authentic)"
                else:
                    details += " (Warning: Response doesn't match Rock's personality)"
            else:
                details = f"Status: {response.status_code}, Error: {response.text}"
                
            self.log_result("Chat with Rock (Initial)", success, details)
            return success
            
        except Exception as e:
            self.log_result("Chat with Rock (Initial)", False, f"Error: {str(e)}")
            return False

    def test_chat_followup(self):
        """Test follow-up chat message with session"""
        if not self.session_id:
            self.log_result("Chat Follow-up", False, "No session ID from previous test")
            return False
            
        try:
            chat_data = {
                "message": "¿Cuáles son los packs disponibles?",
                "session_id": self.session_id
            }
            
            response = requests.post(
                f"{self.api_url}/chat",
                json=chat_data,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )
            
            success = response.status_code == 200
            if success:
                data = response.json()
                ai_response = data.get('response', '')
                details = f"Status: {response.status_code}, Response length: {len(ai_response)}"
                
                # Check if response mentions packs
                if any(word in ai_response.lower() for word in ['pack', 'agencia', 'e-commerce', 'profesionales', 'full']):
                    details += " (Response mentions packs)"
                else:
                    details += " (Warning: Response doesn't mention packs)"
            else:
                details = f"Status: {response.status_code}, Error: {response.text}"
                
            self.log_result("Chat Follow-up with Session", success, details)
            return success
            
        except Exception as e:
            self.log_result("Chat Follow-up with Session", False, f"Error: {str(e)}")
            return False

    def test_invalid_trial_data(self):
        """Test trial submission with invalid data"""
        try:
            # Missing required fields
            invalid_data = {
                "name": "",  # Empty required field
                "email": "invalid-email",  # Invalid email format
                "company": "Test Company",
                "phone": "+54911234567"
            }
            
            response = requests.post(
                f"{self.api_url}/trial",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return error for invalid data
            success = response.status_code == 422  # FastAPI validation error
            details = f"Status: {response.status_code} (Expected 422 for validation error)"
                
            self.log_result("Trial Validation Error Handling", success, details)
            return success
            
        except Exception as e:
            self.log_result("Trial Validation Error Handling", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting backend API tests for The Agents Landing Page")
        print(f"Base URL: {self.base_url}")
        print(f"API URL: {self.api_url}")
        print("=" * 70)
        
        # Test API connectivity first
        if not self.test_api_health():
            print("❌ API is not accessible. Stopping tests.")
            return False
            
        # Test trial endpoints
        self.test_trial_submission()
        self.test_get_trials()
        self.test_invalid_trial_data()
        
        # Test chat endpoints (AI integration)
        self.test_chat_endpoint()
        self.test_chat_followup()
        
        # Print summary
        print("=" * 70)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("✅ Backend testing completed successfully!")
        else:
            print("⚠️  Some backend issues detected.")
            
        return success_rate >= 80

def main():
    """Main test execution"""
    tester = TheAgentsAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())