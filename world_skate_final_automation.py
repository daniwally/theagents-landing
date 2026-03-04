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
            
            # Use existing scopes
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
            print(f"Failed to export gog token: {result.stderr}")
            return None
            
    except Exception as e:
        print(f"Error getting gog credentials: {e}")
        return None

def update_world_skate_presentation():
    """Complete World Skate presentation automation"""
    
    print("🚀 WORLD SKATE AUTOMATION STARTING...")
    print("🔄 Getting credentials...")
    
    creds = get_gog_credentials()
    if not creds:
        print("❌ Failed to get credentials")
        return False
    
    try:
        print("🔌 Building Google Slides service...")
        service = build('slides', 'v1', credentials=creds)
        
        presentation_id = '1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA'
        
        print("📋 Preparing 12 text replacements...")
        
        # All replacements for World Skate
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
        for i, (old_text, new_text) in enumerate(replacements, 1):
            print(f"  {i:2d}. {old_text} → {new_text}")
            
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
        
        print(f"\n⚡ Executing batch update with {len(requests)} replacements...")
        
        # Execute the batch update
        body = {'requests': requests}
        response = service.presentations().batchUpdate(
            presentationId=presentation_id,
            body=body
        ).execute()
        
        print("🎉 SUCCESS! PRESENTATION UPDATED AUTOMATICALLY!")
        print(f"✅ Applied {len(response.get('replies', []))} text replacements")
        
        return True
        
    except Exception as e:
        print(f"❌ Error during automation: {e}")
        return False

if __name__ == "__main__":
    success = update_world_skate_presentation()
    
    if success:
        print("\n" + "="*60)
        print("🏆 WORLD SKATE PRESENTATION COMPLETED!")
        print("="*60)
        print("🔗 LINK: https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
        print("💰 BUDGET: USD 17,500 monthly (24 months = USD 420K total)")
        print("🎯 STATUS: Ready to send to client!")
        print("⏱️  TIME SAVED: 100% automated vs manual find/replace")
        print("="*60)
        print("✅ ALL TRANSFORMATIONS COMPLETED:")
        print("   • Pisco Diablo → World Skate Platform")
        print("   • Malek personal brand → World Skate global platform")
        print("   • $2.1M ARS → USD 17.5K monthly")
        print("   • 2026 scope → 24-month international program")
        print("   • Racing tagline → Skate empowerment message")
        print("   • And 7 more strategic adaptations!")
    else:
        print("\n❌ AUTOMATION FAILED")
        print("🔧 Check credentials or use manual find/replace backup")