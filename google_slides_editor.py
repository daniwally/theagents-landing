#!/usr/bin/env python3

import os
import json
import tempfile
import subprocess
from pathlib import Path
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

def get_gog_credentials():
    """Extract credentials from gog's storage"""
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
                scopes=['https://www.googleapis.com/auth/presentations']
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

def update_presentation():
    """Update World Skate presentation using Google Slides API"""
    
    print("🔄 Getting credentials from gog...")
    creds = get_gog_credentials()
    
    if not creds:
        print("❌ Failed to get credentials")
        return False
    
    try:
        # Build the service
        print("🔌 Building Google Slides service...")
        service = build('slides', 'v1', credentials=creds)
        
        presentation_id = '1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA'
        
        # Define all replacements
        replacements = [
            ("PRESUPUESTO PISCO DIABLO", "PRESUPUESTO WORLD SKATE"),
            ("CREATIVIDAD OPERANDO EN MODO IA", "PLATAFORMA CULTURAL GLOBAL EN MODO IA"),
            ("marca personal Malek", "World Skate Platform"),
            ("Malek", "World Skate"),
            ("$2.100.000", "USD 17,500"),
            ("durante 2026", "durante 24 meses"),
            ('"NO TALK. JUST RACE."', '"POWER TO MOVE SKATE FORWARD"'),
            ("Pista, Proceso, Control, Evolución", "Positioning, Image, Storytelling, Community"),
            ("Construcción → Presion → Evolución", "Governing → Leading → Empowering"),
            ("4-8 piezas de contenido por mes", "8-12 piezas de contenido por mes"),
            ("biblia de marca Malek", "Brand Bible World Skate"),
            ("press kit de proyección internacional", "press kit internacional para 130 federaciones")
        ]
        
        # Create batch update requests
        requests = []
        for old_text, new_text in replacements:
            request = {
                'replaceAllText': {
                    'containsText': {
                        'text': old_text,
                        'matchCase': True
                    },
                    'replaceText': new_text
                }
            }
            requests.append(request)
        
        print(f"📝 Making {len(requests)} text replacements...")
        
        # Execute batch update
        body = {'requests': requests}
        response = service.presentations().batchUpdate(
            presentationId=presentation_id,
            body=body
        ).execute()
        
        print("🎉 SUCCESS! Presentation updated automatically!")
        print(f"✅ Made {len(response.get('replies', []))} updates")
        
        return True
        
    except Exception as e:
        print(f"❌ Error updating presentation: {e}")
        return False

if __name__ == "__main__":
    success = update_presentation()
    
    if success:
        print("\n🚀 WORLD SKATE PRESENTATION COMPLETED!")
        print("🔗 https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
        print("📋 Ready to send to client!")
        print("\n✅ All text automatically replaced:")
        print("• Pisco Diablo → World Skate")
        print("• Malek → World Skate Platform") 
        print("• $2.100.000 → USD 17,500")
        print("• And 9 more replacements completed!")
    else:
        print("\n❌ Failed to update automatically")
        print("🔧 Debugging needed or use manual approach")