#!/usr/bin/env python3

import os
import json
import tempfile
import subprocess
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

def get_gog_credentials():
    """Use existing gog credentials with drive access"""
    try:
        # Export token using gog
        token_file = tempfile.mktemp(suffix='.json')
        
        export_cmd = [
            'gog', 'auth', 'tokens', 'export', 'dora@wtf-agency.com',
            '--output', token_file
        ]
        
        result = subprocess.run(
            export_cmd, 
            capture_output=True, 
            text=True,
            env={**os.environ, 'GOG_ACCOUNT': 'dora@wtf-agency.com'}
        )
        
        if result.returncode == 0:
            with open(token_file, 'r') as f:
                token_data = json.load(f)
            
            # Create credentials object
            creds = Credentials(
                token=None,
                refresh_token=token_data.get('refresh_token'),
                token_uri='https://oauth2.googleapis.com/token',
                client_id='824858676072-csj3d1qdnaiegl5f06nbtel96va8o930.apps.googleusercontent.com',
                client_secret='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',
                scopes=token_data.get('scopes', ['https://www.googleapis.com/auth/drive'])
            )
            
            # Clean up temp file
            os.unlink(token_file)
            return creds
        else:
            print(f"Failed to export gog token: {result.stderr}")
            return None
            
    except Exception as e:
        print(f"Error getting gog credentials: {e}")
        return None

def test_access():
    """Test what we can access with current credentials"""
    
    print("🔄 Testing current access...")
    creds = get_gog_credentials()
    
    if not creds:
        print("❌ Failed to get credentials")
        return False
    
    try:
        # Test Drive API access
        print("🔌 Testing Drive API...")
        drive_service = build('drive', 'v3', credentials=creds)
        
        presentation_id = '1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA'
        
        # Get file info
        file_info = drive_service.files().get(fileId=presentation_id).execute()
        print(f"✅ Can access file: {file_info.get('name')}")
        
        # Try to test Slides API
        try:
            print("🔌 Testing Slides API...")
            slides_service = build('slides', 'v1', credentials=creds)
            
            # Try to get presentation info
            presentation = slides_service.presentations().get(
                presentationId=presentation_id
            ).execute()
            
            print("🎉 SUCCESS! Slides API works!")
            print(f"✅ Presentation title: {presentation.get('title')}")
            return True
            
        except Exception as e:
            print(f"❌ Slides API failed: {e}")
            print("📝 Need to re-authorize with slides scope")
            return False
        
    except Exception as e:
        print(f"❌ Error testing access: {e}")
        return False

if __name__ == "__main__":
    test_access()