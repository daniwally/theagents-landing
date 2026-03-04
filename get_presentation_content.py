#!/usr/bin/env python3

import os
import json
import tempfile
import subprocess
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

def get_gog_credentials():
    """Use existing gog credentials"""
    try:
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
            
            creds = Credentials(
                token=None,
                refresh_token=token_data.get('refresh_token'),
                token_uri='https://oauth2.googleapis.com/token',
                client_id='824858676072-csj3d1qdnaiegl5f06nbtel96va8o930.apps.googleusercontent.com',
                client_secret='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',
                scopes=token_data.get('scopes', ['https://www.googleapis.com/auth/drive'])
            )
            
            os.unlink(token_file)
            return creds
        else:
            return None
            
    except Exception as e:
        return None

def get_presentation_content():
    """Get all text content from the presentation"""
    
    creds = get_gog_credentials()
    if not creds:
        return False
    
    try:
        service = build('slides', 'v1', credentials=creds)
        
        presentation_id = '1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA'
        
        # Get presentation
        presentation = service.presentations().get(
            presentationId=presentation_id
        ).execute()
        
        print(f"📋 Presentation: {presentation.get('title')}")
        print("="*60)
        
        # Extract text from all slides
        slides = presentation.get('slides', [])
        
        for i, slide in enumerate(slides, 1):
            print(f"\n🎯 SLIDE {i}:")
            print("-" * 20)
            
            # Get all page elements
            page_elements = slide.get('pageElements', [])
            
            for element in page_elements:
                if 'shape' in element and 'text' in element['shape']:
                    text_content = element['shape']['text']
                    
                    # Extract text runs
                    for text_element in text_content.get('textElements', []):
                        if 'textRun' in text_element:
                            text = text_element['textRun'].get('content', '').strip()
                            if text and text != '\n':
                                print(f"• {text}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    get_presentation_content()